const $ = id => document.getElementById(id);

const calcularBtn = $('calcularBtn');
const resetBtn = $('resetBtn');
const resultado = $('resultado');
const tablaContainer = $('tablaContainer');
const tablaBody = document.querySelector('#tablaContainer tbody');

function formatAR(value) {
  return Number(value).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcularCuota(monto, tasaAnual, meses) {
  const tasaMensual = (tasaAnual / 100) / 12;
  if (tasaMensual === 0) return monto / meses;
  return (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));
}

function generarTabla(monto, tasaAnual, meses, cuota) {
  tablaBody.innerHTML = '';
  let saldo = monto;
  const tasaMensual = (tasaAnual / 100) / 12;

  for (let i = 1; i <= meses; i++) {
    const interes = saldo * tasaMensual;
    const capital = cuota - interes;
    saldo = Math.max(0, saldo - capital);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align:left">${i}</td>
      <td>${formatAR(cuota)}</td>
      <td>${formatAR(interes)}</td>
      <td>${formatAR(capital)}</td>
      <td>${formatAR(saldo)}</td>
    `;
    tablaBody.appendChild(tr);
  }
}

calcularBtn.addEventListener('click', () => {
  const monto = parseFloat($('monto').value);
  const tasa = parseFloat($('tipoPrestamo').value);
  const meses = parseInt($('meses').value);

  if (!monto || monto <= 0 || !meses || meses <= 0) {
    resultado.innerHTML = `<p style="color:#b91c1c">Completa correctamente todos los campos.</p>`;
    tablaContainer.style.display = 'none';
    return;
  }

  const cuota = calcularCuota(monto, tasa, meses);

  resultado.innerHTML = `
    <h3>Resultado</h3>
    <p>Cuota mensual: <strong>$ ${formatAR(cuota)}</strong></p>
    <p>Total a pagar: <strong>$ ${formatAR(cuota * meses)}</strong> (${meses} cuotas)</p>
    <p style="margin-top:10px;color:#6b7280;"><em>Tasa aplicada: ${tasa}% anual (${(tasa/12).toFixed(2)}% mensual)</em></p>
  `;

  generarTabla(monto, tasa, meses, cuota);
  tablaContainer.style.display = 'block';
});

resetBtn.addEventListener('click', () => {
  $('monto').value = '';
  $('meses').value = '';
  $('tipoPrestamo').selectedIndex = 0;
  resultado.innerHTML = '';
  tablaBody.innerHTML = '';
  tablaContainer.style.display = 'none';
});


let colorFondo;

switch (tasa) {
    case 5: // Hipotecario
        colorFondo = '#f1e7a8ff'; 
        break;
    case 25: // Prendario
        colorFondo = '#d2e9c0ff'; 
        break;
    case 50: // Personal
        colorFondo = '#f3c4cbff'; 
        break;
    case 30: // Empresarial
        colorFondo = '#fec7c0ff'; 
        break;
    default:
        colorFondo = '#b3c3edff'; 
}

