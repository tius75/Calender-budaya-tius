export const SHIO = [
 "Tikus","Kerbau","Macan","Kelinci","Naga","Ular",
 "Kuda","Kambing","Monyet","Ayam","Anjing","Babi"
];

export const WU_XING = [
 "Kayu","Kayu","Api","Api","Tanah","Tanah",
 "Logam","Logam","Air","Air"
];

export const NAMA_BULAN_CHINA = [
 "正月","二月","三月","四月","五月","六月",
 "七月","八月","九月","十月","冬月","腊月"
];

export function getShioElemen(year) {
    const idx = (year - 4) % 12;
    return {
        shio: SHIO[idx],
        elemen: WU_XING[Math.floor(((year - 4) % 10) / 2)]
    };
}
