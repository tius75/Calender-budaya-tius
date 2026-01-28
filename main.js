const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

let current = new Date();
const today = new Date(); // Untuk penanda hari ini

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    const mTxt = document.getElementById('monthYearText');
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    mNav.innerText = `${namaBulan[m]} ${y}`;
    if(mTxt) mTxt.innerText = `${namaBulan[m]} ${y}`;

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

        // Penanda Hari Minggu
        if (dateObj.getDay() === 0) cell.classList.add('sunday-block');

        // Penanda Hari Ini (Today)
        if (dateObj.toDateString() === today.toDateString()) {
            cell.classList.add('today-highlight');
        }

        cell.innerHTML = `
            <div class="date-num">${d}</div>
            <div class="pasaran-text">${p}</div>
        `;

        // Pastikan TIDAK menggunakan alert()
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div class="card-result">
            <h3 style="color:#d30000; margin-bottom:10px; border-bottom:2px solid #eee;">Detail Weton</h3>
            <p><strong>Tanggal:</strong> ${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()}</p>
            <p><strong>Weton:</strong> ${HARI[date.getDay()]} ${pasaran}</p>
            <hr style="margin:10px 0; border:0; border-top:1px dashed #ccc;">
            <p style="font-size:0.85rem; color:#666;">Data ramalan lainnya akan dimuat dari file data terpisah.</p>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

window.searchWeton = () => {
    const val = document.getElementById('dateInput').value;
    if(val) {
        const d = new Date(val);
        updateDetail(d, getPasaran(d));
    }
};

document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

generateCalendar();
