/**
 * KALENDER JAWA MODERN - VERSI UPDATE 2026
 * Fitur: Detail Neptu, Status Bulan Jawa (Naas & Tali Wangke), Fix PDF Blank
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
// FITUR DOWNLOAD & SHARE (FIXED PDF)
// ==========================================

async function downloadPDF(event) {
    const source = document.getElementById("printableArea");
    if (!source) {
        alert("Data tidak ditemukan!");
        return;
    }

    const btn = event ? event.target : null;
    const originalBtnText = btn ? btn.innerText : null;
    if (btn) {
        btn.innerText = "⏳ Sedang Memproses...";
        btn.disabled = true;
    }

    const opt = {
        margin: [10, 10, 10, 10],
        filename: "Detail-Weton-Lengkap.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: false
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    try {
        // beri jeda sebentar agar konten/gambar sempat render
        await new Promise(r => setTimeout(r, 300));
        await html2pdf().from(source).set(opt).save();
    } catch (e) {
        console.error("PDF Error: ", e);
        alert("Gagal membuat PDF. Cek console untuk detail error.");
    } finally {
        if (btn) {
            btn.innerText = originalBtnText;
            btn.disabled = false;
        }
    }
}

function shareWhatsApp() {
    const detailArea = document.getElementById('printableArea');
    if (!detailArea) return alert("Data tidak ditemukan!");
    // Pembersihan teks agar rapi di WA
    const fullText = detailArea.innerText.replace(/\n\s*\n/g, '\n');
    const header = "*HASIL LENGKAP CEK WETON JAWA*\n" + "=".repeat(20) + "\n\n";
    const footer = "\n\n" + "=".repeat(20) + "\n_Dikirim melalui Aplikasi Kalender Jawa_";
    window.open(`https://wa.me/?text=${encodeURIComponent(header + fullText + footer)}`, '_blank');
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
