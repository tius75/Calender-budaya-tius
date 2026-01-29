/**
 * KALENDER JAWA MODERN - VERSI LENGKAP 2026
 * Perbaikan: Tabel Pal Jati, Numerologi, dan Hapus Tombol PDF
 */

// ==========================================
// KONSTANTA & DATA REFERENSI (KODE ASLI)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius, urakan, kurang bisa membalas budi, setia pada janji, ceroboh memilih makanan, banyak selamat dan doanya.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan, selalu gembira seperti tidak pernah susah, sering kena fitnah, kuat tidak tidur malam hari, berhati-hati namun sering bingung sendiri, bicaranya berisi.',
    'PAHING': 'Selalu ingin memiliki (barang), kesungguhannya penuh perhitungan untuk mendapatkan untung, suka menolong, mandiri, kuat lapar, banyak musuhnya, marahnya menakutkan.',
    'PON': 'Bicaranya banyak diterima orang, suka tinggal di rumah, tidak mau memakan yang bukan kepunyaannya sendiri, suka marah kepada keluarganya, jalan pikirannya sering berbeda.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut, malas mencari nafkah perlu dibantu orang lain, kaku hati, sering gelap pikiran dan mendapat fitnah.'
};

const DATA_SIFAT_HARI = {
    'Minggu': 'Tekun, mandiri dan berwibawa.',
    'Senin': 'Selalu berubah, indah dan selalu mendapatkan simpati.',
    'Selasa': 'Pemarah dan pencemburu serta luas pergaulannya.',
    'Rabu': 'Pendiam, pemomong dan penyabar.',
    'Kamis': 'Sangar menakutkan.',
    'Jumat': 'Energik dan mengagumkan.',
    'Sabtu': 'Membuat orang merasa senang dan susah ditebak.'
};

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
    4: { nama: "Loro", arti: "Sering menghadapi rintangan kesehatan/hidup." },
    0: { nama: "Pati", arti: "Banyak hambatan, perlu kehati-hatian." }
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

let current = new Date();
const TODAY = new Date();

// ==========================================
// LOGIKA PERHITUNGAN (GETTERS)
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getZodiak(date) {
    const d = date.getDate(); const m = date.getMonth() + 1;
    if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return "Aries";
    if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return "Taurus";
    if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) return "Gemini";
    if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) return "Cancer";
    if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return "Leo";
    if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return "Virgo";
    if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) return "Libra";
    if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) return "Scorpio";
    if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) return "Sagittarius";
    if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) return "Capricorn";
    if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return "Aquarius";
    return "Pisces";
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const refDate = new Date(2026, 0, 25); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let wukuIndex = (20 + Math.floor(diffDays / 7)) % 30;
    while (wukuIndex < 0) wukuIndex += 30;
    return wukuList[wukuIndex];
}

function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let tglJawa = 9 + diffDays;
    let bulanIdx = 7; 
    let tahunJawa = 1959;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; if (bulanIdx === 0) tahunJawa++; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; if (bulanIdx === 11) tahunJawa--; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: tahunJawa };
}

