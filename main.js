/**
 * KALENDER JAWA MODERN - VERSI UPDATE 2026
 * Fitur: Detail Neptu, Status Bulan Jawa (Naas & Tali Wangke), Salin ke Clipboard
 */

// ==========================================
// KONSTANTA & DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// DATA SIFAT TAMBAHAN
const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius, urakan, kurang bisa membalas budi, setia pada janji, ceroboh memilih makanan, banyak selamat dan doanya.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan, selalu gembira seperti tidak pernah susah, sering kena fitnah, kuat tidak tidur malam hari, berhati-hati namun sering bingung sendiri, bicaranya berisi. Banyak keberuntungan dan kesialannya.',
    'PAHING': 'Selalu ingin memiliki (barang), kesungguhannya penuh perhitungan untuk mendapatkan untung, suka menolong, mandiri, kuat lapar, banyak musuhnya, kalau tersinggung menakutkan marahnya, suka kebersihan. Sering kena tipu dan kalau kehilangan jarang bisa menemukan kembali.',
    'PON': 'Bicaranya banyak diterima orang, suka tinggal di rumah, tidak mau memakan yang bukan kepunyaannya sendiri, suka marah kepada keluarganya, jalan pikirannya sering berbeda dengan pandangan umum. Suka berbantahan, berani kepada atasan. Rejekinya cukup.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut, malas mencari nafkah perlu dibantu orang lain, kaku hati, tidak bisa berpikir panjang, sering gelap pikiran dan mendapat fitnah.'
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
    0: { nama: "Pati", arti: "Banyak hambatan, perlu kehati-hatian dalam melangkah." }
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
// FUNGSI LOGIKA DASAR
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

function getLunarShio(date) {
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    const year = date.getFullYear();
    const isEarly = (date.getMonth() === 0) || (date.getMonth() === 1 && date.getDate() < 10);
    const index = isEarly ? (year - 1) % 12 : year % 12;
    return { shio: shios[index], lunarYear: year + 3760 };
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
    const refTglJawa = 9;
    const refBulanIdx = 7; 
    const refTahunJawa = 1959;
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let totalHariJawa = refTglJawa + diffDays;
    let bulanIdx = refBulanIdx;
    let tahunJawa = refTahunJawa;
    let tglJawa = totalHariJawa;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; if (bulanIdx === 0) tahunJawa++; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; if (bulanIdx === 11) tahunJawa--; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: tahunJawa };
}

function getMangsaInfo(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    let id = 12; 
    if ((d >= 22 && m == 6) || (m == 7) || (d <= 1 && m == 8)) id = 1;
    else if (d >= 2 && m == 8 && d <= 25) id = 2;
    else if ((d >= 26 && m == 8) || (d <= 18 && m == 9)) id = 3;
    else if ((d >= 19 && m == 9) || (d <= 13 && m == 10)) id = 4;
    else if ((d >= 14 && m == 10) || (d <= 9 && m == 11)) id = 5;
    else if ((d >= 10 && m == 11) || (d <= 22 && m == 12)) id = 6;
    else if ((d >= 23 && m == 12) || (m == 1) || (d <= 3 && m == 2)) id = 7;
    else if (m == 2 && d >= 4) id = 8;
    else if (m == 3 && d <= 26) id = 9;
    else if ((d >= 27 && m == 3) || (d <= 19 && m == 4)) id = 10;
    else if ((d >= 20 && m == 4) || (d <= 12 && m == 5)) id = 11;
    return (typeof DATA_MANGSA !== 'undefined') ? DATA_MANGSA[id] : null;
}

function getArahMeditasi(neptu) {
    const map = {
        7: "Kulon - Barat", 8: "Lor - Utara", 9: "Wetan - Timur", 10: "Kidul - Selatan",
        11: "Kulon - Barat", 12: "Lor - Utara", 13: "Wetan - Timur", 14: "Kidul - Selatan",
        15: "Kulon - Barat", 16: "Lor - Utara", 17: "Wetan - Timur", 18: "Kidul - Selatan"
    };
    return map[neptu] || "Pusat";
}

