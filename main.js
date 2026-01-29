/**
 * KALENDER JAWA MODERN - FULL VERSION 2026
 * Menggabungkan Weton, Wuku, Neptu, Nasib, dan Numerologi Pro
 */

// ==========================================
// DATA REFERENSI (DIAMBIL DARI KODE ASLI ANDA)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

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

const NASIB_AHLI_WARIS = { 1: "Gunung (Mulia)", 2: "Guntur (Sulit)", 3: "Segoro (Mudah Rezeki)", 0: "Asat (Sulit Rezeki)" };
const PEMBAGI_5 = { 1: "Sri", 2: "Lungguh", 3: "Gendhong", 4: "Loro", 0: "Pati" };

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
// LOGIKA KALKULASI (RECOVERY DARI KODE LAMA)
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getZodiak(date) {
    const d = date.getDate(); const m = date.getMonth() + 1;
    const zodiacs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
    const lastDay = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
    return (d > lastDay[m - 1]) ? zodiacs[m % 12] : zodiacs[m - 1];
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
    let tgl = 9 + diffDays;
    let bIdx = 7; 
    while (tgl > 30) { tgl -= 30; bIdx = (bIdx + 1) % 12; }
    while (tgl <= 0) { tgl += 30; bIdx = (bIdx - 1 + 12) % 12; }
    return { tgl, bulan: DATA_BULAN_JAWA[bIdx] };
}

function hitungUsia(birthDate) {
    let now = new Date();
    let y = now.getFullYear() - birthDate.getFullYear();
    let m = now.getMonth() - birthDate.getMonth();
    if (m < 0) { y--; m += 12; }
    return `${y} Thn, ${m} Bln`;
}

// ==========================================
// RENDER UI & DETAIL (THE "SUPER" FIX)
// ==========================================

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    mNav.innerText = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(current);

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
        cell.innerHTML = `<div>${d}</div><small style="font-size:0.6rem">${p}</small>`;
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const nH = NEPTU_HARI[h];
    const nP = NEPTU_PASARAN[pasaran];
    const total = nH + nP;
    const jawa = getTanggalJawa(date);
    const wuku = getWuku(date);
    const shio = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"][date.getFullYear() % 12];
    
    // Status Naas & Tali Wangke
    const isNaas = jawa.bulan.naas.includes(jawa.tgl);
    const isTaliWangke = (`${h} ${pasaran}` === jawa.bulan.taliWangke);

    // Numerologi (Ambil dari numerology.js)
    let lp = { angka: '?', karakter: '-', bisnis: '-', jodoh: '-', hariBaik: '-' };
    if (typeof NUMEROLOGI_ENGINE !== 'undefined') lp = NUMEROLOGI_ENGINE.calculateLifePath(date);

    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border:2px solid #D30000; border-radius:15px; color:#333;">
            ${(isNaas || isTaliWangke) ? `<div style="background:#ffebee; color:#c62828; padding:10px; border-radius:8px; margin-bottom:15px; border-left:5px solid #d32f2f;"><strong>⚠️ HARI KRITIS:</strong> ${isNaas ? 'Hari Naas' : ''} ${isTaliWangke ? 'Tali Wangke' : ''}</div>` : ''}
            
            <h2 style="color:#D30000; border-bottom:3px solid #D30000; padding-bottom:5px; margin:0;">${h} ${pasaran}</h2>
            <p style="margin:10px 0;">📅 <b>Masehi:</b> ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} | <b>Jawa:</b> ${jawa.tgl} ${jawa.bulan.nama} 1959</p>
            
            <div style="background:#f9f9f9; padding:10px; border-radius:10px; margin-bottom:15px; font-size:0.9rem;">
                <p style="margin:0;"><b>Wuku:</b> ${wuku} | <b>Shio:</b> ${shio} | <b>Zodiak:</b> ${getZodiak(date)}</p>
                <p style="margin:5px 0 0 0;"><b>Status Bulan:</b> <span style="color:${jawa.bulan.status.includes('Tidak')?'red':'green'}">${jawa.bulan.status}</span></p>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:15px;">
                <div style="padding:10px; background:#fff8e1; border:1px solid #ffe0b2; border-radius:8px; font-size:0.8rem;">
                    <b>🎭 Sifat Hari:</b><br>${DATA_SIFAT_HARI[h]}
                </div>
                <div style="padding:10px; background:#f1f8e9; border:1px solid #c8e6c9; border-radius:8px; font-size:0.8rem;">
                    <b>🎭 Sifat Pasaran:</b><br>${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}
                </div>
            </div>

            <div style="background:#fff5f5; border:1px solid #ffcdd2; padding:10px; border-radius:10px; text-align:center; margin-bottom:15px;">
                <b>Neptu: ${h}(${nH}) + ${pasaran}(${nP}) = <span style="color:#D30000; font-size:1.2rem;">${total}</span></b><br>
                <small>Nasib: ${PEMBAGI_5[total % 5]} | Waris: ${NASIB_AHLI_WARIS[total % 4]}</small>
            </div>

            <div style="padding:15px; border:2px solid #084298; border-radius:12px; background:#f0f7ff;">
                <h4 style="color:#084298; margin:0 0 10px 0; border-bottom:1px solid #084298;">🔮 Numerologi Life Path ${lp.angka}</h4>
                <div style="font-size:0.85rem; line-height:1.4;">
                    <p><b>🌟 Karakter:</b> ${lp.karakter}</p>
                    <p><b>💼 Bisnis:</b> ${lp.bisnis}</p>
                    <p><b>❤️ Jodoh:</b> ${lp.jodoh}</p>
                    <p><b>📅 Hari Baik:</b> ${lp.hariBaik}</p>
                </div>
            </div>
        </div>

        <div style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <button onclick="downloadPDF()" style="padding:15px; background:#333; color:#fff; border:none; border-radius:10px; font-weight:bold;">💾 Simpan PDF</button>
            <button onclick="shareWA('${h} ${pasaran}', '${lp.angka}')" style="padding:15px; background:#25D366; color:#fff; border:none; border-radius:10px; font-weight:bold;">📱 Share WA</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// Tambahkan fungsi downloadPDF dan shareWA di bawahnya seperti kode sebelumnya.
async function downloadPDF() {
    const area = document.getElementById("printableArea");
    if (!area) return;
    const opt = { margin: 10, filename: 'Ramalan.pdf', html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    await html2pdf().set(opt).from(area).save();
}

function shareWA(weton, lp) {
    window.open(`https://wa.me/?text=${encodeURIComponent('Ramalan Weton: '+weton+'\nNumerologi: '+lp)}`, '_blank');
}

window.onload = () => {
    generateCalendar();
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
};
