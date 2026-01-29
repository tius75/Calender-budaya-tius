/**
 * KALENDER JAWA & NUMEROLOGI PRO 2026
 * Fix: Data Lengkap, No Undefined, No Double Buttons, Anti-Blank PDF
 */

let current = new Date();
const TODAY = new Date();

// DATA DASAR
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// DATA BULAN JAWA
const DATA_BULAN_JAWA = [
    { nama: "Sura", status: "Tidak Baik" }, { nama: "Sapar", status: "Tidak Baik" },
    { nama: "Mulud", status: "Tidak Baik" }, { nama: "Bakdamulud", status: "Baik" },
    { nama: "Jumadilawal", status: "Tidak Baik" }, { nama: "Jumadilakir", status: "Kurang Baik" },
    { nama: "Rejeb", status: "Tidak Baik" }, { nama: "Ruwah", status: "Baik" },
    { nama: "Pasa", status: "Tidak Baik" }, { nama: "Syawal", status: "Sangat Tidak Baik" },
    { nama: "Dulkaidah", status: "Cukup Baik" }, { nama: "Besar", status: "Sangat Baik" }
];

// FUNGSI PENDUKUNG
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
    let bIdx = 7; // Ruwah
    while (tgl > 30) { tgl -= 30; bIdx = (bIdx + 1) % 12; }
    while (tgl <= 0) { tgl += 30; bIdx = (bIdx - 1 + 12) % 12; }
    return { tgl, bulan: DATA_BULAN_JAWA[bIdx] };
}

// UPDATE DETAIL (UTAMA)
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    // Hitung Data
    const h = HARI[date.getDay()];
    const nH = NEPTU_HARI[h];
    const nP = NEPTU_PASARAN[pasaran];
    const jawa = getTanggalJawa(date);
    const zodiak = getZodiak(date.getDate(), date.getMonth());
    const shio = getShio(date.getFullYear());
    
    // Ambil Numerologi (Pastikan numerology.js sudah terupdate)
    let lp = { angka: '?', karakter: 'Modul tidak ditemukan', bisnis: '-', jodoh: '-', hariBaik: '-' };
    if (typeof NUMEROLOGI_ENGINE !== 'undefined') {
        lp = NUMEROLOGI_ENGINE.calculateLifePath(date);
    }

    // Render HTML (Satu kontainer bersih)
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border:2px solid #D30000; border-radius:15px; font-family: sans-serif; color:#333;">
            <h2 style="color:#D30000; border-bottom:3px solid #D30000; padding-bottom:10px; margin-top:0;">${h} ${pasaran}</h2>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin:15px 0;">
                <p>📅 <b>Masehi:</b><br>${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}</p>
                <p>🌙 <b>Jawa:</b><br>${jawa.tgl} ${jawa.bulan.nama} 1959</p>
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
                    <p><b>🌟 Karakter:</b> ${lp.karakter}</p>
                    <p><b>💼 Bisnis:</b> ${lp.bisnis}</p>
                    <p><b>❤️ Jodoh:</b> ${lp.jodoh}</p>
                    <p><b>📅 Hari Baik:</b> ${lp.hariBaik}</p>
                </div>
            </div>
        </div>

        <div style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <button onclick="downloadPDF()" style="padding:15px; background:#333; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">💾 Simpan PDF</button>
            <button onclick="shareWA('${h} ${pasaran}', '${lp.angka}')" style="padding:15px; background:#25D366; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">📱 Share WA</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// FIX DOWNLOAD PDF (ANTI-BLANK)
async function downloadPDF() {
    const element = document.getElementById('printableArea');
    if (!element) return;

    const opt = {
        margin: 10,
        filename: 'Ramalan_Lengkap.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true, 
            backgroundColor: "#ffffff",
            logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (err) {
        alert("Gagal membuat PDF. Pastikan library html2pdf sudah terpasang.");
    }
}

function shareWA(weton, lp) {
    const text = `Hasil Ramalan Weton: ${weton}\nNumerologi Life Path: ${lp}\nCek selengkapnya di aplikasi kami!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

// Render awal
generateCalendar();