function hitungUsiaLengkap(birthDate) {
    let now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    if (days < 0) {
        months--;
        let lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    return `${years} Tahun, ${months} Bulan, ${days} Hari`;
}

// ==========================================
// FUNGSI CARI WETON (FIX)
// ==========================================
function searchWeton() {
    const input = document.getElementById('dateInput');
    if (!input || !input.value) return alert("Silakan pilih tanggal terlebih dahulu!");
    
    const target = new Date(input.value);
    current = new Date(target.getFullYear(), target.getMonth(), 1);
    
    generateCalendar();
    updateDetail(target, getPasaran(target));
}

// ==========================================
// RENDER UI KALENDER
// ==========================================
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    mNav.innerText = `${namaBulan[m]} ${y}`;

    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day' + (i === 0 ? ' sunday-red' : '');
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
        
        if (dateObj.getDay() === 0) cell.classList.add('sunday-red');
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
    const wetonKey = `${h} ${pasaran}`;
    const nHari = NEPTU_HARI[h];
    const nPasaran = NEPTU_PASARAN[pasaran];
    const neptuTotal = nHari + nPasaran;
    
    const wukuName = getWuku(date);
    const infoJawa = getTanggalJawa(date);
    const mangsa = getMangsaInfo(date);
    const zodiak = getZodiak(date);
    const lunar = getLunarShio(date);
    const nasibKematian = NASIB_AHLI_WARIS[neptuTotal % 4];
    const nasib5 = PEMBAGI_5[neptuTotal % 5];
    const arahMeditasi = getArahMeditasi(neptuTotal);
    const usia = hitungUsiaLengkap(date);
    
    // Ambil Sifat Hari & Pasaran
    const sifatHariIni = DATA_SIFAT_HARI[h] || "-";
    const sifatPasaranIni = DATA_SIFAT_PASARAN[pasaran.toUpperCase()] || "-";

    const watakNeptu = (typeof DATA_WATAK_NEPTU !== 'undefined') ? DATA_WATAK_NEPTU[neptuTotal] : null;
    const namaBulanMasehi = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const tglMasehiLengkap = `${date.getDate()} ${namaBulanMasehi[date.getMonth()]} ${date.getFullYear()}`;

    const teksWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wukuName] || "Detail wuku belum tersedia.") : "Data Wuku tidak ditemukan.";
    const teksHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[wetonKey] || "Data watak hari belum tersedia.") : "Data Hari tidak ditemukan.";
    const dataSriJati = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptuTotal] || []) : [];

    const isNaas = infoJawa.bulan.naas.includes(infoJawa.tanggal);
    const isTaliWangke = (wetonKey === infoJawa.bulan.taliWangke);

    // Styling khusus untuk status Bulan
    let colorStatus = "#2e7d32"; // Hijau (Baik)
    if (infoJawa.bulan.status.includes("Tidak")) colorStatus = "#d32f2f"; // Merah
    else if (infoJawa.bulan.status.includes("Kurang")) colorStatus = "#ed6c02"; // Oranye

    let warningNaas = "";
    if (isNaas || isTaliWangke) {
        warningNaas = `<div style="background:#ffebee; color:#c62828; padding:12px; border-radius:8px; margin-bottom:15px; border-left:5px solid #d32f2f; font-size:0.85rem;">
            <strong>⚠️ PERINGATAN HARI KRITIS</strong><br>
            ${isNaas ? `• Tanggal ${infoJawa.tanggal} ${infoJawa.bulan.nama} merupakan <b>Hari Naas</b>.<br>` : ""}
            ${isTaliWangke ? `• Hari ini merupakan <b>Tali Wangke</b>.` : ""}
        </div>`;
    }

    let tabelHtml = `<table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.85rem; border:1px solid #ddd;">
        <thead><tr style="background:#f9f9f9;"><th style="border:1px solid #ddd; padding:8px;">Usia</th><th style="border:1px solid #ddd; padding:8px;">Nilai</th><th style="border:1px solid #ddd; padding:8px;">Nasib</th></tr></thead><tbody>`;

    if (dataSriJati && dataSriJati.length > 0) {
        dataSriJati.forEach(item => {
            const skor = item.nilai !== undefined ? item.nilai : (item.v !== undefined ? item.v : 0);
            const rangeUsia = item.usia || item.age || "-";
            const deskripsi = (typeof SRI_JATI_DESC !== 'undefined') ? (SRI_JATI_DESC[skor] || "Data tidak ada") : "Deskripsi Error";
            tabelHtml += `<tr><td style="border:1px solid #ddd; padding:8px; text-align:center;">${rangeUsia} Thn</td><td style="border:1px solid #ddd; padding:8px; text-align:center; color:#D30000; font-weight:bold;">${skor}</td><td style="border:1px solid #ddd; padding:8px;">${deskripsi}</td></tr>`;
        });
    } else {
        tabelHtml += `<tr><td colspan="3" style="text-align:center; padding:10px;">Data tidak ditemukan</td></tr>`;
    }
    tabelHtml += `</tbody></table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" class="card-result" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #eee; box-shadow: 0 4px 6px rgba(0,0,0,0.05); color:#000;">
            ${warningNaas}
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <h2 style="color:#D30000; margin:0 0 5px 0; border-bottom:2px solid #D30000; display:inline-block;">${wetonKey}</h2>
                <button onclick="copyToClipboard()" style="background:#4CAF50; color:white; border:none; padding:8px 16px; border-radius:6px; font-size:0.9rem; cursor:pointer; display:flex; align-items:center; gap:5px;">
                    📋 Salin ke Google Docs
                </button>
            </div>
            <p style="margin:10px 0 0; font-size:1.15rem; font-weight:bold;">📅 ${tglMasehiLengkap}</p>
            <p style="margin:5px 0; color:#d30000; font-weight:500;"><strong>Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            
            <div style="margin:10px 0; padding:10px; background:#f5f5f5; border-radius:8px; border:1px solid #ddd; font-size:0.85rem;">
                <p style="margin:0;"><strong>Status Bulan:</strong> <span style="color:${colorStatus}; font-weight:bold;">${infoJawa.bulan.status}</span></p>
                <p style="margin:4px 0;"><strong>Tali Wangke:</strong> ${infoJawa.bulan.taliWangke}</p>
                <p style="margin:0; font-size:0.8rem; color:#666;"><strong>Daftar Tanggal Naas:</strong> ${infoJawa.bulan.naas.join(", ")}</p>
            </div>

            <div style="margin:15px 0; padding:12px; border:1px solid #ffe0b2; background:#fff8e1; border-radius:8px;">
                <h4 style="margin:0 0 5px 0; color:#e65100; font-size:0.95rem;">🎭 Karakter Hari & Pasaran</h4>
                <p style="font-size:0.85rem; margin:0;"><strong>Sifat ${h}:</strong> ${sifatHariIni}</p>
                <p style="font-size:0.85rem; margin:5px 0 0 0;"><strong>Sifat ${pasaran}:</strong> ${sifatPasaranIni}</p>
            </div>

            <p style="margin:5px 0; font-size:0.9rem;"><strong>Lunar:</strong> ${lunar.lunarYear} (Shio ${lunar.shio}) | <strong>Zodiak:</strong> ${zodiak}</p>
            
            <div style="background:#f0f7ff; border:1px solid #cfe2ff; padding:10px; border-radius:8px; margin:10px 0;">
                <p style="margin:0; font-size:0.9rem;"><strong>⏳ Usia Saat Ini:</strong> ${usia}</p>
                <p style="margin:5px 0 0; font-size:0.9rem;"><strong>🧘 Arah Meditasi:</strong> ${arahMeditasi}</p>
            </div>

            <div style="background:#fafafa; border:1px solid #ccc; padding:10px; border-radius:8px; margin:10px 0; display:flex; justify-content:space-around; text-align:center;">
                <div><span style="font-size:0.75rem; color:#666;">Neptu Hari</span><br><strong>${h} (${nHari})</strong></div>
                <div style="font-size:1.5rem; color:#ccc;">+</div>
                <div><span style="font-size:0.75rem; color:#666;">Neptu Pasaran</span><br><strong>${pasaran} (${nPasaran})</strong></div>
                <div style="font-size:1.5rem; color:#ccc;">=</div>
                <div><span style="font-size:0.75rem; color:#666;">Total Neptu</span><br><strong style="color:#D30000; font-size:1.1rem;">${neptuTotal}</strong></div>
            </div>

            <div style="background:#e8f5e9; border:1px solid #c8e6c9; padding:12px; border-radius:8px; margin:15px 0;">
                <h4 style="margin:0; color:#2e7d32; font-size:0.95rem;">💎 Nasib Pembagi 5: ${nasib5.nama}</h4>
                <p style="font-size:0.85rem; margin-top:5px;">${nasib5.arti}</p>
            </div>

            <p style="margin:10px 0;"><strong>Wuku:</strong> ${wukuName}</p>
            ${watakNeptu ? `<div style="margin:15px 0; padding:12px; border:1px solid #e1bee7; border-radius:8px; background:#f3e5f5;"><h4 style="color:#7b1fa2; margin:0 0 5px 0; border-bottom:1px solid #d1c4e9; font-size:0.95rem;">🌟 Watak Neptu ${neptuTotal}</h4><p style="font-size:0.85rem; line-height:1.5; color:#4a148c;">${watakNeptu.watak}</p></div>` : ""}
            <div style="margin:15px 0; padding:10px; background:#fffcf0; border-left:4px solid #f1c40f; border-radius:4px;"><h4 style="margin:0; color:#856404; font-size:0.9rem;">🪦 Nasib Kematian (Ahli Waris)</h4><p style="margin:5px 0 0; font-weight:bold;">${nasibKematian.nama}</p><p style="margin:2px 0 0; font-size:0.85rem; font-style:italic;">"${nasibKematian.arti}"</p></div>
            ${mangsa ? `<div style="margin:15px 0; padding:12px; border:1px solid #cfe2ff; background:#f0f7ff; border-radius:8px;"><h4 style="margin:0; color:#084298; font-size:0.95rem;">🌾 Pranata Mangsa: ${mangsa.nama}</h4><p style="font-size:0.85rem; margin-top:5px; line-height:1.4;">${mangsa.deskripsi}</p></div>` : ""}
            <div style="margin-top:20px;"><h4 style="color:#D30000; border-bottom:1px solid #eee; padding-bottom:5px;">🛡️ Analisis Wuku ${wukuName}</h4><div style="font-size:0.85rem; line-height:1.5;">${teksWuku}</div></div>
            <div style="margin-top:20px;"><h4 style="color:#D30000; border-bottom:1px solid #eee; padding-bottom:5px;">📈 Siklus Sri Jati (Rejeki)</h4>${dataSriJati.length > 0 ? tabelHtml : "<p style='color:#999;'>Data tidak tersedia.</p>"}</div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// FUNGSI SALIN KE CLIPBOARD (UNTUK GOOGLE DOCS)
// ==========================================
function copyToClipboard() {
    const source = document.getElementById("printableArea");
    if (!source) {
        alert("Data tidak ditemukan!");
        return;
    }

    const btn = event.target;
    const originalBtnText = btn.innerText;
    btn.innerText = "⏳ Menyalin...";
    btn.disabled = true;

    try {
        // Buat salinan untuk memanipulasi konten
        const tempDiv = source.cloneNode(true);
        
        // Hapus tombol salin dari konten yang akan disalin
        const buttonToRemove = tempDiv.querySelector('button[onclick*="copyToClipboard"]');
        if (buttonToRemove) {
            buttonToRemove.remove();
        }
        
        // Konversi ke format yang mudah dibaca untuk Google Docs
        const contentToCopy = formatForGoogleDocs(tempDiv);
        
        // Gunakan Clipboard API untuk menyalin teks
        navigator.clipboard.writeText(contentToCopy)
            .then(() => {
                alert("✅ Data berhasil disalin ke clipboard!\nAnda dapat paste (Ctrl+V) langsung ke Google Docs.");
            })
            .catch(err => {
                console.error("Gagal menyalin: ", err);
                // Fallback untuk browser lama
                fallbackCopyTextToClipboard(contentToCopy);
            });
    } catch (e) {
        console.error("Error saat menyalin: ", e);
        alert("❌ Gagal menyalin data. Silakan coba lagi.");
    } finally {
        btn.innerText = originalBtnText;
        btn.disabled = false;
    }
}

function formatForGoogleDocs(element) {
    let result = "";
    
    // Fungsi rekursif untuk mengurai elemen
    function parseNode(node, depth = 0) {
        // Skip elemen skrip, style, tombol
        if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE' || 
            (node.tagName === 'BUTTON' && node.onclick && node.onclick.toString().includes('copyToClipboard'))) {
            return;
        }
        
        // Tambahkan padding berdasarkan kedalaman
        const indent = " ".repeat(depth * 2);
        
        // Tangani berbagai jenis node
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (text) {
                result += indent + text + "\n";
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();
            
            // Tangani heading
            if (tag.startsWith('h') && tag.length === 2 && !isNaN(tag[1])) {
                result += "\n" + indent + node.textContent.trim().toUpperCase() + "\n";
                result += indent + "=".repeat(node.textContent.trim().length) + "\n\n";
            }
            
            // Tangani paragraf
            else if (tag === 'p') {
                const text = node.textContent.trim();
                if (text) {
                    result += indent + text + "\n\n";
                }
            }
            
            // Tangani div dengan konten khusus
            else if (tag === 'div') {
                // Cek apakah ini container khusus
                const style = node.getAttribute('style') || '';
                if (style.includes('background:#f5f5f5') || style.includes('background:#fff8e1') || 
                    style.includes('background:#f0f7ff') || style.includes('background:#e8f5e9') ||
                    style.includes('background:#fffcf0') || style.includes('background:#f3e5f5')) {
                    result += "\n" + indent + "─".repeat(50) + "\n";
                    for (let child of node.childNodes) {
                        parseNode(child, depth + 1);
                    }
                    result += indent + "─".repeat(50) + "\n";
                    return;
                }
            }
            
            // Tangani tabel
            else if (tag === 'table') {
                result += "\n" + indent + "TABEL SIKLUS SRI JATI\n";
                
                // Ambil header
                const headers = [];
                const rows = [];
                
                // Proses header
                const ths = node.querySelectorAll('th');
                ths.forEach(th => {
                    headers.push(th.textContent.trim());
                });
                
                // Proses baris data
                const trs = node.querySelectorAll('tbody tr');
                trs.forEach(tr => {
                    const row = [];
                    const tds = tr.querySelectorAll('td');
                    tds.forEach(td => {
                        row.push(td.textContent.trim());
                    });
                    rows.push(row);
                });
                
                // Format tabel sebagai teks dengan kolom yang rapi
                if (headers.length > 0) {
                    // Hitung lebar kolom
                    const colWidths = headers.map((h, i) => {
                        const maxContent = Math.max(
                            h.length,
                            ...rows.map(row => row[i] ? row[i].length : 0)
                        );
                        return Math.min(maxContent + 2, 30); // Batasi maksimal 30 karakter
                    });
                    
                    // Header
                    let headerLine = "";
                    headers.forEach((h, i) => {
                        headerLine += h.padEnd(colWidths[i], " ");
                    });
                    result += indent + headerLine + "\n";
                    
                    // Garis pemisah
                    let separatorLine = "";
                    colWidths.forEach(width => {
                        separatorLine += "─".repeat(width);
                    });
                    result += indent + separatorLine + "\n";
                    
                    // Data
                    rows.forEach(row => {
                        let rowLine = "";
                        row.forEach((cell, i) => {
                            rowLine += cell.padEnd(colWidths[i], " ");
                        });
                        result += indent + rowLine + "\n";
                    });
                }
                result += "\n";
                return;
            }
            
            // Lanjutkan ke child nodes
            for (let child of node.childNodes) {
                parseNode(child, depth);
            }
        }
    }
    
    // Parse seluruh konten
    for (let child of element.childNodes) {
        parseNode(child);
    }
    
    // Bersihkan hasil akhir
    result = result.replace(/\n{3,}/g, "\n\n");
    
    // Tambahkan header
    const header = "=".repeat(60) + "\n" +
                  "LAPORAN DETAIL WETON JAWA\n" +
                  "=".repeat(60) + "\n\n" +
                  `Dibuat pada: ${new Date().toLocaleDateString('id-ID')}\n\n`;
    
    return header + result;
}

// Fallback untuk browser lama
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert("✅ Data berhasil disalin ke clipboard!\nAnda dapat paste (Ctrl+V) langsung ke Google Docs.");
        } else {
            alert("❌ Gagal menyalin data. Silakan coba manual dengan Ctrl+C.");
        }
    } catch (err) {
        console.error('Fallback copy error: ', err);
        alert("❌ Gagal menyalin data.");
    }
    
    document.body.removeChild(textArea);
}

// ==========================================
// FITUR SHARE (TETAP ADA)
// ==========================================

/**
 * FUNGSI SHARE WHATSAPP DENGAN SRI JATI FULL & FORMAT RAPI
 */

function shareWhatsApp() {
    const detailArea = document.getElementById('printableArea');
    if (!detailArea) {
        alert("Data tidak ditemukan!");
        return;
    }

    // Tampilkan loading di tombol
    const btn = event?.target;
    const originalText = btn?.innerText || "📱 Share WA";
    if (btn) {
        btn.innerHTML = "⏳ Memproses...";
        btn.disabled = true;
    }

    try {
        // Format teks untuk WhatsApp
        const formattedText = formatWhatsAppContent(detailArea);
        
        // Tambahkan header dan footer
        const header = "🌟 *HASIL LENGKAP CEK WETON JAWA* 🌟\n" +
                       "═══════════════════════════════════\n\n";
        
        const footer = "\n═══════════════════════════════════\n" +
                       "_Dikirim melalui Aplikasi Kalender Jawa_ 📱";
        
        const finalText = header + formattedText + footer;
        
        // Encode untuk URL WhatsApp
        const encodedText = encodeURIComponent(finalText);
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
        
    } catch (error) {
        console.error("Error sharing to WhatsApp:", error);
        alert("Terjadi kesalahan saat memproses data untuk WhatsApp.");
    } finally {
        // Kembalikan tombol ke keadaan semula
        if (btn) {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }
}

function formatWhatsAppContent(element) {
    let result = "";
    
    // Clone elemen untuk manipulasi
    const tempDiv = element.cloneNode(true);
    
    // Hapus tombol dari konten
    const buttons = tempDiv.querySelectorAll('button');
    buttons.forEach(btn => btn.remove());
    
    // Ambil semua teks
    const allText = tempDiv.textContent || tempDiv.innerText;
    
    // Bersihkan dan format teks
    const cleanedText = cleanWhatsAppText(allText);
    
    // Pisahkan menjadi sections
    const sections = cleanedText.split(/\n{2,}/).filter(s => s.trim() !== '');
    
    // Proses setiap section
    sections.forEach(section => {
        const lines = section.split('\n').map(l => l.trim()).filter(l => l !== '');
        
        if (lines.length === 0) return;
        
        const firstLine = lines[0];
        
        // Format berdasarkan jenis konten
        if (firstLine.includes('PERINGATAN')) {
            result += formatWarningSection(lines);
        } 
        else if (isWetonLine(firstLine)) {
            result += formatWetonSection(lines);
        }
        else if (firstLine.includes('Status Bulan')) {
            result += formatBulanJawaSection(lines);
        }
        else if (firstLine.includes('Sifat')) {
            result += formatKarakterSection(lines);
        }
        else if (firstLine.includes('Lunar') || firstLine.includes('Zodiak')) {
            result += formatAstrologiSection(lines);
        }
        else if (firstLine.includes('Usia') || firstLine.includes('Arah')) {
            result += formatPersonalInfoSection(lines);
        }
        else if (firstLine.includes('Neptu')) {
            result += formatNeptuSection(lines);
        }
        else if (firstLine.includes('Nasib Pembagi')) {
            result += formatNasibSection(lines);
        }
        else if (firstLine.includes('Wuku')) {
            result += formatWukuSection(lines);
        }
        else if (firstLine.includes('Watak Neptu')) {
            result += formatWatakNeptuSection(lines);
        }
        else if (firstLine.includes('Nasib Kematian')) {
            result += formatKematianSection(lines);
        }
        else if (firstLine.includes('Pranata Mangsa')) {
            result += formatMangsaSection(lines);
        }
        else if (firstLine.includes('Analisis Wuku')) {
            result += formatAnalisisWukuSection(lines);
        }
        else if (section.includes('Siklus Sri Jati') || 
                 (lines.length >= 2 && lines.some(l => l.includes('Thn') && l.includes('Nasib')))) {
            result += formatSriJatiSection(section, tempDiv);
        }
        else {
            result += formatGenericSection(lines);
        }
        
        result += "\n";
    });
    
    // Jika Sri Jati belum diproses, coba ekstrak dari HTML
    if (!result.includes('SRI JATI')) {
        const sriJatiData = extractSriJatiFromHTML(tempDiv);
        if (sriJatiData && sriJatiData.length > 0) {
            result += formatSriJatiTable(sriJatiData);
        }
    }
    
    return result.trim();
}

// ==========================================
// FUNGSI PEMBANTU FORMATTING
// ==========================================

function cleanWhatsAppText(text) {
    return text
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n\n')
        .replace(/([.,!?;:])\s{2,}/g, '$1 ')
        .replace(/\s+\./g, '.')
        .trim();
}

function isWetonLine(line) {
    const wetonDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    return wetonDays.some(day => line.includes(day));
}

function formatWarningSection(lines) {
    let result = "⚠️ *PERINGATAN HARI KRITIS:*\n";
    lines.forEach((line, i) => {
        if (i === 0) return;
        if (line.includes('Tanggal') || line.includes('Tali Wangke')) {
            result += `   • ${line}\n`;
        }
    });
    return result + "\n";
}

function formatWetonSection(lines) {
    let result = "📅 *INFORMASI UTAMA:*\n";
    lines.slice(0, 3).forEach(line => {
        result += `   ${line}\n`;
    });
    return result;
}

function formatBulanJawaSection(lines) {
    let result = "🌙 *STATUS BULAN JAWA:*\n";
    lines.forEach(line => {
        if (line.includes('Status') || line.includes('Tali') || line.includes('Daftar')) {
            result += `   • ${line}\n`;
        }
    });
    return result;
}

function formatKarakterSection(lines) {
    let result = "🎭 *KARAKTER HARI & PASARAN:*\n";
    lines.forEach(line => {
        if (line.length > 5) {
            result += `   • ${line.substring(0, 60)}\n`;
        }
    });
    return result;
}

function formatAstrologiSection(lines) {
    let result = "✨ *ASTROLOGI:*\n";
    lines.forEach(line => {
        result += `   • ${line}\n`;
    });
    return result;
}

function formatPersonalInfoSection(lines) {
    let result = "👤 *INFORMASI PRIBADI:*\n";
    lines.forEach(line => {
        result += `   • ${line}\n`;
    });
    return result;
}

function formatNeptuSection(lines) {
    let result = "🧮 *PERHITUNGAN NEPTU:*\n";
    
    // Cari total neptu
    let totalNeptu = "";
    lines.forEach(line => {
        if (line.includes('Total Neptu')) {
            totalNeptu = line;
        } else if (line.includes('Neptu')) {
            result += `   • ${line}\n`;
        }
    });
    
    if (totalNeptu) {
        result += `   • ${totalNeptu}\n`;
    }
    
    return result;
}

function formatNasibSection(lines) {
    let result = "💎 *NASIB PEMBAGI 5:*\n";
    lines.forEach(line => {
        result += `   • ${line}\n`;
    });
    return result;
}

function formatWukuSection(lines) {
    let result = "📜 *WUKU:*\n";
    lines.forEach(line => {
        if (line.length > 5 && !line.includes('Analisis')) {
            result += `   • ${line.substring(0, 50)}\n`;
        }
    });
    return result;
}

function formatWatakNeptuSection(lines) {
    let result = "🌟 *WATAK NEPTU:*\n";
    lines.slice(1).forEach((line, i) => {
        if (i < 2) { // Ambil 2 baris pertama saja
            result += `   • ${line.substring(0, 60)}\n`;
        }
    });
    return result;
}

function formatKematianSection(lines) {
    let result = "🪦 *NASIB KEMATIAN:*\n";
    lines.forEach(line => {
        result += `   • ${line}\n`;
    });
    return result;
}

function formatMangsaSection(lines) {
    let result = "🌾 *PRANATA MANGSA:*\n";
    lines.slice(0, 2).forEach(line => {
        result += `   • ${line.substring(0, 60)}\n`;
    });
    return result;
}

function formatAnalisisWukuSection(lines) {
    let result = "🛡️ *ANALISIS WUKU:*\n";
    lines.slice(1, 3).forEach(line => {
        result += `   • ${line.substring(0, 60)}\n`;
    });
    return result;
}

function formatSriJatiSection(section, htmlElement) {
    // Coba ekstrak data dari HTML terlebih dahulu
    const sriJatiData = extractSriJatiFromHTML(htmlElement);
    
    if (sriJatiData && sriJatiData.length > 0) {
        return formatSriJatiTable(sriJatiData);
    }
    
    // Fallback: format dari teks biasa
    let result = "📊 *SIKLUS SRI JATI (REJEKI):*\n";
    const lines = section.split('\n');
    
    // Coba format sebagai tabel sederhana
    lines.forEach(line => {
        if (line.includes('Thn') && line.trim()) {
            const parts = line.split(/\s{2,}/);
            if (parts.length >= 3) {
                const usia = parts[0].padEnd(10);
                const nilai = parts[1].padEnd(8);
                const nasib = parts.slice(2).join(' ').substring(0, 30);
                result += `   ${usia} | ${nilai} | ${nasib}\n`;
            }
        }
    });
    
    return result;
}

function formatGenericSection(lines) {
    if (lines.length < 2) return "";
    
    let result = "";
    lines.slice(0, 3).forEach(line => {
        result += `   • ${line.substring(0, 50)}\n`;
    });
    
    if (lines.length > 3) {
        result += "   • ...\n";
    }
    
    return result;
}

// ==========================================
// FUNGSI EKSTRAK SRI JATI DARI HTML
// ==========================================

function extractSriJatiFromHTML(element) {
    try {
        // Cari semua tabel
        const tables = element.getElementsByTagName('table');
        
        for (let table of tables) {
            // Cek apakah ini tabel Sri Jati
            const tableText = table.textContent || table.innerText;
            
            if (tableText.includes('Usia') && tableText.includes('Nilai') && tableText.includes('Nasib')) {
                const rows = table.getElementsByTagName('tr');
                const data = [];
                
                for (let row of rows) {
                    const cells = row.getElementsByTagName('td');
                    if (cells.length >= 3) {
                        const usia = cells[0].textContent.trim();
                        const nilai = cells[1].textContent.trim();
                        const nasib = cells[2].textContent.trim();
                        
                        // Pastikan ini baris data, bukan header
                        if (usia && nilai && nasib && 
                            !usia.includes('Usia') && 
                            !nilai.includes('Nilai') && 
                            !nasib.includes('Nasib')) {
                            data.push({
                                usia: usia,
                                nilai: nilai,
                                nasib: nasib.substring(0, 40) // Batasi panjang
                            });
                        }
                    }
                }
                
                if (data.length > 0) {
                    return data;
                }
            }
        }
    } catch (error) {
        console.error("Error extracting Sri Jati:", error);
    }
    
    return null;
}

// ==========================================
// FUNGSI FORMAT TABEL SRI JATI
// ==========================================

function formatSriJatiTable(data) {
    if (!data || data.length === 0) {
        return "📊 *SIKLUS SRI JATI:*\n   Data tidak tersedia\n\n";
    }
    
    // Hitung lebar kolom maksimum
    let maxUsia = 8; // Minimum width
    let maxNilai = 6;
    let maxNasib = 30;
    
    data.forEach(item => {
        maxUsia = Math.max(maxUsia, item.usia.length);
        maxNilai = Math.max(maxNilai, item.nilai.length);
        maxNasib = Math.max(maxNasib, Math.min(item.nasib.length, 40));
    });
    
    // Buat tabel
    let tableText = "\n📊 *TABEL SRI JATI LENGKAP:*\n";
    
    // Header
    tableText += "┌" + "─".repeat(maxUsia + 2) + "┬" + 
                 "─".repeat(maxNilai + 2) + "┬" + 
                 "─".repeat(maxNasib + 2) + "┐\n";
    
    tableText += "│ " + "USIA".padEnd(maxUsia) + " │ " + 
                 "NILAI".padEnd(maxNilai) + " │ " + 
                 "NASIB (REJEKI)".padEnd(maxNasib) + " │\n";
    
    tableText += "├" + "─".repeat(maxUsia + 2) + "┼" + 
                 "─".repeat(maxNilai + 2) + "┼" + 
                 "─".repeat(maxNasib + 2) + "┤\n";
    
    // Data rows
    data.forEach(item => {
        const usia = item.usia.padEnd(maxUsia);
        const nilai = item.nilai.padEnd(maxNilai);
        const nasib = item.nasib.padEnd(maxNasib);
        
        tableText += `│ ${usia} │ ${nilai} │ ${nasib} │\n`;
    });
    
    // Footer
    tableText += "└" + "─".repeat(maxUsia + 2) + "┴" + 
                 "─".repeat(maxNilai + 2) + "┴" + 
                 "─".repeat(maxNasib + 2) + "┘\n";
    
    return tableText;
}



// ==========================================
// INITIAL START
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    updateDetail(TODAY, getPasaran(TODAY));
    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    if(prev) prev.onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    if(next) next.onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});