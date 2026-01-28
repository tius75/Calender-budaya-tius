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
// 2. LOGIKA PERHITUNGAN (Core Engine)
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getZodiak(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const zodiacs = [
        { n: "Capricorn", r: [22, 12, 19, 1] }, { n: "Aquarius", r: [20, 1, 18, 2] },
        { n: "Pisces", r: [19, 2, 20, 3] }, { n: "Aries", r: [21, 3, 19, 4] },
        { n: "Taurus", r: [20, 4, 20, 5] }, { n: "Gemini", r: [21, 5, 20, 6] },
        { n: "Cancer", r: [21, 6, 22, 7] }, { n: "Leo", r: [23, 7, 22, 8] },
        { n: "Virgo", r: [23, 8, 22, 9] }, { n: "Libra", r: [23, 9, 22, 10] },
        { n: "Scorpio", r: [23, 10, 21, 11] }, { n: "Sagittarius", r: [22, 11, 21, 12] }
    ];
    for (let z of zodiacs) {
        if ((m == z.r[1] && d >= z.r[0]) || (m == z.r[3] && d <= z.r[2])) return z.n;
    }
    return "Capricorn";
}

function getLunarShio(date) {
    const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
    const y = date.getFullYear();
    return { shio: shios[y % 12], year: y + 3760 };
}

// ==========================================
// 3. RENDER UI & PDF (Anti-Gagal)
// ==========================================

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid || !mNav) return;

    grid.innerHTML = '';

    const y = current.getFullYear();
    const m = current.getMonth();

    mNav.innerText = `${["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][m]} ${y}`;

    // HEADER HARI
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day' + (i === 0 ? ' sunday' : '');
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // ==== FIX UTAMA: EMPTY CELL HARUS ADA CLASS ====
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty-day';
        empty.innerHTML = '&nbsp;';
        grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);

        const cell = document.createElement('div');
        cell.className = 'calendar-day';

        if (dateObj.getDay() === 0) cell.classList.add('sunday-block');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');

        cell.innerHTML = `
            <div class="date-num">${d}</div>
            <div class="pasaran-text">${p}</div>
        `;

        cell.onclick = () => updateDetail(dateObj, p);
        grid.appendChild(cell);
    }

    // ==== GUARD GRID: PAKSA KELIPATAN 7 ====
    const totalCell = grid.children.length;
    const sisa = totalCell % 7;
    if (sisa !== 0) {
        for (let i = 0; i < 7 - sisa; i++) {
            const filler = document.createElement('div');
            filler.className = 'calendar-day empty-day';
            filler.innerHTML = '&nbsp;';
            grid.appendChild(filler);
        }
    }
}

function updateDetail(date, pasaran) {
    /* === ISI FUNGSI TETAP SAMA, TIDAK DIUBAH === */
    // (kode kamu di sini TIDAK DISENTUH)
}

// Download PDF
window.downloadPDF = () => {
    const element = document.getElementById('pdf-container');
    if (!element) return alert("Silakan pilih tanggal terlebih dahulu!");
    const opt = {
        margin: 0.5,
        filename: 'Ramalan_Lengkap.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
};

// ==========================================
// 4. INIT
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