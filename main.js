// Database Sederhana (Agar tidak error saat file lain belum siap)
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

let current = new Date();

// Rumus Pasaran Akurat
function getPasaran(date) {
    const base = new Date(1900, 0, 1); // Senin Pahing
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

// Fungsi Render Kalender
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const monthNav = document.getElementById('monthYearNav');
    
    if (!grid) return; // Mencegah error jika id tidak ditemukan

    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    monthNav.innerText = `${namaBulan[m]} ${y}`;

    // Header Hari
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = i === 0 ? 'header-day sunday' : 'header-day';
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
        if (dateObj.getDay() === 0) cell.classList.add('sunday');

        cell.innerHTML = `
            <div class="date-num">${d}</div>
            <div class="pasaran-text">${p}</div>
        `;

        cell.onclick = () => alert(`Tanggal: ${d} ${namaBulan[m]}, Pasaran: ${p}`);
        grid.appendChild(cell);
    }
}

// Navigasi
document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// Jalankan
generateCalendar();
