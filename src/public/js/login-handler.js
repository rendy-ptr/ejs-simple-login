document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Mencegah perilaku default form

      const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      fetch("/login", {
        method: "POST", // Menggunakan metode POST
        headers: {
          "Content-Type": "application/json", // Data dikirim dalam format JSON
        },
        body: JSON.stringify(formData),
      })
        .then(async (response) => {
          // Cek status respons
          if (response.ok) {
            // Status 200-299
            const data = await response.json(); // Parsing respons sebagai JSON
            // Menggunakan SweetAlert untuk pesan sukses
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: data.message,
            }).then(() => {
              // Misalnya, redirect ke halaman login setelah sukses
              window.location.href = "/login";
            });
          } else {
            // Jika respons tidak oke, baca pesan kesalahan dari JSON
            const errorData = await response.json();
            // Menampilkan pesan kesalahan dengan SweetAlert
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: errorData.message, // Pesan dari backend
            });
          }
        })
        .catch((error) => {
          // Jika terjadi kesalahan dalam fetch, tangani di sini
          console.error("Fetch error:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An unexpected error occurred.",
          });
        });
    });
  }
});
