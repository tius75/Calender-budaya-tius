/**
 * APLIKASI KALENDER JAWA MODERN - VERSI FINAL STABIL
 * Menampilkan: Weton, Neptu, Wuku, Mangsa, Pal Jati, Nasib 4/5, Lunar & Zodiak
 */

// ==========================================
// 1. DATA REFERENSI (Internal & Safety Guard)
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const PEMBAGI_5 = {
    1: { n: "Sri", a: "Rezeki melimpah dan hidup makmur." },
    2: { n: "Lungguh", a: "Mendapatkan derajat, pangkat, atau kedudukan." },
    3: { n: "Gendhong", a: "Mapan dan dihargai banyak orang secara lahiriah." },
    4: { n: "Loro", a: "Sering mengalami hambatan kesehatan atau ujian hidup." },
    0: { n: "Pati", a: "Banyak rintangan besar, perlu kehati-hatian ekstra." }
};

const PEMBAGI_4 = {
    1: { n: "Gunung", a: "Kehidupan yang mulia dan dihormati bagi ahli waris." },
    2: { n: "Guntur", a: "Ahli waris kemungkinan akan menemui banyak kesulitan." },
    3: { n: "Segoro", a: "Mudah mencari rezeki dan memiliki wawasan luas." },
    0: { n: "Asat", a: "Rezeki sering terasa cepat habis atau sulit terkumpul." }
};

let current = new Date();
const TODAY = new Date();

// ==========================================
// 2. LOGIKA PERHITUNGAN
// ==========================================
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date - base) / 86400000);
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getZodiak(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const z = [
        { n: "Capricorn", r: [22,12,19,1] }, { n: "Aquarius", r: [20,1,18,2] },
        { n: "Pisces", r: [19,2,20,3] }, { n: "Aries", r: [21,3,19,4] },
        { n: "Taurus", r: [20,4,20,5] }, { n: "Gemini", r: [21,5,20,6] },
        { n: "Cancer", r: [21,6,22,7] }, { n: "Leo", r: [23,7,22,8] },
        { n: "Virgo", r: [23,8,22,9] }, { n: "Libra", r: [23,9,22,10] },
        { n: "Scorpio", r: [23,10,21,11] }, { n: "Sagittarius", r: [22,11,21,12] }
    ];
    for (let i of z) {
        if ((m === i.r[1] && d >= i.r[0]) || (m === i.r[3] && d <= i.r[2])) return i.n;
    }
    return "Capricorn";
}

function getLunarShio(date) {
    const shio = ["Monyet","Ayam","Anjing","Babi","Tikus","Kerbau","Macan","Kelinci","Naga","Ular","Kuda","Kambing"];
    const y = date.getFullYear();
    return { shio: shio[y % 12], year: y + 3760 };
}

// ==========================================
// 3. RENDER KALENDER
// ==========================================
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const nav = document.getElementById('monthYearNav');
    if (!grid || !nav) return;

    grid.innerHTML = '';

    const y = current.getFullYear();
    const m = current.getMonth();
    nav.innerText = `${["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][m]} ${y}`;

    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.className = 'header-day' + (i === 0 ? ' sunday' : '');
        el.textContent = h.substring(0,3);
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const e = document.createElement('div');
        e.className = 'calendar-day empty-day';
        e.innerHTML = '&nbsp;';
        grid.appendChild(e);
    }

    for (let d = 1; d <= days; d++) {
        const dateObj = new Date(y, m, d);
        const pasaran = getPasaran(dateObj);

        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        if (dateObj.getDay() === 0) cell.classList.add('sunday-block');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');

        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${pasaran}</div>`;
        cell.onclick = () => updateDetail(dateObj, pasaran);
        grid.appendChild(cell);
    }

    const sisa = grid.children.length % 7;
    if (sisa !== 0) {
        for (let i = 0; i < 7 - sisa; i++) {
            const f = document.createElement('div');
            f.className = 'calendar-day empty-day';
            f.innerHTML = '&nbsp;';
            grid.appendChild(f);
        }
    }
}

// ==========================================
// 4. DETAIL (FIX TOTAL)
// ==========================================
function updateDetail(date, pasaran) {
    const detail = document.getElementById('detail');
    if (!detail) return;

    detail.innerHTML = '';
    detail.style.display = 'block';

    const h = HARI[date.getDay()];
    const weton = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const zodiak = getZodiak(date);
    const lunar = getLunarShio(date);
    const wuku = (typeof getWuku === 'function') ? getWuku(date) : "Sinta";
    const mangsa = (typeof getMangsaInfo === 'function')
        ? getMangsaInfo(date)
        : { nama: "Tidak Terdeteksi", deskripsi: "-" };

    detail.innerHTML = `
    <div id="pdf-container" style="background:#fff;padding:20px;color:#000">
        <h2>${weton}</h2>
        <p>📅 ${date.toLocaleDateString('id-ID')}</p>
        <p>🌙 Lunar ${lunar.year} (${lunar.shio})</p>
        <p>⭐ Zodiak ${zodiak}</p>
        <hr>
        <p><strong>Nasib 5:</strong> ${PEMBAGI_5[neptu % 5].n}</p>
        <p>${PEMBAGI_5[neptu % 5].a}</p>
        <p><strong>Nasib 4:</strong> ${PEMBAGI_4[neptu % 4].n}</p>
        <p>${PEMBAGI_4[neptu % 4].a}</p>
        <p><strong>Wuku:</strong> ${wuku}</p>
        <p><strong>Mangsa:</strong> ${mangsa.nama}</p>
    </div>`;

    requestAnimationFrame(() => {
        detail.scrollIntoView({ behavior: 'smooth' });
    });
}

// ==========================================
// 5. DOWNLOAD PDF (ANTI KOSONG)
// ==========================================
window.downloadPDF = () => {
    const el = document.getElementById('pdf-container');
    if (!el) return alert("Silakan pilih tanggal dahulu");

    setTimeout(() => {
        html2pdf().set({
            margin: 0.5,
            filename: 'Ramalan_Lengkap.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, backgroundColor: '#ffffff' },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        }).from(el).save();
    }, 300);
};

// ==========================================
// 6. INIT
// ==========================================
document.getElementById('prevMonth').onclick = () => {
    current.setMonth(current.getMonth() - 1);
    generateCalendar();
};

document.getElementById('nextMonth').onclick = () => {
    current.setMonth(current.getMonth() + 1);
    generateCalendar();
};

generateCalendar();
updateDetail(TODAY, getPasaran(TODAY));