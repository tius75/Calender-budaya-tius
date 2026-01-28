// ==========================================
// KONSTANTA & DATA DASAR
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();
const TODAY = new Date();

// ==========================================
// FUNGSI LOGIKA (Dipanggil oleh UI)
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
// RENDER KALENDER
// ==========================================

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
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

    // Data Lokal Pembagi 5 & Ahli Waris
    const PEMBAGI_5 = {
        1: { n: "Sri", a: "Murah rejeki (Rejeki datang dari mana saja)" },
        2: { n: "Lungguh", a: "Kecukupan dalam perjalanan hidup" },
        3: { n: "Gendhong", a: "Mapan dalam segala hal lahiriah" },
        4: { n: "Loro", a: "Sakit-sakitan (fisik/batin) atau sering gagal usaha" },
        0: { n: "Pati", a: "Apapun yang dilakukan selalu gagal/jalan buntu" }
    };

    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const infoJawa = getTanggalJawa(date);
    const nasib5 = PEMBAGI_5[neptu % 5];
    
    // Safety check data eksternal (agar grid tidak hilang jika file luar error)
    const watakNeptu = (typeof DATA_WATAK_NEPTU !== 'undefined') ? DATA_WATAK_NEPTU[neptu] : null;
    const teksHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[`${h} ${pasaran}`] || "") : "";

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div style="background:#fff; padding:15px; border-radius:10px; border:1px solid #ddd; color:#333;">
            <h2 style="color:#d30000; margin:0;">${h} ${pasaran}</h2>
            <p style="margin:5px 0;">Neptu: <strong>${neptu}</strong></p>
            
            <div style="background:#e8f5e9; padding:10px; border-radius:8px; margin:10px 0; border-left:5px solid #2e7d32;">
                <h4 style="margin:0; color:#1b5e20;">💎 Nasib: ${nasib5.n}</h4>
                <p style="margin:5px 0 0; font-size:0.85rem;">${nasib5.a}</p>
            </div>

            ${watakNeptu ? `<div style="background:#f3e5f5; padding:10px; border-radius:8px; margin-bottom:10px;">
                <h4 style="margin:0;">🌟 Watak Neptu</h4>
                <p style="margin:5px 0 0; font-size:0.85rem;">${watakNeptu.watak}</p>
            </div>` : ""}

            <div style="margin-top:10px; font-size:0.9rem; line-height:1.4;">
                <p><strong>Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
                <p>${teksHari}</p>
            </div>
        </div>
    `;
}

// Navigasi
document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// Jalankan saat pertama load
generateCalendar();
updateDetail(TODAY, getPasaran(TODAY));
