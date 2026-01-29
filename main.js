/**
 * KALENDER JAWA MODERN - VERSI FINAL FIX 2026
 * Update: Siklus Windu Jawa (8 Tahun) & Penanggalan Kongzili
 */

// ==========================================
// KONSTANTA & DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// DATA WINDU (8 TAHUNAN)
const DATA_WINDU = [
    { nama: "Alip", filosofi: "Ada-ada (Niat)", deskripsi: "Melambangkan permulaan. Waktunya manusia mulai menanam niat, ide, atau tekad untuk melakukan sesuatu yang baik." },
    { nama: "Ehe", filosofi: "Tumandang (Bekerja)", deskripsi: "Melambangkan realisasi. Setelah ada niat di tahun Alip, tahun ini adalah waktunya mulai bergerak dan bertindak." },
    { nama: "Jimawal", filosofi: "Gawe (Pekerjaan)", deskripsi: "Melambangkan proses. Pekerjaan mulai terlihat bentuknya dan menuntut ketekunan untuk menyelesaikannya." },
    { nama: "Je", filosofi: "Lelakon (Peristiwa/Nasib)", deskripsi: "Melambangkan ujian. Dalam proses bekerja, manusia pasti menemui cobaan atau dinamika hidup sebagai ujian mental." },
    { nama: "Dal", filosofi: "Urip (Hidup)", deskripsi: "Melambangkan keberadaan. Tahun ini dianggap sakral (Tahun Duda). Waktunya merenungi hakikat hidup dan hubungan dengan Sang Pencipta." },
    { nama: "Be", filosofi: "Bola-bali (Kembali/Konsisten)", deskripsi: "Melambangkan keteguhan. Mengajarkan manusia untuk tetap konsisten pada kebaikan meskipun sudah melalui berbagai ujian." },
    { nama: "Wawu", filosofi: "Marang (Arah/Tujuan)", deskripsi: "Melambangkan fokus. Menjelang akhir siklus, manusia diingatkan untuk kembali fokus pada tujuan akhir hidup agar tidak tersesat." },
    { nama: "Jimakir", filosofi: "Suwung (Kosong/Selesai)", deskripsi: "Melambangkan akhir dan evaluasi. Fase untuk melepaskan keterikatan duniawi dan mengevaluasi masa lalu." }
];

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius, urakan, kurang bisa membalas budi, setia pada janji, ceroboh memilih makanan, banyak selamat dan doanya.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan, selalu gembira seperti tidak pernah susah, sering kena fitnah, kuat tidak tidur malam hari, berhati-hati namun sering bingung sendiri, bicaranya berisi.',
    'PAHING': 'Selalu ingin memiliki (barang), kesungguhannya penuh perhitungan untuk mendapatkan untung, suka menolong, mandiri, kuat lapar, banyak musuhnya.',
    'PON': 'Bicaranya banyak diterima orang, suka tinggal di rumah, tidak mau memakan yang bukan kepunyaannya sendiri, suka marah kepada keluarganya.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut, malas mencari nafkah perlu dibantu orang lain, kaku hati, tidak bisa berpikir panjang.'
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

// Fungsi Kongzili (Membutuhkan library lunar-javascript jika dipakai secara advanced, 
// namun di sini kita implementasikan logika dasar sesuai struktur yang Anda berikan)
function hitungPenanggalanKongzili(dateObj = new Date()) {
    try {
        const solar = Solar.fromDate(dateObj);
        const lunar = solar.getLunar();
        const tahunKongzili = lunar.getYear() + 551;
        return {
            teks: `Hari ${lunar.getDayInChinese()}, Bulan ${lunar.getMonthInChinese()}, Tahun ${tahunKongzili}`,
            full: `${lunar.getDay()} - ${lunar.getMonth()} - ${tahunKongzili}`
        };
    } catch (e) {
        // Fallback jika library Solar tidak terdeteksi
        return { teks: "Detail Kongzili memerlukan library Lunar-JS", full: "-" };
    }
}

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
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
    
    // Hitung Windu (Siklus 8 Tahun)
    // Rumus sederhana: Tahun Jawa mod 8
    const winduIdx = (tahunJawa - 1) % 8;
    const dataWindu = DATA_WINDU[winduIdx];

    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: tahunJawa, windu: dataWindu };
}

// ... (Fungsi getZodiak, getLunarShio, getWuku, getMangsaInfo, getArahMeditasi tetap sama) ...
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
    if (months < 0) { years--; months += 12; }
    return `${years} Tahun, ${months} Bulan, ${days} Hari`;
}

