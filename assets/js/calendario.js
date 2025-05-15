const calendarDays = document.getElementById('calendar-days');
const dataSpan = document.getElementById('dataSelecionada');
const horariosDiv = document.getElementById('horarios');
const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const data = new Date();
let ano = data.getFullYear();
let mes = data.getMonth();

function gerarCalendario() {
  calendarDays.innerHTML = '';

  const primeiroDia = new Date(ano, mes, 1);
  const diaDaSemana = primeiroDia.getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  for (let i = 0; i < diaDaSemana; i++) {
    calendarDays.appendChild(document.createElement('div'));
  }

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const diaEl = document.createElement('div');
    diaEl.className = 'day';
    diaEl.textContent = dia;
    diaEl.onclick = () => selecionarDia(dia);
    calendarDays.appendChild(diaEl);
  }

  document.getElementById('month-picker').textContent = monthNames[mes];
  document.getElementById('year').textContent = ano;
}

function selecionarDia(dia) {
  document.querySelectorAll('#calendar-days .day').forEach(el => el.classList.remove('selected'));
  const diaSelecionado = Array.from(document.querySelectorAll('#calendar-days .day')).find(el => el.textContent == dia);
  diaSelecionado.classList.add('selected');

  const dataEscolhida = new Date(ano, mes, dia);
  dataSpan.textContent = dataEscolhida.toLocaleDateString('pt-BR');

  mostrarHorarios();
}

function mostrarHorarios() {
  const horarios = ['09:00', '10:30', '13:00', '15:30', '17:00'];
  const container = horariosDiv.querySelector('.d-flex');
  container.innerHTML = '';

  horarios.forEach(h => {
    const btn = document.createElement('button');
    btn.className = 'horario-btn';
    btn.textContent = h;
    btn.onclick = () => {
      document.querySelectorAll('.horario-btn').forEach(b => b.classList.remove('selected-horario'));
      btn.classList.add('selected-horario');
    };
    container.appendChild(btn);
  });

  horariosDiv.classList.remove('d-none');
}

// Função para mostrar modal de erro
function mostrarErro(msg) {
  const modalErroMsg = document.getElementById('modalErroMensagem');
  modalErroMsg.textContent = msg;
  const modalErro = new bootstrap.Modal(document.getElementById('modalErro'));
  modalErro.show();
}

document.getElementById('prev-month').onclick = () => {
  mes--;
  if (mes < 0) { mes = 11; ano--; }
  gerarCalendario();
};

document.getElementById('next-month').onclick = () => {
  mes++;
  if (mes > 11) { mes = 0; ano++; }
  gerarCalendario();
};

gerarCalendario();

// Soma dos serviços
const servicoCheckboxes = document.querySelectorAll('.servico-checkbox');
const valorTotalSpan = document.getElementById('valor-total');

function calcularValorTotal() {
  let total = 0;
  servicoCheckboxes.forEach(cb => {
    if (cb.checked) total += parseFloat(cb.dataset.preco);
  });
  valorTotalSpan.textContent = `R$ ${total.toFixed(2)}`;
}

servicoCheckboxes.forEach(cb => cb.addEventListener('change', calcularValorTotal));
calcularValorTotal();

// Confirmação do agendamento
document.getElementById('agendar-btn').onclick = () => {
  const servicos = Array.from(document.querySelectorAll('.servico-checkbox:checked')).map(cb => cb.value);
  const horario = document.querySelector('.horario-btn.selected-horario');
  const comentario = document.getElementById("comentarios").value;

  if (!servicos.length) {
    mostrarErro("Selecione pelo menos um serviço.");
    return;
  }
  if (!horario) {
    mostrarErro("Selecione um horário.");
    return;
  }

  const modalBody = document.getElementById('modal-body-confirmacao');
  modalBody.innerHTML = `
    <p><strong>Data:</strong> ${dataSpan.textContent}</p>
    <p><strong>Horário:</strong> ${horario.textContent}</p>
    <p><strong>Serviços:</strong> ${servicos.join(', ')}</p>
    <p><strong>Valor Total:</strong> ${valorTotalSpan.textContent}</p>
    <p><strong>Comentários:</strong> ${comentario || 'Nenhum'}</p>
  `;

  new bootstrap.Modal(document.getElementById('modalConfirmacao')).show();
};
