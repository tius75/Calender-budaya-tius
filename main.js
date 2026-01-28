// ==========================================
// 1. DATA & KONSTANTA (Tetap Gunakan Data Lengkap Anda)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const NASIB_AHLI_WARIS = { 
    1: { nama: "Gunung", arti: "Kehidupan yang mulia bagi ahli waris." },
    2: { nama: "Guntur", arti: "Ahli waris akan mendapatkan kesulitan." },
    3: { nama: "Segoro", arti: "Kemudahan dalam mencari rezeki." },
    0: { nama: "Asat", arti: "Kesulitan dalam mendapatkan rezeki." }
};

const PEMBAGI_5 = {
    1: { nama: "Sri", arti: "Murah rezeki dan hidup makmur." },
    2: { nama: "Lungguh", arti: "Mendapatkan kedudukan atau pangkat tinggi." },
    3: { nama: "Gendhong", arti: "Mapan secara lahiriah dan dihargai orang." },
    4: { nama: "Loro", arti: "Sakit-sakitan atau perjalanan hidup yang sering gagal." },
    0: { nama: "Pati", arti: "Sering menemui jalan buntu." }
};

let current = new Date();
const TODAY = new Date();

// ==========================================
// 2. MODUL LOGIKA (Fitur Baru)
// ==========================================
const ModulFitur = {
    hitungUsia: (tglLahir) => {
        const hariIni = new Date();
        let thn = hariIni.getFullYear() - tglLahir.getFullYear();
        if (hariIni.getMonth() < tglLahir.getMonth() || (hariIni.getMonth() === tglLahir.getMonth() && hariIni.getDate() < tglLahir.getDate())) thn--;
        return thn >= 0 ? thn : 0;
    },
    getArah: (n) => {
        const map = {7:"Barat", 8:"Utara", 9:"Timur", 10:"Selatan", 11:"Barat", 12:"Utara", 13:"Timur", 14:"Selatan", 15:"Barat", 16:"Utara", 17:"Timur", 18:"Selatan"};
        return map[n] || "Tengah";
    },
    getKamarokam: (n) => {
        const data = [
            { n: "NUJU PATI", w: "Rejeki mampet & bencana.", m: "Paku Bumi." },
            { n: "NUJU PADU", w: "Sering bertengkar.", m: "Dapur/Warung." },
            { n: "KALA TINANTANG", w: "Sakit-sakitan & emosi.", m: "Dapur." },
            { n: "SANGGAR WARINGIN", w: "Bahagia & pelindung.", m: "Hajatan/Ibadah." },
            { n: "MANTRI SINAROJA", w: "Cita-cita tercapai.", m: "Pindah Rumah." },
            { n: "MACAN KETAWAN", w: "Disegani tapi waspada kehilangan.", m: "Pintu Gerbang." }
        ];
        return data[n % 6];
    }
};

