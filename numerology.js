/**
 * MODUL NUMEROLOGI LENGKAP
 * Berdasarkan sistem Pythagoras
 */

const NUMEROLOGI_ENGINE = {
    // Fungsi pembantu untuk menjumlahkan angka hingga digit tunggal (kecuali Master Numbers 11, 22, 33)
    reduceNumber: (num, allowMaster = true) => {
        let sum = num;
        while (sum > 9) {
            if (allowMaster && (sum === 11 || sum === 22 || sum === 33)) break;
            sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
        }
        return sum;
    },

    // 1. Life Path (Tujuan Hidup Utama)
    calculateLifePath: (date) => {
        const d = NUMEROLOGI_ENGINE.reduceNumber(date.getDate());
        const m = NUMEROLOGI_ENGINE.reduceNumber(date.getMonth() + 1);
        const y = NUMEROLOGI_ENGINE.reduceNumber(date.getFullYear());
        const final = NUMEROLOGI_ENGINE.reduceNumber(d + m + y);

        const data = {
            1: "Pemimpin yang mandiri, inovatif, dan penuh ambisi.",
            2: "Pendamai yang peka, kooperatif, dan penuh empati.",
            3: "Komunikator kreatif yang ceria dan pandai bergaul.",
            4: "Pembangun yang stabil, disiplin, dan sangat praktis.",
            5: "Petualang yang fleksibel, progresif, dan suka kebebasan.",
            6: "Pengayom yang penuh tanggung jawab dan berjiwa sosial.",
            7: "Pencari kebenaran yang analitis, spiritual, dan bijaksana.",
            8: "Eksekutif yang berorientasi hasil, finansial, dan otoritas.",
            9: "Humanis yang idealis, penyayang, dan berjiwa seni.",
            11: "Master Spiritual: Pembawa pencerahan dan intuisi tajam.",
            22: "Master Builder: Pembuat perubahan besar di dunia nyata.",
            33: "Master Teacher: Pengajar cinta kasih murni secara universal."
        };
        return { angka: final, arti: data[final] || "Karakter unik." };
    },

    // 2. Personality Number (Bakat dari Tanggal Lahir)
    calculateBirthDay: (date) => {
        const day = date.getDate();
        const final = NUMEROLOGI_ENGINE.reduceNumber(day, false);
        const data = {
            1: "Punya kemauan keras dan mandiri.",
            2: "Bakat bekerja dalam tim dan diplomasi.",
            3: "Punya daya imajinasi dan ekspresi tinggi.",
            4: "Bakat dalam manajemen dan pengorganisiran.",
            5: "Mudah beradaptasi dengan situasi baru.",
            6: "Bakat dalam mengasuh dan memberi nasihat.",
            7: "Punya kedalaman berpikir dan penelitian.",
            8: "Bakat dalam memimpin bisnis dan keuangan.",
            9: "Bakat dalam bidang kemanusiaan atau seni."
        };
        return { angka: final, arti: data[final] };
    },

    // 3. Personal Year (Ramalan Tahun Berjalan)
    calculatePersonalYear: (date) => {
        const currentYear = new Date().getFullYear();
        const d = NUMEROLOGI_ENGINE.reduceNumber(date.getDate());
        const m = NUMEROLOGI_ENGINE.reduceNumber(date.getMonth() + 1);
        const y = NUMEROLOGI_ENGINE.reduceNumber(currentYear);
        const final = NUMEROLOGI_ENGINE.reduceNumber(d + m + y, false);

        const data = {
            1: "Tahun permulaan baru, menanam benih kesuksesan.",
            2: "Tahun membangun relasi, melatih kesabaran.",
            3: "Tahun kreativitas, interaksi sosial, dan ekspansi.",
            4: "Tahun disiplin, kerja keras, dan menata fondasi.",
            5: "Tahun perubahan dinamis, kebebasan, dan kemajuan.",
            6: "Tahun tanggung jawab keluarga dan harmoni rumah.",
            7: "Tahun introspeksi, belajar, dan kesehatan mental.",
            8: "Tahun panen rejeki, kekuasaan, dan hasil usaha.",
            9: "Tahun pelepasan, penyelesaian, dan persiapan siklus baru."
        };
        return { angka: final, arti: data[final] };
    }
};
