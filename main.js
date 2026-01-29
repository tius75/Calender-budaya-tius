/**
 * KALENDER JAWA & KONGZILI LENGKAP 2026
 * Fitur: Neptu, Windu, Kongzili Manual, Sri Jati, Wuku, & Sifat Lengkap
 */

// ==========================================
// DATA REFERENSI LENGKAP
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_WINDU = [
    { nama: "Alip", filosofi: "Ada-ada (Niat)", deskripsi: "Melambangkan permulaan. Waktunya manusia mulai menanam niat, ide, atau tekad." },
    { nama: "Ehe", filosofi: "Tumandang (Bekerja)", deskripsi: "Melambangkan realisasi. Waktunya mulai bergerak dan bertindak." },
    { nama: "Jimawal", filosofi: "Gawe (Pekerjaan)", deskripsi: "Melambangkan proses. Pekerjaan mulai terlihat bentuknya." },
    { nama: "Je", filosofi: "Lelakon (Nasib)", deskripsi: "Melambangkan ujian. Menemui cobaan hidup sebagai ujian mental." },
    { nama: "Dal", filosofi: "Urip (Hidup)", deskripsi: "Melambangkan keberadaan. Tahun sakral untuk merenungi hakikat hidup." },
    { nama: "Be", filosofi: "Bola-bali (Konsisten)", deskripsi: "Melambangkan keteguhan. Tetap konsisten pada kebaikan." },
    { nama: "Wawu", filosofi: "Marang (Arah)", deskripsi: "Melambangkan fokus. Kembali fokus pada tujuan akhir hidup." },
    { nama: "Jimakir", filosofi: "Suwung (Selesai)", deskripsi: "Melambangkan akhir dan evaluasi masa lalu." }
];

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara, ambisius, setia pada janji, ceroboh memilih makanan.',
    'LEGI': 'Bertanggung jawab, murah hati, selalu gembira, bicaranya berisi.',
    'PAHING': 'Penuh perhitungan, suka menolong, mandiri, marahnya menakutkan.',
    'PON': 'Bicaranya banyak diterima, suka tinggal di rumah, berani kepada atasan.',
    'WAGE': 'Menarik tetapi angkuh, setia, kaku hati, tidak bisa berpikir panjang.'
};

const DATA_SIFAT_HARI = {
    'Minggu': 'Tekun, mandiri dan berwibawa.',
    'Senin': 'Selalu berubah, indah dan mendapatkan simpati.',
    'Selasa': 'Pemarah dan pencemburu serta luas pergaulannya.',
    'Rabu': 'Pendiam, pemomong dan penyabar.',
    'Kamis': 'Sangar dan menakutkan.',
    'Jumat': 'Energik dan mengagumkan.',
    'Sabtu': 'Membuat orang senang dan susah ditebak.'
};

const PEMBAGI_5 = { 
    1: { nama: "Sri", arti: "Murah rezeki dan hidup makmur." },
    2: { nama: "Lungguh", arti: "Mendapatkan kedudukan atau pangkat tinggi." },
    3: { nama: "Gendhong", arti: "Mapan secara lahiriah dan dihargai orang." },
    4: { nama: "Loro", arti: "Sering menghadapi rintangan kesehatan." },
    0: { nama: "Pati", arti: "Banyak hambatan, perlu kehati-hatian." }
};

const DATA_BULAN_JAWA = [
    { nama: "Sura", status: "Tidak Baik", naas: [6, 11, 13, 17, 27], taliWangke: "Rabu Pahing" },
    { nama: "Sapar", status: "Tidak Baik", naas: [1, 10, 12, 20], taliWangke: "Kamis Pon" },
    { nama: "Mulud", status: "Tidak Baik", naas: [1, 8, 10, 15, 23], taliWangke: "Jumat Wage" },
    { nama: "Bakdamulud", status: "Baik", naas: [10, 15, 20, 28], taliWangke: "Sabtu Kliwon" },
    { nama: "Jumadilawal", status: "Tidak Baik", naas: [1, 10, 11, 26], taliWangke: "Senin Kliwon" },
    { nama: "Jumadilakir", status: "Kurang Baik", naas: [10, 14, 18, 21], taliWangke: "Selasa Legi" },
    { nama: "Rejeb", status: "Tidak Baik", naas: [2, 12, 13, 27], taliWangke: "Rabu Pahing" },
    { nama: "Ruwah", status: "Baik", naas: [4, 13, 19, 28], taliWangke: "Kamis Pon" },
    { nama: "Pasa", status: "Tidak Baik", naas: [7, 10, 15, 25], taliWangke: "Jumat Wage" },
    { nama: "Syawal", status: "Sangat Tidak Baik", naas: [2, 10, 20, 27], taliWangke: "Sabtu Kliwon" },
    { nama: "Dulkaidah", status: "Cukup Baik", naas: [2, 12, 21, 28], taliWangke: "Senin Kliwon" },
    { nama: "Besar", status: "Sangat Baik", naas: [1, 10, 13, 25], taliWangke: "Selasa Wage" }
];

// ==========================================
// LOGIKA PERHITUNGAN
// ==========================================

