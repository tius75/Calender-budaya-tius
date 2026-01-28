import { HARI, PASARAN, NEPTU_HARI, NEPTU_PASARAN } from './constants.js';
import { getPasaran, getWuku } from './calendar-engine.js';

// Import Data Terpisah (Pastikan file ini ada di Github Anda)
import { DATA_WUKU } from './data-wuku.js';
import { DATA_SRIJATI } from './data-srijati.js';
// Tambahkan import untuk data Chinese jika ada

let current = new Date();

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const monthNav = document.getElementById('monthYearNav');
    if (!grid) return;

    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();

    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    monthNav.innerText = `${namaBulan[m]} ${y}`;

    // Header Nama Hari
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        if (i === 0) el.classList.add('sunday');
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // Padding awal bulan
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    // Loop Hari
    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj); // Ambil pasaran (Wage, Legi, dll)
        
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday');

        // Menampilkan Angka Tanggal + Nama Pasaran di bawahnya
        cell.innerHTML = `
            <span class="date-num">${d}</span>
            <span class="pasaran-text">${p}</span>
        `;

        cell.onclick = () => window.showDetail(dateObj);
        grid.appendChild(cell);
    }
}

// Inisialisasi Tombol Navigasi
document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// Jalankan saat pertama dimuat
generateCalendar();
