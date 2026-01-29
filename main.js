/**
 * KALENDER JAWA MODERN - VERSI FINAL 2026
 * Gabungan: Weton, Wuku, Sri Jati, Numerologi, dan Fungsi Salin (Rich Text)
 */

// --- DATA DASAR (HARI & PASARAN) ---
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// --- DATA SIFAT & NASIB ---
const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius, urakan, setia pada janji.',
    'LEGI': 'Bertanggung jawab, murah hati, sering kena fitnah, bicaranya berisi.',
    'PAHING': 'Perhitungan untung rugi, mandiri, kuat lapar, marahnya menakutkan.',
    'PON': 'Bicaranya banyak diterima orang, suka berbantahan, rejekinya cukup.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut, kaku hati.'
};

const DATA_SIFAT_HARI = {
    'Minggu': 'Tekun, mandiri dan berwibawa.',
    'Senin': 'Selalu berubah, indah dan mendapatkan simpati.',
    'Selasa': 'Pemarah dan pencemburu serta luas pergaulannya.',
    'Rabu': 'Pendiam, pemomong dan penyabar.',
    'Kamis': 'Sangar menakutkan.',
    'Jumat': 'Energik dan mengagumkan.',
    'Sabtu': 'Membuat orang merasa senang dan susah ditebak.'
};

const NASIB_AHLI_WARIS = { 1: { nama: "Gunung", arti: "Kehidupan mulia." }, 2: { nama: "Guntur", arti: "Mendapatkan kesulitan." }, 3: { nama: "Segoro", arti: "Kemudahan rezeki." }, 0: { nama: "Asat", arti: "Kesulitan rezeki." } };
const PEMBAGI_5 = { 1: { nama: "Sri", arti: "Murah rezeki." }, 2: { nama: "Lungguh", arti: "Pangkat tinggi." }, 3: { nama: "Gendhong", arti: "Mapan lahiriah." }, 4: { nama: "Loro", arti: "Sering sakit." }, 0: { nama: "Pati", arti: "Banyak hambatan." } };

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

// --- LOGIKA PERHITUNGAN ---
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (86400000));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / 86400000);
    let tgl = 9 + diffDays;
    let bIdx = 7; 
    let thn = 1959;
    while (tgl > 30) { tgl -= 30; bIdx = (bIdx + 1) % 12; if(bIdx==0) thn++; }
    while (tgl <= 0) { tgl += 30; bIdx = (bIdx - 1 + 12) % 12; if(bIdx==11) thn--; }
    return { tanggal: tgl, bulan: DATA_BULAN_JAWA[bIdx], tahun: thn };
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const refDate = new Date(2026, 0, 25); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / 86400000);
    let idx = (20 + Math.floor(diffDays / 7)) % 30;
    return wukuList[idx < 0 ? idx + 30 : idx];
}

// --- FUNGSI UTAMA UPDATE DETAIL ---
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const nH = NEPTU_HARI[h];
    const nP = NEPTU_PASARAN[pasaran];
    const total = nH + nP;
    const jawa = getTanggalJawa(date);
    const wuku = getWuku(date);
    
    // Numerologi LP
    let lp = { angka: '?', karakter: '-', bisnis: '-', jodoh: '-', hariBaik: '-' };
    if (typeof NUMEROLOGI_ENGINE !== 'undefined') lp = NUMEROLOGI_ENGINE.calculateLifePath(date);

    // Tabel Pal Jati (Sri Jati)
    const dataSriJati = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[total] || []) : [];
    let tabelSriJatiHtml = `<table border="1" style="width:100%; border-collapse: collapse; font-size: 0.8rem; margin-top:10px;">
        <tr style="background:#f2f2f2;"><th>Usia</th><th>Nilai</th><th>Nasib</th></tr>`;
    dataSriJati.forEach(item => {
        const desc = (typeof SRI_JATI_DESC !== 'undefined') ? (SRI_JATI_DESC[item.v] || "-") : "-";
        tabelSriJatiHtml += `<tr><td align="center">${item.usia}</td><td align="center"><b>${item.v}</b></td><td>${desc}</td></tr>`;
    });
    tabelSriJatiHtml += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border-radius:10px; border:2px solid #D30000; color:#000; font-family: Arial, sans-serif;">
            <h2 style="color:#D30000; margin:0; border-bottom:2px solid #D30000;">${h} ${pasaran}</h2>
            <p><b>Masehi:</b> ${date.toLocaleDateString('id-ID')} | <b>Jawa:</b> ${jawa.tanggal} ${jawa.bulan.nama} ${jawa.tahun}</p>
            
            <div style="background:#fef9e7; padding:10px; border-radius:5px; border:1px solid #f1c40f; margin:10px 0;">
                <p><b>🎭 Karakter:</b> ${DATA_SIFAT_HARI[h]} & ${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</p>
                <p><b>🌀 Wuku:</b> ${wuku} | <b>⚖️ Neptu:</b> ${total} (${nH}+${nP})</p>
            </div>

            <div style="background:#e8f4fd; padding:10px; border-radius:5px; border:1px solid #3498db; margin:10px 0;">
                <h4 style="margin:0 0 5px 0; color:#2980b9;">🔮 Numerologi Bisnis & Jodoh</h4>
                <p style="font-size:0.85rem; margin:0;"><b>Life Path:</b> ${lp.angka} | <b>Bisnis:</b> ${lp.bisnis}</p>
                <p style="font-size:0.85rem; margin:5px 0 0 0;"><b>Jodoh:</b> ${lp.jodoh} | <b>Hari Baik:</b> ${lp.hariBaik}</p>
            </div>

            <h4 style="margin:15px 0 5px 0;">📊 Tabel Keberuntungan (Pal Jati)</h4>
            ${tabelSriJatiHtml}
            
            <div style="margin-top:15px; font-size:0.8rem; border-top:1px solid #eee; padding-top:10px;">
                <p><b>Nasib:</b> ${PEMBAGI_5[total%5].nama} (${PEMBAGI_5[total%5].arti})</p>
                <p><b>Ahli Waris:</b> ${NASIB_AHLI_WARIS[total%4].nama} (${NASIB_AHLI_WARIS[total%4].arti})</p>
            </div>
        </div>

        <div style="margin-top:20px; display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
            <button onclick="copyToClipboard()" style="padding:15px; background:#333; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">📋 Salin ke Docs</button>
            <button onclick="shareWA('${h} ${pasaran}', '${lp.angka}')" style="padding:15px; background:#25D366; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">📱 Share WA</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// --- FUNGSI SALIN TEKS (RICH TEXT) ---
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
        alert("✅ Data & Tabel Pal Jati berhasil disalin! Silakan Paste di Google Docs.");
    } catch (err) {
        alert("Gagal menyalin otomatis.");
    }
}

// --- RENDER KALENDER ---
function generateCalendar() {
    const grid = document.getElementById('calendar');
    if (!grid) return;
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    document.getElementById('monthYearNav').innerText = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(current);

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
        cell.innerHTML = `<b>${d}</b><br><small style="font-size:0.6rem">${p}</small>`;
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

// --- NAVIGASI ---
window.onload = () => {
    generateCalendar();
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
};

function shareWA(weton, lp) {
    const text = `Hasil Ramalan Weton: ${weton}\nNumerologi LP: ${lp}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}