function hitungKongzili(date) {
    // Referensi: 29 Jan 2026 adalah 1-1-2577 Kongzili
    const refDate = new Date(2026, 0, 29);
    const diffDays = Math.floor((date - refDate) / (1000 * 60 * 60 * 24));
    
    // Logika sederhana penyesuaian hari & bulan Imlek/Kongzili
    let day = 1 + diffDays;
    let month = 1;
    let year = 2577;

    // Sederhananya jika sebelum 29 Jan 2026, masuk tahun 2576
    if (diffDays < 0) {
        year = 2576;
        month = 12;
        day = 30 + diffDays; // Asumsi bulan terakhir 30 hari
    }
    
    return { teks: `Hari ${day}, Bulan ${month}, Tahun ${year} Kongzili`, numerik: `${day}-${month}-${year}` };
}

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); 
    const refTglJawa = 9;
    const refBulanIdx = 7; // Ruwah
    const refTahunJawa = 1959;
    
    const diffDays = Math.floor((date - refDate) / (1000 * 60 * 60 * 24));
    let totalHari = refTglJawa + diffDays;
    let bIdx = refBulanIdx;
    let thn = refTahunJawa;
    
    while (totalHari > 30) { totalHari -= 30; bIdx = (bIdx + 1) % 12; if (bIdx === 0) thn++; }
    while (totalHari <= 0) { totalHari += 30; bIdx = (bIdx - 1 + 12) % 12; if (bIdx === 11) thn--; }
    
    return { tgl: totalHari, bulan: DATA_BULAN_JAWA[bIdx], tahun: thn, windu: DATA_WINDU[(thn - 1) % 8] };
}

// ==========================================
// RENDER UI
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()];
    const nHari = NEPTU_HARI[h];
    const nPasaran = NEPTU_PASARAN[pasaran];
    const neptu = nHari + nPasaran;
    
    const jawa = getTanggalJawa(date);
    const kongzili = hitungKongzili(date);
    const nasib5 = PEMBAGI_5[neptu % 5];

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #ddd; color:#000;">
            <div style="display:flex; justify-content:space-between;">
                <h2 style="color:#D30000; margin:0;">${h} ${pasaran}</h2>
                <button onclick="copyToClipboard()" style="background:#D30000; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Salin</button>
            </div>
            <p style="font-weight:bold; margin:5px 0;">${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            <hr>

            <div style="background:#fff9f9; padding:10px; border-radius:8px; margin-bottom:10px; border:1px solid #ffeded;">
                <p style="margin:0; color:#d30000; font-weight:bold;">🌙 Kalender Jawa & Windu</p>
                <p style="margin:5px 0; font-size:0.9rem;">${jawa.tgl} ${jawa.bulan.nama} ${jawa.tahun} AJ</p>
                <p style="margin:5px 0; font-size:0.9rem;"><strong>Windu:</strong> ${jawa.windu.nama} (${jawa.windu.filosofi})</p>
                <p style="margin:5px 0; font-size:0.8rem; color:#666;">"${jawa.windu.deskripsi}"</p>
                <p style="margin:5px 0; font-size:0.85rem;"><strong>Status:</strong> ${jawa.bulan.status} | <strong>Naas:</strong> ${jawa.bulan.naas.join(', ')}</p>
            </div>

            <div style="background:#fffdec; padding:10px; border-radius:8px; margin-bottom:10px; border:1px solid #f9f0a4;">
                <p style="margin:0; color:#b08900; font-weight:bold;">🧧 Penanggalan Kongzili</p>
                <p style="margin:5px 0; font-size:0.9rem;">${kongzili.teks}</p>
                <p style="margin:5px 0; font-size:0.9rem;">Numerik: ${kongzili.numerik}</p>
            </div>

            <div style="background:#f8f9fa; padding:10px; border-radius:8px; margin-bottom:10px;">
                <p style="margin:0; font-weight:bold;">🔢 Perhitungan Neptu</p>
                <p style="margin:5px 0; font-family:monospace;">${h} (${nHari}) + ${pasaran} (${nPasaran}) = <strong>Total ${neptu}</strong></p>
            </div>

            <div style="background:#e8f5e9; padding:10px; border-radius:8px;">
                <p style="margin:0; font-weight:bold; color:#2e7d32;">💎 Nasib (Sangkan Paraning): ${nasib5.nama}</p>
                <p style="margin:5px 0; font-size:0.85rem;">${nasib5.arti}</p>
            </div>
            
            <div style="margin-top:10px; font-size:0.85rem;">
                <p><strong>Sifat Hari:</strong> ${DATA_SIFAT_HARI[h]}</p>
                <p><strong>Sifat Pasaran:</strong> ${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</p>
            </div>
        </div>
    `;
}

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    mNav.innerText = `${namaBulan[m]} ${y}`;

    HARI.forEach(h => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day';
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
        cell.innerHTML = `<div>${d}</div><div style="font-size:0.7rem;">${p}</div>`;
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

let current = new Date();
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    updateDetail(new Date(), getPasaran(new Date()));
});

function copyToClipboard() {
    const text = document.getElementById('printableArea').innerText;
    navigator.clipboard.writeText(text).then(() => alert("Berhasil disalin!"));
}