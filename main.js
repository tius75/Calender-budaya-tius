// ==========================================
// 1. KONSTRUKTOR DATA & SAFETY
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();
const TODAY = new Date();

// ==========================================
// 2. LOGIKA KALENDER (Perbaikan Grid)
// ==========================================
function generateCalendar() {
    // 1. Cari elemen atau buat otomatis jika hilang
    let grid = document.getElementById('calendar');
    let mNav = document.getElementById('monthYearNav');
    
    if (!grid) {
        console.error("ID 'calendar' tidak ditemukan di HTML. Mencoba mencari div utama...");
        grid = document.querySelector('.calendar-grid') || document.body.appendChild(document.createElement('div'));
        grid.id = 'calendar';
    }

    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    
    if (mNav) {
        const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        mNav.innerText = `${namaBulan[m]} ${y}`;
    }

    // 2. Render Header Hari (Minggu - Sabtu)
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day' + (i === 0 ? ' sunday' : '');
        el.style.fontWeight = 'bold';
        el.style.textAlign = 'center';
        grid.appendChild(el);
    });

    // 3. Hitung Posisi Tanggal
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // Kolom Kosong Awal Bulan
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        grid.appendChild(empty);
    }

    // 4. Render Angka Tanggal
    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        
        // Styling dasar jika CSS belum termuat
        cell.style.cursor = 'pointer';
        cell.style.padding = '5px';
        cell.style.border = '1px solid #eee';

        if (dateObj.getDay() === 0) cell.classList.add('sunday-block');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text" style="font-size:10px;">${p}</div>`;
        
        cell.onclick = () => {
            // Hapus highlight lama, tambah ke yang baru
            document.querySelectorAll('.calendar-day').forEach(c => c.style.background = '');
            cell.style.background = '#fff9c4';
            updateDetail(dateObj, p);
        };
        
        grid.appendChild(cell);
    }
}

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

// ==========================================
// 3. RENDER DETAIL (Integrasi Lengkap)
// ==========================================
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    
    // Data Pendukung (Safety Check)
    const shioList = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    const shio = shioList[date.getFullYear() % 12];
    const wuku = (typeof getWuku === 'function') ? getWuku(date) : "Data Wuku Kosong";

    detailDiv.innerHTML = `
        <div id="pdf-container" style="background:#fff; padding:20px; border-radius:12px; border:2px solid #D30000; color:#000;">
            <h2 style="color:#D30000; margin-top:0;">${h} ${pasaran}</h2>
            <p><strong>Masehi:</strong> ${date.toLocaleDateString('id-ID')}</p>
            <p><strong>Lunar:</strong> ${date.getFullYear() + 3760} (Shio ${shio})</p>
            <hr>
            <p><strong>Neptu:</strong> ${neptu} | <strong>Wuku:</strong> ${wuku}</p>
            <div style="background:#f9f9f9; padding:10px; border-radius:8px; margin-top:10px;">
                <p><strong>Pembagi 4 (Kematian):</strong> ${neptu % 4 === 1 ? "Gunung" : neptu % 4 === 2 ? "Guntur" : neptu % 4 === 3 ? "Segoro" : "Asat"}</p>
            </div>
        </div>
    `;
}

// ==========================================
// 4. INISIALISASI
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    // Navigasi
    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    if(prev) prev.onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    if(next) next.onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
