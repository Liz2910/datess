document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  let currentStep = 0;
  const fechaInput = document.getElementById("fechaSeleccionada");
  const horaInput = document.getElementById("horaSeleccionada");

  function showStep(i) {
    steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
    currentStep = i;
  }

  // Generar días del calendario (los próximos 14)
  const calendar = document.getElementById("calendar");
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const btn = document.createElement("button");
    btn.textContent = date.getDate();
    btn.dataset.full = date.toISOString().split("T")[0];
    btn.onclick = () => {
      document.querySelectorAll("#calendar button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      fechaInput.value = btn.dataset.full;
    };
    calendar.appendChild(btn);
  }

  // Generar horarios
  const hoursGrid = document.getElementById("hours");
  const horarios = ["13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];
  horarios.forEach(h => {
    const btn = document.createElement("button");
    btn.textContent = h;
    btn.onclick = () => {
      document.querySelectorAll("#hours button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      horaInput.value = h;
    };
    hoursGrid.appendChild(btn);
  });

  // Navegación
  document.getElementById("btnFecha").onclick = () => {
    if (!fechaInput.value) return alert("Selecciona una fecha 🌿");
    showStep(1);
  };

  document.getElementById("btnVolver1").onclick = () => showStep(0);

  document.getElementById("btnHora").onclick = () => {
    if (!horaInput.value) return alert("Selecciona una hora 💚");
    showStep(2);
  };

  document.getElementById("btnVolver2").onclick = () => showStep(1);
});