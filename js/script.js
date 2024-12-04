const BMI_CATEGORIES = {
    UNDERWEIGHT: "Kekurangan Berat Badan",
    NORMAL: "Normal",
    OVERWEIGHT: "Kelebihan Berat Badan",
    OBESITY: "Obesitas"
};

function checkBMI() {
    // Mengambil nilai dari input
    const beratBadan = parseFloat(document.getElementById("berat-badan").value);
    const tinggiBadan = parseFloat(document.getElementById("tinggi-badan").value) / 100; // Konversi cm ke m
    const usiaBadan = parseInt(document.getElementById("usia-badan").value);
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // Validasi input
    if (isNaN(beratBadan) || isNaN(tinggiBadan) || isNaN(usiaBadan)) {
        alert("Silakan masukkan semua data dengan benar.");
        return;
    }

    // Menghitung BMI
    const bmi = beratBadan / (tinggiBadan * tinggiBadan);
    const resultSection = document.getElementById("result");
    const resultTitle = document.getElementById("result-title");
    const resultBmi = document.getElementById("result-bmi");
    const resultDesc = document.getElementById("result-desc");
    const resultText = document.getElementById("result-text");
    const suggestionText = document.getElementById("suggestion-text");
    const riskTitle = document.getElementById("risk-title");
    const listRisk = document.getElementById("list-risk");

    // Menampilkan hasil
    resultSection.classList.remove("d-hidden");
    resultBmi.innerText = bmi.toFixed(2);
    
    // Menentukan kategori BMI
    let status = "";
    switch (gender) {
        case 'laki-laki':
            if (bmi < 18.5) {
                status = BMI_CATEGORIES.UNDERWEIGHT;
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                status = BMI_CATEGORIES.NORMAL;
            } else if (bmi >= 25.0 && bmi <= 29.9) {
                status = BMI_CATEGORIES.OVERWEIGHT;
            } else if (bmi >= 30.0) {
                status = BMI_CATEGORIES.OBESITY;
            }
            break;
        case 'perempuan':
            if (bmi < 17) {
                status = BMI_CATEGORIES.UNDERWEIGHT;
            } else if (bmi >= 17 && bmi <= 23.9) {
                status = BMI_CATEGORIES.NORMAL;
            } else if (bmi >= 24.0 && bmi <= 27.0) {
                status = BMI_CATEGORIES.OVERWEIGHT;
            } else if (bmi > 27.0) {
                status = BMI_CATEGORIES.OBESITY;
            }
            break;
    }

    // Menampilkan hasil
    resultTitle.innerText = status;
    resultDesc.innerText = "BMI Anda adalah: ";
    resultText.innerText = getAdvice(status);
    suggestionText.innerText = "Saran: " + getAdvice(status);

    // Menampilkan risiko
    riskTitle.innerText = "Risiko Kesehatan:";
    listRisk.innerHTML = "";
    listRisk.innerHTML = getRisks(status, usiaBadan).map(risk => `<li>${risk}</li>`).join('');
}

function getAdvice(status) {
    switch (status) {
        case BMI_CATEGORIES.UNDERWEIGHT:
            return "Cobalah untuk meningkatkan berat badan Anda dengan diet yang sehat.";
        case BMI_CATEGORIES.NORMAL:
            return 'Lanjutkan gaya hidup sehat dengan pola makan seimbang dan olahraga teratur.';
        case BMI_CATEGORIES.OVERWEIGHT:
            return "Pertimbangkan untuk menurunkan berat badan Anda.";
        case BMI_CATEGORIES.OBESITY:
            return "Sangat disarankan untuk berkonsultasi dengan dokter.";
        default:
            return "";
    }
}

function getRisks(status, usia) {
    const risks = [];
    if (status === BMI_CATEGORIES.UNDERWEIGHT) {
        risks.push("Kekurangan gizi");
        risks.push("Gangguan pertumbuhan");
        risks.push("Sistem kekebalan tubuh lemah");
        risks.push("Gangguan kesuburan");    
    }
    else if (status === BMI_CATEGORIES.OVERWEIGHT) {
        risks.push("Risiko diabetes");
        risks.push("Penyakit jantung");
        if (usia > 40) {
            risks.push("Risiko hipertensi");
        }
    } else if (status === BMI_CATEGORIES.NORMAL) {
        risks.push("Tidak Ada");
    } else if (status === BMI_CATEGORIES.OBESITY) {
        risks.push("Risiko penyakit jantung");
        risks.push("Diabetes tipe 2");
        if (usia > 40) {
            risks .push("Risiko masalah pernapasan");
        }
    }
    return risks;
}

function regenerateBMI() {
    // Mengosongkan hasil dan menyembunyikan bagian hasil
    document.getElementById("result").classList.add("d-hidden");
    document.getElementById("berat-badan").value = "";
    document.getElementById("tinggi-badan").value = "";
    document.getElementById("usia-badan").value = "";
}