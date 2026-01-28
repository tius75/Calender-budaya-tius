/**
 * KALENDER JAWA MODERN - VERSI REVISI TOTAL 2026
 * Fitur: Neptu Lengkap, Status Bulan, Wuku, Sri Paljati, PDF & WA Fix.
 */

// ==========================================
// DATA REFERENSI (LOGIKA TETAP)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const SRI_JATI_DESC = {
    0: "Menderita, banyak rintangan (Kesulitan)",
    1: "Banyak rejeki, hidup senang (Makmur)",
    2: "Sedang, cukup untuk kebutuhan (Sederhana)",
    3: "Kekurangan, sering mendapat cobaan (Prihatin)",
    4: "Berlimpah, kehormatan meningkat (Sukses)",
    5: "Sangat beruntung, kebahagiaan sempurna (Jaya)",
    6: "Puncak kejayaan, disegani banyak orang (Mulia)"
};

const TABEL_SRIJATI = {
    7: [{a:"0-6",v:2},{a:"7-12",v:2},{a:"13-18",v:1},{a:"19-24",v:1},{a:"25-30",v:2},{a:"31-36",v:4},{a:"37-42",v:1},{a:"43-48",v:1},{a:"49-54",v:2},{a:"55-60",v:3}],
    8: [{a:"0-6",v:1},{a:"7-12",v:2},{a:"13-18",v:1},{a:"19-24",v:1},{a:"25-30",v:1},{a:"31-36",v:1},{a:"37-42",v:1},{a:"43-48",v:2},{a:"49-54",v:1},{a:"55-60",v:1}],
    9: [{a:"0-6",v:1},{a:"7-12",v:1},{a:"13-18",v:2},{a:"19-24",v:3},{a:"25-30",v:1},{a:"31-36",v:1},{a:"37-42",v:1},{a:"43-48",v:1},{a:"49-54",v:1},{a:"55-60",v:1}],
    10: [{a:"0-6",v:1},{a:"7-12",v:1},{a:"13-18",v:1},{a:"19-24",v:1},{a:"25-30",v:1},{a:"31-36",v:1},{a:"37-42",v:4},{a:"43-48",v:2},{a:"49-54",v:1},{a:"55-60",v:1}],
    11: [{a:"0-6",v:2},{a:"7-12",v:2},{a:"13-18",v:1},{a:"19-24",v:1},{a:"25-30",v:2},{a:"31-36",v:4},{a:"37-42",v:1},{a:"43-48",v:1},{a:"49-54",v:1},{a:"55-60",v:1}],
    12: [{a:"0-6",v:1},{a:"7-12",v:1},{a:"13-18",v:2},{a:"19-24",v:4},{a:"25-30",v:1},{a:"31-36",v:1},{a:"37-42",v:4},{a:"43-48",v:5},{a:"49-54",v:2},{a:"55-60",v:1}],
    13: [{a:"0-6",v:1},{a:"7-12",v:2},{a:"13-18",v:3},{a:"19-24",v:1},{a:"25-30",v:1},{a:"31-36",v:1},{a:"37-42",v:4},{a:"43-48",v:5},{a:"49-54",v:2},{a:"55-60",v:1}],
    14: [{a:"0-6",v:2},{a:"7-12",v:4},{a:"13-18",v:1},{a:"19-24",v:1},{a:"25-30",v:1},{a:"31-36",v:4},{a:"37-42",v:6},{a:"43-48",v:2},{a:"49-54",v:1},{a:"55-60",v:1}],
    15: [{a:"0-6",v:1},{a:"7-12",v:2},{a:"13-18",v:4},{a:"19-24",v:5},{a:"25-30",v:2},{a:"31-36",v:1},{a:"37-42",v:2},{a:"43-48",v:4},{a:"49-54",v:5},{a:"55-60",v:2}],
    16: [{a:"0-6",v:1},{a:"7-12",v:1},{a:"13-18",v:1},{a:"19-24",v:4},{a:"25-30",v:6},{a:"31-36",v:2},{a:"37-42",v:1},{a:"43-48",v:1},{a:"49-54",v:4},{a:"55-60",v:6}],
    17: [{a:"0-6",v:1},{a:"7-12",v:4},{a:"13-18",v:2},{a:"19-24",v:1},{a:"25-30",v:1},{a:"31-36",v:4},{a:"37-42",v:5},{a:"43-48",v:2},{a:"49-54",v:1},{a:"55-60",v:4}],
    18: [{a:"0-6",v:2},{a:"7-12",v:4},{a:"13-18",v:5},{a:"19-24",v:2},{a:"25-30",v:1},{a:"31-36",v:2},{a:"37-42",v:4},{a:"43-48",v:5},{a:"49-54",v:2},{a:"55-60",v:1}]
};

// ==========================================
// FUNGSI LOGIKA (DIPERTAHANKAN)
// ==========================================
// [Fungsi getPasaran, getZodiak, getLunarShio, getWuku, getTanggalJawa, getMangsaInfo, getArahMeditasi tetap sama sesuai kode awal Anda]
// (Disederhanakan untuk efisiensi ruang, pastikan fungsi-fungsi tersebut ada di script Anda)

