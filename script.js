/* ── Custom Cursor ───────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX - 18) * 0.12;
  followerY += (mouseY - followerY - 18) * 0.12;
  follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .work-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(1.8)';
    follower.style.transform += ' scale(1.5)';
    follower.style.borderColor = 'rgba(168,85,247,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.borderColor = 'rgba(168,85,247,0.5)';
  });
});

/* ── Loader ──────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = 'auto';
    startTyped();
    animateSkillBars();
  }, 1600);
});
document.body.style.overflow = 'hidden';

/* ── Typed text ─────────────────────────────────────────────── */
const phrases = [
  'Video Editor',
  'Photographer',
  'Color Grader',
  'Content Creator',
  'Multimedia Artist'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function startTyped() {
  function type() {
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      typedEl.textContent = phrase.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      typedEl.textContent = phrase.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 60 : 110);
  }
  type();
}

/* ── Navbar scroll ──────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = ['home','about','skills','work','contact'];
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ── Mobile menu ────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── Scroll reveal ──────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ── Skill bars ─────────────────────────────────────────────── */
function animateSkillBars() {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          const width = bar.dataset.width;
          setTimeout(() => { bar.style.width = width + '%'; }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skills-grid').forEach(grid => skillObserver.observe(grid));
}

/* ── Smooth nav scroll ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── Contact form ───────────────────────────────────────────── */
function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('form-success').classList.remove('hidden');
    btn.innerHTML = '<span>Send Message</span>';
    btn.disabled = false;
    e.target.reset();
    setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 4000);
  }, 1200);
}

/* ── Parallax orbs ──────────────────────────────────────────── */
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelector('.orb1')?.style && (document.querySelector('.orb1').style.transform = `translate(${x}px, ${y}px)`);
  document.querySelector('.orb2')?.style && (document.querySelector('.orb2').style.transform = `translate(${-x}px, ${-y}px)`);
});
