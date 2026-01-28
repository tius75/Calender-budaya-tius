import { HARI, PASARAN, NEPTU_HARI, NEPTU_PASARAN } from './constants.js';
import { getPasaran, getWuku } from './calendar-engine.js';
// Pastikan file data di bawah ini sudah Anda upload di Github
import { DATA_WUKU } from './data-wuku.js'; 
import { DATA_SRIJATI } from './data-srijati.js';

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

    // Render Nama Hari (Header)
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = i === 0 ? 'header-day sunday' : 'header-day';
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // Kolom kosong awal bulan
    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement('div'));
    }

    // Render Tanggal
    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday');

        // Menampilkan Angka Tanggal + Pasaran
        cell.innerHTML = `
            <div class="date-num">${d}</div>
            <div class="pasaran-text">${p}</div>
        `;

        cell.onclick = () => showDetail(dateObj);
        grid.appendChild(cell);
    }
}

// Fungsi Detail dengan Kalender Chinese
window.showDetail = function(date) {
    const h = HARI[date.getDay()];
    const p = getPasaran(date);
    const w = getWuku(date);
    const weton = `${h} ${p}`;
    
    // Logika Kalender Chinese Sederhana
    const chineseDate = new Intl.DateTimeFormat('id-ID-u-ca-chinese', {
        day: 'numeric', month: 'long', year: 'numeric'
    }).format(date);

    const detailDiv = document.getElementById('detail');
    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result">
            <h3>${weton}</h3>
            <p><strong>Wuku:</strong> ${w} | <strong>Chinese:</strong> ${chineseDate}</p>
            <div class="info-section">
                <h4>📜 Sifat Wuku ${w}</h4>
                <p>${DATA_WUKU[w] || 'Memuat data...'}</p>
            </div>
            <div class="info-section">
                <h4>✨ Ramalan Sri Jati</h4>
                <p>${DATA_SRIJATI[weton] || 'Memuat data...'}</p>
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
};

// Event Listener Navigasi
document.getElementById('prevMonth').addEventListener('click', () => {
    current.setMonth(current.getMonth() - 1);
    generateCalendar();
});
document.getElementById('nextMonth').addEventListener('click', () => {
    current.setMonth(current.getMonth() + 1);
    generateCalendar();
});

// Jalankan Pertama Kali
generateCalendar();
