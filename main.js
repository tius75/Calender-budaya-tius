// Impor database tabel rejeki dari file terpisah
import { TABEL_SRIJATI } from './data-srijati.js';

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

// Definisi Neptu untuk perhitungan Sri Jati
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();
const TODAY = new Date();

// --- Fungsi Pendukung ---
function getPasaran(date) {
    const base = new Date(1900, 0, 1); // Patokan 1 Jan 1900 adalah Senin Pahing
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

// --- Fungsi Render Kalender ---
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;

    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    mNav.innerText = `${namaBulan[m]} ${y}`;

    // Render Header Hari
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day';
        if (i === 0) el.style.color = '#D30000';
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

// --- Fungsi Detail & Ramalan Sri Jati ---
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()];
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    // Hitung Neptu
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    
    // Ambil data Sri Jati dari module yang di-import
    const dataRejeki = TABEL_SRIJATI[neptu] || [];
    
    let tabelHtml = `
        <table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.85rem; border: 1px solid #ddd;">
            <thead>
                <tr style="background:#f8f8f8;">
                    <th style="border:1px solid #ddd; padding:8px;">Usia</th>
                    <th style="border:1px solid #ddd; padding:8px;">Nilai</th>
                    <th style="border:1px solid #ddd; padding:8px;">Nasib</th>
                </tr>
            </thead>
            <tbody>`;

    dataRejeki.forEach(item => {
        tabelHtml += `
            <tr>
                <td style="border:1px solid #ddd; padding:8px; text-align:center;">${item.usia}</td>
                <td style="border:1px solid #ddd; padding:8px; text-align:center; font-weight:bold; color:#D30000;">${item.nilai}</td>
                <td style="border:1px solid #ddd; padding:8px;">${item.ket}</td>
            </tr>`;
    });
    tabelHtml += `</tbody></table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result">
            <h3 style="color:#D30000; margin-bottom:5px;">Detail Weton & Sri Jati</h3>
            <p style="font-size:0.9rem;"><strong>Tanggal:</strong> ${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()}</p>
            <p style="font-size:0.9rem;"><strong>Weton:</strong> ${h} ${pasaran} (Neptu: ${neptu})</p>
            
            <div class="info-section">
                <h4 style="color:#D30000; margin-top:15px; border-bottom: 1px solid #eee; padding-bottom:5px;">📈 Siklus Rejeki (Pal Sriti)</h4>
                ${dataRejeki.length > 0 ? tabelHtml : "<p style='font-style:italic; color:#666;'>Data untuk Neptu ini sedang diproses...</p>"}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// --- Fungsi Cari Weton & Pindah View ---
window.searchWeton = () => {
    const val = document.getElementById('dateInput').value;
    if (val) {
        const targetDate = new Date(val);
        // Validasi jika tanggal valid
        if (!isNaN(targetDate.getTime())) {
            // Pindahkan tampilan kalender ke bulan dan tahun tersebut
            current = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
            generateCalendar();
            
            // Tampilkan detailnya
            updateDetail(targetDate, getPasaran(targetDate));
        }
    }
};

// --- Event Navigasi ---
document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// --- Inisialisasi ---
generateCalendar();
// Tampilkan detail hari ini secara otomatis saat pertama buka
updateDetail(TODAY, getPasaran(TODAY));
