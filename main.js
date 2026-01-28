// Contoh Database Hari Libur Nasional 2026 (Bisa Anda tambah sendiri)
const HARI_LIBUR = {
    "2026-01-01": "Tahun Baru 2026",
    "2026-01-20": "Tahun Baru Imlek",
    "2026-02-15": "Isra Mi'raj",
    "2026-03-20": "Hari Raya Nyepi"
};

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const monthNav = document.getElementById('monthYearNav');
    grid.innerHTML = '';
    
    const y = current.getFullYear();
    const m = current.getMonth();
    
    // ... (kode header hari tetap sama) ...

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const dateString = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const p = getPasaran(dateObj);
        const libur = HARI_LIBUR[dateString];
        
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        
        // Cek jika hari Minggu
        if (dateObj.getDay() === 0) cell.classList.add('sunday');
        
        // Cek jika hari Libur Nasional
        if (libur) cell.classList.add('sunday'); 

        cell.innerHTML = `
            <div class="date-num">${d}</div>
            <div class="pasaran-text">${p}</div>
            ${libur ? `<div class="holiday-text">Libur</div>` : ''}
        `;

        // Kembalikan ke fungsi showDetail (bukan alert)
        cell.onclick = () => updateDetail(dateObj, p, libur);
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran, keteranganLibur) {
    const detailDiv = document.getElementById('detail');
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    // Logika Kalender Chinese
    const chineseDate = new Intl.DateTimeFormat('id-ID-u-ca-chinese', {
        day: 'numeric', month: 'long', year: 'numeric'
    }).format(date);

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result">
            <h3 style="color:#d30000;">${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()}</h3>
            <p><strong>Weton:</strong> ${HARI[date.getDay()]} ${pasaran}</p>
            <p><strong>Kalender Chinese:</strong> ${chineseDate}</p>
            ${keteranganLibur ? `<p style="color:red;"><strong>Keterangan:</strong> ${keteranganLibur}</p>` : ''}
            <hr>
            <p style="font-size:0.9rem; color:#666;">Silahkan klik tanggal lain untuk melihat detail weton dan ramalan.</p>
        </div>
    `;
    
    // Otomatis scroll ke bawah agar user tahu detail sudah muncul
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}
