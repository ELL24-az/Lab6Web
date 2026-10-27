// LATIHAN 1 — Mengubah teks dengan DOM
const judul = document.getElementById("judul");
const pesan = document.getElementById("pesan");
const ubahTeks = document.getElementById("ubahTeks");

ubahTeks.addEventListener("click", function () {
  judul.textContent = "Belajar JavaScript DOM";
  pesan.textContent = "Konten berhasil diubah oleh JavaScript.";
});

// LATIHAN 2 — Event click dan waktu
const tombolAksi = document.getElementById("tombolAksi");
const pesanKlik = document.getElementById("pesanKlik");

tombolAksi.addEventListener("click", function () {
  pesanKlik.textContent =
    "Tombol diklik pada " + new Date().toLocaleTimeString("id-ID");
});

// LATIHAN 3 — Mengubah kelas CSS
const tombolGaya = document.getElementById("tombolGaya");
const teksGaya = document.getElementById("teksGaya");

tombolGaya.addEventListener("click", function () {
  teksGaya.classList.toggle("highlight");
  teksGaya.classList.toggle("teks-besar");
});

// LATIHAN 4 — Penghitung karakter
const namaInput = document.getElementById("namaInput");
const jumlahKarakter = document.getElementById("jumlahKarakter");

namaInput.addEventListener("input", function () {
  jumlahKarakter.textContent = namaInput.value.length;
});

// LATIHAN 5 — Validasi form pendaftaran
const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const usiaInput = document.getElementById("usia").value;
  const usia = Number(usiaInput);
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  pesanForm.className = "feedback";

  if (nama === "") {
    tampilkanPesan(pesanForm, "Nama wajib diisi.", false);
  } else if (!polaEmail.test(email)) {
    tampilkanPesan(pesanForm, "Masukkan email yang valid.", false);
  } else if (
    usiaInput === "" ||
    !Number.isInteger(usia) ||
    usia < 17 ||
    usia > 100
  ) {
    tampilkanPesan(
      pesanForm,
      "Usia harus berupa bilangan bulat 17–100.",
      false,
    );
  } else {
    tampilkanPesan(pesanForm, "Validasi berhasil. Form siap diproses.", true);
    form.reset();
  }
});

// LATIHAN 6 — To-do List
const inputTugas = document.getElementById("inputTugas");
const tambahTugas = document.getElementById("tambahTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanTugas = document.getElementById("pesanTugas");

tambahTugas.addEventListener("click", tambahItemTugas);
inputTugas.addEventListener("keydown", function (event) {
  if (event.key === "Enter") tambahItemTugas();
});

function tambahItemTugas() {
  const teks = inputTugas.value.trim();
  pesanTugas.className = "feedback";

  if (teks === "") {
    tampilkanPesan(pesanTugas, "Tulis tugas terlebih dahulu.", false);
    inputTugas.focus();
    return;
  }

  const item = document.createElement("li");
  const label = document.createElement("span");
  const aksi = document.createElement("span");
  const selesai = document.createElement("button");
  const hapus = document.createElement("button");

  label.className = "task-text";
  label.textContent = teks;
  aksi.className = "task-actions";

  selesai.type = "button";
  selesai.textContent = "Tandai selesai";
  selesai.addEventListener("click", function () {
    item.classList.toggle("selesai");
    selesai.textContent = item.classList.contains("selesai")
      ? "Batalkan selesai"
      : "Tandai selesai";
  });

  // Eksperimen Mandiri 1 — Menghapus satu item To-do List
  hapus.type = "button";
  hapus.textContent = "Hapus";
  hapus.className = "delete-task";
  hapus.addEventListener("click", function () {
    item.remove();
    tampilkanPesan(pesanTugas, "Tugas dihapus.", true);
  });

  aksi.append(selesai, hapus);
  item.append(label, aksi);
  daftarTugas.appendChild(item);

  inputTugas.value = "";
  tampilkanPesan(pesanTugas, "Tugas ditambahkan.", true);
  inputTugas.focus();
}

// MINI PROJECT — Form pendaftaran workshop
const formWorkshop = document.getElementById("formWorkshop");
const namaWorkshop = document.getElementById("namaWorkshop");
const emailWorkshop = document.getElementById("emailWorkshop");
const sesiWorkshop = document.getElementById("sesiWorkshop");
const hitungWorkshop = document.getElementById("hitungWorkshop");
const sesiTerpilih = document.getElementById("sesiTerpilih");
const ringkasanNama = document.getElementById("ringkasanNama");
const ringkasanEmail = document.getElementById("ringkasanEmail");
const ringkasanSesi = document.getElementById("ringkasanSesi");
const pesanWorkshop = document.getElementById("pesanWorkshop");

function perbaruiRingkasan() {
  ringkasanNama.textContent = namaWorkshop.value.trim() || "-";
  ringkasanEmail.textContent = emailWorkshop.value.trim() || "-";
  ringkasanSesi.textContent = sesiWorkshop.value || "-";
}

namaWorkshop.addEventListener("input", function () {
  hitungWorkshop.textContent = namaWorkshop.value.length;
  perbaruiRingkasan();
});

emailWorkshop.addEventListener("input", perbaruiRingkasan);

// Eksperimen Mandiri 3 — Event change pada dropdown sesi
sesiWorkshop.addEventListener("change", function () {
  sesiTerpilih.textContent =
    "Sesi yang dipilih: " + (sesiWorkshop.value || "belum ada");
  perbaruiRingkasan();
});

formWorkshop.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = namaWorkshop.value.trim();
  const email = emailWorkshop.value.trim();
  const sesi = sesiWorkshop.value;
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  pesanWorkshop.className = "feedback";

  // Eksperimen Mandiri 2 — Nama minimal tiga karakter
  if (nama.length < 3) {
    tampilkanPesan(
      pesanWorkshop,
      "Nama harus diisi minimal 3 karakter.",
      false,
    );
  } else if (!polaEmail.test(email)) {
    tampilkanPesan(pesanWorkshop, "Masukkan alamat email yang valid.", false);
  } else if (sesi === "") {
    tampilkanPesan(pesanWorkshop, "Silakan pilih sesi workshop.", false);
  } else {
    tampilkanPesan(
      pesanWorkshop,
      "Pendaftaran berhasil divalidasi. Terima kasih!",
      true,
    );
  }
});

formWorkshop.addEventListener("reset", function () {
  // Jalankan setelah nilai form kembali ke kondisi awal.
  setTimeout(function () {
    hitungWorkshop.textContent = "0";
    sesiTerpilih.textContent = "Sesi yang dipilih: belum ada";
    pesanWorkshop.textContent = "";
    pesanWorkshop.className = "feedback";
    perbaruiRingkasan();
  }, 0);
});

// Eksperimen Mandiri 4 — Menyembunyikan/menampilkan paragraf
const paragrafToggle = document.getElementById("paragrafToggle");
const tombolSembunyi = document.getElementById("tombolSembunyi");

tombolSembunyi.addEventListener("click", function () {
  const disembunyikan = paragrafToggle.classList.toggle("hidden");
  tombolSembunyi.textContent = disembunyikan
    ? "Tampilkan paragraf"
    : "Sembunyikan paragraf";
});

// Fungsi bantuan untuk menampilkan pesan validasi dengan konsisten.
function tampilkanPesan(elemen, teks, berhasil) {
  elemen.textContent = teks;
  elemen.className = berhasil ? "feedback success" : "feedback error";
}
