const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

let current = new Date();
const TODAY = new Date();

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    
    // Validasi: Jika grid tidak ditemukan, hentikan fungsi agar tidak crash
    if (!grid) return; 

    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    if (mNav) mNav.innerText = `${namaBulan[m]} ${y}`;

    // 1. Render Header Hari
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day';
        if (i === 0) el.style.color = '#D30000';
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // 2. Render Padding Awal Bulan
    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement('div'));
    }

    // 3. Render Tanggal
    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        
        const cell = document.createElement('div');
        cell.className = 'calendar-day';

        // Penanda Minggu (Blok Merah Muda sesuai CSS Anda)
        if (dateObj.getDay() === 0) {
            cell.classList.add('sunday-block');
        }

        // Penanda Hari Ini (Highlight Kuning Emas sesuai CSS Anda)
        if (dateObj.toDateString() === TODAY.toDateString()) {
            cell.classList.add('today-highlight');
            // Langsung tampilkan detail hari ini
            updateDetail(dateObj, p);
        }

        cell.innerHTML = `
            <div class="date-num">${d}</div>
            <div class="pasaran-text">${p}</div>
        `;

        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result">
            <h3 style="color:#D30000; margin-bottom:10px;">Detail Weton</h3>
            <p><strong>Tanggal:</strong> ${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()}</p>
            <p><strong>Weton:</strong> ${HARI[date.getDay()]} ${pasaran}</p>
            <div class="info-section">
                <h4>Ramalan & Sifat</h4>
                <p>Data ramalan harian dan sifat wuku akan muncul di sini.</p>
            </div>
        </div>
    `;
    
    // Scroll halus ke arah detail jika di HP
    if (window.innerWidth < 600) {
        detailDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Navigasi
const btnPrev = document.getElementById('prevMonth');
const btnNext = document.getElementById('nextMonth');

if (btnPrev) btnPrev.onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
if (btnNext) btnNext.onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// Inisialisasi Pencarian
window.searchWeton = () => {
    const val = document.getElementById('dateInput').value;
    if (val) {
        const d = new Date(val);
        updateDetail(d, getPasaran(d));
    }
};

// Jalankan Fungsi
generateCalendar();