// ==========================================
// RENDER UI & UPDATE DETAIL (LENGKAP)
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const nHari = NEPTU_HARI[h];
    const nPasaran = NEPTU_PASARAN[pasaran];
    const neptuTotal = nHari + nPasaran;
    
    const wukuName = getWuku(date);
    const infoJawa = getTanggalJawa(date);
    const zodiak = getZodiak(date);
    const nasibKematian = NASIB_AHLI_WARIS[neptuTotal % 4];
    const nasib5 = PEMBAGI_5[neptuTotal % 5];
    
    const sifatHariIni = DATA_SIFAT_HARI[h] || "-";
    const sifatPasaranIni = DATA_SIFAT_PASARAN[pasaran.toUpperCase()] || "-";

    // Numerologi FIX
    let lp = { angka: '?', karakter: '-' };
    if (typeof NUMEROLOGI_ENGINE !== 'undefined') {
        const res = NUMEROLOGI_ENGINE.calculateLifePath(date);
        lp = { angka: res.angka || '?', karakter: res.karakter || res.deskripsi || "Karakter belum tersedia." };
    }

    // Tabel Pal Jati (Fixing 'undefined' age/usia)
    const dataSriJati = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptuTotal] || []) : [];
    let tabelHtml = `<table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.85rem; border:1px solid #ddd;">
        <thead><tr style="background:#f9f9f9;"><th style="border:1px solid #ddd; padding:8px;">Usia</th><th style="border:1px solid #ddd; padding:8px;">Nilai</th><th style="border:1px solid #ddd; padding:8px;">Nasib</th></tr></thead><tbody>`;

    if (dataSriJati.length > 0) {
        dataSriJati.forEach(item => {
            const rangeUsia = item.usia || item.age || "-"; // FIX: Cek dua kemungkinan properti
            const skor = item.v !== undefined ? item.v : (item.nilai || 0);
            const desc = (typeof SRI_JATI_DESC !== 'undefined') ? (SRI_JATI_DESC[skor] || "-") : "Data tidak ada";
            tabelHtml += `<tr><td style="border:1px solid #ddd; padding:8px; text-align:center;">${rangeUsia}</td><td style="border:1px solid #ddd; padding:8px; text-align:center; color:#D30000; font-weight:bold;">${skor}</td><td style="border:1px solid #ddd; padding:8px;">${desc}</td></tr>`;
        });
    } else { tabelHtml += `<tr><td colspan="3" style="text-align:center; padding:10px;">Data Pal Jati tidak ditemukan</td></tr>`; }
    tabelHtml += `</tbody></table>`;

    const isNaas = infoJawa.bulan.naas.includes(infoJawa.tanggal);
    const isTaliWangke = (wetonKey === infoJawa.bulan.taliWangke);
    let colorStatus = infoJawa.bulan.status.includes("Tidak") ? "#d32f2f" : "#2e7d32";

    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border-radius:12px; border:2px solid #D30000; color:#000;">
            ${(isNaas || isTaliWangke) ? `<div style="background:#ffebee; color:#c62828; padding:10px; border-radius:8px; margin-bottom:15px; border-left:5px solid #d32f2f;"><strong>⚠️ PERINGATAN:</strong> ${isNaas ? 'Hari Naas' : ''} ${isTaliWangke ? 'Tali Wangke' : ''}</div>` : ""}
            
            <h2 style="color:#D30000; margin:0; border-bottom:2px solid #D30000;">${wetonKey}</h2>
            <p style="margin:10px 0;"><b>📅 Masehi:</b> ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} | <b>🌙 Jawa:</b> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun}</p>
            
            <div style="background:#f5f5f5; padding:10px; border-radius:8px; font-size:0.85rem; margin-bottom:10px;">
                <p><strong>Status Bulan:</strong> <span style="color:${colorStatus}; font-weight:bold;">${infoJawa.bulan.status}</span> | <strong>Zodiak:</strong> ${zodiak} | <strong>Wuku:</strong> ${wukuName}</p>
            </div>

            <div style="margin:15px 0; padding:12px; background:#fff8e1; border:1px solid #ffe0b2; border-radius:8px; font-size:0.85rem;">
                <p><strong>Sifat ${h}:</strong> ${sifatHariIni}</p>
                <p style="margin-top:5px;"><strong>Sifat ${pasaran}:</strong> ${sifatPasaranIni}</p>
            </div>

            <div style="background:#f0f7ff; border:1px solid #cfe2ff; padding:12px; border-radius:10px; margin-bottom:15px;">
                <h4 style="margin:0 0 5px 0; color:#084298;">🔮 Numerologi Life Path: ${lp.angka}</h4>
                <p style="font-size:0.85rem; margin:0;">${lp.karakter}</p>
            </div>

            <div style="text-align:center; padding:10px; background:#fafafa; border:1px solid #ddd; border-radius:8px; margin-bottom:15px;">
                <b>Kalkulasi Neptu: ${h}(${nHari}) + ${pasaran}(${nPasaran}) = <span style="color:#D30000; font-size:1.2rem;">${neptuTotal}</span></b>
            </div>

            <h4 style="margin:0 0 5px 0;">📈 Tabel Keberuntungan (Pal Jati)</h4>
            ${tabelHtml}

            <div style="margin-top:15px; font-size:0.85rem;">
                <p><strong>Nasib:</strong> ${nasib5.nama} (${nasib5.arti})</p>
                <p><strong>Ahli Waris:</strong> ${nasibKematian.nama} (${nasibKematian.arti})</p>
            </div>
        </div>

        <div style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <button onclick="copyToClipboard()" style="padding:15px; background:#333; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">📋 Salin ke Docs</button>
            <button onclick="shareWA('${wetonKey}', '${lp.angka}')" style="padding:15px; background:#25D366; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">📱 Share WA</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// FUNGSI COPY & SHARE (HAPUS PDF)
// ==========================================

async function copyToClipboard() {
    const source = document.getElementById("printableArea");
    if (!source) return alert("Pilih tanggal dulu!");
    try {
        const range = document.createRange();
        range.selectNode(source);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alert("✅ Berhasil disalin! Termasuk Tabel Pal Jati. Silakan Paste di Google Docs.");
    } catch (err) { alert("Gagal menyalin otomatis."); }
}

function shareWA(weton, lp) {
    window.open(`https://wa.me/?text=${encodeURIComponent('Ramalan Weton: '+weton+'\nNumerologi Life Path: '+lp)}`, '_blank');
}

// Tambahkan sisa fungsi (generateCalendar, searchWeton, window.onload) dari kode 485 baris Anda.
