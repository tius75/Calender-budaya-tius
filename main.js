/**
 * KALENDER JAWA & NUMEROLOGI PRO 2026 - SUPER FIX
 * Perbaikan: Grid Recovery, Full Data Ramalan, Anti-Blank PDF
 */

let current = new Date();
const TODAY = new Date();

// --- DATA DASAR ---
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_BULAN_JAWA = [
    { nama: "Sura", status: "Tidak Baik" }, { nama: "Sapar", status: "Tidak Baik" },
    { nama: "Mulud", status: "Tidak Baik" }, { nama: "Bakdamulud", status: "Baik" },
    { nama: "Jumadilawal", status: "Tidak Baik" }, { nama: "Jumadilakir", status: "Kurang Baik" },
    { nama: "Rejeb", status: "Tidak Baik" }, { nama: "Ruwah", status: "Baik" },
    { nama: "Pasa", status: "Tidak Baik" }, { nama: "Syawal", status: "Sangat Tidak Baik" },
    { nama: "Dulkaidah", status: "Cukup Baik" }, { nama: "Besar", status: "Sangat Baik" }
];

// --- FUNGSI PENDUKUNG ---
const getZodiak = (d, m) => {
    const zodiacs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
    const lastDay = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
    return (d > lastDay[m]) ? zodiacs[(m + 1) % 12] : zodiacs[m];
};

const getShio = (year) => {
    const shioList = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    return shioList[year % 12];
};

function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let tgl = 9 + diffDays;
    let bIdx = 7; 
    while (tgl > 30) { tgl -= 30; bIdx = (bIdx + 1) % 12; }
    while (tgl <= 0) { tgl += 30; bIdx = (bIdx - 1 + 12) % 12; }
    return { tgl, bulan: DATA_BULAN_JAWA[bIdx] };
}

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

// --- RENDER GRID KALENDER ---
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    mNav.innerText = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(current);

    // Render Header Hari
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.style.fontWeight = "bold";
        el.style.textAlign = "center";
        if(i === 0) el.style.color = 'red';
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
        
        if (dateObj.getDay() === 0) cell.style.color = 'red';
        if (dateObj.toDateString() === TODAY.toDateString()) {
            cell.style.background = '#fff9c4';
            cell.style.border = '2px solid orange';
        }
        
        cell.innerHTML = `<b>${d}</b><br><small style="font-size:0.7rem">${p}</small>`;
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

// --- UPDATE DETAIL (LOGIKA UTAMA) ---
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const nH = NEPTU_HARI[h];
    const nP = NEPTU_PASARAN[pasaran];
    const jawa = getTanggalJawa(date);
    const zodiak = getZodiak(date.getDate(), date.getMonth());
    const shio = getShio(date.getFullYear());
    
    // Ambil Data Numerologi dari numerology.js
    let lp = { angka: '?', karakter: 'Modul tidak ditemukan', bisnis: '-', jodoh: '-', hariBaik: '-' };
    if (typeof NUMEROLOGI_ENGINE !== 'undefined') {
        lp = NUMEROLOGI_ENGINE.calculateLifePath(date);
    }

    // Render Konten (Tombol disertakan di sini agar tidak dobel di HTML)
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border:2px solid #D30000; border-radius:15px; color:#333; margin-top:20px;">
            <h2 style="color:#D30000; border-bottom:3px solid #D30000; padding-bottom:10px; margin-top:0;">${h} ${pasaran}</h2>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin:15px 0;">
                <p style="margin:0;">📅 <b>Masehi:</b><br>${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}</p>
                <p style="margin:0;">🌙 <b>Jawa:</b><br>${jawa.tgl} ${jawa.bulan.nama} 1959</p>
            </div>

            <div style="background:#f9f9f9; padding:12px; border-radius:10px; margin-bottom:15px;">
                <p style="margin:0;">🐉 <b>Shio:</b> ${shio} | ♈ <b>Zodiak:</b> ${zodiak}</p>
                <p style="margin:5px 0 0 0;">✨ <b>Status Bulan:</b> <span style="color:${jawa.bulan.status.includes('Tidak') ? 'red' : 'green'}"><b>${jawa.bulan.status}</b></span></p>
            </div>

            <div style="background:#fff5f5; border:1px solid #ffcdd2; padding:10px; border-radius:10px; text-align:center; margin-bottom:15px;">
                <small>Kalkulasi Neptu</small><br>
                <b style="font-size:1.1rem;">${h}(${nH}) + ${pasaran}(${nP}) = <span style="color:#D30000; font-size:1.4rem;">${nH + nP}</span></b>
            </div>

            <div style="padding:15px; border:1px solid #084298; border-radius:12px; background:#f0f7ff;">
                <h3 style="color:#084298; margin:0 0 10px 0; border-bottom:1px solid #084298;">🔮 Ramalan Numerologi LP-${lp.angka}</h3>
                <div style="font-size:0.9rem; line-height:1.5;">
                    <p style="margin:5px 0;"><b>🌟 Karakter:</b> ${lp.karakter}</p>
                    <p style="margin:5px 0;"><b>💼 Bisnis:</b> ${lp.bisnis}</p>
                    <p style="margin:5px 0;"><b>❤️ Jodoh:</b> ${lp.jodoh}</p>
                    <p style="margin:5px 0;"><b>📅 Hari Baik:</b> ${lp.hariBaik}</p>
                </div>
            </div>
        </div>

        <div style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <button onclick="downloadPDF()" style="padding:15px; background:#333; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">Simpan PDF</button>
            <button onclick="shareWA('${h} ${pasaran}', '${lp.angka}')" style="padding:15px; background:#25D366; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">Share WA</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// --- FUNGSI PDF & SHARE ---
async function downloadPDF() {
    const area = document.getElementById("printableArea");
    if (!area) return;
    const opt = {
        margin: 10,
        filename: 'Ramalan-Lengkap.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    try {
        await html2pdf().set(opt).from(area).save();
    } catch (e) {
        alert("Gagal mengunduh PDF");
    }
}

function shareWA(weton, lp) {
    const text = `Hasil Ramalan Weton: ${weton}\nNumerologi Life Path: ${lp}\nCek di aplikasi kami!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// --- INITIALIZE ---
window.onload = () => {
    generateCalendar();
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
};
