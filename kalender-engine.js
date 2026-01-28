import { NEPTU_HARI, NEPTU_PASARAN } from './constants.js';

export function getPasaran(date) {
    const pasaranArr = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    
    // Titik acuan: 1 Januari 1900 adalah Senin Pahing (Pahing = Indeks 1)
    // Menggunakan UTC agar perhitungan selisih hari stabil
    const baseDate = Date.UTC(1900, 0, 1); 
    const targetDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    
    const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    
    // (Selisih + Indeks Pahing) % 5
    const index = (((diffDays + 1) % 5) + 5) % 5;
    return pasaranArr[index];
}

export function getWuku(date) {
    const wukuArr = [
        "Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Warigagung", 
        "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", 
        "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", 
        "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"
    ];

    // Patokan: 19 Mei 2024 adalah Minggu Sinta
    const baseWuku = Date.UTC(2024, 4, 19);
    const targetDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    
    const diffDays = Math.floor((targetDate - baseWuku) / (1000 * 60 * 60 * 24));
    
    // Siklus 210 hari
    const wukuIndex = Math.floor((((diffDays % 210) + 210) % 210) / 7);
    return wukuArr[wukuIndex];
}
