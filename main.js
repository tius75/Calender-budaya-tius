function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    grid.innerHTML = '';
    
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    mNav.innerText = `${namaBulan[m]} ${y}`;

    // Header Hari
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = i === 0 ? 'header-day sunday' : 'header-day';
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const hariIni = new Date(); // Ambil tanggal hari ini

    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        
        const cell = document.createElement('div');
        cell.className = 'calendar-day';

        // 1. LOGIKA PENANDA HARI INI (Warna Emas/Kuning)
        if (dateObj.toDateString() === hariIni.toDateString()) {
            cell.classList.add('today-highlight');
            // OTOMATIS TAMPILKAN DETAIL HARI INI SAAT LOAD
            updateDetail(dateObj, p);
        }

        // 2. LOGIKA MINGGU (Blok Merah Muda)
        if (dateObj.getDay() === 0) {
            cell.classList.add('sunday-block');
        }

        cell.innerHTML = `
            <div class="date-num">${d}</div>
            <div class="pasaran-text">${p}</div>
        `;

        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}
