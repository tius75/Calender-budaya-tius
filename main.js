/**
 * KALENDER JAWA & LUNAR MODERN - FULL ENGINE VERSION 2026
 * Gabungan: Jawa Lengkap, Windu, Mangsa, Lunar Huangdi, 12 Shio & Pal Jati
 */

// ==========================================
// 1. DATABASE KONSTANTA (LENGKAP)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius, urakan, kurang bisa membalas budi, setia pada janji.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan, selalu gembira.',
    'PAHING': 'Selalu ingin memiliki, perhitungan untung, mandiri, kuat lapar, marahnya menakutkan.',
    'PON': 'Bicaranya banyak diterima orang, suka tinggal di rumah, rejeki cukup.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut, kaku hati, sering gelap pikiran.'
};

const DATA_SIFAT_HARI = {
    'Minggu': 'Tekun, mandiri dan berwibawa.', 'Senin': 'Selalu berubah, indah dan mendapatkan simpati.',
    'Selasa': 'Pemarah dan pencemburu serta luas pergaulannya.', 'Rabu': 'Pendiam, pemomong dan penyabar.',
    'Kamis': 'Sangar menakutkan.', 'Jumat': 'Energik dan mengagumkan.',
    'Sabtu': 'Membuat orang merasa senang dan susah ditebak.'
};

const DATA_BULAN_JAWA = [
    { nama: "Sura", status: "Tidak Baik", naas: [6, 11, 13, 14, 17, 18, 27], taliWangke: "Rabu Pahing" },
    { nama: "Sapar", status: "Tidak Baik", naas: [1, 10, 12, 20, 22], taliWangke: "Kamis Pon" },
    { nama: "Mulud", status: "Tidak Baik", naas: [1, 3, 8, 10, 13, 15, 20, 23], taliWangke: "Jumat Wage" },
    { nama: "Bakdamulud", status: "Baik", naas: [10, 15, 16, 20, 25, 28], taliWangke: "Sabtu Kliwon" },
    { nama: "Jumadilawal", status: "Tidak Baik", naas: [1, 5, 10, 11, 16, 26, 28], taliWangke: "Senin Kliwon" },
    { nama: "Jumadilakir", status: "Kurang Baik", naas: [4, 10, 11, 14, 18, 21], taliWangke: "Selasa Legi" },
    { nama: "Rejeb", status: "Tidak Baik", naas: [2, 11, 12, 13, 14, 18, 22, 27], taliWangke: "Rabu Pahing" },
    { nama: "Ruwah", status: "Baik", naas: [4, 12, 13, 19, 24, 26, 28], taliWangke: "Kamis Pon" },
    { nama: "Pasa", status: "Tidak Baik", naas: [7, 9, 10, 15, 20, 21, 24, 25], taliWangke: "Jumat Wage" },
    { nama: "Syawal", status: "Sangat Tidak Baik", naas: [2, 10, 17, 20, 27], taliWangke: "Sabtu Kliwon" },
    { nama: "Dulkaidah", status: "Cukup Baik", naas: [2, 6, 11, 12, 13, 21, 22, 24, 28], taliWangke: "Senin Kliwon" },
    { nama: "Besar", status: "Sangat Baik", naas: [1, 6, 10, 13, 20, 23, 25], taliWangke: "Selasa Wage" }
];

const DATA_SIKLUS_TAHUN = [
    { nama: "Alip", makna: "Ada-ada (Niat)", deskripsi: "Permulaan menanam tekad baik." },
    { nama: "Ehe", makna: "Tumandang (Bekerja)", deskripsi: "Waktunya mulai bergerak dan bertindak." },
    { nama: "Jimawal", makna: "Gawe (Pekerjaan)", deskripsi: "Proses ketekunan membuahkan hasil." },
    { nama: "Je", makna: "Lelakon (Ujian)", deskripsi: "Ujian mental dalam proses hidup." },
    { nama: "Dal", makna: "Urip (Hidup)", deskripsi: "Tahun sakral untuk merenungi hakikat hidup." },
    { nama: "Be", makna: "Bola-bali (Teguh)", deskripsi: "Keteguhan pada kebaikan." },
    { nama: "Wawu", makna: "Marang (Arah)", deskripsi: "Fokus pada tujuan akhir hidup." },
    { nama: "Jimakir", makna: "Suwung (Selesai)", deskripsi: "Evaluasi dan pelepasan keterikatan duniawi." }
];

const DATA_SHIO_RAMALAN = {
    "Tikus": "Tahun menabung, hindari spekulasi.", "Kerbau": "Ketekunan membawa stabilitas.",
    "Macan": "Waktu ekspansi kreatif, jaga emosi.", "Kelinci": "Keberuntungan melalui diplomasi.",
    "Naga": "Energi besar untuk memimpin.", "Ular": "Intuisi tajam membaca peluang.",
    "Kuda": "Kecepatan membawa rezeki.", "Kambing": "Harmoni membawa keberuntungan.",
    "Monyet": "Kecerdasan menyelesaikan masalah.", "Ayam": "Disiplin membawa pengakuan.",
    "Anjing": "Kesetiaan dihargai mitra.", "Babi": "Kesejahteraan meningkat pesat."
};

let currentView = new Date(2026, 0, 1);
const TODAY = new Date();

// ==========================================
// 2. FUNGSI LOGIKA (CALCULATION)
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date - base) / 86400000);
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getLunarDetails(date) {
    const year = date.getFullYear();
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    const unsurs = ["Logam", "Air", "Kayu", "Api", "Tanah"];
    const shioNama = shios[year % 12];
    return {
        full: `${date.getDate()}:${date.getMonth()+1}:${year + 550}`,
        shio: shioNama,
        unsur: unsurs[Math.floor(((year - 4) % 10) / 2)],
        ramalan: DATA_SHIO_RAMALAN[shioNama]
    };
}

