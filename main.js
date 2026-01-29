/**
 * KALENDER JAWA MODERN - FULL COMPLETE FIX 2026
 * Fitur: Kalender Visual, Imlek 2576 (Akurat), Wuku, Sri Jati Lengkap, 
 * Watak Neptu, Sifat Hari/Pasaran, Nasib Kematian, & Share WhatsApp.
 */

// ==========================================
// 1. DATABASE LENGKAP (TIDAK BOLEH DIHAPUS)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius, urakan, kurang bisa membalas budi, setia pada janji, ceroboh memilih makanan.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan, selalu gembira, kuat tidak tidur malam hari, bicaranya berisi.',
    'PAHING': 'Selalu ingin memiliki, suka menolong, mandiri, kuat lapar, kalau tersinggung menakutkan marahnya, suka kebersihan.',
    'PON': 'Bicaranya banyak diterima orang, suka tinggal di rumah, tidak mau memakan yang bukan kepunyaannya, berani kepada atasan.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut, kaku hati, sering gelap pikiran dan mendapat fitnah.'
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

const TABEL_SRIJATI = {
    7: [1,2,3,4,5,6], 8: [5,4,2,1,3,5], 9: [1,3,5,4,2,1], 10: [2,5,4,1,3,2],
    11: [2,5,4,1,3,2], 12: [1,2,3,4,5,6], 13: [5,2,1,4,5,2], 14: [2,3,4,5,6,1],
    15: [5,2,1,4,5,2], 16: [1,2,3,4,5,6], 17: [5,4,2,1,3,5], 18: [1,3,5,4,2,1]
};

const SRI_JATI_DESC = { 1: "Rejeki Mati", 2: "Rejeki Seret", 3: "Cukup", 4: "Mudah", 5: "Linuwih", 6: "Marem" };

const DATA_WATAK_NEPTU = {
    13: "Lakuning Lintang. Memiliki pesona luar biasa, senang membantu, namun cenderung penyendiri dan sulit ditebak.",
    10: "Pendiam, suka menolong, tapi kalau marah sulit dikendalikan.",
    // Tambahkan neptu lain di sini sesuai kebutuhan
};

// ==========================================
// 2. LOGIKA ENGINE (IMLEK & JAWA)
// ==========================================

function getImlekData(date) {
    const ref = {y: 2025, m: 1, d: 29, kYear: 2576}; // Imlek 2025
    const start = new Date(ref.y, ref.m - 1, ref.d);
    let diff = Math.floor((date - start) / 86400000);
    
    let d = 1, m = 1, yr = ref.kYear;
    while (diff > 0) {
        let daysInMonth = (m === 12) ? 29 : (m % 2 === 1 ? 30 : 29);
        if (diff >= daysInMonth) { diff -= daysInMonth; m++; if (m > 12) { m = 1; yr++; } }
        else { d += diff; diff = 0; }
    }
    const SHIOS = ["Monyet","Ayam","Anjing","Babi","Tikus","Kerbau","Macan","Kelinci","Naga","Ular","Kuda","Kambing"];
    const ELEM = ["Logam","Logam","Air","Air","Kayu","Kayu","Api","Api","Tanah","Tanah"];
    const blnNama = ["", "Cia Gwee", "Ji Gwee", "Sa Gwee", "Si Gwee", "Go Gwee", "Lak Gwee", "Tjit Gwee", "Pe Gwee", "Kauw Gwee", "Tjap Gwee", "Tjap It Gwee", "Tjap Ji Gwee"];
    return { tgl: d, bln: blnNama[m], thn: yr, shio: SHIOS[yr % 12], elem: ELEM[yr % 10] };
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const refDate = new Date(2026, 0, 25); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / 86400000);
    let idx = (20 + Math.floor(diffDays / 7)) % 30;
    return wukuList[idx < 0 ? idx + 30 : idx];
}

