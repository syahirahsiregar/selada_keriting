
// ==========================================
// 1. NAVIGASI MENU
// ==========================================

const menuLinks = document.querySelectorAll(".menu");
const pages = document.querySelectorAll(".page");
const judulHalaman = document.getElementById("judulHalaman");

menuLinks.forEach(menu => {

    menu.addEventListener("click", function(e) {

        e.preventDefault();

        const target = this.getAttribute("href").substring(1);

        pages.forEach(page => page.classList.remove("active"));

        menuLinks.forEach(link => link.classList.remove("active"));

        document.getElementById(target).classList.add("active");

        this.classList.add("active");

        judulHalaman.textContent = this.textContent;

        window.location.hash = target;

    });

});


// Membuka halaman sesuai URL
function bukaHalamanAwal() {

    const target = window.location.hash.substring(1);

    const halaman = document.getElementById(target);

    if (halaman && halaman.classList.contains("page")) {

        pages.forEach(page => page.classList.remove("active"));

        menuLinks.forEach(link => link.classList.remove("active"));

        halaman.classList.add("active");

        const menu = document.querySelector(`.menu[href="#${target}"]`);

        if (menu) {
            menu.classList.add("active");
            judulHalaman.textContent = menu.textContent;
        }

    }

}

bukaHalamanAwal();


// ==========================================
// 2. JAM DIGITAL
// ==========================================

function tampilkanJam() {

    const sekarang = new Date();

    const jam = sekarang.toLocaleTimeString("id-ID", {
        hour12: false
    });

    document.getElementById("jamDigital").textContent = jam;

}

tampilkanJam();

setInterval(tampilkanJam, 1000);


// ==========================================
// 3. TANGGAL DAN UMUR TANAMAN
// ==========================================

const tanggalTanam = document.getElementById("tanggalTanam");

function hitungUmurTanaman() {

    const tanggal = new Date(tanggalTanam.value + "T00:00:00");

    const sekarang = new Date();

    sekarang.setHours(0, 0, 0, 0);

    if (isNaN(tanggal.getTime()) || tanggal > sekarang) {

        alert("Tanggal tanam tidak boleh melebihi hari ini!");

        return;

    }

    const selisih = Math.floor(
        (sekarang - tanggal) / (1000 * 60 * 60 * 24)
    ) + 1;

    const umur = selisih;

    document.getElementById("umurTanaman").textContent =
        "Hari ke-" + umur;

    document.getElementById("hstTanaman").textContent =
        umur + " HST";

    document.getElementById("prediksiUmur").textContent =
        umur + " HST";

    document.getElementById("tanggalTanamText").textContent =
        tanggal.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

}

tanggalTanam.addEventListener("change", hitungUmurTanaman);

hitungUmurTanaman();


// ==========================================
// 4. GRAFIK SENSOR
// ==========================================

