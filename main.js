/**
 * KALENDER JAWA MODERN - MODULAR ENGINE
 * Fitur: Weton, Usia, Numerologi, Body Design, Meditasi, Kamarokam (Pembagi 6)
 */

// ==========================================
// 1. DATA REFERENSI UTAMA
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

// ==========================================
// 2. MODUL LOGIKA KHUSUS (Modular Logic)
// ==========================================

const ModulFitur = {
    // A. HITUNG USIA
    hitungUsia: (tglLahir) => {
        const hariIni = new Date();
        let thn = hariIni.getFullYear() - tglLahir.getFullYear();
        let bln = hariIni.getMonth() - tglLahir.getMonth();
        let hari = hariIni.getDate() - tglLahir.getDate();
        if (hari < 0) { bln--; hari += new Date(hariIni.getFullYear(), hariIni.getMonth(), 0).getDate(); }
        if (bln < 0) { thn--; bln += 12; }
        return `${thn} Tahun, ${bln} Bulan, ${hari} Hari`;
    },

    // B. ARAH MEDITASI (Berdasarkan Neptu)
    getArahMeditasi: (neptu) => {
        const petaArah = {
            7: "Kulon (Barat)", 8: "Lor (Utara)", 9: "Wetan (Timur)", 10: "Kidul (Selatan)",
            11: "Kulon (Barat)", 12: "Lor (Utara)", 13: "Wetan (Timur)", 14: "Kidul (Selatan)",
            15: "Kulon (Barat)", 16: "Lor (Utara)", 17: "Wetan (Timur)", 18: "Kidul (Selatan)"
        };
        return petaArah[neptu] || "Pusat (Tengah)";
    },

    // C. KAMAROKAM (Pembagi 6)
    getKamarokam: (neptu) => {
        const data6 = {
            1: { n: "NUJU PADU", w: "Jelek. Sering bertengkar, tidak ada kesatuan pendapat.", m: "Dapur, Warung, Restaurant." },
            2: { n: "KALA TINANTANG", w: "Jelek. Kekurangan hidup, sakit-sakitan, amarah besar.", m: "Dapur, Rumah, Warung." },
            3: { n: "SANGGAR WARINGIN", w: "Baik. Tenteram, bahagia, rejeki berkembang, pelindung keluarga.", m: "Hajatan, Pindah Rumah, Tempat Ibadah." },
            4: { n: "MANTRI SINAROJA", w: "Baik. Cita-cita tercapai, senang, tidak kurang sandang pangan.", m: "Hajatan, Pindah Rumah." },
            5: { n: "MACAN KETAWAN", w: "Sedang. Disegani tapi dijauhi, sering kehilangan.", m: "Mendirikan Rumah, Pintu Regol/Gerbang." },
            0: { n: "NUJU PATI", w: "Buruk. Rejeki mampet, susah hidup, malang/bencana.", m: "Buat Paku Bumi, Jabung (Gerabah)." }
        };
        return data6[neptu % 6];
    },

    // D. NUMEROLOGI (Phytagorean)
    getNumerologi: (date) => {
        const s = date.getDate().toString() + (date.getMonth() + 1).toString() + date.getFullYear().toString();
        const sum = s.split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const final = (sum % 9 === 0) ? 9 : sum % 9;
        const ramalan = [
            "", "Pemimpin, Mandiri", "Diplomat, Peka", "Ekspresif, Kreatif", 
            "Praktis, Disiplin", "Petualang, Bebas", "Harmoni, Pengasuh", 
            "Analitis, Spiritual", "Ambisius, Berkuasa", "Kemanusiaan, Idealist"
        ];
        return { angka: final, arti: ramalan[final] };
    },

    // E. BODY DESIGN (Sederhana Berdasarkan Elemen Tanggal)
    getBodyDesign: (date) => {
        const pathID = (date.getDate() % 4) + 1;
        const paths = {
            1: { p: "Path of Strength", r: "Energi fisik kuat, penopang keluarga." },
            2: { p: "Path of Wisdom", r: "Pemikir dalam, pandai memberi nasihat." },
            3: { p: "Path of Vision", r: "Intuisi tajam, mampu melihat peluang masa depan." },
            4: { p: "Path of Action", r: "Eksekutor hebat, tidak suka menunda pekerjaan." }
        };
        return paths[pathID];
    }
};

// ==========================================
// 3. CORE ENGINE (Kalender & Update UI)
// ==========================================

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    // Logika Dasar
    const h = HARI[date.getDay()];
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const usia = ModulFitur.hitungUsia(date);
    const meditasi = ModulFitur.getArahMeditasi(neptu);
    const kamarokam = ModulFitur.getKamarokam(neptu);
    const num = ModulFitur.getNumerologi(date);
    const body = ModulFitur.getBodyDesign(date);

    // Render HTML Modular
    detailDiv.innerHTML = `
        <div class="card-result" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #ddd; color:#333;">
            <h2 style="color:#D30000; margin:0;">${h} ${pasaran} (Neptu: ${neptu})</h2>
            <p style="color:#666; margin-bottom:15px;">👶 Usia Saat Ini: <strong>${usia}</strong></p>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:15px;">
                <div style="background:#f0f4f8; padding:10px; border-radius:8px;">
                    <h4 style="margin:0; color:#243b55;">🧘 Arah Meditasi</h4>
                    <p style="font-size:0.9rem; font-weight:bold;">👉 ${meditasi}</p>
                </div>
                <div style="background:#fff3e0; padding:10px; border-radius:8px;">
                    <h4 style="margin:0; color:#e65100;">🔢 Numerologi</h4>
                    <p style="font-size:0.85rem;">Angka ${num.angka}: ${num.arti}</p>
                </div>
            </div>

            <div style="background:#e8f5e9; padding:12px; border-radius:8px; border-left:5px solid #2e7d32; margin-bottom:15px;">
                <h4 style="margin:0; color:#1b5e20;">💠 Kamarokam (Pembagi 6): ${kamarokam.n}</h4>
                <p style="font-size:0.8rem; margin:5px 0;"><strong>Watak:</strong> ${kamarokam.w}</p>
                <p style="font-size:0.8rem; color:#2e7d32;"><strong>Manfaat:</strong> ${kamarokam.m}</p>
            </div>

            <div style="background:#f3e5f5; padding:12px; border-radius:8px; margin-bottom:15px;">
                <h4 style="margin:0; color:#4a148c;">🧬 Body Design</h4>
                <p style="font-size:0.85rem; margin:5px 0;"><strong>${body.p}</strong>: ${body.r}</p>
            </div>
            
            <p style="font-size:0.75rem; color:#999; text-align:center;">Data dihitung berdasarkan algoritma Kalender Jawa Modern v2.0</p>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 4. INIT & NAVIGASI
// ==========================================
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    mNav.innerText = `${["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][m]} ${y}`;

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

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    updateDetail(TODAY, getPasaran(TODAY));
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
