// ==========================================
// 1. DATA DASAR (Internal)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();
const TODAY = new Date();

// ==========================================
// 2. FUNGSI LOGIKA (Safe Check)
// ==========================================
const ModulFitur = {
    hitungUsia: (tgl) => {
        let diff = TODAY.getFullYear() - tgl.getFullYear();
        if (TODAY.getMonth() < tgl.getMonth() || (TODAY.getMonth() === tgl.getMonth() && TODAY.getDate() < tgl.getDate())) diff--;
        return diff < 0 ? 0 : diff;
    },
    getArah: (n) => {
        const map = {7:"Barat", 8:"Utara", 9:"Timur", 10:"Selatan", 11:"Barat", 12:"Utara", 13:"Timur", 14:"Selatan", 15:"Barat", 16:"Utara", 17:"Timur", 18:"Selatan"};
        return map[n] || "Tengah";
    },
    getKamarokam: (n) => {
        const d = [
            { n: "NUJU PATI", w: "Rejeki mampet & bencana.", m: "Paku Bumi." },
            { n: "NUJU PADU", w: "Sering bertengkar.", m: "Dapur/Warung." },
            { n: "KALA TINANTANG", w: "Sakit-sakitan & emosi.", m: "Dapur." },
            { n: "SANGGAR WARINGIN", w: "Bahagia & pelindung.", m: "Hajatan/Ibadah." },
            { n: "MANTRI SINAROJA", w: "Cita-cita tercapai.", m: "Pindah Rumah." },
            { n: "MACAN KETAWAN", w: "Disegani tapi waspada.", m: "Pintu Gerbang." }
        ];
        return d[n % 6];
    }
};

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

// ==========================================
// 3. UPDATE DETAIL (Dengan Validasi Data Eksternal)
// ==========================================
function updateDetail(date) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const p = getPasaran(date);
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[p];
    
    // Validasi apakah data eksternal sudah ada atau belum
    const wuku = (typeof getWuku === 'function') ? getWuku(date) : "Memuat...";
    const tglJawa = (typeof getTanggalJawa === 'function') ? getTanggalJawa(date) : { tanggal: "", bulan: { nama: "" }, tahun: "" };
    const watak = (typeof DATA_WATAK_NEPTU !== 'undefined') ? DATA_WATAK_NEPTU[neptu] : "Data watak sedang dimuat...";
    
    const nasib5 = (neptu % 5 === 0) ? "Pati" : (neptu % 5 === 1 ? "Sri" : (neptu % 5 === 2 ? "Lungguh" : (neptu % 5 === 3 ? "Gendhong" : "Loro")));
    const kamar = ModulFitur.getKamarokam(neptu);

    detailDiv.innerHTML = `
        <div id="capture-area" style="padding:20px; border:2px solid #D30000; background:#fff; border-radius:15px; margin-top:20px;">
            <h2 style="color:#D30000; margin:0;">${h} ${p}</h2>
            <p style="margin:5px 0;"><strong>Masehi:</strong> ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}</p>
            <p style="margin:5px 0;"><strong>Usia:</strong> ${ModulFitur.hitungUsia(date)} Tahun</p>
            <p style="margin:5px 0;"><strong>Neptu:</strong> ${neptu} | <strong>Arah:</strong> ${ModulFitur.getArah(neptu)}</p>

            <div style="background:#f4f4f4; padding:10px; border-radius:10px; margin:10px 0; border-left:5px solid #D30000;">
                <h4 style="margin:0;">Nasib Pembagi 5: ${nasib5}</h4>
                <h4 style="margin:10px 0 0;">💠 Kamarokam: ${kamar.n}</h4>
                <p style="font-size:0.85rem; margin:5px 0;">${kamar.w}</p>
                <p style="color:#D30000; font-weight:bold; margin:0;">Manfaat: ${kamar.m}</p>
            </div>
            
            <div style="font-size:0.9rem; border-top:1px solid #eee; padding-top:10px;">
                <p><strong>Wuku:</strong> ${wuku}</p>
                <p><strong>Watak:</strong> ${watak.watak || watak}</p>
            </div>
        </div>

        <div style="display:flex; gap:10px; margin-top:15px;">
            <button onclick="downloadHanyaDetail()" style="flex:1; padding:12px; background:#444; color:white; border:none; border-radius:8px; cursor:pointer;">Cetak PDF</button>
            <button onclick="window.open('https://wa.me/?text='+encodeURIComponent('Weton: ${h} ${p}, Neptu: ${neptu}'))" style="flex:1; padding:12px; background:#25D366; color:white; border:none; border-radius:8px; cursor:pointer;">WhatsApp</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 4. DOWNLOAD PDF (Hanya Area Detail)
// ==========================================
window.downloadHanyaDetail = () => {
    const area = document.getElementById('capture-area');
    if (!area) return;
    
    const opt = {
        margin: 0.5,
        filename: 'Detail_Weton.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(area).save();
};

// ==========================================
// 5. RENDER KALENDER (Event Delegation)
// ==========================================
function drawCalendar() {
    const grid = document.getElementById('calendar');
    if (!grid) return;
    grid.innerHTML = '';

    const y = current.getFullYear();
    const m = current.getMonth();
    
    // Render Header & Tanggal (Gunakan Inline Style agar Warna Merah Muncul)
    const first = new Date(y, m, 1).getDay();
    const last = new Date(y, m + 1, 0).getDate();

    // Hari Labels
    ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h;
        el.style.textAlign = 'center';
        el.style.fontWeight = 'bold';
        if (i === 0) el.style.color = 'red';
        grid.appendChild(el);
    });

    for (let i = 0; i < first; i++) grid.appendChild(document.createElement('div'));

    for (let i = 1; i <= last; i++) {
        const dObj = new Date(y, m, i);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.style.padding = '10px 2px';
        cell.style.textAlign = 'center';
        cell.style.cursor = 'pointer';
        cell.style.border = '1px solid #eee';
        
        if (dObj.getDay() === 0) cell.style.color = 'red';
        if (dObj.toDateString() === TODAY.toDateString()) cell.style.background = '#fff9c4';

        cell.innerHTML = `<b>${i}</b><br><small style="font-size:0.6rem">${getPasaran(dObj)}</small>`;
        
        // Pasang Event Click secara manual
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.style.border = '1px solid #eee');
            cell.style.border = '2px solid #D30000';
            updateDetail(dObj);
        };
        
        grid.appendChild(cell);
    }
    
    if (document.getElementById('monthYearNav')) {
        document.getElementById('monthYearNav').innerText = new Intl.DateTimeFormat('id-ID', {month:'long', year:'numeric'}).format(current);
    }
}

window.onload = drawCalendar;