function buatGrafik(id, label, data, warna, satuan = "") {

    const canvas = document.getElementById(id);

    if (!canvas) return null;

    return new Chart(canvas, {

        type: "line",

        data: {

            labels: [
                "08.00",
                "09.00",
                "10.00",
                "11.00",
                "12.00",
                "13.00"
            ],

            datasets: [{

                label: label,

                data: data,

                borderColor: warna,

                backgroundColor: "rgba(139, 210, 103, 0.12)",

                fill: true,

                tension: 0.4,

                borderWidth: 2,

                pointRadius: 0

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {
                    display: false
                }

            },

            scales: {

                x: {

                    display: false,

                    grid: {
                        display: false
                    }

                },

                y: {

                    display: false,

                    grid: {
                        display: false
                    }

                }

            }

        }

    });

}


// Grafik Dashboard

const grafikDashboard = {

    suhu: buatGrafik(
        "grafikSuhu",
        "Suhu",
        [22, 22, 22, 22.5, 22.8, 22.9],
        "#91d66b"
    ),

    udara: buatGrafik(
        "grafikKelembapanUdara",
        "Kelembapan Udara",
        [68, 68, 68, 68, 68, 68],
        "#91d66b"
    ),

    media: buatGrafik(
        "grafikKelembapan",
        "Kelembapan Media",
        [65, 66, 68, 69, 70, 70],
        "#91d66b"
    ),

    ph: buatGrafik(
        "grafikPH",
        "pH",
        [6.1, 6.1, 6.1, 6.12, 6.14, 6.15],
        "#91d66b"
    ),

    ec: buatGrafik(
        "grafikEC",
        "EC",
        [1.3, 1.35, 1.4, 1.42, 1.44, 1.46],
        "#91d66b"
    ),

    cahaya: buatGrafik(
        "grafikCahaya",
        "Intensitas Cahaya",
        [13000, 13200, 13400, 13500, 13520, 13553],
        "#91d66b"
    )

};


// Grafik Monitoring

const grafikMonitoring = {

    suhu: buatGrafik(
        "chartSuhu",
        "Suhu Udara",
        [23, 23.2, 23.5, 23.4, 23.6, 23.8],
        "#91d66b"
    ),

    udara: buatGrafik(
        "chartUdara",
        "Kelembapan Udara",
        [67, 68, 67, 66, 68, 67],
        "#91d66b"
    ),

    media: buatGrafik(
        "chartMedia",
        "Kelembapan Media",
        [70, 70, 69, 68, 67, 66],
        "#91d66b"
    ),

    ph: buatGrafik(
        "chartPH",
        "pH Larutan",
        [6.1, 6.1, 6.1, 6.15, 6.2, 6.27],
        "#91d66b"
    ),

    ec: buatGrafik(
        "chartEC",
        "EC Nutrisi",
        [1.3, 1.31, 1.32, 1.33, 1.34, 1.35],
        "#91d66b"
    ),

    cahaya: buatGrafik(
        "chartCahaya",
        "Intensitas Cahaya",
        [13000, 13200, 13500, 13700, 14000, 14095],
        "#91d66b"
    )

};


// ==========================================
// 5. SIMULASI KELEMBAPAN
// ==========================================

const inputKelembapan =
    document.getElementById("inputKelembapan");

const nilaiKelembapan =
    document.getElementById("nilaiKelembapan");

const tampilanKelembapan =
    document.getElementById("kelembapan");

const tampilanKondisi =
    document.getElementById("kondisi");

const pesanKondisi =
    document.getElementById("pesanKondisi");


function klasifikasiTanah(nilai) {

    nilaiKelembapan.textContent = nilai + "%";

    tampilanKelembapan.innerHTML = nilai + " <small>%</small>";

    if (nilai < 40) {

        tampilanKondisi.textContent = "Kering";

        pesanKondisi.textContent =
            "⚠️ Media terlalu kering! Perlu penyiraman.";

    }

    else if (nilai <= 80) {

        tampilanKondisi.textContent = "Ideal";

        pesanKondisi.textContent =
            "✅ Kelembapan media dalam kondisi ideal.";

    }

    else {

        tampilanKondisi.textContent = "Basah";

        pesanKondisi.textContent =
            "💧 Media terlalu basah.";

    }

    if (grafikDashboard.media) {

        const data = grafikDashboard.media.data.datasets[0].data;

        data[data.length - 1] = nilai;

        grafikDashboard.media.update();

    }

}

inputKelembapan.addEventListener("input", function() {

    klasifikasiTanah(Number(this.value));

});

klasifikasiTanah(Number(inputKelembapan.value));


// ==========================================
// 6. KONTROL POMPA AIR
// ==========================================

let pompaMenyala = false;

function ubahPompa() {

    const tombol = document.getElementById("tombolPompa");

    const status = document.getElementById("statusPompa");

    pompaMenyala = !pompaMenyala;

    if (pompaMenyala) {

        status.textContent = "Pompa dalam keadaan MENYALA";

        tombol.textContent = "MATIKAN POMPA";

        tombol.style.background = "#d93025";

    }

    else {

        status.textContent = "Pompa dalam keadaan MATI";

        tombol.textContent = "NYALAKAN POMPA";

        tombol.style.background = "#258044";

    }

}


// ==========================================
// 7. MODE OTOMATIS DAN MANUAL
// ==========================================

const modeOtomatis = document.getElementById("modeOtomatis");

const modeManual = document.getElementById("modeManual");

modeOtomatis.addEventListener("click", function() {

    modeOtomatis.classList.add("mode-active");

    modeManual.classList.remove("mode-active");

});

modeManual.addEventListener("click", function() {

    modeManual.classList.add("mode-active");

    modeOtomatis.classList.remove("mode-active");

});


// ==========================================
// 8. PERGANTIAN TEMA
// ==========================================

document.getElementById("tombolTema").addEventListener("click", function() {

    document.body.classList.toggle("light-mode");

});


// ==========================================
// 9. MODEL LSTM
// ==========================================

const inputLSTM = document.getElementById("inputLSTM");

const nilaiLSTM = document.getElementById("nilaiLSTM");

const hasilLSTM = document.getElementById("hasilLSTM");

const persentaseLSTM = document.getElementById("persentaseLSTM");

const infoLSTM = document.getElementById("infoLSTM");


function ujiLSTM(nilai) {

    inputLSTM.value = nilai;

    tampilkanLSTM(nilai);

}


function tampilkanLSTM(nilai) {

    nilaiLSTM.textContent = nilai;

    persentaseLSTM.textContent = nilai + "%";

    if (nilai < 50) {

        hasilLSTM.textContent = "Masa Pertumbuhan";

    }

    else if (nilai < 85) {

        hasilLSTM.textContent = "Mendekati Panen";

    }

    else {

        hasilLSTM.textContent = "Siap Panen";

    }

    const pembacaan = Math.floor((nilai / 120) * 120);

    const hari = Math.ceil(pembacaan / 3);

    infoLSTM.textContent =
        "Hari ke-" + hari +
        " · Pembacaan ke-" + pembacaan + " dari 120";

}


inputLSTM.addEventListener("input", function() {

    tampilkanLSTM(Number(this.value));

});

tampilkanLSTM(Number(inputLSTM.value));


// ==========================================
// 10. GRAFIK PREDIKSI AI
// ==========================================

buatGrafik(
    "grafikPrediksi",
    "Prediksi Pertumbuhan",
    [35, 39.4, 41.8, 44.2, 46.6, 55, 65, 75, 90, 100],
    "#4d83ee"
);


// ==========================================
// 11. MODEL CNN - UPLOAD FOTO
// ==========================================

const uploadFoto = document.getElementById("uploadFoto");

const previewGambar = document.getElementById("previewGambar");

const hasilDeteksi = document.getElementById("hasilDeteksi");


uploadFoto.addEventListener("change", function() {

    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        alert("Silakan pilih file gambar!");

        this.value = "";

        return;

    }

    const reader = new FileReader();

    reader.onload = function(e) {

        previewGambar.src = e.target.result;

        previewGambar.style.display = "block";

        hasilDeteksi.textContent =
            "Foto berhasil diunggah. Siap untuk dianalisis.";

    };

    reader.readAsDataURL(file);

});


// ==========================================
// 12. DETEKSI KESIAPAN PANEN
// ==========================================

function deteksiPanen() {

    if (!uploadFoto.files.length) {

        alert("Silakan unggah foto daun terlebih dahulu!");

        return;

    }

    hasilDeteksi.textContent =
        "Foto berhasil disiapkan. Model CNN belum dihubungkan dengan model AI sungguhan.";

}
