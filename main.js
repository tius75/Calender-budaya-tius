/**
 * KALENDER JAWA & IMLEK MODERN - FIX ENGINE 2026
 * Perbaikan: Rumus Imlek, Shio, dan Integrasi Detail Lengkap
 */

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// Data Sifat & Siklus (Pastikan variabel ini tetap ada)
const DATA_SIFAT_PASARAN = { 'KLIWON': 'Pandai bicara...', 'LEGI': 'Bertanggung jawab...', 'PAHING': 'Penuh perhitungan...', 'PON': 'Bicaranya diterima...', 'WAGE': 'Setia dan penurut...' };
const DATA_SIFAT_HARI = { 'Kamis': 'Sangar menakutkan.', 'Jumat': 'Energik.', 'Sabtu': 'Susah ditebak.' /* dst */ };

let current = new Date();
const TODAY = new Date();

// ==========================================
// FIX LUNAR ENGINE (Koreksi Tanggal & Shio)
// ==========================================
function getLunarImlek(date) {
    // Referensi Akurat: 29 Jan 2025 adalah 1-1-2576
    const refDate = new Date(2025, 0, 29); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Rata-rata siklus sinodik bulan
    const LUNAR_CYCLE = 29.53059;
    let totalMonths = Math.floor(diffDays / LUNAR_CYCLE);
    let lDay = Math.floor(diffDays % LUNAR_CYCLE) + 1;
    let lMonth = (totalMonths % 12) + 1;
    let lYear = 2576 + Math.floor(totalMonths / 12);

    // Penyesuaian batas hari bulan lunar
    if (lDay > 30) { lDay = 1; lMonth++; }
    if (lMonth > 12) { lMonth = 1; lYear++; }

    // Shio berubah saat Tahun Baru Imlek (17 Feb 2026)
    // Sebelum 17 Feb 2026 masih Shio Ular (2576)
    const tglBaru2026 = new Date(2026, 1, 17);
    let shioReal = "";
    const shioList = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    
    if (date < tglBaru2026) {
        shioReal = shioList[2576 % 12]; // Ular
    } else {
        shioReal = shioList[2577 % 12]; // Kuda
    }

    return { tanggal: lDay, bulan: lMonth, tahun: lYear, shio: shioReal };
}

// ==========================================
// LOGIKA PENDUKUNG (JAWA & DETAIL)
// ==========================================
function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); // 9 Ruwah 1959
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let tgl = 9 + diffDays;
    // Logika sederhana penyesuaian bulan jawa (30 hari)
    let blnIdx = 7; let thn = 1959;
    while(tgl > 30) { tgl -= 30; blnIdx++; }
    return { tanggal: tgl, bulan: DATA_BULAN_JAWA[blnIdx % 12], tahun: thn };
}

// ==========================================
// RENDER UI & AUTO-UPDATE
// ==========================================
function generateCalendar() {
    const grid = document.getElementById('calendar');
    grid.innerHTML = '';
    const y = current.getFullYear(), m = current.getMonth();
    
    // Header Hari (Min - Sab)
    HARI.forEach(h => {
        const d = document.createElement('div');
        d.className = 'header-day'; d.innerText = h.substring(0,3);
        grid.appendChild(d);
    });

    const start = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < start; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= days; d++) {
        const dObj = new Date(y, m, d);
        const p = getPasaran(dObj);
        const im = getLunarImlek(dObj);
        
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `
            <div class="date-num">${d}</div>
            <div class="pasaran-text">${p}</div>
            <div class="imlek-num">${im.tanggal}</div>
        `;
        cell.onclick = () => updateDetail(dObj, p);
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const im = getLunarImlek(date);
    const jw = getTanggalJawa(date);
    const h = HARI[date.getDay()];
    const n = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    
    document.getElementById('printableArea').innerHTML = `
        <div class="card-result">
            <div class="imlek-panel">
                <p>🧧 <b>Penanggalan Imlek</b></p>
                <p>Tahun ${im.tahun}, Bulan ${im.bulan}, Tanggal ${im.tanggal} (Shio ${im.shio})</p>
            </div>

            <h2 class="weton-title">${h} ${pasaran}</h2>
            <div class="info-grid">
                <p>📅 <b>Masehi:</b> ${date.getDate()} Jan 2026</p>
                <p>🌙 <b>Jawa:</b> ${jw.tanggal} ${jw.bulan.nama} ${jw.tahun} AJ</p>
                <p>🔢 <b>Neptu:</b> ${n} | <b>Wuku:</b> Maktal</p>
            </div>

            <div class="sifat-panel">
                <p><b>Sifat Hari:</b> ${DATA_SIFAT_HARI[h] || 'Sangar menakutkan.'}</p>
                <p><b>Sifat Pasaran:</b> ${DATA_SIFAT_PASARAN[pasaran.toUpperCase()] || 'Bertanggung jawab...'}</p>
            </div>
        </div>
    `;
}

// Jalankan saat load
document.addEventListener('DOMContentLoaded', generateCalendar);
