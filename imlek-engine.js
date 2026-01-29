/**
 * IMLEK ENGINE - Solusi Konversi Lunar untuk Kalender Jawa Modern
 */
const SHIO_LIST = ["Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing", "Monyet", "Ayam", "Anjing", "Babi"];

function getLunarImlek(date) {
    // Titik Referensi: 29 Januari 2025 adalah 1-1-2576 (Tahun Baru Imlek 2025)
    const refDate = new Date(2025, 0, 29); 
    const diffTime = date.getTime() - refDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Rata-rata siklus bulan lunar (29.53 hari)
    const LUNAR_CYCLE = 29.53059;
    
    // Perhitungan kasar bulan dan hari
    let totalMonths = Math.floor(diffDays / LUNAR_CYCLE);
    let lDay = Math.floor(diffDays % LUNAR_CYCLE) + 1;
    let lMonth = (totalMonths % 12) + 1;
    let lYear = 2576 + Math.floor(totalMonths / 12);

    // Koreksi sederhana untuk batas hari bulan lunar (29/30 hari)
    if (lDay > 30) { lDay = 1; lMonth++; }
    if (lDay <= 0) { lDay = 29; lMonth--; }
    if (lMonth > 12) { lMonth = 1; lYear++; }
    if (lMonth <= 0) { lMonth = 12; lYear--; }

    // Hitung Shio (Siklus 12 tahunan)
    // 2576 adalah tahun Ular (Index 9)
    let shioIndex = (9 + (lYear - 2576)) % 12;
    if (shioIndex < 0) shioIndex += 12;

    return {
        tanggal: lDay,
        bulan: lMonth,
        tahun: lYear,
        shio: SHIO_LIST[shioIndex]
    };
}
