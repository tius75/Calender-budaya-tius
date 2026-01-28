import { NEPTU_HARI, NEPTU_PASARAN } from './constants.js';

export function getPasaran(date) {
    const pasaranArr = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    // 1 Jan 1900 adalah Senin Pahing
    const baseDate = new Date(1900, 0, 1);
    const diffDays = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Pahing berada di indeks 1, maka (selisih hari + 1) % 5
    return pasaranArr[(((diffDays + 1) % 5) + 5) % 5];
}

export function hitungNeptu(hari, pasaran) {
    // Pastikan parameter 'hari' (Minggu, Senin...) dan 'pasaran' (Legi, Pahing...) 
    // sesuai persis dengan key di constants.js
    const nilaiHari = NEPTU_HARI[hari] || 0;
    const nilaiPasaran = NEPTU_PASARAN[pasaran] || 0;
    return nilaiHari + nilaiPasaran;
}

export function getWuku(date) {
    const wukuArr = [
        "Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Warigagung", 
        "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", 
        "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", 
        "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"
    ];

    // Patokan yang sangat akurat: 19 Mei 2024 adalah Minggu Sinta
    const baseWuku = new Date(2024, 4, 19); 
    const diffDays = Math.floor((date.getTime() - baseWuku.getTime()) / (1000 * 60 * 60 * 24));
    
    const wukuIndex = Math.floor((((diffDays % 210) + 210) % 210) / 7);
    return wukuArr[wukuIndex];
}
