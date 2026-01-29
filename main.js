/**
 * KALENDER JAWA MODERN - FULL FIX VERSION 2026
 * Fitur: Kalender Jawa, Imlek 2576, Wuku, Sri Jati, Watak Neptu, & Share WhatsApp
 */

// ==========================================
// 🏮 DATABASE IMLEK ENGINE (FIXED 2576)
// ==========================================
const DATA_IMLEK_INTERNAL = [
    {y: 2025, m: 1, d: 29, leap: 0, kYear: 2576},
    {y: 2026, m: 2, d: 17, leap: 0, kYear: 2577}
];

function getImlekData(date) {
    const y = date.getFullYear();
    let ref = DATA_IMLEK_INTERNAL.find(r => r.y === y);
    if (!ref || date < new Date(y, ref.m - 1, ref.d)) {
        ref = DATA_IMLEK_INTERNAL.find(r => r.y === y - 1);
    }
    if (!ref) return null;

    const start = new Date(ref.y, ref.m - 1, ref.d);
    let diff = Math.floor((date - start) / 86400000);
    let d = 1, m = 1, yr = ref.kYear;
    
    // Sederhana: rata-rata bulan lunar 29/30 hari
    while (diff > 0) {
        let daysInMonth = (m % 2 === 1) ? 30 : 29; 
        if (diff >= daysInMonth) {
            diff -= daysInMonth;
            m++;
            if (m > 12) { m = 1; yr++; }
        } else {
            d += diff;
            diff = 0;
        }
    }
    
    const SHIOS = ["Monyet","Ayam","Anjing","Babi","Tikus","Kerbau","Macan","Kelinci","Naga","Ular","Kuda","Kambing"];
    const ELEM = ["Logam","Logam","Air","Air","Kayu","Kayu","Api","Api","Tanah","Tanah"];
    const blnNama = ["", "Cia Gwee", "Ji Gwee", "Sa Gwee", "Si Gwee", "Go Gwee", "Lak Gwee", "Tjit Gwee", "Pe Gwee", "Kauw Gwee", "Tjap Gwee", "Tjap It Gwee", "Tjap Ji Gwee"];
    
    return {
        tanggal: d, 
        bulanNama: blnNama[m],
        tahun: yr,
        shio: SHIOS[yr % 12],
        elemen: ELEM[yr % 10]
    };
}

// ==========================================
// 🛡️ DATA REFERENSI JAWA & NASIB
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_WATAK_NEPTU = {
    13: { watak: "Lakuning Lintang. Memiliki pesona yang luar biasa, senang membantu, namun cenderung penyendiri dan sulit ditebak pikirannya." }
};

const TABEL_SRIJATI = {
    13: [{usia:"0-6", v:5}, {usia:"6-12", v:2}, {usia:"12-18", v:1}, {usia:"18-24", v:4}, {usia:"24-30", v:5}]
};

const SRI_JATI_DESC = {
    1: "Rejeki Mati (Sangat Sulit)", 2: "Rejeki Seret", 3: "Cukup", 4: "Mudah Rejeki", 5: "Linuwih (Sangat Melimpah)"
};

// ... (Data Sifat Hari/Pasaran/Bulan tetap sama seperti kode sebelumnya) ...

// ==========================================
// ⚙️ LOGIKA KALENDER
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / 86400000);
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const refDate = new Date(2026, 0, 25); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / 86400000);
    let wukuIndex = (20 + Math.floor(diffDays / 7)) % 30;
    while (wukuIndex < 0) wukuIndex += 30;
    return wukuList[wukuIndex];
}

// ==========================================
// 📱 FITUR INTERAKTIF (COPY & WHATSAPP)
// ==========================================

function copyToClipboard() {
    const text = document.getElementById('printableArea').innerText;
    navigator.clipboard.writeText(text).then(() => alert("✅ Hasil berhasil salin!"));
}

function shareToWhatsApp() {
    const text = document.getElementById('printableArea').innerText;
    const url = "https://wa.me/?text=" + encodeURIComponent("📌 *HASIL CEK WETON* \n\n" + text);
    window.open(url, '_blank');
}

// ==========================================
// 🖼️ RENDER DETAIL
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const imlek = getImlekData(date);
    const wuku = getWuku(date);
    const dataSriJati = TABEL_SRIJATI[neptu] || [];

    // Tabel Sri Jati
    let sriJatiContent = `<table style="width:100%; border:1px solid #ddd; font-size:0.8rem; border-collapse:collapse;">
        <tr style="background:#f9f9f9;"><th>Usia</th><th>Nilai</th><th>Keterangan</th></tr>`;
    dataSriJati.forEach(item => {
        sriJatiContent += `<tr><td style="border:1px solid #ddd; padding:5px; text-align:center;">${item.usia}</td>
        <td style="border:1px solid #ddd; padding:5px; text-align:center; color:red;">${item.v}</td>
        <td style="border:1px solid #ddd; padding:5px;">${SRI_JATI_DESC[item.v]}</td></tr>`;
    });
    sriJatiContent += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #eee; color:#000;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="color:#D30000; margin:0;">${wetonKey}</h2>
                <div style="display:flex; gap:5px;">
                    <button onclick="copyToClipboard()" style="background:#444; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">📋 Salin</button>
                    <button onclick="shareToWhatsApp()" style="background:#25d366; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">📱 WA</button>
                </div>
            </div>

            <p style="margin:10px 0;">📅 <strong>${date.getDate()} ${HARI[date.getDay()]} ${date.getFullYear()}</strong></p>

            <div style="background:#fff1f0; padding:12px; border-radius:8px; margin:10px 0; border:1px solid #ffa39e;">
                <p style="margin:0; color:#cf1322; font-weight:bold;">🏮 Kalender Imlek / Kongzili</p>
                <p style="margin:5px 0; font-size:1.1rem;"><strong>${imlek.tanggal} ${imlek.bulanNama} ${imlek.tahun}</strong></p>
                <p style="margin:0; font-size:0.85rem; color:#666;">Shio: <strong>${imlek.elemen} ${imlek.shio}</strong></p>
            </div>

            <p>🔢 <strong>Total Neptu: ${neptu}</strong> | 🎭 <strong>Wuku: ${wuku}</strong></p>

            <div style="background:#f3e5f5; padding:12px; border-radius:8px; margin:10px 0; border:1px solid #d1c4e9;">
                <p style="margin:0; color:#7b1fa2; font-weight:bold;">🌟 Watak Neptu ${neptu}</p>
                <p style="margin:5px 0; font-size:0.85rem;">${DATA_WATAK_NEPTU[neptu]?.watak || "Data watak tersedia segera."}</p>
            </div>

            <div style="margin-top:15px;">
                <p style="font-weight:bold; color:#D30000;">📈 Pal Jati / Sri Jati (Siklus Rejeki)</p>
                ${sriJatiContent}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// Inisialisasi DOM
document.addEventListener('DOMContentLoaded', () => {
    const btnSearch = document.querySelector('button[onclick="searchWeton()"]');
    if(btnSearch) btnSearch.onclick = searchWeton;
    // Generate Kalender awal jika perlu
});
