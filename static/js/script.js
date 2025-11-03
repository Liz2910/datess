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

  // === GENERAR CALENDARIO (16 días desde hoy) ===
  const calendar = document.getElementById("calendar");
  const today = new Date();

  for (let i = 0; i < 16; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("es-ES", { month: "short" }).replace(".", "");
    const btn = document.createElement("button");
    btn.textContent = `${day}/${month}`;
    btn.dataset.full = date.toISOString().split("T")[0];
    btn.onclick = () => {
      document.querySelectorAll("#calendar button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      fechaInput.value = btn.dataset.full;
    };
    calendar.appendChild(btn);
  }

  // === GENERAR HORARIOS ===
  const allHours = ["13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
  const hoursGrid = document.getElementById("hours");

  function generarHoras() {
    hoursGrid.innerHTML = "";
    const hoyISO = new Date().toISOString().split("T")[0];
    const ahora = new Date();
    const horaActual = ahora.getHours();

    let disponibles = [...allHours];

    // Si la fecha seleccionada es hoy, filtra las horas pasadas
    if (fechaInput.value === hoyISO) {
      disponibles = allHours.filter(h => parseInt(h.split(":")[0]) > horaActual);
    }

    // Si ya pasó todo el horario del día, muestra un mensaje
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
        resumenTxt.innerHTML = `📅 ${fechaInput.value} | 🕒 ${horaInput.value}`;
      };
      hoursGrid.appendChild(btn);
    });
  }

  // === NAVEGACIÓN ===
  document.getElementById("btnFecha").onclick = () => {
    if (!fechaInput.value) return alert("Selecciona una fecha 🌿");
    fechaTxt.textContent = `Has elegido el ${fechaInput.value}`;
    generarHoras();
    showStep(1);
  };

  document.getElementById("btnVolver1").onclick = () => showStep(0);

  document.getElementById("btnHora").onclick = () => {
    if (!horaInput.value) return alert("Selecciona una hora 💚");
    resumenTxt.innerHTML = `📅 ${fechaInput.value} | 🕒 ${horaInput.value}`;
    showStep(2);
  };

  document.getElementById("btnVolver2").onclick = () => showStep(1);
});