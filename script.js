document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que la página se recargue

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    errorMsg.textContent = ""; // Limpiar errores anteriores

    const userData = {
      email: email,
      password: password,
    };

    try {
      // Cambié la URL al endpoint correcto para login
      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token); // Guardar token en localStorage

      alert("Inicio de sesión exitoso");
      window.location.href = "dashboard.html"; // Redirigir a otra página tras login
    } catch (error) {
      errorMsg.textContent = error.message;
    }
  });