function getTanggalJawa(date) {
    const ref = new Date(2026, 0, 28);
    const diff = Math.floor((date - ref) / 86400000);
    let tj = 9 + diff, bI = 7, thJ = 1959;
    while (tj > 30) { tj -= 30; bI = (bI + 1) % 12; if (bI === 0) thJ++; }
    while (tj <= 0) { tj += 30; bI = (bI - 1 + 12) % 12; if (bI === 11) thJ--; }
    return { tgl: tj, bulan: DATA_BULAN_JAWA[bI], tahun: thJ, bIdx: bI };
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const ref = new Date(2026, 0, 25);
    const diff = Math.floor((date - ref) / 86400000);
    let idx = (20 + Math.floor(diff / 7)) % 30;
    return wukuList[idx < 0 ? idx + 30 : idx];
}

function getArahMeditasi(neptu) {
    const map = { 7:"Barat", 8:"Utara", 9:"Timur", 10:"Selatan", 11:"Barat", 12:"Utara", 13:"Timur", 14:"Selatan", 15:"Barat", 16:"Utara", 17:"Timur", 18:"Selatan" };
    return map[neptu] || "Pusat";
}

// ==========================================
// 3. RENDER UI DETAIL (KOMPLIT)
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()], nH = NEPTU_HARI[h], nP = NEPTU_PASARAN[pasaran], neptu = nH + nP;
    const jw = getTanggalJawa(date);
    const wuku = getWuku(date);
    const lunar = getLunarDetails(date);
    const siklus = DATA_SIKLUS_TAHUN[jw.tahun % 8];
    const sJati = (window.TABEL_SRIJATI ? window.TABEL_SRIJATI[neptu] : []) || [];

    // Tabel Pal Jati Logic
    let tbl = `<table style="width:100%; border-collapse:collapse; font-size:12px; margin-top:10px; border:1px solid #ddd;">
        <tr style="background:#f9f9f9;"><th>Usia</th><th>Nilai</th><th>Nasib</th></tr>`;
    sJati.forEach(i => {
        const v = i.v ?? i.nilai ?? 0;
        tbl += `<tr><td align="center" style="border:1px solid #ddd; padding:5px;">${i.usia || i.age} Th</td>
                <td align="center" style="border:1px solid #ddd; padding:5px; color:red;"><b>${v}</b></td>
                <td style="border:1px solid #ddd; padding:5px;">${window.SRI_JATI_DESC?.[v] || 'Cukup'}</td></tr>`;
    });
    tbl += `</table>`;

    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border:3px solid #D30000; border-radius:15px; color:#000; font-family:sans-serif;">
            <h2 style="color:#D30000; border-bottom:3px solid #D30000; display:inline-block; margin:0 0 10px 0;">${h} ${pasaran}</h2>
            <p><b>📅 Masehi:</b> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            
            <div style="background:#fff3e0; padding:12px; border-radius:10px; margin:10px 0; border:1px solid #ffe0b2;">
                <p style="margin:0; color:#e65100; font-weight:bold;">🌙 Penanggalan Jawa</p>
                <p style="margin:5px 0;">Tanggal: ${jw.tgl} ${jw.bulan.nama} ${jw.tahun} AJ</p>
                <p style="margin:5px 0; font-size:12px;">Wuku: ${wuku} | Windu: Sancaya | Tahun: ${siklus.nama}</p>
                <p style="margin:5px 0; font-size:11px; font-style:italic;">"${siklus.deskripsi}"</p>
            </div>

            <div style="background:#f1f8e9; padding:12px; border-radius:10px; margin:10px 0; border:1px solid #c5e1a5;">
                <p style="margin:0; color:#33691e; font-weight:bold;">🏮 Kalender Lunar & Shio</p>
                <p style="margin:5px 0;">Lunar: ${lunar.full} | Shio: ${lunar.shio} (${lunar.unsur})</p>
                <p style="margin:5px 0; font-size:12px; color:#1b5e20;"><b>Ramalan:</b> ${lunar.ramalan}</p>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin:10px 0; font-size:12px;">
                <div style="background:#f5f5f5; padding:8px; border-radius:5px;">
                    <b>Sifat Hari:</b><br>${DATA_SIFAT_HARI[h]}
                </div>
                <div style="background:#f5f5f5; padding:8px; border-radius:5px;">
                    <b>Sifat Pasaran:</b><br>${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}
                </div>
            </div>

            <p style="text-align:center; background:#D30000; color:#fff; padding:5px; border-radius:5px; margin:10px 0;">
                <b>Total Neptu: ${nH} + ${nP} = ${neptu}</b> | Arah: ${getArahMeditasi(neptu)}
            </p>

            <h4 style="margin:15px 0 5px 0;">📊 Tabel Pal Jati (Keberuntungan)</h4>
            ${tbl}
        </div>

        <div style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <button onclick="copyToClipboard()" style="padding:15px; background:#333; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">📋 Salin ke Docs</button>
            <button onclick="window.open('https://wa.me/?text=Weton...','_blank')" style="padding:15px; background:#25D366; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">📱 Share WA</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// --- FUNGSI GENERATE KALENDER ---
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

async function copyToClipboard() {
    const node = document.getElementById("printableArea");
    const range = document.createRange();
    range.selectNode(node);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert("✅ Berhasil disalin! Silakan tempel di Google Docs.");
}

function moveMonth(v) { currentView.setMonth(currentView.getMonth() + v); generateCalendar(); }
window.onload = generateCalendar;
