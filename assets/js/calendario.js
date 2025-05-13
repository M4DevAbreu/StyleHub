
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
      const servicosSelecionados = Array.from(document.querySelectorAll('.servico-checkbox:checked'))
        .map(cb => cb.value);

      if (servicosSelecionados.length === 0) {
        alert("Por favor, selecione ao menos um serviço.");
        return;
      }

      const dataSelecionada = dataSpan.textContent;
      const agendamento = {
        data: dataSelecionada,
        horario: horario,
        servicos: servicosSelecionados
      };

      alert(`✅ Agendamento realizado:\n📅 ${agendamento.data}\n🕒 ${agendamento.horario}\n💇 Serviços: ${agendamento.servicos.join(', ')}`);

      console.log("Agendamento:", agendamento);
    };

    container.appendChild(btn);
  });

  horariosDiv.classList.remove('d-none');
}

document.querySelector('#prev-month').onclick = () => {
  mes--;
  if (mes < 0) {
    mes = 11;
    ano--;
  }
  gerarCalendario();
};

document.querySelector('#next-month').onclick = () => {
  mes++;
  if (mes > 11) {
    mes = 0;
    ano++;
  }
  gerarCalendario();
};

gerarCalendario();
