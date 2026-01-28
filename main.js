const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_PEMBAGI_5 = {
    1: { nama: "Sri", arti: "Murah rejeki, makmur." },
    2: { nama: "Lungguh", arti: "Mendapat kedudukan/pangkat." },
    3: { nama: "Gendhong", arti: "Mapan dan dihargai." },
    4: { nama: "Loro", arti: "Sakit-sakitan atau rintangan." },
    0: { nama: "Pati", arti: "Sering menemui jalan buntu." }
};

let current = new Date();
const TODAY = new Date();

// ==========================================
// 1. LOGIKA PERHITUNGAN
// ==========================================
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getShioDetail(date) {
    const SHIO_LIST = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    const year = date.getFullYear();
    // Pergantian Shio Imlek (sederhana)
    const shioIndex = (date.getMonth() < 1 || (date.getMonth() === 1 && date.getDate() < 29)) ? (year - 1) % 12 : year % 12;
    return { nama: SHIO_LIST[shioIndex], tahunLunar: year + 3760 };
}

function getZodiak(date) {
    const d = date.getDate(); const m = date.getMonth() + 1;
    if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return "Aries";
    if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return "Taurus";
    if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) return "Gemini";
    if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) return "Cancer";
    if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return "Leo";
    if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return "Virgo";
    if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) return "Libra";
    if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) return "Scorpio";
    if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) return "Sagittarius";
    if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) return "Capricorn";
    if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return "Aquarius";
    return "Pisces";
}

// ==========================================
// 2. RENDER KALENDER (Grid & Warna Merah)
// ==========================================
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    if (mNav) mNav.innerText = `${["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][m]} ${y}`;

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
        
        // Warna Merah Hari Minggu & Penanda Hari Ini
        if (dateObj.getDay() === 0) cell.classList.add('sunday-text'); // Tambahkan class sunday-text
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div>`;
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
            cell.classList.add('selected-day');
            updateDetail(dateObj, p);
        };
        grid.appendChild(cell);
    }
}

// ==========================================
// 3. SHOW DETAIL LENGKAP (Data Balik Lagi)
// ==========================================
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const shioInfo = getShioDetail(date);
    const zodiak = getZodiak(date);
    
    // Ambil data dari file eksternal (jika ada)
    const wuku = (typeof getWuku === 'function') ? getWuku(date) : "Sinta";
    const infoJawa = (typeof getTanggalJawa === 'function') ? getTanggalJawa(date) : {tanggal: date.getDate(), bulan:{nama:"-"}, tahun:"-"};
    const watakNeptu = (typeof DATA_WATAK_NEPTU !== 'undefined') ? (DATA_WATAK_NEPTU[neptu]?.watak || "Data tidak tersedia.") : "Data watak tidak tersedia.";
    const karakterHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[wetonKey] || "Data karakter tidak tersedia.") : "Data karakter tidak tersedia.";
    const analisisWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wuku] || "Analisis wuku tidak tersedia.") : "Analisis wuku tidak tersedia.";
    const nasib5 = DATA_PEMBAGI_5[neptu % 5];
    const nasib4 = ["Asat", "Gunung", "Guntur", "Segoro"][neptu % 4];

    detailDiv.innerHTML = `
        <div id="pdf-area" style="background:#fff; padding:20px; border-radius:15px; border:1px solid #ddd; color:#000;">
            <h2 style="color:#D30000; margin-bottom:5px;">${wetonKey}</h2>
            <div style="font-size:0.85rem; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                <p><strong>Masehi:</strong> ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}</p>
                <p><strong>Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
                <p><strong>Lunar:</strong> ${shioInfo.tahunLunar} (Shio ${shioInfo.nama}) | <strong>Zodiak:</strong> ${zodiak}</p>
            </div>

            <div style="background:#e8f5e9; padding:10px; border-radius:8px; border-left:5px solid #2e7d32; margin-bottom:10px;">
                <h4 style="margin:0; color:#1b5e20;">💎 Nasib Pembagi 5: ${nasib5.nama}</h4>
                <p style="font-size:0.8rem; margin:5px 0 0;">${nasib5.arti}</p>
            </div>

            <p><strong>Neptu:</strong> ${neptu} | <strong>Wuku:</strong> ${wuku}</p>

            <div style="background:#f3e5f5; padding:10px; border-radius:8px; margin:10px 0;">
                <h4 style="margin:0; color:#4a148c;">🌟 Watak Neptu</h4>
                <p style="font-size:0.8rem; margin:5px 0 0;">${watakNeptu}</p>
            </div>

            <div style="background:#fff3e0; padding:10px; border-radius:8px; border-left:5px solid #ef6c00; margin-bottom:10px;">
                <h4 style="margin:0; color:#e65100;">🪦 Nasib Kematian: ${nasib4}</h4>
                <p style="font-size:0.8rem; margin:5px 0 0;">Neptu ${neptu} jatuh pada hitungan ${nasib4}.</p>
            </div>

            <h4 style="color:#D30000; border-bottom:1px solid #eee; margin-top:15px;">🌸 Karakter Hari</h4>
            <p style="font-size:0.8rem; line-height:1.4;">${karakterHari}</p>

            <h4 style="color:#D30000; border-bottom:1px solid #eee; margin-top:15px;">🛡️ Analisis Wuku</h4>
            <div style="font-size:0.8rem; line-height:1.4;">${analisisWuku}</div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
