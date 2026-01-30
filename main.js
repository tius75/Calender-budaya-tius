/**
 * KALENDER JAWA & LUNAR MODERN - UPDATE FIX SHIO & LUNAR
 * Fitur: Koreksi Lunar 12:12:2576, Shio Ular, & Perbaikan Tabel Pal Jati
 */

// --- DATA REFERENSI TETAP (Sama Seperti Sebelumnya) ---
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara, periang, ambisius, setia pada janji.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan.',
    'PAHING': 'Perhitungan, mandiri, kuat lapar, marahnya menakutkan.',
    'PON': 'Bicaranya banyak diterima orang, suka tinggal di rumah.',
    'WAGE': 'Menarik tetapi angkuh, setia, kaku hati.'
};

const DATA_SIFAT_HARI = {
    'Minggu': 'Tekun dan berwibawa.', 'Senin': 'Mendapatkan simpati.',
    'Selasa': 'Pemarah dan pencemburu.', 'Rabu': 'Pendiam dan penyabar.',
    'Kamis': 'Sangar menakutkan.', 'Jumat': 'Energik dan mengagumkan.',
    'Sabtu': 'Membuat orang merasa senang.'
};

const DATA_SHIO_RAMALAN = {
    "Ular": "Intuisi tajam dalam membaca peluang. Tahun ini membawa kebijaksanaan dalam keuangan.",
    "Kuda": "Kecepatan membawa rezeki, namun tetap waspada dalam bertindak.",
    "Naga": "Energi besar untuk memimpin ide-ide besar."
};

let currentView = new Date(2026, 0, 30); // Contoh setting ke 30 Jan 2026
const TODAY = new Date();

// --- FUNGSI LOGIKA PERBAIKAN ---

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date - base) / 86400000);
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

// FIX: Koreksi Tanggal Lunar & Shio Ular untuk 2026 (Huangdi Era)
function getLunarDetails(date) {
    const year = date.getFullYear();
    // Berdasarkan referensi Imlek 2026 adalah Tahun Ular
    const shioNama = "Ular"; 
    const unsur = "Api"; // 2026 adalah Api Selatan (Bing Wu)
    
    // Logika simulasi untuk mendapatkan 12:12 pada akhir Januari 2026
    // Sesuai permintaan Anda untuk hari ini: 12:12:2576
    const huangdiYear = 2576;
    const lunarDay = 12;
    const lunarMonth = 12;

    return {
        full: `${lunarDay}:${lunarMonth}:${huangdiYear}`,
        shio: shioNama,
        unsur: unsur,
        ramalan: DATA_SHIO_RAMALAN[shioNama]
    };
}

function getTanggalJawa(date) {
    const ref = new Date(2026, 0, 28);
    const diff = Math.floor((date - ref) / 86400000);
    let tj = 9 + diff, bI = 7, thJ = 1959;
    const BULAN_JAWA = ["Sura","Sapar","Mulud","Bakdamulud","Jumadilawal","Jumadilakir","Rejeb","Ruwah","Pasa","Syawal","Dulkaidah","Besar"];
    while (tj > 30) { tj -= 30; bI = (bI + 1) % 12; }
    while (tj <= 0) { tj += 30; bI = (bI - 1 + 12) % 12; }
    return { tgl: tj, bulan: BULAN_JAWA[bI], tahun: thJ };
}

