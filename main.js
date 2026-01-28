// ==========================================
// KONSTANTA DASAR (Internal)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const PEMBAGI_5 = {
    1: { n: "Sri", a: "Murah rejeki (Rejeki datang dari mana saja)" },
    2: { n: "Lungguh", a: "Kecukupan dalam perjalanan hidup" },
    3: { n: "Gendhong", a: "Mapan dalam segala hal lahiriah" },
    4: { n: "Loro", a: "Sakit-sakitan (fisik/batin) atau sering gagal usaha" },
    0: { n: "Pati", a: "Apapun yang dilakukan selalu gagal/jalan buntu" }
};

let current = new Date();
const TODAY = new Date();

// ==========================================
// LOGIKA PERHITUNGAN
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const refDate = new Date(2026, 0, 25); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let wukuIndex = (20 + Math.floor(diffDays / 7)) % 30;
    while (wukuIndex < 0) wukuIndex += 30;
    return wukuList[wukuIndex];
}

function getTanggalJawa(date) {
    // Data internal bulan jawa agar tidak error jika file luar hilang
    const BULAN_JAWA = ["Sura","Sapar","Mulud","Bakdamulud","Jumadilawal","Jumadilakir","Rejeb","Ruwah","Pasa","Syawal","Dulkaidah","Besar"];
    const refDate = new Date(2026, 0, 28); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let tglJawa = 9 + diffDays;
    let bulanIdx = 7; 
    let tahunJawa = 1959;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; if (bulanIdx === 0) tahunJawa++; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; if (bulanIdx === 11) tahunJawa--; }
    return { tanggal: tglJawa, namaBulan: BULAN_JAWA[bulanIdx], tahun: tahunJawa };
}

// ==========================================
// RENDER UI
// ==========================================

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid || !mNav) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulanMasehi = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    mNav.innerText = `${namaBulanMasehi[m]} ${y}`;

    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day' + (i === 0 ? ' sunday' : '');
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday-block');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div>`;
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const wukuName = getWuku(date);
    const infoJawa = getTanggalJawa(date);
    const nasib5 = PEMBAGI_5[neptu % 5];

    // --- SAFETY CHECKS (Cek file eksternal) ---
    const watakNeptu = (typeof DATA_WATAK_NEPTU !== 'undefined') ? (DATA_WATAK_NEPTU[neptu] || {watak: "Detail tidak ditemukan."}) : {watak: "Data file neptu belum dimuat."};
    
    // Pengecekan Mangsa
    let mangsaHtml = "";
    if (typeof getMangsaInfo === 'function') {
        const mangsa = getMangsaInfo(date);
        if (mangsa) {
            mangsaHtml = `<div style="background:#f0f7ff; padding:10px; border-radius:8px; margin-top:10px; border:1px solid #cfe2ff;">
                <h4 style="margin:0; color:#084298;">🌾 Pranata Mangsa: ${mangsa.nama}</h4>
                <p style="font-size:0.85rem; margin:5px 0 0;">${mangsa.deskripsi}</p>
            </div>`;
        }
    }

    // Pengecekan Sri Jati (Table)
    let sriJatiHtml = "";
    if (typeof TABEL_SRIJATI !== 'undefined' && TABEL_SRIJATI[neptu]) {
        sriJatiHtml = `<h4 style="color:#d30000; margin:15px 0 5px;">📈 Siklus Sri Jati</h4>
            <table style="width:100%; border-collapse:collapse; font-size:0.8rem; border:1px solid #ddd;">
                <tr style="background:#eee;"><th>Usia</th><th>Nilai</th><th>Nasib</th></tr>
                ${TABEL_SRIJATI[neptu].map(i => `<tr><td style="border:1px solid #ddd; padding:4px; text-align:center;">${i.usia}</td><td style="border:1px solid #ddd; padding:4px; text-align:center;">${i.nilai}</td><td style="border:1px solid #ddd; padding:4px;">${i.ket}</td></tr>`).join('')}
            </table>`;
    }

    // Pengecekan Watak Hari
    const teksHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[`${h} ${pasaran}`] || "") : "";

    // --- RENDER AKHIR ---
    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="result-card" style="background:#fff; padding:20px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1); color:#333;">
            <h2 style="color:#d30000; border-bottom:2px solid #d30000; padding-bottom:5px; margin-top:0;">${h} ${pasaran}</h2>
            
            <div style="background:#e8f5e9; padding:12px; border-radius:8px; border-left:5px solid #2e7d32; margin:15px 0;">
                <h4 style="margin:0; color:#1b5e20;">💎 Nasib: ${nasib5.n}</h4>
                <p style="margin:5px 0 0; font-size:0.9rem; font-style:italic;">"${nasib5.a}"</p>
            </div>

            <p style="margin:5px 0;"><strong>Neptu:</strong> ${neptu} | <strong>Wuku:</strong> ${wukuName}</p>
            <p style="margin:5px 0;"><strong>Tanggal Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.namaBulan} ${infoJawa.tahun} AJ</p>

            <div style="background:#f3e5f5; padding:12px; border-radius:8px; margin-top:10px;">
                <h4 style="margin:0; color:#4a148c;">🌟 Watak Neptu ${neptu}</h4>
                <p style="font-size:0.85rem; margin-top:5px;">${watakNeptu.watak}</p>
            </div>

            ${mangsaHtml}
            
            <div style="margin-top:15px; font-size:0.85rem; line-height:1.5;">
                <h4 style="color:#d30000; margin-bottom:5px;">🌸 Karakter Hari</h4>
                ${teksHari}
            </div>

            ${sriJatiHtml}
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// Navigasi
document.getElementById('prevMonth').addEventListener('click', () => { current.setMonth(current.getMonth() - 1); generateCalendar(); });
document.getElementById('nextMonth').addEventListener('click', () => { current.setMonth(current.getMonth() + 1); generateCalendar(); });

// Start
generateCalendar();
updateDetail(TODAY, getPasaran(TODAY));