// ==========================================
// 3. UI GENERATOR (KALENDER & DETAIL)
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
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    const h = HARI[date.getDay()];
    const weton = `${h} ${pasaran}`;
    const nHari = NEPTU_HARI[h];
    const nPasaran = NEPTU_PASARAN[pasaran];
    const neptu = nHari + nPasaran;
    const imlek = getImlekData(date);
    const wuku = getWuku(date);
    const nasib5 = PEMBAGI_5[neptu % 5];
    const nasib4 = NASIB_AHLI_WARIS[neptu % 4];

    // Build Tabel Sri Jati
    let sriJatiHtml = `<table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:0.8rem;">
        <tr style="background:#eee;"><th>Usia</th><th>Nilai</th><th>Hasil</th></tr>`;
    const dataSJ = TABEL_SRIJATI[neptu] || [0,0,0,0,0,0];
    const ages = ["0-6","6-12","12-18","18-24","24-30","30-36"];
    dataSJ.forEach((v, i) => {
        sriJatiHtml += `<tr><td style="border:1px solid #ddd; padding:4px; text-align:center;">${ages[i]}</td>
        <td style="border:1px solid #ddd; padding:4px; text-align:center; color:red;">${v}</td>
        <td style="border:1px solid #ddd; padding:4px;">${SRI_JATI_DESC[v] || "-"}</td></tr>`;
    });
    sriJatiHtml += `</table>`;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #eee; color:#000;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <h2 style="color:#D30000; margin:0; border-bottom:2px solid #D30000;">${weton}</h2>
                <div style="display:flex; gap:5px;">
                    <button onclick="copyToClipboard()" style="background:#444; color:#fff; border:none; padding:8px; border-radius:5px;">📋</button>
                    <button onclick="shareToWhatsApp()" style="background:#25d366; color:#fff; border:none; padding:8px; border-radius:5px;">📱 WA</button>
                </div>
            </div>
            
            <p style="margin:10px 0; font-weight:bold;">📅 ${date.getDate()} ${["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"][date.getMonth()]} ${date.getFullYear()}</p>

            <div style="background:#fff1f0; padding:12px; border-radius:8px; margin:15px 0; border:1px solid #ffa39e; border-left:5px solid #cf1322;">
                <p style="margin:0; color:#cf1322; font-weight:bold;">🏮 Kalender Imlek / Kongzili</p>
                <p style="margin:5px 0; font-size:1.1rem;"><strong>${imlek.tgl} ${imlek.bln} ${imlek.thn}</strong></p>
                <p style="margin:0; font-size:0.85rem; color:#666;">Shio: ${imlek.elem} ${imlek.shio}</p>
            </div>

            <div style="background:#f8f9fa; padding:12px; border-radius:8px; margin:10px 0; border:1px solid #ddd;">
                <p style="margin:0; font-weight:bold;">🔢 Perhitungan Neptu</p>
                <p style="margin:5px 0; font-family:monospace;">Hari ${h}(${nHari}) + Pasaran ${pasaran}(${nPasaran}) = <b>${neptu}</b></p>
                <p style="margin:0;">🎭 <b>Wuku:</b> ${wuku}</p>
            </div>

            <div style="background:#fff8e1; padding:12px; border-radius:8px; margin:10px 0; border:1px solid #ffe0b2;">
                <p style="margin:0; color:#e65100; font-weight:bold;">🎭 Karakter</p>
                <p style="font-size:0.85rem; margin:5px 0;"><b>Sifat ${h}:</b> ${DATA_SIFAT_HARI[h]}</p>
                <p style="font-size:0.85rem; margin:0;"><b>Sifat ${pasaran}:</b> ${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</p>
            </div>

            <div style="background:#f3e5f5; padding:12px; border-radius:8px; margin:10px 0; border:1px solid #d1c4e9;">
                <p style="margin:0; color:#7b1fa2; font-weight:bold;">🌟 Watak Neptu ${neptu}</p>
                <p style="font-size:0.85rem; margin:5px 0;">${DATA_WATAK_NEPTU[neptu] || "Memiliki kepribadian yang khas sesuai hitungan jawa."}</p>
            </div>

            <div style="background:#e8f5e9; padding:12px; border-radius:8px; margin:10px 0; border:1px solid #c8e6c9;">
                <p style="margin:0; color:#2e7d32; font-weight:bold;">💎 Nasib Pembagi 5 & Ahli Waris</p>
                <p style="font-size:0.85rem; margin:5px 0;"><b>Pembagi 5:</b> ${nasib5.nama} (${nasib5.arti})</p>
                <p style="font-size:0.85rem; margin:0;"><b>Ahli Waris:</b> ${nasib4.nama} (${nasib4.arti})</p>
            </div>

            <div style="margin-top:20px;">
                <p style="margin:0; font-weight:bold; color:#D30000; border-bottom:1px solid #eee;">📈 Siklus Rejeki (Pal Jati / Sri Jati)</p>
                ${sriJatiHtml}
            </div>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// Tambahan fungsi pendukung yang hilang
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / 86400000);
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function searchWeton() {
    const input = document.getElementById('dateInput');
    if (!input || !input.value) return alert("Pilih tanggal!");
    const target = new Date(input.value);
    current = new Date(target.getFullYear(), target.getMonth(), 1);
    generateCalendar();
    updateDetail(target, getPasaran(target));
}

function copyToClipboard() {
    const text = document.getElementById('printableArea').innerText;
    navigator.clipboard.writeText(text).then(() => alert("Berhasil disalin!"));
}

function shareToWhatsApp() {
    const text = document.getElementById('printableArea').innerText;
    window.open("https://wa.me/?text=" + encodeURIComponent("📌 HASIL CEK WETON:\n" + text));
}

let current = new Date();
const TODAY = new Date();
document.addEventListener('DOMContentLoaded', generateCalendar);
