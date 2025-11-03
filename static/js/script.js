document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.querySelector('input[name="fecha"]');
  const timeInput = document.querySelector('input[name="hora"]');
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
  const horarios = ["13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"];
  const datalist = document.createElement("datalist");
  datalist.id = "horas";
  horarios.forEach(h => {
    const opt = document.createElement("option");
    opt.value = h;
    datalist.appendChild(opt);
  });
  timeInput.setAttribute("list", "horas");
  document.body.appendChild(datalist);
});
