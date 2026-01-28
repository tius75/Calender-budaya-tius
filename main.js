// ==========================================
// 1. DATA REFERENSI UTAMA
// ==========================================
const HARI = ['Minggu', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Senin']; // Urutan disesuaikan index Date()
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();
const TODAY = new Date();

// ==========================================
// 2. MODUL LOGIKA (Modular Internal)
// ==========================================
const ModulFitur = {
    hitungUsia: (tglLahir) => {
        const hariIni = new Date();
        let thn = hariIni.getFullYear() - tglLahir.getFullYear();
        let bln = hariIni.getMonth() - tglLahir.getMonth();
        let hari = hariIni.getDate() - tglLahir.getDate();
        if (hari < 0) { bln--; hari += new Date(hariIni.getFullYear(), hariIni.getMonth(), 0).getDate(); }
        if (bln < 0) { thn--; bln += 12; }
        return `${thn} Thn, ${bln} Bln, ${hari} Hr`;
    },
    getArah: (n) => {
        const map = {7:"Barat", 8:"Utara", 9:"Timur", 10:"Selatan", 11:"Barat", 12:"Utara", 13:"Timur", 14:"Selatan", 15:"Barat", 16:"Utara", 17:"Timur", 18:"Selatan"};
        return map[n] || "Tengah";
    },
    getKamarokam: (n) => {
        const data = {
            1: { n: "NUJU PADU", w: "Sering bertengkar/sulaya.", m: "Dapur, Warung." },
            2: { n: "KALA TINANTANG", w: "Sakit-sakitan & emosi tinggi.", m: "Dapur, Warung." },
            3: { n: "SANGGAR WARINGIN", w: "Bahagia & pelindung keluarga.", m: "Hajatan, Ibadah." },
            4: { n: "MANTRI SINAROJA", w: "Cita-cita tercapai & cukup pangan.", m: "Hajatan, Pindah." },
            5: { n: "MACAN KETAWAN", w: "Disegani tapi sering kehilangan.", m: "Pintu/Regol." },
            0: { n: "NUJU PATI", w: "Rejeki mampet & bencana.", m: "Paku Bumi." }
        };
        return data[n % 6];
    }
};

// ==========================================
// 3. FUNGSI RENDER (Grid & Detail)
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function updateDetail(date) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][date.getDay()];
    const p = getPasaran(date);
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[p];
    const kamar = ModulFitur.getKamarokam(neptu);

    detailDiv.innerHTML = `
        <div id="capture-area" style="background:#fff; padding:20px; border-radius:12px; border:2px solid #D30000; color:#000; margin-top:20px;">
            <h2 style="color:#D30000; border-bottom:2px solid #D30000; padding-bottom:5px;">${h} ${p}</h2>
            <p>📅 <strong>${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong></p>
            <p>👶 Usia: ${ModulFitur.hitungUsia(date)}</p>
            <p>🎯 Neptu: ${neptu} | 🧘 Meditasi: ${ModulFitur.getArah(neptu)}</p>
            
            <div style="background:#f9f9f9; padding:10px; border-radius:8px; margin-top:10px; border-left:5px solid #D30000;">
                <h4 style="margin:0;">💠 KAMAROKAM: ${kamar.n}</h4>
                <p style="font-size:0.85rem; margin:5px 0;">${kamar.w}</p>
                <p style="font-size:0.85rem; color:#D30000;">Cocok untuk: ${kamar.m}</p>
            </div>
        </div>
        <div style="display:flex; gap:10px; margin-top:15px;">
            <button onclick="window.downloadPDF()" style="flex:1; padding:10px; background:#D30000; color:#fff; border:none; border-radius:5px; cursor:pointer;">PDF</button>
            <button onclick="window.shareWA()" style="flex:1; padding:10px; background:#25D366; color:#fff; border:none; border-radius:5px; cursor:pointer;">WhatsApp</button>
        </div>
    `;
}

function generateCalendar() {
    const grid = document.getElementById('calendar');
    if (!grid) return;
    grid.innerHTML = '';

    const y = current.getFullYear();
    const m = current.getMonth();
    
    // Header
    ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h;
        el.className = 'header-day' + (i === 0 ? ' sunday' : '');
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday-block');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<div>${d}</div><div style="font-size:0.6rem;">${getPasaran(dateObj)}</div>`;
        
        // EVENT CLICK - Dipastikan terpasang
        cell.onclick = (e) => {
            e.preventDefault();
            document.querySelectorAll('.calendar-day').forEach(c => c.style.border = '1px solid #eee');
            cell.style.border = '2px solid #D30000';
            updateDetail(dateObj);
        };
        grid.appendChild(cell);
    }
    
    const mNav = document.getElementById('monthYearNav');
    if (mNav) mNav.innerText = `${new Intl.DateTimeFormat('id-ID', {month:'long', year:'numeric'}).format(current)}`;
}

// ==========================================
// 4. GLOBAL ACTION (PDF & WA)
// ==========================================
window.downloadPDF = () => {
    const el = document.getElementById('capture-area');
    if (el && typeof html2pdf !== 'undefined') {
        html2pdf().from(el).set({ margin: 1, filename: 'weton.pdf' }).save();
    } else {
        alert("Library PDF belum dimuat atau detail kosong!");
    }
};

window.shareWA = () => {
    const el = document.getElementById('capture-area');
    if (el) {
        const text = encodeURIComponent("Hasil Ramalan Weton:\n" + el.innerText);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }
};

// ==========================================
// 5. BOOTSTRAP
// ==========================================
window.onload = () => {
    generateCalendar();
    
    document.getElementById('prevMonth')?.addEventListener('click', () => {
        current.setMonth(current.getMonth() - 1);
        generateCalendar();
    });
    
    document.getElementById('nextMonth')?.addEventListener('click', () => {
        current.setMonth(current.getMonth() + 1);
        generateCalendar();
    });
};
