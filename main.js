// Impor database ramalan di bagian paling atas
import { DATA_SRIJATI } from './data-srijati.js';

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
let current = new Date();
const TODAY = new Date();

// --- Fungsi Pendukung ---
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

// --- Fungsi Render Utama ---
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

// --- Fungsi Detail & Ramalan ---
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const hari = HARI[date.getDay()];
    const wetonKey = `${hari} ${pasaran}`;
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    // Ambil ramalan dari file terpisah
    const ramalanText = DATA_SRIJATI[wetonKey] || "Data ramalan untuk weton ini belum tersedia dalam database.";

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result">
            <h3 style="color:#D30000; margin-bottom:10px;">Detail Weton</h3>
            <p><strong>Tanggal:</strong> ${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()}</p>
            <p><strong>Weton:</strong> ${wetonKey}</p>
            <div class="info-section">
                <h4 style="color:#D30000; margin-top:10px;">✨ Ramalan Sri Jati</h4>
                <p style="font-size:0.9rem; line-height:1.4;">${ramalanText}</p>
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// --- Perbaikan Fungsi Cari Weton (Agar View Berpindah) ---
window.searchWeton = () => {
    const val = document.getElementById('dateInput').value;
    if (val) {
        const targetDate = new Date(val);
        // KUNCI: Pindahkan variabel 'current' ke tanggal yang dicari
        current = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
        
        // Render ulang kalender pada bulan tersebut
        generateCalendar();
        
        // Tampilkan detail untuk tanggal spesifik tersebut
        updateDetail(targetDate, getPasaran(targetDate));
    }
};

// Event Navigasi
document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// Inisialisasi awal
generateCalendar();
// Otomatis tampilkan detail hari ini
updateDetail(TODAY, getPasaran(TODAY));

import { TABEL_SRIJATI } from './data-srijati.js';

// Fungsi untuk mencari Weton & Pindah Bulan
window.searchWeton = () => {
    const inputDate = document.getElementById('dateInput').value;
    if (!inputDate) return;

    const targetDate = new Date(inputDate);
    
    // KUNCI: Pindahkan kalender ke bulan & tahun yang dicari
    current = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    generateCalendar(); 

    // Tampilkan Detail
    const p = getPasaran(targetDate);
    updateDetail(targetDate, p);
};

function updateDetail(date, pasaran) {
    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const detailDiv = document.getElementById('detail');

    // Ambil data Sri Jati berdasarkan Neptu
    const dataRejeki = TABEL_SRIJATI[neptu] || [];
    
    let tabelHtml = `
        <table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.85rem;">
            <tr style="background:#eee;">
                <th style="border:1px solid #ddd; padding:5px;">Usia</th>
                <th style="border:1px solid #ddd; padding:5px;">Nilai</th>
                <th style="border:1px solid #ddd; padding:5px;">Nasib</th>
            </tr>`;

    dataRejeki.forEach(item => {
        tabelHtml += `
            <tr>
                <td style="border:1px solid #ddd; padding:5px; text-align:center;">${item.usia}</td>
                <td style="border:1px solid #ddd; padding:5px; text-align:center; font-weight:bold; color:red;">${item.nilai}</td>
                <td style="border:1px solid #ddd; padding:5px;">${item.ket}</td>
            </tr>`;
    });
    tabelHtml += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result">
            <h3 style="color:var(--primary);">Analisis Neptu ${neptu}</h3>
            <p><strong>Weton:</strong> ${h} ${pasaran}</p>
            <div class="info-section">
                <h4>📈 Siklus Rejeki (Sri Jati)</h4>
                ${dataRejeki.length > 0 ? tabelHtml : "<p>Data neptu ini belum lengkap.</p>"}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

