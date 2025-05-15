function marcarComoLido(element) {
    const dot = element.querySelector('.dot');
    if (dot) {
      dot.style.display = 'none';
    }
  }
  
  function marcarTudoComoLido() {
    document.querySelectorAll('.dot').forEach(dot => {
      dot.style.display = 'none';
    });
  }
  