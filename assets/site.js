(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const nav = header?.querySelector('nav[aria-label="Main navigation"]');
  if (!header || !nav) return;
  const links = [...nav.querySelectorAll('a')];
  const indicator = document.createElement('span');
  indicator.className = 'nav-indicator';
  indicator.setAttribute('aria-hidden', 'true');
  nav.append(indicator);
  let active = null, frame = 0;
  const path = location.pathname.slice('/aduth-design-preview'.length).replace(/\/+$/, '') || '/';
  const section = path.split('/')[1];
  const route = section === 'ule' ? '/products/' : section && section !== 'index.html' ? '/' + section + '/' : '/';
  const find = value => links.find(link => link.getAttribute('href') === '/aduth-design-preview' + value) || null;
  function paint(link) {
    indicator.classList.toggle('is-visible', !!link);
    if (!link) return;
    const box = link.getBoundingClientRect(), parent = nav.getBoundingClientRect();
    indicator.style.width = box.width + 'px';
    indicator.style.transform = 'translateX(' + (box.left - parent.left) + 'px)';
  }
  function setActive(link) {
    active = link;
    links.forEach(item => {
      if (item === active) item.setAttribute('aria-current', path === route.replace(/\/$/, '') || route === '/' ? 'page' : 'location');
      else item.removeAttribute('aria-current');
    });
    paint(active);
  }
  function update() {
    frame = 0;
    document.documentElement.style.setProperty('--header-height', header.getBoundingClientRect().height + 'px');
    setActive(find(route));
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  addEventListener('resize', schedule);
  addEventListener('hashchange', schedule);
  addEventListener('pageshow', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(header);
  document.fonts?.ready.then(schedule);
  update();
})();
