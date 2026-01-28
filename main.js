// Data Referensi
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const HARI_NAMA = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();
const TODAY = new Date();

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function updateDetail(tgl, bln, thn) {
    const date = new Date(thn, bln, tgl);
    const h = HARI_NAMA[date.getDay()];
    const p = getPasaran(date);
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[p];
    
    // Hitung Usia
    const ageDiff = new Date() - date;
    const ageDate = new Date(ageDiff);
    const usiaThn = Math.abs(ageDate.getUTCFullYear() - 1970);

    // Arah Meditasi
    const arahMap = {7:"Barat", 8:"Utara", 9:"Timur", 10:"Selatan", 11:"Barat", 12:"Utara", 13:"Timur", 14:"Selatan", 15:"Barat", 16:"Utara", 17:"Timur", 18:"Selatan"};
    const arah = arahMap[neptu] || "Tengah";

    // Kamarokam (Pembagi 6)
    const kamarData = [
        { n: "NUJU PATI", w: "Rejeki mampet & bencana.", m: "Paku Bumi." },
        { n: "NUJU PADU", w: "Sering bertengkar.", m: "Dapur/Warung." },
        { n: "KALA TINANTANG", w: "Sakit-sakitan & emosi.", m: "Dapur." },
        { n: "SANGGAR WARINGIN", w: "Bahagia & pelindung.", m: "Hajatan/Ibadah." },
        { n: "MANTRI SINAROJA", w: "Cita-cita tercapai.", m: "Pindah Rumah." },
        { n: "MACAN KETAWAN", w: "Disegani tapi waspada kehilangan.", m: "Pintu Gerbang." }
    ];
    const kamar = kamarData[neptu % 6];

    const detailDiv = document.getElementById('detail');
    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="capture-area" style="padding:20px; border:3px solid #D30000; background:#fff; border-radius:15px; margin-top:20px; color:#333;">
            <h2 style="color:#D30000; border-bottom:2px solid #D30000; margin-bottom:10px;">${h} ${p}</h2>
            <p><strong>Masehi:</strong> ${tgl} ${new Intl.DateTimeFormat('id-ID', {month:'long'}).format(date)} ${thn}</p>
            <p><strong>Usia:</strong> ${usiaThn} Tahun</p>
            <p><strong>Neptu:</strong> ${neptu} | <strong>Arah Meditasi:</strong> ${arah}</p>
            <div style="background:#fff3f3; padding:15px; border-radius:10px; margin-top:10px;">
                <h3 style="margin:0; color:#D30000;">💠 Kamarokam: ${kamar.n}</h3>
                <p style="margin:5px 0; font-size:0.9rem;">${kamar.w}</p>
                <p style="margin:0; font-weight:bold; color:#d32f2f;">Cocok untuk: ${kamar.m}</p>
            </div>
            <div style="margin-top:20px; display:flex; gap:10px;">
                <button onclick="window.print()" style="flex:1; padding:12px; border-radius:8px; border:none; background:#555; color:white; cursor:pointer;">Cetak PDF</button>
                <button onclick="window.open('https://wa.me/?text='+encodeURIComponent('Weton: ${h} ${p}\\nNeptu: ${neptu}\\nKamarokam: ${kamar.n}'))" style="flex:1; padding:12px; border-radius:8px; border:none; background:#25D366; color:white; cursor:pointer;">WhatsApp</button>
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

function drawCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;

    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    
    if (mNav) mNav.innerText = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(current);

    // Header Hari
    HARI_NAMA.forEach((h, idx) => {
        const d = document.createElement('div');
        d.innerText = h.substring(0,3);
        d.style.textAlign = 'center';
        d.style.fontWeight = 'bold';
        d.style.padding = '10px 0';
        d.style.color = (idx === 0) ? 'red' : '#333'; // Merah untuk hari Minggu
        grid.appendChild(d);
    });

    const first = new Date(y, m, 1).getDay();
    const last = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < first; i++) grid.appendChild(document.createElement('div'));

    for (let i = 1; i <= last; i++) {
        const cell = document.createElement('div');
        const dObj = new Date(y, m, i);
        const isSunday = (dObj.getDay() === 0);
        const isToday = (dObj.toDateString() === TODAY.toDateString());

        // Styling Langsung (Inline) agar tidak tertimpa CSS luar
        cell.style.padding = '10px 5px';
        cell.style.border = '1px solid #eee';
        cell.style.textAlign = 'center';
        cell.style.cursor = 'pointer';
        cell.style.position = 'relative';
        cell.style.backgroundColor = isToday ? '#fff9c4' : 'white';
        if (isToday) cell.style.border = '2px solid #D30000';

        cell.innerHTML = `
            <span style="color: ${isSunday ? 'red' : '#333'}; font-weight: bold; font-size: 1.1rem;">${i}</span><br>
            <span style="font-size: 0.7rem; color: #666;">${getPasaran(dObj)}</span>
        `;
        
        // INTERAKSI KLIK
        cell.onclick = function() {
            // Reset semua border
            const allCells = grid.querySelectorAll('div');
            allCells.forEach(c => c.style.outline = 'none');
            // Tandai yang diklik
            this.style.outline = '3px solid #D30000';
            this.style.zIndex = '10';
            updateDetail(i, m, y);
        };
        
        grid.appendChild(cell);
    }
}

window.onload = () => {
    drawCalendar();
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); drawCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); drawCalendar(); };
};
