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
    const diaVazio = document.createElement('div');
    calendarDays.appendChild(diaVazio);
  }

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const diaEl = document.createElement('div');
    diaEl.className = 'day';
    diaEl.textContent = dia;
    diaEl.onclick = () => selecionarDia(dia);
    calendarDays.appendChild(diaEl);
  }

  document.querySelector('#month-picker').textContent = monthNames[mes];
  document.querySelector('#year').textContent = ano;
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
  const horariosDisponiveis = ['09:00', '10:30', '13:00', '15:30', '17:00'];
  const container = horariosDiv.querySelector('.d-flex');
  container.innerHTML = '';

  horariosDisponiveis.forEach(horario => {
    const btn = document.createElement('button');
    btn.className = 'horario-btn';
    btn.textContent = horario;

    btn.onclick = () => {
      document.querySelectorAll('.horario-btn').forEach(b => b.classList.remove('selected-horario'));
      btn.classList.add('selected-horario');
    };

    container.appendChild(btn);
  });

  horariosDiv.classList.remove('d-none');
}

document.getElementById('prev-month').addEventListener('click', () => {
  mes--;
  if (mes < 0) {
    mes = 11;
    ano--;
  }
  gerarCalendario();
});

document.getElementById('next-month').addEventListener('click', () => {
  mes++;
  if (mes > 11) {
    mes = 0;
    ano++;
  }
  gerarCalendario();
});

gerarCalendario();

// Atualiza o valor total
const servicoCheckboxes = document.querySelectorAll('.servico-checkbox');
const valorTotalSpan = document.getElementById('valor-total');
const agendarBtn = document.getElementById('agendar-btn');

function calcularValorTotal() {
  let total = 0;
  servicoCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      total += parseFloat(checkbox.getAttribute('data-preco'));
    }
  });
  valorTotalSpan.textContent = `R$ ${total.toFixed(2)}`;
}

servicoCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', calcularValorTotal);
});

// Função de Agendamento
agendarBtn.onclick = () => {
  const servicosSelecionados = Array.from(document.querySelectorAll('.servico-checkbox:checked'))
    .map(cb => cb.value);

  const horarioSelecionadoBtn = document.querySelector('.horario-btn.selected-horario');
  const horarioSelecionado = horarioSelecionadoBtn ? horarioSelecionadoBtn.textContent : null;

  if (servicosSelecionados.length === 0) {
    alert("Por favor, selecione ao menos um serviço.");
    return;
  }

  if (!horarioSelecionado) {
    alert("Por favor, selecione um horário.");
    return;
  }

  const agendamento = {
    data: dataSpan.textContent,
    horario: horarioSelecionado,
    servicos: servicosSelecionados,
    valorTotal: valorTotalSpan.textContent,
    comentario: document.getElementById("comentarios").value
  };

  const modalBody = document.getElementById('modal-body-confirmacao');
  modalBody.innerHTML = `
    <p><strong>Data:</strong> ${agendamento.data}</p>
    <p><strong>Horário:</strong> ${agendamento.horario}</p>
    <p><strong>Serviços:</strong> ${agendamento.servicos.join(', ')}</p>
    <p><strong>Valor Total:</strong> ${agendamento.valorTotal}</p>
    <p><strong>Comentários:</strong> ${agendamento.comentario}</p>
  `;

  var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacao'));
  myModal.show();
};

// Inicializa com o valor total
calcularValorTotal();