// ==========================================
// RENDER UI & UPDATE DETAIL
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const nHari = NEPTU_HARI[h];
    const nPasaran = NEPTU_PASARAN[pasaran];
    const neptu = nHari + nPasaran;
    
    const wukuName = getWuku(date);
    const infoJawa = getTanggalJawa(date);
    const infoKongzili = hitungPenanggalanKongzili(date);
    const mangsa = getMangsaInfo(date);
    const zodiak = getZodiak(date);
    const lunar = getLunarShio(date);
    const nasibKematian = NASIB_AHLI_WARIS[neptu % 4];
    const nasib5 = PEMBAGI_5[neptu % 5];
    const arahMeditasi = getArahMeditasi(neptu);
    const usia = hitungUsiaLengkap(date);
    
    const sifatHariIni = DATA_SIFAT_HARI[h] || "-";
    const sifatPasaranIni = DATA_SIFAT_PASARAN[pasaran.toUpperCase()] || "-";

    const namaBulanMasehi = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const tglMasehiLengkap = `${date.getDate()} ${namaBulanMasehi[date.getMonth()]} ${date.getFullYear()}`;

    const isNaas = infoJawa.bulan.naas.includes(infoJawa.tanggal);
    const isTaliWangke = (wetonKey === infoJawa.bulan.taliWangke);

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" class="card-result" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #eee; box-shadow: 0 4px 6px rgba(0,0,0,0.05); color:#000;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <h2 style="color:#D30000; margin:0 0 5px 0; border-bottom:2px solid #D30000; display:inline-block;">${wetonKey}</h2>
                <button onclick="copyToClipboard()" style="background:#D30000; color:#fff; border:none; padding:8px 15px; border-radius:5px; cursor:pointer; font-weight:bold;">📋 Salin Hasil</button>
            </div>
            
            <p style="margin:10px 0 0; font-size:1.15rem; font-weight:bold;">📅 ${tglMasehiLengkap}</p>
            
            <div style="background:#fff9f9; padding:12px; border-radius:8px; margin:10px 0; border:1px solid #ffeded;">
                <p style="margin:0; color:#d30000; font-weight:bold; font-size:1rem;">🌙 Kalender Jawa & Windu</p>
                <p style="margin:5px 0; font-size:0.9rem;"><strong>Tanggal:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
                <p style="margin:5px 0; font-size:0.9rem;"><strong>Tahun Windu:</strong> ${infoJawa.windu.nama} (${infoJawa.windu.filosofi})</p>
                <p style="margin:5px 0; font-size:0.85rem; font-style:italic; color:#555;">"${infoJawa.windu.deskripsi}"</p>
                <p style="margin:10px 0 5px; font-size:0.85rem;"><strong>Status Bulan:</strong> ${infoJawa.bulan.status} | <strong>Naas:</strong> ${infoJawa.bulan.naas.join(', ')}</p>
            </div>

            <div style="background:#fffdec; padding:12px; border-radius:8px; margin:10px 0; border:1px solid #f9f0a4;">
                <p style="margin:0; color:#b08900; font-weight:bold; font-size:1rem;">🧧 Penanggalan Kongzili</p>
                <p style="margin:5px 0; font-size:0.9rem;"><strong>Teks:</strong> ${infoKongzili.teks}</p>
                <p style="margin:5px 0; font-size:0.9rem;"><strong>Numerik:</strong> ${infoKongzili.full}</p>
            </div>

            <div style="background:#f8f9fa; padding:12px; border-radius:8px; margin:10px 0; border:1px solid #e9ecef;">
                <h4 style="margin:0 0 8px 0; color:#333; font-size:0.95rem;">🔢 Perhitungan Neptu</h4>
                <p style="margin:0; font-family: monospace; font-size:0.9rem;">
                    Hari ${h} (${nHari}) + Pasaran ${pasaran} (${nPasaran}) = <strong>Total ${neptu}</strong>
                </p>
            </div>

            <div style="margin:15px 0; padding:12px; border:1px solid #ffe0b2; background:#fff8e1; border-radius:8px;">
                <h4 style="margin:0 0 5px 0; color:#e65100; font-size:0.95rem;">🎭 Karakter Hari & Pasaran</h4>
                <p style="font-size:0.85rem; margin:0;"><strong>Sifat ${h}:</strong> ${sifatHariIni}</p>
                <p style="font-size:0.85rem; margin:5px 0 0 0;"><strong>Sifat ${pasaran}:</strong> ${sifatPasaranIni}</p>
            </div>

            <p style="margin:5px 0; font-size:0.9rem;"><strong>Zodiak:</strong> ${zodiak} | <strong>Shio:</strong> ${lunar.shio}</p>
            <div style="background:#f0f7ff; border:1px solid #cfe2ff; padding:10px; border-radius:8px; margin:10px 0;">
                <p style="margin:0; font-size:0.9rem;"><strong>⏳ Usia:</strong> ${usia} | <strong>🧘 Meditasi:</strong> ${arahMeditasi}</p>
            </div>
            
            <div style="background:#e8f5e9; border:1px solid #c8e6c9; padding:12px; border-radius:8px; margin:15px 0;">
                <h4 style="margin:0; color:#2e7d32; font-size:0.95rem;">💎 Nasib: ${nasib5.nama}</h4>
                <p style="font-size:0.85rem; margin-top:5px;">${nasib5.arti}</p>
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// Fitur Salin & Start tetap menggunakan fungsi DOMContentLoaded dari kode sebelumnya.
function copyToClipboard() {
    const detailArea = document.getElementById('printableArea');
    if (!detailArea) return alert("Data tidak ditemukan!");
    const clone = detailArea.cloneNode(true);
    const button = clone.querySelector('button');
    if (button) button.remove();
    const textToCopy = "*HASIL LENGKAP CEK WETON & KONGZILI*\n" + 
                       "━━━━━━━━━━━━━━━━━━━━━━\n\n" + 
                       clone.innerText.trim() + 
                       "\n\n━━━━━━━━━━━━━━━━━━━━━━\n" +
                       "_Kalender Jawa by Tius_";
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Hasil berhasil disalin!");
    }).catch(err => alert("Gagal menyalin."));
}

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

document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    updateDetail(TODAY, getPasaran(TODAY));
    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    if(prev) prev.onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    if(next) next.onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});