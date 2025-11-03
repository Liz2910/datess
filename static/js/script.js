document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  const fechaInput = document.getElementById("fechaSeleccionada");
  const horaInput = document.getElementById("horaSeleccionada");
  const fechaTxt = document.getElementById("fechaElegidaTxt");

  const resumenTxtFecha = document.getElementById("resumenTxtFecha");
  const resumenTxtHora = document.getElementById("resumenTxtHora");
  const resumenFechaPanel = document.getElementById("resumen-fecha");
  const resumenHoraPanel = document.getElementById("resumen-hora");

  const showStep = (i) => {
    steps.forEach((s, idx) => s.classList.toggle("active", idx === i));
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
    btn.dataset.display = date.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    btn.onclick = () => {
      document.querySelectorAll("#calendar button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      // guardamos fecha en el hidden
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

    // si es hoy, quitamos horas pasadas
    if (fechaInput.value === hoyISO) {
      disponibles = allHours.filter((h) => parseInt(h.split(":")[0]) > horaActual);
    }

    if (disponibles.length === 0) {
      const msg = document.createElement("p");
      msg.textContent = "⏰ Ya no hay horarios disponibles para hoy.";
      msg.classList.add("muted");
      hoursGrid.appendChild(msg);
      return;
    }

    disponibles.forEach((h) => {
      const btn = document.createElement("button");
      btn.textContent = h;
      btn.onclick = () => {
        // marcamos activo
        document.querySelectorAll("#hours button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // calculamos horario de 2 horas
        const hFin = `${String(parseInt(h.split(":")[0]) + 2).padStart(2, "0")}:00`;
        const rango = `${h} - ${hFin}`;
        horaInput.value = rango;

        // formateamos la fecha guardada (YYYY-MM-DD -> DD/MM/YYYY)
        const [year, month, day] = fechaInput.value.split("-");
        const fechaFormateada = `${day}/${month}/${year}`;

        // pintamos en los lugares correctos
        if (resumenTxtFecha) resumenTxtFecha.textContent = fechaFormateada;
        if (resumenTxtHora) resumenTxtHora.textContent = rango;
        if (resumenFechaPanel) resumenFechaPanel.textContent = fechaFormateada;
        if (resumenHoraPanel) resumenHoraPanel.textContent = rango;
      };
      hoursGrid.appendChild(btn);
    });
  }

  // === NAVEGACIÓN ===
  document.getElementById("btnFecha").onclick = () => {
    if (!fechaInput.value) return alert("Selecciona una fecha 🌿");
    // mostrar en el subtítulo del paso 2
    if (fechaTxt) fechaTxt.textContent = `Has elegido el ${fechaInput.dataset.display}`;
    generarHoras();
    showStep(1);
  };

  document.getElementById("btnVolver1").onclick = () => showStep(0);

  document.getElementById("btnHora").onclick = () => {
    if (!horaInput.value) return alert("Selecciona una hora 💚");
    // ya tenemos todo pintado, solo avanzar
    showStep(2);
  };

  document.getElementById("btnVolver2").onclick = () => showStep(1);
});