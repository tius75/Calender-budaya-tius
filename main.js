/**
 * KALENDER JAWA MODERN - FINAL STABLE VERSION
 * Perbaikan Grid Kosong & Penambahan Fitur Ekspor
 */

// ==========================================
// 1. DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

let current = new Date();
const TODAY = new Date();

// ==========================================
// 2. MODUL FITUR (Modular Logic)
// ==========================================
const ModulFitur = {
    hitungUsia: (tglLahir) => {
        const hariIni = new Date();
        let thn = hariIni.getFullYear() - tglLahir.getFullYear();
        let bln = hariIni.getMonth() - tglLahir.getMonth();
        let hari = hariIni.getDate() - tglLahir.getDate();
        if (hari < 0) { bln--; hari += new Date(hariIni.getFullYear(), hariIni.getMonth(), 0).getDate(); }
        if (bln < 0) { thn--; bln += 12; }
        return `${thn} Tahun, ${bln} Bulan, ${hari} Hari`;
    },

    getArahMeditasi: (neptu) => {
        const petaArah = {
            7: "Kulon (Barat)", 8: "Lor (Utara)", 9: "Wetan (Timur)", 10: "Kidul (Selatan)",
            11: "Kulon (Barat)", 12: "Lor (Utara)", 13: "Wetan (Timur)", 14: "Kidul (Selatan)",
            15: "Kulon (Barat)", 16: "Lor (Utara)", 17: "Wetan (Timur)", 18: "Kidul (Selatan)"
        };
        return petaArah[neptu] || "Pusat (Tengah)";
    },

    getKamarokam: (neptu) => {
        const data6 = {
            1: { n: "NUJU PADU", w: "Jelek. Sering bertengkar, tidak ada kesatuan pendapat.", m: "Dapur, Warung, Restaurant." },
            2: { n: "KALA TINANTANG", w: "Jelek. Kekurangan hidup, sakit-sakitan, amarah besar.", m: "Dapur, Rumah, Warung." },
            3: { n: "SANGGAR WARINGIN", w: "Baik. Tenteram, bahagia, rejeki berkembang, pelindung keluarga.", m: "Hajatan, Pindah Rumah, Tempat Ibadah." },
            4: { n: "MANTRI SINAROJA", w: "Baik. Cita-cita tercapai, senang, tidak kurang sandang pangan.", m: "Hajatan, Pindah Rumah." },
            5: { n: "MACAN KETAWAN", w: "Sedang. Disegani tapi dijauhi, sering kehilangan.", m: "Mendirikan Rumah, Pintu Regol/Gerbang." },
            0: { n: "NUJU PATI", w: "Buruk. Rejeki mampet, susah hidup, malang/bencana.", m: "Buat Paku Bumi, Jabung (Gerabah)." }
        };
        return data6[neptu % 6];
    }
};

// ==========================================
// 3. CORE ENGINE (Kalender & Render)
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    
    if (mNav) {
        mNav.innerText = `${["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][m]} ${y}`;
    }

    // Header Hari
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day' + (i === 0 ? ' sunday' : '');
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // Kolom Kosong
    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    // Tanggal
    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday-block');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div>`;
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
            cell.classList.add('selected-day');
            updateDetail(dateObj, p);
        };
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const usia = ModulFitur.hitungUsia(date);
    const meditasi = ModulFitur.getArahMeditasi(neptu);
    const kamarokam = ModulFitur.getKamarokam(neptu);

    detailDiv.innerHTML = `
        <div id="capture-area" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #ddd; color:#333;">
            <h2 style="color:#D30000; margin:0;">${h} ${pasaran}</h2>
            <p style="color:#666;">Masehi: ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            <p style="margin-bottom:15px;">👶 Usia: <strong>${usia}</strong></p>

            <div style="background:#f0f4f8; padding:10px; border-radius:8px; margin-bottom:10px;">
                <h4 style="margin:0; color:#243b55;">🧘 Arah Meditasi (Neptu ${neptu})</h4>
                <p style="font-weight:bold; margin:5px 0 0;">👉 Menghadap ke ${meditasi}</p>
            </div>

            <div style="background:#e8f5e9; padding:12px; border-radius:8px; border-left:5px solid #2e7d32;">
                <h4 style="margin:0; color:#1b5e20;">💠 Kamarokam: ${kamarokam.n}</h4>
                <p style="font-size:0.85rem; margin:5px 0;"><strong>Watak:</strong> ${kamarokam.w}</p>
                <p style="font-size:0.85rem; color:#2e7d32;"><strong>Manfaat:</strong> ${kamarokam.m}</p>
            </div>
        </div>
        
        <div style="margin-top:20px; display:flex; gap:10px; justify-content:center;">
            <button onclick="exportPDF()" style="background:#D30000; color:#fff; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">📄 Download PDF</button>
            <button onclick="shareWA()" style="background:#25D366; color:#fff; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">📱 Share WhatsApp</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 4. FUNGSI EKSPOR
// ==========================================
window.exportPDF = () => {
    const element = document.getElementById('capture-area');
    if (!element) return;
    const opt = {
        margin: 0.5,
        filename: 'Ramalan_Weton.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
};

window.shareWA = () => {
    const text = document.getElementById('capture-area').innerText;
    const url = "https://api.whatsapp.com/send?text=" + encodeURIComponent("📌 Hasil Ramalan Weton:\n\n" + text);
    window.open(url, '_blank');
};

// ==========================================
// 5. INISIALISASI
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    
    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    
    if (prev) prev.onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    if (next) next.onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
