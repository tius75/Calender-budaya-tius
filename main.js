// Data Dasar
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const HARI_NAMA = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();

// 1. Fungsi Hitung Pasaran
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

// 2. Fungsi Tampilkan Detail (Dipanggil saat klik)
function showDetail(tgl, bln, thn) {
    const date = new Date(thn, bln, tgl);
    const h = HARI_NAMA[date.getDay()];
    const p = getPasaran(date);
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[p];
    
    // Arah Meditasi
    const arahMap = {7:"Barat", 8:"Utara", 9:"Timur", 10:"Selatan", 11:"Barat", 12:"Utara", 13:"Timur", 14:"Selatan", 15:"Barat", 16:"Utara", 17:"Timur", 18:"Selatan"};
    const arah = arahMap[neptu] || "Tengah";

    // Kamarokam (Pembagi 6)
    const kamarData = [
        { n: "NUJU PATI", w: "Rejeki mampet & bencana.", m: "Paku Bumi." }, // index 0
        { n: "NUJU PADU", w: "Sering bertengkar.", m: "Dapur/Warung." },
        { n: "KALA TINANTANG", w: "Sakit-sakitan & emosi.", m: "Dapur." },
        { n: "SANGGAR WARINGIN", w: "Bahagia & pelindung.", m: "Hajatan/Ibadah." },
        { n: "MANTRI SINAROJA", w: "Cita-cita tercapai.", m: "Pindah Rumah." },
        { n: "MACAN KETAWAN", w: "Disegani tapi waspada kehilangan.", m: "Pintu Gerbang." }
    ];
    const kamar = kamarData[neptu % 6];

    const detailDiv = document.getElementById('detail');
    detailDiv.innerHTML = `
        <div id="capture-area" style="padding:20px; border:2px solid #D30000; background:#fff; margin-top:20px; border-radius:10px;">
            <h2 style="color:#D30000; margin-top:0;">${h} ${p}</h2>
            <p><strong>Masehi:</strong> ${tgl}/${bln+1}/${thn}</p>
            <p><strong>Neptu:</strong> ${neptu} | <strong>Arah Meditasi:</strong> ${arah}</p>
            <hr>
            <div style="background:#f9f9f9; padding:10px; border-radius:5px;">
                <h3 style="margin:0; font-size:1rem;">💠 Kamarokam: ${kamar.n}</h3>
                <p style="font-size:0.9rem;">${kamar.w}</p>
                <p style="font-size:0.9rem; color:#D30000;"><strong>Manfaat:</strong> ${kamar.m}</p>
            </div>
            <div style="margin-top:15px; display:flex; gap:10px;">
                <button onclick="window.print()" style="padding:8px; flex:1; cursor:pointer;">Cetak/PDF</button>
                <button onclick="shareWA('${h} ${p}, Neptu ${neptu}, Arah ${arah}')" style="padding:8px; flex:1; background:#25D366; color:white; border:none; cursor:pointer;">WA</button>
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

window.shareWA = (txt) => {
    window.open(`https://wa.me/?text=${encodeURIComponent("Hasil Ramalan: " + txt)}`, '_blank');
}

// 3. Render Kalender
function drawCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;

    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    
    if (mNav) mNav.innerText = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(current);

    // Header Hari
    ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].forEach(h => {
        const d = document.createElement('div');
        d.innerText = h;
        d.className = 'header-day' + (h === 'Min' ? ' sunday' : '');
        grid.appendChild(d);
    });

    const first = new Date(y, m, 1).getDay();
    const last = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < first; i++) grid.appendChild(document.createElement('div'));

    for (let i = 1; i <= last; i++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        const dObj = new Date(y, m, i);
        if (dObj.getDay() === 0) cell.style.color = 'red';
        
        cell.innerHTML = `<b>${i}</b><br><small style="font-size:0.6rem">${getPasaran(dObj)}</small>`;
        
        // GUNAKAN DATA ATTRIBUTE AGAR AMAN
        cell.dataset.tgl = i;
        cell.dataset.bln = m;
        cell.dataset.thn = y;
        
        // KLIK EVENT
        cell.onclick = function() {
            // Hapus highlight dari semua cell
            document.querySelectorAll('.calendar-day').forEach(c => c.style.background = 'white');
            // Beri warna cell yang diklik
            this.style.background = '#ffebee';
            showDetail(this.dataset.tgl, this.dataset.bln, this.dataset.thn);
        };
        
        grid.appendChild(cell);
    }
}

// 4. Navigasi & Boot
window.onload = () => {
    drawCalendar();
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); drawCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); drawCalendar(); };
};
