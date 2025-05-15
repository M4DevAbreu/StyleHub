const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const themeIcon = document.getElementById('themeIcon');

let temaAtual = localStorage.getItem('tema') || 'escuro';

function aplicarTema(tema) {
  const htmlEl = document.documentElement;

  if (tema === 'claro') {
    htmlEl.setAttribute('data-bs-theme', 'light');
    themeIcon.textContent = 'Claro';
  } else {
    htmlEl.setAttribute('data-bs-theme', 'dark');
    themeIcon.textContent = 'Escuro';
  }

  localStorage.setItem('tema', tema);
}

aplicarTema(temaAtual);

toggleThemeBtn.addEventListener('click', () => {
  temaAtual = temaAtual === 'escuro' ? 'claro' : 'escuro';
  aplicarTema(temaAtual);
});
