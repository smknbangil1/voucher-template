/**
 * voucher.js
 * 
 * Script untuk menghasilkan QR Code pada voucher Mikrotik/Freeradius.
 * - Lebih ringan karena hanya load 1 file JS eksternal
 * - Tidak perlu script berulang-ulang di setiap kartu
 * - Gunakan qrcode.js yang sama seperti sebelumnya
 * 
 * Pastikan Anda memanggil qrcode.min.js lebih dulu:
 * <script src="https://username.github.io/voucher-template/qrcode.min.js"></script>
 * <script src="https://username.github.io/voucher-template/voucher.js"></script>
 */

document.addEventListener("DOMContentLoaded", function () {

    // Ambil semua elemen QR
    const qrElements = document.querySelectorAll("[data-qr]");

    qrElements.forEach(function (el) {
        const code = el.getAttribute("data-code");
        const secret = el.getAttribute("data-secret");
        const dns = el.getAttribute("data-dns");
        const type = el.getAttribute("data-type");

        let qrText;

        // Untuk jenis HOTSPOT → login URL
        if (type === "HOTSPOT") {
            let dnsName = dns && dns !== "" ? dns : "ghaffarnet.com";
            qrText = "http://" + dnsName + "/login?username=" + code + "&password=" + secret;
        } 
        // Voucher biasa
        else {
            qrText = code;
        }

        // Buat QR code
        const qr = qrcode(0, "L");
        qr.addData(qrText);
        qr.make();

        // Masukkan IMG ke div QR
        el.innerHTML = qr.createImgTag();

        // Set ukuran QR agar pas
        const img = el.querySelector("img");
        if (img) {
            img.style.width = "100%";
            img.style.height = "auto";
        }
    });
});
