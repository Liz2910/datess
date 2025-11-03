document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  let currentStep = 0;
  const fechaInput = document.getElementById("fechaSeleccionada");
  const horaInput = document.getElementById("horaSeleccionada");
  const fechaTxt = document.getElementById("fechaElegidaTxt");
  const resumenTxt = document.getElementById("resumenTxt");

  const showStep = (i) => {
    steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
    currentStep = i;
  };

  // === CALENDARIO ===
  const calendar = document.getElementById("calendar");
  const today = new Date();

  for (let i = 0; i < 16; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dia = date.getDate().toString().padStart(2, "0");
    const mes = date.toLocaleString("es-ES", { month: "short" }).replace(".", "");
    const btn = document.createElement("button");
    btn.textContent = `${dia} / ${mes}`;
    btn.dataset.full = date.toISOString().split("T")[0];
    btn.dataset.display = date.toLocaleDateString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric" });

    btn.onclick = () => {
      document.querySelectorAll("#calendar button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      fechaInput.value = btn.dataset.full;
      fechaInput.dataset.display = btn.dataset.display;
    };

    calendar.appendChild(btn);
  }

  // === HORARIOS ===
  const allHours = ["13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
  const hoursGrid = document.getElementById("hours");

  function generarHoras() {
    hoursGrid.innerHTML = "";
    const hoyISO = new Date().toISOString().split("T")[0];
    const ahora = new Date();
    const horaActual = ahora.getHours();
    let disponibles = [...allHours];

    if (fechaInput.value === hoyISO) {
      disponibles = allHours.filter(h => parseInt(h.split(":")[0]) > horaActual);
    }

    if (disponibles.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "⏰ Ya no hay horarios disponibles para hoy.";
      msg.classList.add("muted");
      hoursGrid.appendChild(msg);
      return;
    }

    disponibles.forEach(h => {
      const btn = document.createElement("button");
      btn.textContent = h;
      btn.onclick = () => {
        document.querySelectorAll("#hours button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const hFin = `${String(parseInt(h.split(":")[0]) + 2).padStart(2, "0")}:00`;
        horaInput.value = `${h} - ${hFin}`;

        // formatear fecha completa (dd/mm/yyyy)
        const [year, month, day] = fechaInput.value.split("-");
        const fechaFormateada = `${day}/${month}/${year}`;

        // actualizar texto del resumen
        document.getElementById("resumenTxtFecha").textContent = fechaFormateada;
        document.getElementById("resumenTxtHora").textContent = horaInput.value;
        document.getElementById("resumen-fecha").textContent = fechaFormateada;
        document.getElementById("resumen-hora").textContent = horaInput.value;
      };
      hoursGrid.appendChild(btn);
    });
  }

  // === NAVEGACIÓN ===
  document.getElementById("btnFecha").onclick = () => {
    if (!fechaInput.value) return alert("Selecciona una fecha 🌿");
    fechaTxt.textContent = `Has elegido el ${fechaInput.dataset.display}`;
    generarHoras();
    showStep(1);
  };

  document.getElementById("btnVolver1").onclick = () => showStep(0);

  document.getElementById("btnHora").onclick = () => {
    if (!horaInput.value) return alert("Selecciona una hora 💚");
    resumenTxt.innerHTML = `
      <span>📅 ${fechaInput.dataset.display}</span> |
      <span>🕒 ${horaInput.value}</span>`;
    showStep(2);
  };

  document.getElementById("btnVolver2").onclick = () => showStep(1);
});