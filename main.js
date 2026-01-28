/**
 * APLIKASI KALENDER WETON & ASTROLOGI LENGKAP
 * Versi: 3.0 (Final Stable)
 */

// ==========================================
// 1. KONSTANTA DASAR & DATA INTERNAL
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const PEMBAGI_5 = {
    1: { n: "Sri", a: "Rezeki melimpah dan hidup makmur." },
    2: { n: "Lungguh", a: "Mendapatkan kedudukan, pangkat, atau derajat tinggi." },
    3: { n: "Gendhong", a: "Mapan secara lahiriah dan dihargai banyak orang." },
    4: { n: "Loro", a: "Sering menghadapi hambatan kesehatan atau perjalanan hidup yang sulit." },
    0: { n: "Pati", a: "Banyak rintangan besar, perlu kehati-hatian dalam melangkah." }
};

const PEMBAGI_4 = {
    1: { n: "Gunung", a: "Kehidupan yang mulia bagi ahli waris." },
    2: { n: "Guntur", a: "Ahli waris kemungkinan akan menemui banyak cobaan." },
    3: { n: "Segoro", a: "Kemudahan dalam mencari rezeki dan berwawasan luas." },
    0: { n: "Asat", a: "Rezeki sering terasa cepat habis atau sulit terkumpul." }
};

let current = new Date();
const TODAY = new Date();

// ==========================================
// 2. LOGIKA PERHITUNGAN (Core Logic)
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const refDate = new Date(2026, 0, 25); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let idx = (20 + Math.floor(diffDays / 7)) % 30;
    return wukuList[idx < 0 ? idx + 30 : idx];
}

function getLunarShio(date) {
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    const year = date.getFullYear();
    return {
        shio: shios[year % 12],
        lunarYear: year + 3760 // Estimasi tahun Kongzili
    };
}

function getZodiak(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
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

// ==========================================
// 3. RENDER UI & DOWNLOAD PDF
// ==========================================

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulanMasehi = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    mNav.innerText = `${namaBulanMasehi[m]} ${y}`;

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
        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }
}

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const infoJawa = (typeof getTanggalJawa === 'function') ? getTanggalJawa(date) : {tanggal: "-", bulan:{nama:"-"}, tahun:"-"};
    const mangsa = (typeof getMangsaInfo === 'function') ? getMangsaInfo(date) : null;
    const wuku = getWuku(date);
    const star = getZodiak(date);
    const lunar = getLunarShio(date);

    // Proteksi Data Luar (File Terpisah)
    const teksWuku = (typeof DATA_WUKU !== 'undefined') ? (DATA_WUKU[wuku] || "Detail tidak tersedia.") : "Data wuku belum dimuat.";
    const teksHari = (typeof DATA_HARI !== 'undefined') ? (DATA_HARI[wetonKey] || "") : "";
    const teksBintang = (typeof DATA_ZODIAK !== 'undefined') ? (DATA_ZODIAK[star] || "Karakter bintang belum tersedia.") : "Zodiak " + star;

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="capture-area" style="background:#fff; padding:25px; border-radius:15px; border:2px solid #D30000; color:#000;">
            <h1 style="color:#D30000; border-bottom:2px solid #D30000; padding-bottom:10px; margin-top:0;">${wetonKey}</h1>
            
            <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:0.9rem;">
                <span>📅 <strong>${date.getDate()} ${["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][date.getMonth()]} ${date.getFullYear()}</strong></span>
                <span>🏮 <strong>${lunar.lunarYear} (${lunar.shio})</strong></span>
            </div>

            <div style="background:#fef9e7; padding:15px; border-radius:10px; margin-bottom:15px; border-left:5px solid #f1c40f;">
                <h3 style="margin:0 0 10px 0; color:#856404;">💠 Analisis Nasib (Neptu: ${neptu})</h3>
                <p><strong>Pembagi 5 (${PEMBAGI_5[neptu % 5].n}):</strong> ${PEMBAGI_5[neptu % 5].a}</p>
                <p><strong>Pembagi 4 (${PEMBAGI_4[neptu % 4].n}):</strong> ${PEMBAGI_4[neptu % 4].a}</p>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:15px;">
                <div style="background:#e8f5e9; padding:10px; border-radius:8px;">
                    <h4 style="margin:0; color:#2e7d32;">🌾 Pranata Mangsa</h4>
                    <p style="font-size:0.8rem; margin:5px 0 0;">${mangsa ? mangsa.nama : 'Data Mangsa Kosong'}</p>
                </div>
                <div style="background:#e3f2fd; padding:10px; border-radius:8px;">
                    <h4 style="margin:0; color:#0d47a1;">✨ Zodiak</h4>
                    <p style="font-size:0.8rem; margin:5px 0 0;">${star}</p>
                </div>
            </div>

            <div style="margin-bottom:15px;">
                <h4 style="color:#D30000; margin-bottom:5px;">🛡️ Info Wuku: ${wuku}</h4>
                <p style="font-size:0.85rem; line-height:1.4;">${teksWuku}</p>
            </div>

            <div style="margin-bottom:15px;">
                <h4 style="color:#D30000; margin-bottom:5px;">🌟 Astrologi & Karakter</h4>
                <p style="font-size:0.85rem; line-height:1.4;"><strong>Sifat ${star}:</strong> ${teksBintang}</p>
                <p style="font-size:0.85rem; line-height:1.4;"><strong>Sifat Hari:</strong> ${teksHari}</p>
            </div>
        </div>
    `;
    
    const actionBtn = document.getElementById('actionButtons');
    if(actionBtn) actionBtn.style.display = 'flex';
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

window.downloadPDF = () => {
    const element = document.getElementById('capture-area');
    if (!element) return alert("Pilih tanggal di kalender terlebih dahulu!");
    
    const opt = {
        margin: 0.3,
        filename: 'Ramalan_Lengkap.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
};

// ==========================================
// 4. NAVIGASI
// ==========================================

document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };

// Jalankan aplikasi saat load pertama
generateCalendar();
updateDetail(TODAY, getPasaran(TODAY));
