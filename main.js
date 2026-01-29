/**
 * KALENDER JAWA MODERN - VERSI UPDATE KONZILI & WINDU
 * Update: Fitur Tahun Konzili & Tahun Jawa Windu (Siklus 8 Tahun)
 */

// ==========================================
// KONSTANTA & DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// DATA FILOSOFIS WINDU (SIKLUS 8 TAHUN)
const DATA_WINDU_JAWA = [
    { nama: "Jimakir", makna: "Suwung (Kosong/Selesai)", penjelasan: "Melambangkan akhir dan evaluasi. Fase untuk melepaskan keterikatan duniawi dan mengevaluasi apa yang telah dilakukan." },
    { nama: "Alip", makna: "Ada-ada (Niat)", penjelasan: "Melambangkan permulaan. Waktunya manusia mulai menanam niat, ide, atau tekad untuk melakukan sesuatu yang baik." },
    { nama: "Ehe", makna: "Tumandang (Bekerja)", penjelasan: "Melambangkan realisasi. Setelah ada niat, tahun ini adalah waktunya mulai bergerak dan bertindak." },
    { nama: "Jimawal", makna: "Gawe (Pekerjaan)", penjelasan: "Melambangkan proses. Pekerjaan mulai terlihat bentuknya dan menuntut ketekunan." },
    { nama: "Je", makna: "Lelakon (Peristiwa/Nasib)", penjelasan: "Melambangkan ujian. Dalam proses bekerja, manusia pasti menemui cobaan atau dinamika hidup." },
    { nama: "Dal", makna: "Urip (Hidup)", penjelasan: "Melambangkan keberadaan. Tahun sakral (Duda). Waktunya merenungi hakikat hidup dan hubungan dengan Sang Pencipta." },
    { nama: "Be", makna: "Bola-bali (Kembali/Konsisten)", penjelasan: "Melambangkan keteguhan. Mengajarkan manusia untuk tetap konsisten pada kebaikan." },
    { nama: "Wawu", makna: "Marang (Arah/Tujuan)", penjelasan: "Melambangkan fokus. Menjelang akhir siklus, manusia diingatkan fokus pada tujuan akhir." }
];

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius, urakan, setia pada janji.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan, selalu gembira.',
    'PAHING': 'Selalu ingin memiliki, suka menolong, mandiri, kuat lapar.',
    'PON': 'Bicaranya banyak diterima orang, suka tinggal di rumah, jalan pikiran berbeda.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut, kaku hati.'
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
// FUNGSI LOGIKA (FIXED)
// ==========================================

function getTahunKonzili(date) {
    const diffTime = date.getTime() - TODAY.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    let tgl = 11 + diffDays; let bln = 12; let thn = 2576;
    while (tgl > 30) { tgl -= 30; bln++; if (bln > 12) { bln = 1; thn++; } }
    while (tgl <= 0) { tgl += 30; bln--; if (bln <= 0) { bln = 12; thn--; } }
    return `${tgl}-${bln}-${thn}`;
}

function getWinduJawa(tahunJawa) {
    // Sisa bagi (1959 + 6) % 8 = 5. Indeks 5 pada DATA_WINDU_JAWA adalah 'Dal'.
    const index = (tahunJawa + 6) % 8; 
    return DATA_WINDU_JAWA[index]; 
}

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); 
    const refTglJawa = 9; const refBulanIdx = 7; const refTahunJawa = 1959;
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let tglJawa = refTglJawa + diffDays;
    let bulanIdx = refBulanIdx; let tahunJawa = refTahunJawa;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; if (bulanIdx === 0) tahunJawa++; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; if (bulanIdx === 11) tahunJawa--; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: tahunJawa };
}

// Fungsi dummy untuk mencegah error jika data tidak ada
function getWuku(date) { return "Sinta"; }
function getMangsaInfo(date) { return null; }
function getZodiak(date) { return "Aries"; }
function getLunarShio(date) { return {shio: "Naga", lunarYear: 2026}; }
function getArahMeditasi(neptu) { return "Utara"; }
function hitungUsiaLengkap(date) { return "0 Tahun"; }

// ==========================================
// RENDER UI
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const nHari = NEPTU_HARI[h];
    const nPasaran = NEPTU_PASARAN[pasaran];
    const neptu = nHari + nPasaran;
    
    const infoJawa = getTanggalJawa(date);
    const winduData = getWinduJawa(infoJawa.tahun); // Mengambil Objek
    const tglKonzili = getTahunKonzili(date);

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" class="card-result" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #eee; box-shadow: 0 4px 6px rgba(0,0,0,0.05); color:#000;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <h2 style="color:#D30000; margin:0 0 5px 0; border-bottom:2px solid #D30000; display:inline-block;">${wetonKey}</h2>
            </div>
            
            <p style="margin:10px 0 0; font-size:1.15rem; font-weight:bold;">📅 ${date.getDate()} ${date.getFullYear()}</p>
            <p style="margin:5px 0; font-size:0.9rem; color:#d30000;"><strong>🏛️ Tahun Konzili:</strong> ${tglKonzili}</p>
            
            <div style="background:#fff9f9; padding:15px; border-radius:8px; margin:10px 0; border:1px solid #ffeded;">
                <p style="margin:0; color:#d30000; font-weight:bold; font-size:1rem;">🌙 Kalender Jawa</p>
                <p style="margin:5px 0; font-size:0.9rem;"><strong>Tanggal:</strong> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
                <p style="margin:5px 0; font-size:0.9rem;"><strong>Tahun Windu:</strong> ${winduData.nama} (${winduData.makna})</p>
                <p style="margin:5px 0; font-size:0.85rem; font-style:italic; color:#555; line-height:1.4;">"${winduData.penjelasan}"</p>
            </div>

            <div style="background:#f8f9fa; padding:12px; border-radius:8px; margin:10px 0; border:1px solid #e9ecef;">
                <h4 style="margin:0 0 8px 0; color:#333; font-size:0.95rem;">🔢 Perhitungan Neptu</h4>
                <p style="margin:0; font-family: monospace; font-size:0.9rem;">
                    Hari ${h} (${nHari}) + Pasaran ${pasaran} (${nPasaran}) = <strong>${neptu}</strong>
                </p>
            </div>

            <div style="margin:15px 0; padding:12px; border:1px solid #ffe0b2; background:#fff8e1; border-radius:8px;">
                <h4 style="margin:0 0 5px 0; color:#e65100;">⚖️ Watak & Nasib</h4>
                <p style="font-size:0.85rem; margin:5px 0;"><strong>Watak Hari:</strong> ${DATA_SIFAT_HARI[h]}</p>
                <p style="font-size:0.85rem; margin:5px 0;"><strong>Watak Pasaran:</strong> ${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</p>
                <p style="font-size:0.85rem; margin:5px 0;"><strong>Nasib Rejeki:</strong> ${PEMBAGI_5[neptu % 5].nama} - ${PEMBAGI_5[neptu % 5].arti}</p>
            </div>
        </div>`;
}