const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

function setMenuOpen(open, restoreFocus = false) {
  if (!menuButton || !nav) return;
  nav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('menu-open', open);
  if (open) requestAnimationFrame(() => nav.querySelector('a')?.focus());
  else if (restoreFocus) menuButton.focus();
}

menuButton?.addEventListener('click', () => setMenuOpen(nav.hidden));
nav?.addEventListener('click', event => {
  if (event.target.closest('a[href^="#"]')) setMenuOpen(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav && !nav.hidden) setMenuOpen(false, true);
  if (event.key === 'Tab' && nav && !nav.hidden) {
    const links = [...nav.querySelectorAll('a')];
    const first = menuButton;
    const last = links.at(-1) || menuButton;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('.hero-video')?.pause();
}
