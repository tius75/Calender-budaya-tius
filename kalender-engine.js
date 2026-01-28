import { NEPTU_HARI, NEPTU_PASARAN } from './constants.js';

export function getPasaran(date) {
    const pasaranArr = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    
    // 1 Januari 2024 adalah Senin Pahing (Pahing = Indeks 1)
    const baseDate = new Date(2024, 0, 1);
    
    // Menghitung selisih hari dengan presisi milidetik untuk menghindari error timezone
    const diffTime = date.setHours(0,0,0,0) - baseDate.setHours(0,0,0,0);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    // Rumus: (Selisih Hari + Indeks Pahing) % 5
    const index = (((diffDays + 1) % 5) + 5) % 5;
    return pasaranArr[index];
}

export function hitungNeptu(hari, pasaran) {
    // Pastikan key sesuai dengan yang ada di constants.js
    const nHari = NEPTU_HARI[hari] || 0;
    const nPasaran = NEPTU_PASARAN[pasaran] || 0;
    return nHari + nPasaran;
}

export function getWuku(date) {
    const wukuArr = [
        "Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Warigagung", 
        "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", 
        "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", 
        "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"
    ];

    // Patokan: 19 Mei 2024 adalah Minggu Sinta
    const baseWuku = new Date(2024, 4, 19);
    const diffTime = date.setHours(0,0,0,0) - baseWuku.setHours(0,0,0,0);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    const wukuIndex = Math.floor((((diffDays % 210) + 210) % 210) / 7);
    return wukuArr[wukuIndex];
}
