/* Oriiface Dental Care — main.js v2 */
(function(){
  'use strict';

  // Navbar scroll
  const nav = document.querySelector('.navbar');
  if(nav){
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // Hamburger / Mobile menu
  const ham = document.querySelector('.hamburger');
  const mob = document.querySelector('.mobile-menu');
  if(ham && mob){
    ham.addEventListener('click', () => {
      const open = mob.classList.toggle('open');
      ham.classList.toggle('open', open);
    });
    document.addEventListener('click', e => {
      if(!ham.contains(e.target) && !mob.contains(e.target)){
        mob.classList.remove('open');
        ham.classList.remove('open');
      }
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mob.classList.remove('open');
      ham.classList.remove('open');
    }));
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, {threshold:0.1, rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(el => ro.observe(el));
  }

  // Counter animation
  function animCount(el){
    const target = parseFloat(el.dataset.count);
    const sfx = el.dataset.suffix || '';
    const isFloat = String(target).includes('.');
    const dur = 1800;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = target * ease;
      el.textContent = (isFloat ? val.toFixed(1) : Math.floor(val)) + sfx;
      if(p < 1) requestAnimationFrame(tick);
      else el.textContent = (isFloat ? target.toFixed(1) : target) + sfx;
    };
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll('[data-count]');
  if(counters.length){
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ animCount(e.target); co.unobserve(e.target); } });
    }, {threshold:0.5});
    counters.forEach(c => co.observe(c));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
    });
  });

  // Appointment form
  const form = document.querySelector('#apt-form');
  if(form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Request Sent! We'll call you shortly.';
        btn.style.background = '#09524E';
        form.reset();
        setTimeout(() => { btn.textContent = 'Request Appointment'; btn.style.background = ''; btn.disabled = false; }, 4000);
      }, 1200);
    });
  }

  // Active nav link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if(a.getAttribute('href') === page) a.classList.add('active');
  });
})();
