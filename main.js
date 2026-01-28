// ==========================================
// DATA INTERNAL (Mencegah Error File Eksternal)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_PEMBAGI_5 = {
    1: { nama: "Sri", arti: "Murah rejeki. Rejeki datang dari mana saja." },
    2: { nama: "Lungguh", arti: "Kecukupan dalam perjalanan hidup." },
    3: { nama: "Gendhong", arti: "Mapan dalam segala hal yang berkaitan dengan lahiriah." },
    4: { nama: "Loro", arti: "Sakit-sakitan atau perjalanan hidup yang sering gagal." },
    0: { nama: "Pati", arti: "Apapun yang dilakukan selalu gagal dan mendapatkan jalan buntu." }
};

const NASIB_AHLI_WARIS = {
    1: { nama: "Gunung", arti: "Kehidupan yang mulia bagi ahli waris." },
    2: { nama: "Guntur", arti: "Ahli waris akan mendapatkan kesulitan." },
    3: { nama: "Segoro", arti: "Kemudahan dalam mencari rezeki." },
    0: { nama: "Asat", arti: "Kesulitan dalam mendapatkan rezeki." }
};

const DATA_BULAN_JAWA = [
    { nama: "Sura", naas: [6, 11, 13, 14, 17, 18, 27], taliWangke: "Rabu Pahing" },
    { nama: "Sapar", naas: [1, 10, 12, 20, 22], taliWangke: "Kamis Pon" },
    { nama: "Mulud", naas: [1, 3, 8, 10, 13, 15, 20, 23], taliWangke: "Jumat Wage" },
    { nama: "Bakdamulud", naas: [10, 15, 16, 20, 25, 28], taliWangke: "Sabtu Kliwon" },
    { nama: "Jumadilawal", naas: [1, 5, 10, 11, 16, 26, 28], taliWangke: "Senin Kliwon" },
    { nama: "Jumadilakir", naas: [4, 10, 11, 14, 18, 21], taliWangke: "Selasa Legi" },
    { nama: "Rejeb", naas: [2, 11, 12, 13, 14, 18, 22, 27], taliWangke: "Rabu Pahing" },
    { nama: "Ruwah", naas: [4, 12, 13, 19, 24, 26, 28], taliWangke: "Kamis Pon" },
    { nama: "Pasa", naas: [7, 9, 10, 15, 20, 21, 24, 25], taliWangke: "Jumat Wage" },
    { nama: "Syawal", naas: [2, 10, 17, 20, 27], taliWangke: "Sabtu Kliwon" },
    { nama: "Dulkaidah", naas: [2, 6, 11, 12, 13, 21, 22, 24, 28], taliWangke: "Senin Kliwon" },
    { nama: "Besar", naas: [1, 6, 10, 13, 20, 23, 25], taliWangke: "Selasa Wage" }
];

let current = new Date();
const TODAY = new Date();

// ==========================================
// FUNGSI LOGIKA (Tetap Stabil)
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
    let idx = (20 + Math.floor(diffDays / 7)) % 30;
    return wukuList[idx < 0 ? idx + 30 : idx];
}

function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let tglJawa = 9 + diffDays;
    let bulanIdx = 7; 
    let tahunJawa = 1959;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; if (bulanIdx === 0) tahunJawa++; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; if (bulanIdx === 11) tahunJawa--; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: tahunJawa };
}

// ==========================================
// CORE RENDERER (Pencegah Grid Hilang)
// ==========================================
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid || !mNav) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    mNav.innerText = `${namaBulan[m]} ${y}`;

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
    const wetonKey = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const wukuName = getWuku(date);
    const infoJawa = getTanggalJawa(date);
    const nasib5 = DATA_PEMBAGI_5[neptu % 5];
    const nasibMati = NASIB_AHLI_WARIS[neptu % 4];

    // --- PROTEKSI DATA EKSTERNAL ---
    const watakNeptu = (typeof DATA_WATAK_NEPTU !== 'undefined' && DATA_WATAK_NEPTU[neptu]) ? DATA_WATAK_NEPTU[neptu].watak : "Data watak tidak tersedia.";
    const teksWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wukuName] || "Detail wuku kosong.") : "Data wuku tidak terbaca.";
    const teksHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[wetonKey] || "Data hari kosong.") : "Data hari tidak terbaca.";
    const dataSriJati = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];

    // Cek Naas
    const isNaas = infoJawa.bulan.naas.includes(infoJawa.tanggal);
    const warningNaas = isNaas ? `<div style="background:#ffebee; color:#c62828; padding:10px; border-radius:8px; margin-bottom:15px; border-left:5px solid #d32f2f;">⚠️ <strong>Hari Naas:</strong> Jangan mengadakan hajatan.</div>` : "";

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #ddd; color:#000;">
            ${warningNaas}
            <h2 style="color:#D30000; margin-top:0;">${wetonKey}</h2>
            <p><strong>Masehi:</strong> ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}</p>
            <p><strong>Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            
            <div style="background:#e8f5e9; padding:12px; border-radius:8px; margin:15px 0; border-left:5px solid #2e7d32;">
                <h4 style="margin:0; color:#1b5e20;">💎 Nasib Pembagi 5: ${nasib5.nama}</h4>
                <p style="font-size:0.85rem; margin:5px 0 0;">${nasib5.arti}</p>
            </div>

            <p><strong>Neptu:</strong> ${neptu} | <strong>Wuku:</strong> ${wukuName}</p>
            
            <div style="margin:15px 0; padding:12px; background:#f3e5f5; border-radius:8px;">
                <h4 style="margin:0; color:#4a148c;">🌟 Watak Neptu</h4>
                <p style="font-size:0.85rem; margin:5px 0 0;">${watakNeptu}</p>
            </div>

            <div style="margin:15px 0; padding:10px; background:#fffcf0; border-left:4px solid #f1c40f;">
                <h4 style="margin:0; color:#856404;">🪦 Nasib Kematian: ${nasibMati.nama}</h4>
                <p style="font-size:0.85rem; margin:5px 0 0;">${nasibMati.arti}</p>
            </div>

            <h4 style="color:#D30000; border-bottom:1px solid #eee;">🌸 Karakter Hari</h4>
            <div style="font-size:0.85rem;">${teksHari}</div>

            <h4 style="color:#D30000; border-bottom:1px solid #eee; margin-top:15px;">🛡️ Analisis Wuku</h4>
            <div style="font-size:0.85rem;">${teksWuku}</div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// Event Listeners
document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// Start App
generateCalendar();
updateDetail(TODAY, getPasaran(TODAY));