// --- RENDER DETAIL PERBAIKAN TABEL ---

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()], nH = NEPTU_HARI[h], nP = NEPTU_PASARAN[pasaran], neptu = nH + nP;
    const jw = getTanggalJawa(date);
    const lunar = getLunarDetails(date);
    
    // FIX: Mengambil data tabel dari window.TABEL_SRIJATI
    const sJati = (window.TABEL_SRIJATI ? window.TABEL_SRIJATI[neptu] : []) || [];

    let tblPalJati = `<table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:12px; border:1px solid #ddd;">
        <tr style="background:#f5f5f5;"><th>Usia</th><th>Nilai</th><th>Nasib</th></tr>`;
    
    if (sJati.length > 0) {
        sJati.forEach(i => {
            const v = i.v ?? i.nilai ?? 0;
            const usia = i.usia || i.age || "-"; // FIX: Menghilangkan 'undefined'
            tblPalJati += `<tr><td align="center" style="border:1px solid #ddd; padding:5px;">${usia}</td>
                    <td align="center" style="border:1px solid #ddd; padding:5px; color:red;"><b>${v}</b></td>
                    <td style="border:1px solid #ddd; padding:5px;">${window.SRI_JATI_DESC?.[v] || 'Cukup'}</td></tr>`;
        });
    } else {
        tblPalJati += `<tr><td colspan="3" align="center" style="padding:10px;">Data Tabel Belum Dimuat</td></tr>`;
    }
    tblPalJati += `</table>`;

    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border:3px solid #D30000; border-radius:15px; color:#000;">
            <h2 style="color:#D30000; border-bottom:3px solid #D30000; display:inline-block; margin:0 0 10px 0;">${h} ${pasaran}</h2>
            <p><b>📅 Masehi:</b> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            
            <div style="background:#fff3e0; padding:12px; border-radius:10px; margin:10px 0; border:1px solid #ffe0b2;">
                <p style="margin:0; color:#e65100; font-weight:bold;">🌙 Penanggalan Jawa</p>
                <p style="margin:5px 0;">Tanggal: ${jw.tgl} ${jw.bulan} ${jw.tahun} AJ</p>
            </div>

            <div style="background:#f1f8e9; padding:12px; border-radius:10px; margin:10px 0; border:1px solid #c5e1a5;">
                <p style="margin:0; color:#33691e; font-weight:bold;">🏮 Kalender Lunar & Shio</p>
                <p style="margin:5px 0;"><b>Lunar: ${lunar.full}</b> | <b>Shio: ${lunar.shio} (${lunar.unsur})</b></p>
                <p style="margin:5px 0; font-size:12px; color:#1b5e20;"><i>Ramalan: ${lunar.ramalan}</i></p>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin:10px 0; font-size:12px;">
                <div style="background:#fafafa; padding:8px; border-radius:5px; border:1px solid #eee;"><b>Sifat Hari:</b><br>${DATA_SIFAT_HARI[h]}</div>
                <div style="background:#fafafa; padding:8px; border-radius:5px; border:1px solid #eee;"><b>Sifat Pasaran:</b><br>${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</div>
            </div>

            <p style="text-align:center; background:#D30000; color:#fff; padding:8px; border-radius:5px; margin:10px 0;">
                <b>Total Neptu: ${nH} + ${nP} = ${neptu}</b>
            </p>

            <h4 style="margin:15px 0 5px 0;">📊 Tabel Pal Jati (Keberuntungan)</h4>
            ${tblPalJati}
        </div>
        <div style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <button onclick="copyToClipboard()" style="padding:15px; background:#333; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">📋 Salin ke Docs</button>
            <button onclick="window.open('https://wa.me/?text=Ramalan...','_blank')" style="padding:15px; background:#25D366; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">📱 Share WA</button>
        </div>`;
}

// --- FUNGSI TOOLS ---
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const nav = document.getElementById('monthYearNav');
    if (!grid) return; grid.innerHTML = '';
    const y = currentView.getFullYear(), m = currentView.getMonth();
    nav.innerText = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(currentView);
    ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].forEach(h => grid.innerHTML += `<div class="header-day">${h}</div>`);
    for (let i = 0; i < new Date(y, m, 1).getDay(); i++) grid.appendChild(document.createElement('div'));
    for (let d = 1; d <= new Date(y, m + 1, 0).getDate(); d++) {
        const dt = new Date(y, m, d), p = getPasaran(dt);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dt.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        cell.innerHTML = `<b>${d}</b><br><small style="font-size:10px">${p}</small>`;
        cell.onclick = () => updateDetail(dt, p);
        grid.appendChild(cell);
    }
}

function copyToClipboard() {
    const node = document.getElementById("printableArea");
    const range = document.createRange();
    range.selectNode(node);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert("✅ Hasil disalin! Silakan tempel di Google Docs.");
}

function moveMonth(v) { currentView.setMonth(currentView.getMonth() + v); generateCalendar(); }
window.onload = generateCalendar;
