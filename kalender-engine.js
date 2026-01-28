import { NEPTU_HARI, NEPTU_PASARAN } from './constants.js';

export function getPasaran(date) {
    const pasaranArr = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    // Gunakan 1 Januari 1900 sebagai patokan (Itu adalah hari Senin Pahing)
    const baseDate = new Date(1900, 0, 1); 
    const diffDays = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Karena 1 Jan 1900 adalah Pahing (indeks 1), maka kita tambah 1
    return pasaranArr[(((diffDays + 1) % 5) + 5) % 5];
}

export function hitungNeptu(hari, pasaran) {
    // Pastikan input hari dan pasaran sesuai dengan Key di constants.js (Case Sensitive)
    return (NEPTU_HARI[hari] || 0) + (NEPTU_PASARAN[pasaran] || 0);
}

export function getWuku(date) {
    const wukuArr = [
        "Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Warigagung", 
        "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", 
        "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", 
        "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"
    ];

    // Patokan: 15 Oktober 2023 adalah Minggu Sinta (Awal siklus Wuku)
    const baseWuku = new Date('2023-10-15');
    const diffDays = Math.floor((date - baseWuku) / (1000 * 60 * 60 * 24));
    
    // Siklus 210 hari (30 Wuku x 7 Hari)
    const wukuIndex = Math.floor((((diffDays % 210) + 210) % 210) / 7);
    
    return wukuArr[wukuIndex];
}
