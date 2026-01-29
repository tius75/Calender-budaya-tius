/**
 * KALENDER MULTI-BUDAYA (JAWA & IMLEK)
 * Logic Integration by Tius
 */

// --- DATA REFERENSI ---
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const SHIO_LIST = ["Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing", "Monyet", "Ayam", "Anjing", "Babi"];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();
const TODAY = new Date();

// --- IMLEK ENGINE ---
function getLunarImlek(date) {
    // Referensi: 29 Jan 2025 adalah Imlek 2576 (Tahun Ular)
    const refDate = new Date(2025, 0, 29); 
    const diffTime = date.getTime() - refDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const LUNAR_CYCLE = 29.53059;
    
    let totalMonths = Math.floor(diffDays / LUNAR_CYCLE);
    let lDay = Math.floor(diffDays % LUNAR_CYCLE) + 1;
    let lMonth = (totalMonths % 12) + 1;
    let lYear = 2576 + Math.floor(totalMonths / 12);

    if (lDay > 30) { lDay = 1; lMonth++; }
    if (lDay <= 0) { lDay = 29; lMonth--; }
    if (lMonth > 12) { lMonth = 1; lYear++; }
    
    let shioIndex = (9 + (lYear - 2576)) % 12;
    if (shioIndex < 0) shioIndex += 12;

    return { tanggal: lDay, bulan: lMonth, tahun: lYear, shio: SHIO_LIST[shioIndex] };
}

// --- JAWA LOGIC (Simplified from your snippet) ---
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

// --- RENDER UI ---
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
        el.className = 'header-day' + (i === 0 ? ' sunday-red' : '');
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        const imlek = getLunarImlek(dateObj); // LOGIC IMLEK
        
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday-red');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `
            <div class="date-num">${d}</div>
            <div class="pasaran-text">${p}</div>
            <div class="imlek-num">${imlek.tanggal}</div>
        `;
        
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
            cell.classList.add('selected-day');
            updateDetail(dateObj, p);
        };
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('printableArea');
    const imlek = getLunarImlek(date);
    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const wuku = getWuku(date);

    detailDiv.innerHTML = `
        <div class="card-result" style="text-align:left; border:1px solid #ddd; padding:15px; border-radius:10px;">
            <h2 style="color:var(--primary); margin-top:0;">${h} ${pasaran}</h2>
            <p>📅 <strong>Masehi:</strong> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            
            <div style="background:#fff1f0; padding:10px; border-radius:8px; border:1px solid #ffa39e; margin:10px 0;">
                <p style="margin:0; color:#cf1322; font-weight:bold;">🧧 Penanggalan Imlek</p>
                <p style="margin:5px 0 0; font-size:14px;">Tahun ${imlek.tahun}, Bulan ${imlek.bulan}, Tanggal ${imlek.tanggal}</p>
                <p style="margin:2px 0 0; font-size:14px;"><strong>Shio:</strong> ${imlek.shio}</p>
            </div>

            <div style="background:#f0f7ff; padding:10px; border-radius:8px; border:1px solid #cfe2ff; margin:10px 0;">
                <p style="margin:0; color:#084298; font-weight:bold;">🌙 Penanggalan Jawa</p>
                <p style="margin:5px 0 0; font-size:14px;"><strong>Wuku:</strong> ${wuku}</p>
                <p style="margin:2px 0 0; font-size:14px;"><strong>Neptu:</strong> ${neptu}</p>
            </div>
            
            <p style="font-size:12px; color:#777; font-style:italic;">Data diupdate otomatis berdasarkan siklus astronomi.</p>
        </div>
    `;
}

function searchWeton() {
    const input = document.getElementById('dateInput');
    if (!input.value) return;
    const target = new Date(input.value);
    current = new Date(target.getFullYear(), target.getMonth(), 1);
    generateCalendar();
    updateDetail(target, getPasaran(target));
}

function shareWhatsApp() {
    const text = document.getElementById('printableArea').innerText;
    window.open(`https://wa.me/?text=${encodeURIComponent("*HASIL CEK KALENDER*\n" + text)}`);
}

// Navigasi
document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// Start
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    updateDetail(TODAY, getPasaran(TODAY));
});
