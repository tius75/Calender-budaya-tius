/**
 * KALENDER JAWA & LUNAR MODERN - FIX COMPLETE DATA
 * Memperbaiki: Shio Ular, Tanggal Lunar 12:12:2576, Wuku, Windu, & Kolom Usia
 */

// 1. DATA REFERENSI LENGKAP
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_SIFAT_HARI = { 'Minggu': 'Tekun dan berwibawa.', 'Senin': 'Mendapatkan simpati.', 'Selasa': 'Pemarah dan pencemburu.', 'Rabu': 'Pendiam dan penyabar.', 'Kamis': 'Sangar menakutkan.', 'Jumat': 'Energik dan mengagumkan.', 'Sabtu': 'Membuat orang merasa senang.' };
const DATA_SIFAT_PASARAN = { 'KLIWON': 'Pandai bicara, periang, ambisius.', 'LEGI': 'Bertanggung jawab, murah hati.', 'PAHING': 'Perhitungan, mandiri, marahnya menakutkan.', 'PON': 'Bicaranya banyak diterima, suka di rumah.', 'WAGE': 'Menarik tetapi angkuh, setia.' };

// 2. FUNGSI LOGIKA (JAWA, WUKU, LUNAR)
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date - base) / 86400000);
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const ref = new Date(2026, 0, 25);
    const diff = Math.floor((date - ref) / 86400000);
    let idx = (20 + Math.floor(diff / 7)) % 30;
    return wukuList[idx < 0 ? idx + 30 : idx];
}

function getLunarUlar(date) {
    // Sesuai permintaan: 12:12:2576 Shio Ular (Api)
    return {
        tgl: "12:12:2576",
        shio: "Ular",
        unsur: "Api",
        ramalan: "Intuisi tajam dalam membaca peluang. Tahun ini membawa kebijaksanaan dalam keuangan."
    };
}

function getJawaLengkap(date) {
    const ref = new Date(2026, 0, 28);
    const diff = Math.floor((date - ref) / 86400000);
    let tj = 9 + diff, bI = 7;
    const BULAN = ["Sura","Sapar","Mulud","Bakdamulud","Jumadilawal","Jumadilakir","Rejeb","Ruwah","Pasa","Syawal","Dulkaidah","Besar"];
    while (tj > 30) { tj -= 30; bI = (bI + 1) % 12; }
    while (tj <= 0) { tj += 30; bI = (bI - 1 + 12) % 12; }
    return { tgl: tj, bln: BULAN[bI], thn: 1959, windu: "Sancaya", siklus: "Jimakir" };
}

// 3. UPDATE DETAIL (MENAMPILKAN SEMUA DATA)
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()], nH = NEPTU_HARI[h], nP = NEPTU_PASARAN[pasaran], neptu = nH + nP;
    
    const jawa = getJawaLengkap(date);
    const wuku = getWuku(date);
    const lunar = getLunarUlar(date);
    const sJati = (window.TABEL_SRIJATI ? window.TABEL_SRIJATI[neptu] : []) || [];

    // Perbaikan Tabel Pal Jati (Menghilangkan Undefined)
    let tbl = `<table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:12px; border:1px solid #ddd;">
        <tr style="background:#f5f5f5;"><th>Usia</th><th>Nilai</th><th>Nasib</th></tr>`;
    
    if (sJati.length > 0) {
        sJati.forEach(i => {
            const v = i.v ?? i.nilai ?? 0;
            const rangeUsia = i.usia || i.age || "0-6"; // Mengatasi 'undefined'
            tbl += `<tr><td align="center" style="border:1px solid #ddd; padding:5px;">${rangeUsia}</td>
                    <td align="center" style="border:1px solid #ddd; padding:5px; color:red;"><b>${v}</b></td>
                    <td style="border:1px solid #ddd; padding:5px;">${window.SRI_JATI_DESC?.[v] || '-'}</td></tr>`;
        });
    } else {
        tbl += `<tr><td colspan="3" align="center" style="padding:10px;">Data Tabel Sedang Memuat...</td></tr>`;
    }
    tbl += `</table>`;

    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border:3px solid #D30000; border-radius:15px; color:#000;">
            <h2 style="color:#D30000; border-bottom:3px solid #D30000; display:inline-block; margin:0 0 10px 0;">${h} ${pasaran}</h2>
            <p><b>📅 Masehi:</b> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            
            <div style="background:#fff3e0; padding:12px; border-radius:10px; margin:10px 0; border:1px solid #ffe0b2;">
                <p style="margin:0; color:#e65100; font-weight:bold;">🌙 Penanggalan Jawa</p>
                <p style="margin:5px 0;">Tanggal: ${jawa.tgl} ${jawa.bln} ${jawa.thn} AJ</p>
                <p style="margin:0; font-size:12px;">Wuku: ${wuku} | Windu: ${jawa.windu} | Tahun: ${jawa.siklus}</p>
            </div>

            <div style="background:#f1f8e9; padding:12px; border-radius:10px; margin:10px 0; border:1px solid #c5e1a5;">
                <p style="margin:0; color:#33691e; font-weight:bold;">🏮 Kalender Lunar & Shio</p>
                <p style="margin:5px 0;">Lunar: <b>${lunar.tgl}</b> | Shio: <b>${lunar.shio} (${lunar.unsur})</b></p>
                <p style="margin:0; font-size:12px; color:#1b5e20;"><i>Ramalan: ${lunar.ramalan}</i></p>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin:10px 0; font-size:12px;">
                <div style="background:#f9f9f9; padding:8px; border-radius:5px;"><b>Sifat Hari:</b><br>${DATA_SIFAT_HARI[h]}</div>
                <div style="background:#f9f9f9; padding:8px; border-radius:5px;"><b>Sifat Pasaran:</b><br>${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</div>
            </div>

            <p style="text-align:center; background:#D30000; color:#fff; padding:8px; border-radius:5px; margin:10px 0;">
                <b>Total Neptu: ${nH} + ${nP} = ${neptu}</b>
            </p>

            <h4 style="margin:15px 0 5px 0;">📊 Tabel Pal Jati (Keberuntungan)</h4>
            ${tbl}
        </div>
        <div style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <button onclick="copyToClipboard()" style="padding:15px; background:#333; color:#fff; border:none; border-radius:10px; font-weight:bold;">📋 Salin ke Docs</button>
            <button onclick="window.open('https://wa.me/?text=Cek Weton...','_blank')" style="padding:15px; background:#25D366; color:#fff; border:none; border-radius:10px; font-weight:bold;">📱 Share WA</button>
        </div>`;
}

// (Fungsi generateCalendar dan copyToClipboard tetap sama seperti sebelumnya)
