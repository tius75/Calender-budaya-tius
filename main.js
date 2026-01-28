/**
 * KALENDER JAWA MODERN - VERSI STABIL
 * Perbaikan: Tombol Cari, Data Wuku, Mangsa, Kamarokam, & Full Share Detail.
 */

// ==========================================
// KONSTANTA & DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// Data Kamarokam (Pembagi 6)
const KAMAROKAM_6 = {
    1: { nama: "NUJU PADU", arti: "Wataknya Jelek, segala sesuatu selalu kudu sulaya, dan sering bertengkar. Manfaat: Mendirikan dapur, warung, restaurant." },
    2: { nama: "KALA TINANTANG", arti: "Wataknya Jelek, selalu kekurangan dan sering sakit-sakitan. Manfaat: Mendirikan dapur, warung, restaurant." },
    3: { nama: "SANGGAR WARINGIN", arti: "Wataknya Baik, tenteram, bahagia, rejeki berkembang. Manfaat: Hajatan, pindah rumah, tempat ibadah." },
    4: { nama: "MANTRI SINAROJA", arti: "Wataknya Baik, tercapai cita-cita, hidup senang tidak kekurangan. Manfaat: Hajatan, pindah rumah." },
    5: { nama: "MACAN KETAWAN", arti: "Wataknya sedang-sedang saja, disegani tetapi juga dijauhi. Manfaat: Mendirikan rumah dan pintu regol." },
    0: { nama: "NUJU PATI", arti: "Wataknya Mampet rejekinya, susah hidupnya, sering bencana. Manfaat: Membuat paku bumi dan jabung." }
};

const NASIB_AHLI_WARIS = { // Pembagi 4
    1: { nama: "Gunung", arti: "Kehidupan yang mulia bagi ahli waris." },
    2: { nama: "Guntur", arti: "Ahli waris akan mendapatkan kesulitan." },
    3: { nama: "Segoro", arti: "Kemudahan dalam mencari rezeki." },
    0: { nama: "Asat", arti: "Kesulitan dalam mendapatkan rezeki." }
};

const PEMBAGI_5 = { // Pembagi 5
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
// FUNGSI LOGIKA
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
    
    // Safety check jika DATA_MANGSA tidak ada
    if (typeof DATA_MANGSA !== 'undefined') return DATA_MANGSA[id];
    return { nama: "Mangsa Ke-" + id, deskripsi: "Detail mangsa belum terunduh." };
}

function getArahMeditasi(neptu) {
    const map = { 7: "Kulon - Barat", 8: "Lor - Utara", 9: "Wetan - Timur", 10: "Kidul - Selatan", 11: "Kulon - Barat", 12: "Lor - Utara", 13: "Wetan - Timur", 14: "Kidul - Selatan", 15: "Kulon - Barat", 16: "Lor - Utara", 17: "Wetan - Timur", 18: "Kidul - Selatan" };
    return map[neptu] || "Pusat";
}

function hitungUsiaLengkap(birthDate) {
    let now = new Date();
    let y = now.getFullYear() - birthDate.getFullYear();
    let m = now.getMonth() - birthDate.getMonth();
    let d = now.getDate() - birthDate.getDate();
    if (d < 0) { m--; let prev = new Date(now.getFullYear(), now.getMonth(), 0); d += prev.getDate(); }
    if (m < 0) { y--; m += 12; }
    return y < 0 ? "Belum lahir" : `${y} Thn, ${m} Bln, ${d} Hr`;
}

