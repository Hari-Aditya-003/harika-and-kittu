/**
 * Harika & Kittu Wedding Celebration Script
 * Features: Live Countdown, Falling Petals Canvas, Ambient Music Engine,
 * RSVP Guestbook with Local Storage, and Calendar Integration.
 */

// ==========================================
// 1. CONFIGURATION
// ==========================================
const WEDDING_CONFIG = {
  // Target date for the wedding celebration (YYYY-MM-DDTHH:MM:SS)
  targetDate: new Date('2027-01-01T10:30:00+05:30'),
  displayDateText: 'January 1, 2027',
  
  // Couple & Contact Details
  coupleNames: 'Harika & Kittu',
  whatsappNumber: '+919876543210', // Replace with couple/family WhatsApp number
  venueName: 'Royal Convention & Celebration Center',
  venueLocationUrl: 'https://maps.google.com/?q=Royal+Convention+Hall'
};

// ==========================================
// 2. COUNTDOWN TIMER
// ==========================================
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const displayDateEl = document.getElementById('display-wedding-date');

  if (displayDateEl) {
    displayDateEl.textContent = WEDDING_CONFIG.displayDateText;
  }

  function update() {
    const now = new Date().getTime();
    const distance = WEDDING_CONFIG.targetDate.getTime() - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ==========================================
// 3. FALLING PETALS ANIMATION
// ==========================================
function initPetals() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = Math.min(26, Math.floor(width / 35));
  const petals = [];

  // Rose & Marigold petal colors
  const colors = [
    'rgba(212, 175, 55, 0.7)',   // Gold shimmer
    'rgba(235, 110, 128, 0.65)', // Soft Rose
    'rgba(184, 41, 60, 0.6)',    // Auspicious Vermilion
    'rgba(255, 183, 77, 0.7)'    // Marigold Yellow
  ];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 9 + 6,
      speedX: Math.random() * 1.5 - 0.75,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.5 - 0.75,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size);
    ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of petals) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      drawPetal(p);
    }
    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 4. WEDDING AMBIENT MUSIC ENGINE
// ==========================================
// Uses an elegant Web Audio API synthesis engine (Shehnai/Flute/Tanpura harmonics)
// so the music ALWAYS plays without needing any 20MB external MP3 download!
let audioCtx = null;
let isPlaying = false;
let melodyInterval = null;

function initMusic() {
  const musicBtn = document.getElementById('music-btn');
  const musicText = document.getElementById('music-text');
  const musicIcon = document.getElementById('music-icon');

  if (!musicBtn) return;

  function playNote(freq, start, duration, gainVal = 0.08) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Warm overtone setting (warm festive chime/shehnai tone)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(gainVal, start + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(start);
      osc.stop(start + duration);
    } catch (e) {
      console.warn('Audio playback note error:', e);
    }
  }

  // Celebratory auspicious Indian wedding scale (Raag Bhairavi / Kalyani notes)
  // Sa (C4=261.6), Ri (D4=293.6), Ga (E4=329.6), Ma (F#4=369.9), Pa (G4=392.0), Dha (A4=440.0), Ni (B4=493.8), Sa' (C5=523.2)
  const ragaScale = [261.63, 293.66, 329.63, 369.99, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25];
  const phrase = [0, 2, 4, 3, 4, 5, 7, 5, 4, 2, 0, 4, 7, 9, 7];

  function startMusicLoop() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    let noteIdx = 0;
    function scheduleStep() {
      if (!isPlaying || !audioCtx) return;
      const now = audioCtx.currentTime;
      const freq = ragaScale[phrase[noteIdx % phrase.length]];
      
      // Lead melodic note
      playNote(freq, now, 1.4, 0.07);
      // Soft ambient base drone (Sa - Pa)
      if (noteIdx % 4 === 0) {
        playNote(130.81, now, 3.0, 0.04);
        playNote(196.00, now + 0.2, 2.8, 0.03);
      }
      noteIdx++;
    }

    scheduleStep();
    melodyInterval = setInterval(scheduleStep, 950);
  }

  function stopMusicLoop() {
    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }
    if (audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend();
    }
  }

  musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
      isPlaying = true;
      startMusicLoop();
      musicBtn.classList.add('playing');
      musicText.textContent = 'Pause';
      musicIcon.textContent = '🔊';
    } else {
      isPlaying = false;
      stopMusicLoop();
      musicBtn.classList.remove('playing');
      musicText.textContent = 'Music';
      musicIcon.textContent = '🎵';
    }
  });
}

