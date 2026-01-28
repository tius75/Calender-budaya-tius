// ==========================================
// 1. DATA DASAR & KONFIGURASI
// ==========================================
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

const SHIO_LIST = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];

let current = new Date();
const TODAY = new Date();

// ==========================================
// 2. LOGIKA PERHITUNGAN (Internal)
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

// Logika Shio Akurat (Berdasarkan siklus tahunan)
function getShioDetail(date) {
    const year = date.getFullYear();
    // Shio berganti saat Imlek (sekitar Jan/Feb). 
    // Pendekatan sederhana: jika sebelum Feb, masih shio tahun sebelumnya (estimasi).
    const isEarlyYear = (date.getMonth() < 1) || (date.getMonth() === 1 && date.getDate() < 15);
    const shioIndex = isEarlyYear ? (year - 1) % 12 : year % 12;
    return {
        nama: SHIO_LIST[shioIndex],
        tahunLunar: year + 3760
    };
}

function getZodiak(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
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
// 3. RENDER KALENDER (Grid)
// ==========================================

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    
    if (mNav) mNav.innerText = `${["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][m]} ${y}`;

    // Header Hari
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
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div>`;
        
        // Memastikan Event Click berfungsi
        cell.addEventListener('click', () => {
            updateDetail(dateObj, p);
        });
        
        grid.appendChild(cell);
    }
}

// ==========================================
// 4. SHOW DETAIL (Tampilan Lengkap)
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const shioInfo = getShioDetail(date);
    const zodiak = getZodiak(date);
    const nasib5 = DATA_PEMBAGI_5[neptu % 5];
    const nasib4 = ["Asat", "Gunung", "Guntur", "Segoro"][neptu % 4];

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="pdf-area" style="background:#fff; padding:20px; border-radius:15px; border:2px solid #D30000; color:#000;">
            <h2 style="color:#D30000; margin-bottom:10px;">${h} ${pasaran}</h2>
            <div style="font-size:0.9rem; margin-bottom:15px;">
                <p><strong>Masehi:</strong> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                <p><strong>Lunar/Imlek:</strong> Tahun ${shioInfo.tahunLunar} (Shio ${shioInfo.nama})</p>
                <p><strong>Zodiak:</strong> ${zodiak}</p>
            </div>

            <div style="background:#e8f5e9; padding:10px; border-radius:8px; border-left:5px solid #2e7d32; margin-bottom:10px;">
                <h4 style="margin:0;">💎 Nasib Pembagi 5: ${nasib5.nama}</h4>
                <p style="font-size:0.8rem; margin:5px 0 0;">${nasib5.arti}</p>
            </div>

            <div style="background:#fff3e0; padding:10px; border-radius:8px; border-left:5px solid #ef6c00; margin-bottom:10px;">
                <h4 style="margin:0;">🪦 Nasib Kematian: ${nasib4}</h4>
                <p style="font-size:0.8rem; margin:5px 0 0;">Neptu ${neptu} jatuh pada hitungan ${nasib4}.</p>
            </div>
            
            <p style="font-size:0.8rem; color:#666;">*Detail Wuku dan Mangsa akan muncul otomatis jika file data-wuku.js dan data-mangsa.js sudah dimuat.</p>
        </div>
    `;
    
    // Auto-scroll ke detail
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 5. INISIALISASI
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
