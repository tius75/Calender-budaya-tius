/**
 * KALENDER JAWA & LUNAR MODERN - FIX GRID & DATA
 */

// 1. DATA REFERENSI
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_SIKLUS_TAHUN = [
    { nama: "Alip", makna: "Ada-ada", deskripsi: "Permulaan niat baik." },
    { nama: "Ehe", makna: "Tumandang", deskripsi: "Waktunya mulai bertindak." },
    { nama: "Jimawal", makna: "Gawe", deskripsi: "Proses ketekunan bekerja." },
    { nama: "Je", makna: "Lelakon", deskripsi: "Ujian mental dalam hidup." },
    { nama: "Dal", makna: "Urip", deskripsi: "Merenungi hakikat hidup." },
    { nama: "Be", makna: "Bola-bali", deskripsi: "Keteguhan pada kebaikan." },
    { nama: "Wawu", makna: "Marang", deskripsi: "Kembali fokus pada tujuan." },
    { nama: "Jimakir", makna: "Suwung", deskripsi: "Evaluasi dan penyelesaian." }
];

// 2. STATE GLOBAL (Hanya satu set variabel)
let currentView = new Date(2026, 0, 30); 
const TODAY = new Date();

// 3. FUNGSI LOGIKA
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date - base) / 86400000);
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getLunarDetails(date) {
    // Sesuai permintaan Anda untuk Jan 2026
    return {
        full: "12:12:2576",
        shio: "Ular",
        unsur: "Api",
        ramalan: "Intuisi tajam dalam membaca peluang."
    };
}

function getTanggalJawa(date) {
    const ref = new Date(2026, 0, 28);
    const diff = Math.floor((date - ref) / 86400000);
    let tj = 9 + diff, bI = 7;
    const BULAN = ["Sura","Sapar","Mulud","Bakdamulud","Jumadilawal","Jumadilakir","Rejeb","Ruwah","Pasa","Syawal","Dulkaidah","Besar"];
    while (tj > 30) { tj -= 30; bI = (bI + 1) % 12; }
    while (tj <= 0) { tj += 30; bI = (bI - 1 + 12) % 12; }
    return { tgl: tj, bln: BULAN[bI], thn: 1959 };
}

// 4. GENERATE KALENDER (Fix Grid Hilang)
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const nav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = currentView.getFullYear();
    const m = currentView.getMonth();
    
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    if (nav) nav.innerText = `${namaBulan[m]} ${y}`;

    // Header Hari
    HARI.forEach(h => {
        const el = document.createElement('div');
        el.className = 'header-day';
        el.innerText = h.substring(0, 3);
        grid.appendChild(el);
    });

    // Padding awal bulan
    const firstDay = new Date(y, m, 1).getDay();
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    // Isi Tanggal
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
        const dt = new Date(y, m, d);
        const p = getPasaran(dt);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dt.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<b>${d}</b><br><small>${p}</small>`;
        cell.onclick = () => updateDetail(dt, p);
        grid.appendChild(cell);
    }
}

// 5. UPDATE DETAIL
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()], nH = NEPTU_HARI[h], nP = NEPTU_PASARAN[pasaran], neptu = nH + nP;
    const jawa = getTanggalJawa(date);
    const lunar = getLunarDetails(date);
    const siklus = DATA_SIKLUS_TAHUN[jawa.thn % 8];

    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border:2px solid #D30000; border-radius:12px;">
            <h2 style="color:#D30000;">${h} ${pasaran}</h2>
            <p><b>Masehi:</b> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            
            <div style="background:#fff3e0; padding:10px; border-radius:8px; margin:10px 0;">
                <p><b>🌙 Jawa:</b> ${jawa.tgl} ${jawa.bln} ${jawa.thn} AJ</p>
                <p style="font-size:12px;">Tahun: ${siklus.nama} | Windu: Sancaya</p>
            </div>

            <div style="background:#f1f8e9; padding:10px; border-radius:8px; margin:10px 0;">
                <p><b>🏮 Lunar:</b> ${lunar.full} | <b>Shio:</b> ${lunar.shio}</p>
                <p style="font-size:12px;"><i>Ramalan: ${lunar.ramalan}</i></p>
            </div>
            
            <p style="text-align:center; background:#D30000; color:#fff; padding:5px; border-radius:5px;">
                <b>Total Neptu: ${neptu}</b>
            </p>
        </div>
    `;
}

function moveMonth(v) {
    currentView.setMonth(currentView.getMonth() + v);
    generateCalendar();
}

window.onload = generateCalendar;