// ==========================================
// RENDER UI & FITUR
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
        el.className = 'header-day' + (i === 0 ? ' sunday' : '');
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
        if (dateObj.getDay() === 0) cell.classList.add('sunday-block');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div>`;
        cell.onclick = () => {
            document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
            cell.classList.add('selected-day');
            updateDetail(new Date(y, m, d), p);
        };
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const wukuName = getWuku(date);
    const infoJawa = getTanggalJawa(date);
    const mangsa = getMangsaInfo(date);
    const zodiak = getZodiak(date);
    const lunar = getLunarShio(date);
    const nasib5 = PEMBAGI_5[neptu % 5];
    const nasib6 = KAMAROKAM_6[neptu % 6];
    const meditasi = getArahMeditasi(neptu);
    const usia = hitungUsiaLengkap(date);
    
    // Ambil watak jika data eksternal ada
    const watakNeptu = (typeof DATA_WATAK_NEPTU !== 'undefined') ? DATA_WATAK_NEPTU[neptu] : { watak: "Analisis watak neptu tidak tersedia." };
    const teksWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wukuName] || "Analisis wuku tidak tersedia.") : "Data analisis wuku belum dimuat.";
    const teksHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[wetonKey] || "Analisis hari tidak tersedia.") : "Data watak hari belum dimuat.";
    const dataSriJati = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[neptu] || []) : [];

    const tglMasehi = `${date.getDate()} ${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][date.getMonth()]} ${date.getFullYear()}`;

    let tabelHtml = `<table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.8rem; border:1px solid #ddd;">
            <tr style="background:#f5f5f5;"><th style="border:1px solid #ddd; padding:5px;">Usia</th><th style="border:1px solid #ddd; padding:5px;">Rejeki</th></tr>`;
    dataSriJati.forEach(i => { tabelHtml += `<tr><td style="border:1px solid #ddd; padding:5px; text-align:center;">${i.usia}</td><td style="border:1px solid #ddd; padding:5px; text-align:center; font-weight:bold;">${i.nilai}</td></tr>`; });
    tabelHtml += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <style>@media print { body * { visibility: hidden; } #detail, #detail * { visibility: visible; } #detail { position: absolute; left: 0; top: 0; width: 100%; } .no-print { display: none !important; } }</style>
        <div id="captureArea" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #ddd; color:#000;">
            <div style="display:flex; justify-content:space-between;" class="no-print">
                <h2 style="color:#D30000; border-bottom:2px solid #D30000;">${wetonKey}</h2>
                <div>
                    <button onclick="shareFullWA()" style="background:#25D366; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer;">WhatsApp</button>
                    <button onclick="window.print()" style="background:#333; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer;">PDF</button>
                </div>
            </div>
            
            <p><strong>📅 Masehi:</strong> ${tglMasehi} | <strong>Usia:</strong> ${usia}</p>
            <p><strong>🌙 Jawa:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            <p><strong>🧭 Meditasi:</strong> ${meditasi} | <strong>Shio:</strong> ${lunar.shio} | <strong>Zodiak:</strong> ${zodiak}</p>

            <div style="background:#fdf2f2; padding:10px; border-radius:8px; margin:10px 0; border:1px solid #ffcdd2;">
                <h4 style="margin:0; color:#d32f2f;">⚖️ KAMAROKAM (Pembagi 6): ${nasib6.nama}</h4>
                <p style="font-size:0.85rem; margin:5px 0;">${nasib6.arti}</p>
            </div>

            <div style="background:#f1f8e9; padding:10px; border-radius:8px; margin:10px 0; border:1px solid #c8e6c9;">
                <h4 style="margin:0; color:#2e7d32;">💎 SRI (Pembagi 5): ${nasib5.nama}</h4>
                <p style="font-size:0.85rem; margin:5px 0;">${nasib5.arti}</p>
            </div>

            <div style="background:#e3f2fd; padding:10px; border-radius:8px; border:1px solid #bbdefb;">
                <h4 style="margin:0; color:#1565c0;">🌾 MANGSA: ${mangsa.nama}</h4>
                <p style="font-size:0.85rem; margin:5px 0;">${mangsa.deskripsi}</p>
            </div>

            <div style="margin-top:15px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">🌟 WATAK NEPTU (${neptu})</h4>
                <p style="font-size:0.85rem;">${watakNeptu.watak}</p>
            </div>

            <div style="margin-top:15px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">🛡️ ANALISIS WUKU: ${wukuName}</h4>
                <p style="font-size:0.85rem;">${teksWuku}</p>
            </div>

            <div style="margin-top:15px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">🌸 WATAK HARI</h4>
                <p style="font-size:0.85rem;">${teksHari}</p>
            </div>

            <div style="margin-top:15px;">
                <h4 style="color:#D30000; border-bottom:1px solid #eee;">📈 REJEKI SRI JATI</h4>
                ${tabelHtml}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// --- FUNGSI CARI TANGGAL ---
function cariTanggal() {
    const input = document.getElementById('inputTgl'); // Pastikan elemen ini ada di HTML
    if (!input || !input.value) return alert("Pilih tanggal terlebih dahulu!");
    const tglCari = new Date(input.value);
    current = new Date(tglCari.getFullYear(), tglCari.getMonth(), 1);
    generateCalendar();
    updateDetail(tglCari, getPasaran(tglCari));
}

// --- FUNGSI SHARE WA ---
function shareFullWA() {
    const area = document.getElementById('captureArea');
    let text = "*HASIL ANALISIS KALENDER JAWA*\n" + area.innerText;
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
}

// ==========================================
// INITIAL START
// ==========================================
generateCalendar();
updateDetail(TODAY, getPasaran(TODAY));

// Event Listener untuk Navigasi & Tombol Cari
document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// Pastikan Anda memiliki ID 'btnCari' di HTML Anda
const btnCari = document.getElementById('btnCari');
if(btnCari) btnCari.onclick = cariTanggal;