// ==========================================
// RENDER UI & DETAIL (DIPERLENGKAP)
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const nH = NEPTU_HARI[h];
    const nP = NEPTU_PASARAN[pasaran];
    const neptuTotal = nH + nP;
    
    const infoJawa = getTanggalJawa(date);
    const wukuName = getWuku(date);
    const mangsa = getMangsaInfo(date);
    const zodiak = getZodiak(date);
    const lunar = getLunarShio(date);
    const nasibKematian = NASIB_AHLI_WARIS[neptuTotal % 4];
    const nasib5 = PEMBAGI_5[neptuTotal % 5];
    const arahMeditasi = getArahMeditasi(neptuTotal);
    const usia = hitungUsiaLengkap(date);
    
    const isNaas = infoJawa.bulan.naas.includes(infoJawa.tanggal);
    const isTaliWangke = (wetonKey === infoJawa.bulan.taliWangke);

    // Render Tabel Sri Paljati
    let tabelSriPaljati = `<table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:0.8rem;">
        <tr style="background:#f2f2f2;">
            <th style="border:1px solid #ddd; padding:5px;">Usia</th>
            <th style="border:1px solid #ddd; padding:5px;">Nilai</th>
            <th style="border:1px solid #ddd; padding:5px;">Keterangan</th>
        </tr>`;
    
    const dataSiklus = TABEL_SRIJATI[neptuTotal] || [];
    dataSiklus.forEach(item => {
        tabelSriPaljati += `<tr>
            <td style="border:1px solid #ddd; padding:5px; text-align:center;">${item.a} Th</td>
            <td style="border:1px solid #ddd; padding:5px; text-align:center; font-weight:bold; color:#D30000;">${item.v}</td>
            <td style="border:1px solid #ddd; padding:5px;">${SRI_JATI_DESC[item.v]}</td>
        </tr>`;
    });
    tabelSriPaljati += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" class="card-result" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #eee; color:#000;">
            
            <div style="text-align:center; border-bottom:2px solid #D30000; padding-bottom:10px; margin-bottom:15px;">
                <h2 style="margin:0; color:#D30000;">${wetonKey.toUpperCase()}</h2>
                <p style="margin:5px 0; font-weight:bold;">${date.getDate()} ${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][date.getMonth()]} ${date.getFullYear()}</p>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:15px;">
                <div style="background:#fff8e1; padding:10px; border-radius:8px; border:1px solid #ffe0b2;">
                    <h4 style="margin:0 0 5px; color:#e65100;">📊 Neptu: ${neptuTotal}</h4>
                    <p style="margin:0; font-size:0.85rem;">Hari ${h}: ${nH}</p>
                    <p style="margin:0; font-size:0.85rem;">Pasaran ${pasaran}: ${nP}</p>
                </div>
                <div style="background:#f1f8e9; padding:10px; border-radius:8px; border:1px solid #c8e6c9;">
                    <h4 style="margin:0 0 5px; color:#2e7d32;">🌙 Bulan Jawa</h4>
                    <p style="margin:0; font-size:0.85rem;">${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun}</p>
                    <p style="margin:0; font-size:0.85rem;">Status: <strong>${infoJawa.bulan.status}</strong></p>
                </div>
            </div>

            <div style="background:#fafafa; padding:10px; border-radius:8px; border:1px solid #ddd; margin-bottom:15px; font-size:0.85rem;">
                <p style="margin:0;"><strong>Tali Wangke:</strong> ${infoJawa.bulan.taliWangke}</p>
                <p style="margin:5px 0 0;"><strong>Tanggal Naas ${infoJawa.bulan.nama}:</strong> ${infoJawa.bulan.naas.join(', ')}</p>
                ${isNaas || isTaliWangke ? `<p style="color:red; margin-top:5px; font-weight:bold;">⚠️ HARI INI NAAS / TALI WANGKE</p>` : ''}
            </div>

            <div style="margin-bottom:15px;">
                <h4 style="border-left:4px solid #D30000; padding-left:10px; color:#D30000; margin-bottom:5px;">🛡️ Wuku: ${wukuName}</h4>
                <p style="font-size:0.85rem; line-height:1.4;">${(typeof DATA_WUKU !== 'undefined') ? DATA_WUKU[wukuName] : 'Detail wuku tersedia di database.'}</p>
            </div>

            <div style="margin-bottom:15px; padding:10px; background:#e3f2fd; border-radius:8px; font-size:0.85rem;">
                <p><strong>Zodiak:</strong> ${zodiak} | <strong>Shio:</strong> ${lunar.shio} | <strong>Arah:</strong> ${arahMeditasi}</p>
                <p style="margin-top:5px;"><strong>Nasib Ahli Waris:</strong> ${nasibKematian.nama} (${nasibKematian.arti})</p>
            </div>

            <div style="margin-top:20px;">
                <h4 style="border-left:4px solid #D30000; padding-left:10px; color:#D30000; margin-bottom:5px;">📈 Sri Paljati (Siklus Rejeki)</h4>
                ${tabelSriPaljati}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// FITUR SHARE & DOWNLOAD (FIXED)
// ==========================================

async function downloadPDF() {
    const source = document.getElementById("printableArea");
    if (!source) return alert("Silakan pilih tanggal terlebih dahulu!");

    // Konfigurasi khusus agar tidak blank
    const opt = {
        margin: [10, 10],
        filename: 'Detail_Weton_Jawa.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            backgroundColor: '#ffffff',
            scrollY: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        // Render langsung dari elemen yang terlihat
        await html2pdf().set(opt).from(source).save();
    } catch (e) {
        alert("Gagal mengunduh PDF. Pastikan koneksi internet stabil.");
    }
}

function shareWhatsApp() {
    const detailArea = document.getElementById('printableArea');
    if (!detailArea) return alert("Data tidak ditemukan!");
    
    // Ambil teks bersih dari elemen detail
    const teks = detailArea.innerText
        .replace(/\n\s*\n/g, '\n') // hapus baris kosong berlebih
        .trim();
        
    const header = "*HASIL CEK WETON JAWA LENGKAP*\n--------------------------\n";
    const urlWA = `https://wa.me/?text=${encodeURIComponent(header + teks)}`;
    window.open(urlWA, '_blank');
}
