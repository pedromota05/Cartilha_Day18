function toggleMenu() {
  const sidebarMenu = document.getElementById('sidebarMenu');
  const collapseExample1 = document.getElementById('collapseExample1');
  const backButton = document.querySelector('.navbar-sidebar__back');

  if (sidebarMenu.classList.contains('show')) {
      sidebarMenu.classList.remove('show');
      collapseExample1.classList.add('show');
      backButton.style.display = 'none';
  } else {
      sidebarMenu.classList.add('show');
      collapseExample1.classList.remove('show');
      backButton.style.display = 'block';
  }
}