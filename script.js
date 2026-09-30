/**
 * =========================================================================
 * MOMENT — EDITORIAL BIRTHDAY MAGAZINE INTERACTIVE ENGINE
 * =========================================================================
 * 
 * Drives typography animations, bespoke spread interactions, Web Audio
 * sound synthesis, responsive navigation, and the final celebratory climax.
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentSpread: 0,
    totalSpreads: 8, // Cover (0) + 6 Spreads (1-6) + Closer (7)
    audioEnabled: false,
    audioCtx: null,
    isTyping: false
  };

  // DOM Elements Cache
  const els = {
    mastheadBrand: document.getElementById('mastheadBrand'),
    mastheadSubtitle: document.getElementById('mastheadSubtitle'),
    audioToggleBtn: document.getElementById('audioToggleBtn'),
    audioToggleText: document.getElementById('audioToggleText'),
    spreadDeck: document.getElementById('spreadDeck'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    pageIndicator: document.getElementById('pageIndicator'),
    navProgressBar: document.getElementById('navProgressBar'),
    finalModal: document.getElementById('finalModal'),
    finalTypewriter: document.getElementById('finalTypewriter'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    confettiCanvas: document.getElementById('confettiCanvas')
  };

  const config = window.BIRTHDAY_CONFIG || {};

  /* ==========================================================================
     AUDIO SYNTHESIZER (PURE WEB AUDIO API — ZERO EXTERNAL ASSET DEPENDENCY)
     ========================================================================== */
  function initAudio() {
    if (!state.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        state.audioCtx = new AudioContextClass();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playSound(type) {
    if (!state.audioEnabled || !state.audioCtx) return;
    initAudio();

    const ctx = state.audioCtx;
    const now = ctx.currentTime;

    try {
      if (type === 'page') {
        // Subtle paper flip sound (filtered soft noise sweep)
        const bufferSize = ctx.sampleRate * 0.08;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.exponentialRampToValueAtTime(150, now + 0.07);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'stamp') {
        // Tactile rubber ink stamp thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'click') {
        // High-end camera mechanical shutter
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'goldBell') {
        // Rich harmonic celebratory bell
        const freqs = [528, 1056, 1584];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          const initialGain = 0.18 / (idx + 1);
          gain.gain.setValueAtTime(initialGain, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 1.9);
        });
      }
    } catch (e) {
      console.warn('Audio synthesis note:', e);
    }
  }

  function toggleAudio() {
    state.audioEnabled = !state.audioEnabled;
    if (state.audioEnabled) {
      initAudio();
      els.audioToggleBtn.classList.add('active');
      els.audioToggleText.textContent = 'SOUND: ON';
      playSound('click');
    } else {
      els.audioToggleBtn.classList.remove('active');
      els.audioToggleText.textContent = 'SOUND: OFF';
    }
  }

  /* ==========================================================================
     RENDER CONTENT FROM CONFIG
     ========================================================================== */
  function populateContent() {
    // Masthead
    if (els.mastheadBrand && config.person) {
      els.mastheadBrand.innerHTML = `<span class="dot"></span> MOMENT · ${config.person.firstName.toUpperCase()}`;
    }
    if (els.mastheadSubtitle && config.person) {
      els.mastheadSubtitle.textContent = config.person.subtitle;
    }

    // Cover Page
    const coverTitle = document.getElementById('coverTitle');
    const coverTitleAlt = document.getElementById('coverTitleAlt');
    const coverSubtitle = document.getElementById('coverSubtitle');
    const coverIssue = document.getElementById('coverIssue');
    const enterBtn = document.getElementById('enterPublicationBtn');

    if (coverTitle && config.opening) coverTitle.textContent = config.opening.headline;
    if (coverTitleAlt && config.opening) coverTitleAlt.textContent = config.opening.titleSuffix;
    if (coverSubtitle && config.opening) coverSubtitle.textContent = config.opening.subheading;
    if (coverIssue && config.opening) coverIssue.textContent = config.opening.issue;
    if (enterBtn && config.opening) enterBtn.textContent = config.opening.cta;

    // Spread 01: CANCEL!!
    const cancelConfig = config.spreads ? config.spreads[0] : null;
    if (cancelConfig) {
      const qBox = document.getElementById('cancelQuote');
      if (qBox) qBox.textContent = `"${cancelConfig.jokeText}"`;
    }

    // Spread 02: OFFSIDE!!
    const offsideConfig = config.spreads ? config.spreads[1] : null;
    if (offsideConfig) {
      const qBox = document.getElementById('offsideQuote');
      if (qBox) qBox.textContent = `"${offsideConfig.jokeText}"`;
    }

    // Spread 03: RED CARD!!
    const redcardConfig = config.spreads ? config.spreads[2] : null;
    if (redcardConfig) {
      const qBox = document.getElementById('redcardQuote');
      if (qBox) qBox.textContent = `"${redcardConfig.jokeText}"`;
    }

    // Spread 04: FOUL!!
    const foulConfig = config.spreads ? config.spreads[3] : null;
    if (foulConfig) {
      const qBox = document.getElementById('foulQuote');
      if (qBox) qBox.textContent = `"${foulConfig.jokeText}"`;
    }

    // Spread 05: GOLAZO!!
    const golazoConfig = config.spreads ? config.spreads[4] : null;
    if (golazoConfig) {
      const qBox = document.getElementById('golazoQuote');
      if (qBox) qBox.textContent = `"${golazoConfig.jokeLead} ${golazoConfig.punchline}"`;
    }

    // Spread 06: EXTRA TIME!!
    const extraConfig = config.spreads ? config.spreads[5] : null;
    if (extraConfig) {
      const qBox = document.getElementById('extratimeQuote');
      if (qBox) qBox.textContent = `"${extraConfig.jokeText}"`;
    }

    // Spread 07: CLOSER
    if (config.closer) {
      const closerHeading = document.getElementById('closerHeading');
      const closerQuote = document.getElementById('closerQuote');
      const closerSig = document.getElementById('closerSignature');
      const claimBtn = document.getElementById('claimSethBtn');

      if (closerHeading) closerHeading.textContent = config.closer.heading;
      if (closerQuote) closerQuote.textContent = `"${config.closer.body}"`;
      if (closerSig) closerSig.textContent = config.closer.signature;
      if (claimBtn) claimBtn.textContent = config.closer.revealButton;
    }
  }

  /* ==========================================================================
     SPREAD NAVIGATION LOGIC
     ========================================================================== */
  function updateNavigation() {
    const allSpreads = document.querySelectorAll('.spread');
    allSpreads.forEach((spread, idx) => {
      spread.classList.remove('active', 'prev');
      if (idx === state.currentSpread) {
        spread.classList.add('active');
      } else if (idx < state.currentSpread) {
        spread.classList.add('prev');
      }
    });

    // Update bottom nav UI
    if (els.prevBtn) {
      els.prevBtn.disabled = state.currentSpread === 0;
    }
    if (els.nextBtn) {
      els.nextBtn.disabled = state.currentSpread === state.totalSpreads - 1;
    }
    if (els.pageIndicator) {
      const displayIndex = String(state.currentSpread).padStart(2, '0');
      const displayTotal = String(state.totalSpreads - 1).padStart(2, '0');
      els.pageIndicator.textContent = state.currentSpread === 0 ? 'COVER' : `SPREAD ${displayIndex} / ${displayTotal}`;
    }
    if (els.navProgressBar) {
      const progress = (state.currentSpread / (state.totalSpreads - 1)) * 100;
      els.navProgressBar.style.width = `${progress}%`;
    }
  }

  function goToSpread(index) {
    if (index < 0 || index >= state.totalSpreads) return;
    state.currentSpread = index;
    playSound('page');
    updateNavigation();
  }

  function nextSpread() {
    if (state.currentSpread < state.totalSpreads - 1) {
      goToSpread(state.currentSpread + 1);
    }
  }

  function prevSpread() {
    if (state.currentSpread > 0) {
      goToSpread(state.currentSpread - 1);
    }
  }

  /* ==========================================================================
     INTERACTIVE SPREAD DETAILS
     ========================================================================== */
  function setupInteractiveComponents() {
    // 1. Stamp Again Button (Spread 01)
    const stampBtn = document.getElementById('stampAgainBtn');
    const stampBox = document.getElementById('stampCancelled');
    if (stampBtn && stampBox) {
      stampBtn.addEventListener('click', () => {
        playSound('stamp');
        stampBox.style.animation = 'none';
        // Force reflow
        void stampBox.offsetWidth;
        const randomRot = -10 - Math.random() * 8;
        stampBox.style.transform = `translate(-50%, -50%) rotate(${randomRot}deg)`;
        stampBox.style.animation = 'stampImpact 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      });
    }

    // 2. Curfew Clock / Red Card Test (Spread 03)
    const curfewTimer = document.getElementById('curfewClock');
    if (curfewTimer) {
      setInterval(() => {
        const d = new Date();
        const s = String(d.getSeconds()).padStart(2, '0');
        curfewTimer.textContent = `21:00:${s}`;
      }, 1000);
    }

    // 3. Claim Seth Climax Button (Spread 07)
    const claimBtn = document.getElementById('claimSethBtn');
    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        openFinalClimax();
      });
    }

    // 4. Modal Close
    if (els.closeModalBtn) {
      els.closeModalBtn.addEventListener('click', () => {
        closeFinalClimax();
      });
    }
  }

  /* ==========================================================================
     FINAL WHISTLE CLIMAX & CELEBRATION (TYPEWRITER + CONFETTI)
     ========================================================================== */
  function openFinalClimax() {
    playSound('goldBell');
    launchEditorialConfetti();

    els.finalModal.classList.add('show');
    typewriterReveal();
  }

  function closeFinalClimax() {
    playSound('click');
    els.finalModal.classList.remove('show');
  }

  function typewriterReveal() {
    if (state.isTyping) return;
    state.isTyping = true;

    const fullText = (config.finalWhistle && config.finalWhistle.headline)
      ? config.finalWhistle.headline
      : "Happy Birthday Sahil. Seth.";

    els.finalTypewriter.innerHTML = '<span class="typewriter-cursor"></span>';
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        const char = fullText.charAt(charIndex);
        const cursor = els.finalTypewriter.querySelector('.typewriter-cursor');
        if (cursor) {
          cursor.insertAdjacentText('beforebegin', char);
        }
        charIndex++;
      } else {
        clearInterval(interval);
        state.isTyping = false;
      }
    }, 75);
  }

  /* ==========================================================================
     LUXURY CONFETTI ENGINE (CANVAS BASED — SMOOTH 60FPS)
     ========================================================================== */
  function launchEditorialConfetti() {
    const canvas = els.confettiCanvas;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#D6B15E', '#C96B3B', '#9E4A4A', '#EDE4D3', '#151515'];
    const particleCount = window.innerWidth < 768 ? 65 : 120;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height * 0.5,
        w: Math.random() * 8 + 4,
        h: Math.random() * 12 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 2.5,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 6,
        opacity: 1
      });
    }

    let animationFrameId;
    const startTime = Date.now();

    function renderParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      let activeParticles = 0;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;

        if (p.y < canvas.height + 20) {
          activeParticles++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.y > canvas.height * 0.75
            ? Math.max(0, 1 - (p.y - canvas.height * 0.75) / (canvas.height * 0.25))
            : 1;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (activeParticles > 0 && elapsed < 4500) {
        animationFrameId = requestAnimationFrame(renderParticles);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrameId);
      }
    }

    renderParticles();
  }

  /* ==========================================================================
     EVENT LISTENERS & ACCESSIBILITY
     ========================================================================== */
  function setupEvents() {
    // Audio toggle
    if (els.audioToggleBtn) {
      els.audioToggleBtn.addEventListener('click', toggleAudio);
    }

    // Cover Enter CTA
    const enterBtn = document.getElementById('enterPublicationBtn');
    if (enterBtn) {
      enterBtn.addEventListener('click', () => {
        goToSpread(1);
      });
    }

    // Nav buttons
    if (els.prevBtn) {
      els.prevBtn.addEventListener('click', prevSpread);
    }
    if (els.nextBtn) {
      els.nextBtn.addEventListener('click', nextSpread);
    }

    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {
      if (els.finalModal && els.finalModal.classList.contains('show')) {
        if (e.key === 'Escape') closeFinalClimax();
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSpread();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSpread();
      }
    });

    // Touch Swipe Support for Mobile
    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Ensure horizontal swipe is dominant
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          nextSpread(); // Swiped Left -> Next
        } else {
          prevSpread(); // Swiped Right -> Prev
        }
      }
    }, { passive: true });

    // Window Resize for Canvas
    window.addEventListener('resize', () => {
      if (els.confettiCanvas) {
        els.confettiCanvas.width = window.innerWidth;
        els.confettiCanvas.height = window.innerHeight;
      }
    });
  }

  /* ==========================================================================
     INITIALIZATION
     ========================================================================== */
  function init() {
    populateContent();
    setupInteractiveComponents();
    setupEvents();
    updateNavigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