// ==========================================
// 5. RSVP & BLESSINGS GUESTBOOK
// ==========================================
const DEFAULT_WISHES = [
  {
    name: 'Hari Aditya',
    relation: 'Family',
    attendance: 'Yes, Joyfully Attending!',
    message: 'Wishing Harika & Kittu a magnificent lifetime filled with endless love, laughter, shared dreams, and abundant blessings! So excited for the big day! 🎉',
    time: 'Recent'
  },
  {
    name: 'Suresh & Anitha',
    relation: 'Well-wishers',
    attendance: 'Yes, Joyfully Attending!',
    message: 'Heartiest congratulations to the wonderful couple! May God shower his choicest blessings upon your new journey together. 💖',
    time: 'Recent'
  },
  {
    name: 'Priya & Rahul',
    relation: 'Friends',
    attendance: 'Yes, Joyfully Attending!',
    message: 'Counting down the days! Cannot wait for the Sangeet night and celebrations. Harika & Kittu forever! 💃✨',
    time: 'Recent'
  }
];

function initRSVP() {
  const form = document.getElementById('wedding-rsvp-form');
  const feed = document.getElementById('blessings-feed');
  const countEl = document.getElementById('wishes-count');
  const whatsappBtn = document.getElementById('whatsapp-rsvp-btn');

  function getStoredWishes() {
    try {
      const stored = localStorage.getItem('harika_kittu_wishes');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read wishes from localStorage', e);
    }
    return DEFAULT_WISHES;
  }

  function saveWishes(wishes) {
    try {
      localStorage.setItem('harika_kittu_wishes', JSON.stringify(wishes));
    } catch (e) {
      console.warn('Could not save wishes to localStorage', e);
    }
  }

  function renderWishes() {
    if (!feed) return;
    const wishes = getStoredWishes();
    feed.innerHTML = '';

    if (countEl) {
      countEl.textContent = `${wishes.length} Wishes`;
    }

    wishes.forEach(item => {
      const card = document.createElement('div');
      card.className = 'blessing-item';
      card.innerHTML = `
        <div class="blessing-author">${escapeHTML(item.name)}</div>
        <div class="blessing-meta">
          <span>${escapeHTML(item.attendance)}</span> • <span>${item.time || 'Recently'}</span>
        </div>
        <p class="blessing-body">${escapeHTML(item.message)}</p>
      `;
      feed.appendChild(card);
    });
  }

  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guest-name').value.trim();
      const phone = document.getElementById('guest-phone').value.trim();
      const guestCount = document.getElementById('guest-count').value;
      const attendance = form.querySelector('input[name="attendance"]:checked').value;
      const message = document.getElementById('guest-wishes').value.trim() || 
        'Warmest congratulations and best blessings to Harika & Kittu on their wedding!';

      if (!name) return;

      const newWish = {
        name: name,
        attendance: attendance,
        message: message,
        time: 'Just now'
      };

      const wishes = getStoredWishes();
      wishes.unshift(newWish);
      saveWishes(wishes);
      renderWishes();

      form.reset();

      // Show warm confirmation
      alert(`Thank you, ${name}! Your heartfelt blessings and RSVP have been received with love by Harika & Kittu! 💐`);
    });
  }

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const text = encodeURIComponent(
        `Hi Harika & Kittu! 🎉 We received your wedding invitation card.\n` +
        `We are thrilled and joyfully looking forward to celebrating your wedding!\n` +
        `Wishing you both endless love, joy, and wonderful blessings! ❤️`
      );
      window.open(`https://wa.me/?text=${text}`, '_blank');
    });
  }

  renderWishes();
}

// ==========================================
// 6. CALENDAR EVENT GENERATOR (.ICS)
// ==========================================
function addToCalendar(title, description, location, startDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration

  function formatDate(d) {
    return d.toISOString().replace(/-|:|\.\d+/g, '');
  }

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Harika & Kittu Wedding//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// 7. NAVBAR SCROLL & MOBILE TOGGLE
// ==========================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggleBtn = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(253, 251, 247, 0.98)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid rgba(197, 155, 39, 0.3)';
      }
    });

    // Close mobile menu on clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 900) {
          navLinks.style.display = 'none';
        }
      });
    });
  }
}

// ==========================================
// INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCountdown();
  initPetals();
  initMusic();
  initRSVP();
});