// ==========================================
// 3. RENDER KALENDER & DETAIL (Sesuai Gambar Anda)
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function updateDetail(date) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const p = getPasaran(date);
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[p];
    
    // Ambil data pendukung dari file eksternal (data-wuku.js, dll)
    const wukuName = typeof getWuku === 'function' ? getWuku(date) : "Data Wuku Belum Dimuat";
    const infoJawa = typeof getTanggalJawa === 'function' ? getTanggalJawa(date) : { tanggal: "-", bulan: { nama: "-" }, tahun: "-" };
    const watakNeptu = (typeof DATA_WATAK_NEPTU !== 'undefined') ? DATA_WATAK_NEPTU[neptu] : "Data watak tidak tersedia.";
    const karakterHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[`${h} ${p}`] || "Data tidak tersedia.") : "Data tidak tersedia.";
    
    const nasib5 = PEMBAGI_5[neptu % 5];
    const nasib4 = NASIB_AHLI_WARIS[neptu % 4];
    const kamar = ModulFitur.getKamarokam(neptu);

    // Bagian yang akan di-Download PDF (Hanya ID capture-area)
    detailDiv.innerHTML = `
        <div id="capture-area" style="padding:20px; border:2px solid #D30000; background:#fff; border-radius:15px; margin-top:20px; font-family: sans-serif;">
            <h1 style="color:#D30000; margin:0;">${h} ${p}</h1>
            <p style="margin:5px 0;"><strong>Masehi:</strong> ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}</p>
            <p style="margin:5px 0;"><strong>Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            <p style="margin:5px 0;"><strong>Usia:</strong> ${ModulFitur.hitungUsia(date)} Tahun</p>
            <p style="margin:5px 0;"><strong>Neptu:</strong> ${neptu} | <strong>Arah Meditasi:</strong> ${ModulFitur.getArah(neptu)}</p>

            <div style="background:#e8f5e9; padding:15px; border-radius:10px; margin:15px 0; border-left:5px solid #2e7d32;">
                <h4 style="margin:0; color:#1b5e20;">💎 Nasib Pembagi 5: ${nasib5.nama}</h4>
                <p style="margin:5px 0; font-size:0.9rem;">${nasib5.arti}</p>
            </div>

            <div style="background:#f3e5f5; padding:15px; border-radius:10px; margin:15px 0;">
                <h4 style="margin:0; color:#4a148c;">🌟 Watak Neptu</h4>
                <p style="margin:5px 0; font-size:0.9rem;">${watakNeptu.watak || watakNeptu}</p>
            </div>

            <div style="background:#fffcf0; padding:15px; border-radius:10px; margin:15px 0; border-left:5px solid #f1c40f;">
                <h4 style="margin:0; color:#856404;">🪦 Nasib Kematian: ${nasib4.nama}</h4>
                <p style="margin:5px 0; font-size:0.9rem;">${nasib4.arti}</p>
            </div>

            <div style="background:#fff3f3; padding:15px; border-radius:10px; margin:15px 0; border:1px solid #ffcdd2;">
                <h4 style="margin:0; color:#d32f2f;">💠 Kamarokam: ${kamar.n}</h4>
                <p style="margin:5px 0; font-size:0.85rem;">${kamar.w}</p>
                <p style="margin:0; font-weight:bold; color:#d32f2f;">Cocok untuk: ${kamar.m}</p>
            </div>

            <div style="margin-top:15px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">🌸 Karakter Hari</h4>
                <p style="font-size:0.85rem;">${karakterHari}</p>
            </div>
            
            <p style="font-size:0.7rem; color:#999; margin-top:20px; text-align:center;">© 2026 Kalender Jawa Modern • By Tius</p>
        </div>

        <div style="display:flex; gap:10px; margin-top:20px;">
            <button onclick="window.downloadPDF()" style="flex:1; padding:15px; background:#555; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">Cetak PDF</button>
            <button onclick="window.shareWA()" style="flex:1; padding:15px; background:#25D366; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">WhatsApp</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 4. FUNGSI EKSPOR (Hanya Area Detail)
// ==========================================
window.downloadPDF = () => {
    const el = document.getElementById('capture-area');
    if (el && typeof html2pdf !== 'undefined') {
        const opt = {
            margin: 0.3,
            filename: 'Hasil_Weton_Detail.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(el).save();
    } else {
        alert("Library PDF gagal dimuat atau detail masih kosong.");
    }
};

window.shareWA = () => {
    const el = document.getElementById('capture-area');
    if (el) {
        const text = encodeURIComponent("📌 Hasil Ramalan Weton Lengkap:\n" + el.innerText);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }
};

// ==========================================
// 5. INISIALISASI KALENDER
// ==========================================
function generateCalendar() {
    const grid = document.getElementById('calendar');
    if (!grid) return;
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();

    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.style.textAlign = 'center';
        el.style.fontWeight = 'bold';
        el.style.color = (i === 0) ? 'red' : '#333';
        grid.appendChild(el);
    });

    const first = new Date(y, m, 1).getDay();
    const last = new Date(y, m + 1, 0).getDate();
    for (let i = 0; i < first; i++) grid.appendChild(document.createElement('div'));

    for (let i = 1; i <= last; i++) {
        const dObj = new Date(y, m, i);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        const isSun = dObj.getDay() === 0;
        const isToday = dObj.toDateString() === TODAY.toDateString();

        cell.style.padding = '10px 5px';
        cell.style.textAlign = 'center';
        cell.style.cursor = 'pointer';
        cell.style.border = isToday ? '2px solid red' : '1px solid #eee';
        cell.style.backgroundColor = isToday ? '#fff9c4' : '#fff';

        cell.innerHTML = `<span style="color:${isSun ? 'red' : '#333'}; font-weight:bold;">${i}</span><br><span style="font-size:0.6rem; color:#666;">${getPasaran(dObj)}</span>`;
        
        cell.onclick = () => {
            const all = document.querySelectorAll('.calendar-day');
            all.forEach(c => c.style.outline = 'none');
            cell.style.outline = '2px solid #D30000';
            updateDetail(dObj);
        };
        grid.appendChild(cell);
    }
    const mNav = document.getElementById('monthYearNav');
    if (mNav) mNav.innerText = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(current);
}

window.onload = () => {
    generateCalendar();
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
};
