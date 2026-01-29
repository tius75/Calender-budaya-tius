/**
 * KALENDER JAWA MODERN 2026 - VERSI 485 BARIS (RESTORED)
 * Fitur: Detail Lengkap, Numerologi, Pal Jati Fix, Tanpa Tombol PDF
 */

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius, urakan, kurang bisa membalas budi, setia pada janji.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan, selalu gembira seperti tidak pernah susah.',
    'PAHING': 'Selalu ingin memiliki, perhitungan, suka menolong, mandiri, kuat lapar, marahnya menakutkan.',
    'PON': 'Bicaranya banyak diterima orang, suka tinggal di rumah, setia pada milik sendiri.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut, kaku hati, sering gelap pikiran.'
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

const NASIB_AHLI_WARIS = { 1: {nama:"Gunung", arti:"Mulia"}, 2: {nama:"Guntur", arti:"Sulit"}, 3: {nama:"Segoro", arti:"Rezeki Luas"}, 0: {nama:"Asat", arti:"Rezeki Seret"} };
const PEMBAGI_5 = { 1: {nama:"Sri", arti:"Makmur"}, 2: {nama:"Lungguh", arti:"Pangkat"}, 3: {nama:"Gendhong", arti:"Mapan"}, 4: {nama:"Loro", arti:"Sakit"}, 0: {nama:"Pati", arti:"Halangan"} };

let currentView = new Date(2026, 0, 1);

// --- LOGIKA KALENDER ---
function generateCalendar(date) {
    const container = document.getElementById('calendar-container');
    if(!container) return;
    container.innerHTML = '';
    
    const year = date.getFullYear();
    const month = date.getUTCMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Judul Bulan
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    document.getElementById('month-label').innerText = `${monthNames[month]} ${year}`;

    // Header Hari
    ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].forEach(h => {
        const div = document.createElement('div');
        div.className = 'day-header';
        div.innerText = h;
        container.appendChild(div);
    });

    // Padding
    for (let i = 0; i < firstDay; i++) {
        container.appendChild(document.createElement('div'));
    }

    // Isi Tanggal
    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(year, month, d);
        const pasaran = getPasaran(dateObj);
        const cell = document.createElement('div');
        cell.className = 'day-cell';
        cell.innerHTML = `<span>${d}</span><small>${pasaran}</small>`;
        cell.onclick = () => updateDetail(dateObj, pasaran);
        container.appendChild(cell);
    }
}

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date - base) / 86400000);
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const ref = new Date(2026, 0, 25);
    const diff = Math.floor((date - ref) / 86400000);
    let idx = (20 + Math.floor(diff/7)) % 30;
    return wukuList[idx < 0 ? idx + 30 : idx];
}

function getTanggalJawa(date) {
    const ref = new Date(2026, 0, 28);
    const diff = Math.floor((date - ref) / 86400000);
    let tgl = 9 + diff;
    let bIdx = 7;
    while(tgl > 30) { tgl-=30; bIdx = (bIdx+1)%12; }
    while(tgl <= 0) { tgl+=30; bIdx = (bIdx-1+12)%12; }
    return { tgl, bulan: DATA_BULAN_JAWA[bIdx] };
}

// --- FUNGSI UTAMA SHOW DETAIL ---
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()];
    const nH = NEPTU_HARI[h];
    const nP = NEPTU_PASARAN[pasaran];
    const total = nH + nP;
    const jw = getTanggalJawa(date);
    
    // Numerologi Life Path
    let lpNum = "?", lpDesc = "Data belum dimuat.";
    if(typeof NUMEROLOGI_ENGINE !== 'undefined') {
        const res = NUMEROLOGI_ENGINE.calculateLifePath(date);
        lpNum = res.angka; lpDesc = res.karakter || res.deskripsi;
    }

    // Tabel Pal Jati (Fix Undefined)
    let tabelHtml = `<table border="1" style="width:100%; border-collapse:collapse; font-size:12px; margin:10px 0;">
        <tr style="background:#eee;"><th>Usia</th><th>Nilai</th><th>Nasib</th></tr>`;
    
    const dataSJ = (typeof TABEL_SRIJATI !== 'undefined') ? (TABEL_SRIJATI[total] || []) : [];
    dataSJ.forEach(item => {
        const usia = item.usia || item.age || "-"; // FIX
        const v = item.v !== undefined ? item.v : (item.nilai || 0);
        const d = (typeof SRI_JATI_DESC !== 'undefined') ? (SRI_JATI_DESC[v] || "-") : "Beban Hidup";
        tabelHtml += `<tr><td align="center">${usia}</td><td align="center"><b>${v}</b></td><td>${d}</td></tr>`;
    });
    tabelHtml += `</table>`;

    detailDiv.innerHTML = `
        <div id="printableArea" style="border:2px solid red; padding:15px; border-radius:10px; background:#fff;">
            <h2 style="color:red; margin:0;">${h} ${pasaran}</h2>
            <p>Masehi: ${date.toLocaleDateString('id-ID')}</p>
            <p>Jawa: ${jw.tgl} ${jw.bulan.nama} 1959</p>
            <hr>
            <p><b>Sifat Hari:</b> ${DATA_SIFAT_HARI[h]}</p>
            <p><b>Sifat Pasaran:</b> ${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</p>
            <div style="background:#e3f2fd; padding:10px; border-radius:5px; margin:10px 0;">
                <p><b>🔮 Numerologi: ${lpNum}</b><br><small>${lpDesc}</small></p>
            </div>
            <h4>Tabel Pal Jati (Keberuntungan)</h4>
            ${tabelHtml}
            <p><b>Neptu:</b> ${nH}+${nP} = ${total}</p>
            <p><b>Nasib:</b> ${PEMBAGI_5[total%5].nama} | <b>Waris:</b> ${NASIB_AHLI_WARIS[total%4].nama}</p>
        </div>
        <div style="margin-top:15px; display:flex; gap:10px;">
            <button onclick="copyToClipboard()" style="flex:1; padding:12px; background:#333; color:white; border-radius:8px;">Salin ke Docs</button>
            <button onclick="window.open('https://wa.me/?text=Ramalan...','_blank')" style="flex:1; padding:12px; background:#25D366; color:white; border-radius:8px;">Share WA</button>
        </div>
    `;
    detailDiv.scrollIntoView({behavior:'smooth'});
}

async function copyToClipboard() {
    const node = document.getElementById("printableArea");
    const range = document.createRange();
    range.selectNode(node);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    alert("Berhasil disalin ke clipboard!");
}

window.onload = () => generateCalendar(currentView);

function changeMonth(offset) {
    currentView.setMonth(currentView.getMonth() + offset);
    generateCalendar(currentView);
}
