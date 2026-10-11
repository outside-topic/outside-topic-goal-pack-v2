/**
 * GOALPAc — Global O and A Level Preparation Academy
 * Interactive Client Architecture & Real-Time Global Services
 * Version 1.0
 */

document.addEventListener('DOMContentLoaded', () => {
  initWorldClocks();
  initTimezoneSelector();
  initMobileNavigation();
  initSubjectFinder();
  initMonthlyReportSwitcher();
  initTrialFormValidation();
  initCookieConsent();
  initGSAPMotion();
});

/* ==========================================================================
   1. LIVE REAL-TIME WORLD CLOCKS (The Global Classroom Board)
   ========================================================================== */
function initWorldClocks() {
  const cityElements = {
    dhaka: document.getElementById('clock-dhaka'),
    dubai: document.getElementById('clock-dubai'),
    lagos: document.getElementById('clock-lagos'),
    london: document.getElementById('clock-london'),
    kl: document.getElementById('clock-kl'),
    toronto: document.getElementById('clock-toronto'),
    topUtility: document.getElementById('utility-active-clock')
  };

  // Time zones configuration (IANA standard)
  const timezones = {
    dhaka: 'Asia/Dhaka',
    dubai: 'Asia/Dubai',
    lagos: 'Africa/Lagos',
    london: 'Europe/London',
    kl: 'Asia/Kuala_Lumpur',
    toronto: 'America/Toronto'
  };

  function updateClocks() {
    const now = new Date();
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    for (const [city, tz] of Object.entries(timezones)) {
      if (cityElements[city]) {
        try {
          const formatter = new Intl.DateTimeFormat('en-US', { ...timeOptions, timeZone: tz });
          cityElements[city].textContent = formatter.format(now);
        } catch (e) {
          // Fallback if IANA string fails
          cityElements[city].textContent = now.toLocaleTimeString();
        }
      }
    }

    if (cityElements.topUtility) {
      try {
        const localFormatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        cityElements.topUtility.textContent = localFormatter.format(now) + ' (Your Time)';
      } catch (e) {}
    }
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

/* ==========================================================================
   2. GLOBAL TIMEZONE SELECTOR
   ========================================================================== */
function initTimezoneSelector() {
  const tzSelect = document.getElementById('global-timezone-select');
  if (!tzSelect) return;

  tzSelect.addEventListener('change', (e) => {
    const selectedTz = e.target.value;
    const batchNotice = document.getElementById('active-timezone-label');
    if (batchNotice) {
      batchNotice.textContent = selectedTz;
    }
  });
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER & ACCORDIONS
   ========================================================================== */
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('mobile-hamburger-trigger');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!hamburgerBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openDrawer);
  backdrop.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Esc key closes mobile drawer and any active mega menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });

  // Mobile Accordion items
  const accordionTriggers = drawer.querySelectorAll('.mobile-accordion-toggle');
  accordionTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.mobile-accordion-item');
      const content = parent.querySelector('.mobile-accordion-content');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !isExpanded);
      if (content) {
        content.style.display = isExpanded ? 'none' : 'block';
      }
      const icon = btn.querySelector('.fa-chevron-down');
      if (icon) {
        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE SUBJECT & PROGRAMME FINDER TOOL
   ========================================================================== */
function initSubjectFinder() {
  const boardFilter = document.getElementById('finder-board');
  const levelFilter = document.getElementById('finder-level');
  const subjectList = document.getElementById('finder-results-grid');
  const searchInput = document.getElementById('finder-search');

  if (!boardFilter || !levelFilter || !subjectList) return;

  const subjectsData = [
    { name: 'Mathematics', code: '4024', board: 'cambridge', level: 'o-level', url: 'subjects/cambridge-o-level-mathematics.html', featured: true },
    { name: 'Mathematics A', code: '4MA1', board: 'edexcel', level: 'igcse', url: 'subjects/edexcel-igcse-mathematics-a.html' },
    { name: 'Pure Mathematics', code: '9709', board: 'cambridge', level: 'a-level', url: 'subjects/cambridge-a-level-mathematics.html' },
    { name: 'International A Level Maths', code: 'YMA01', board: 'edexcel', level: 'a-level', url: 'subjects/edexcel-ial-mathematics.html' },
    { name: 'Physics', code: '5054', board: 'cambridge', level: 'o-level', url: 'subjects/cambridge-o-level-physics.html' },
    { name: 'Physics', code: '9702', board: 'cambridge', level: 'a-level', url: 'subjects/cambridge-a-level-physics.html' },
    { name: 'Physics (IAL)', code: 'YPH11', board: 'edexcel', level: 'a-level', url: 'subjects/edexcel-ial-physics.html' },
    { name: 'Chemistry', code: '5070', board: 'cambridge', level: 'o-level', url: 'subjects/cambridge-o-level-chemistry.html' },
    { name: 'Chemistry', code: '9701', board: 'cambridge', level: 'a-level', url: 'subjects/cambridge-a-level-chemistry.html' },
    { name: 'Biology', code: '5090', board: 'cambridge', level: 'o-level', url: 'subjects/cambridge-o-level-biology.html' },
    { name: 'Biology', code: '9700', board: 'cambridge', level: 'a-level', url: 'subjects/cambridge-a-level-biology.html' },
    { name: 'Economics', code: '2281', board: 'cambridge', level: 'o-level', url: 'subjects/cambridge-o-level-economics.html' },
    { name: 'Economics', code: '9708', board: 'cambridge', level: 'a-level', url: 'subjects/cambridge-a-level-economics.html' },
    { name: 'Computer Science', code: '2210', board: 'cambridge', level: 'o-level', url: 'subjects/cambridge-o-level-computer-science.html' },
    { name: 'Computer Science', code: '9618', board: 'cambridge', level: 'a-level', url: 'subjects/cambridge-a-level-computer-science.html' },
    { name: 'English Language', code: '1123', board: 'cambridge', level: 'o-level', url: 'subjects/cambridge-o-level-english-language.html' }
  ];

  function renderSubjects() {
    const selectedBoard = boardFilter.value;
    const selectedLevel = levelFilter.value;
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = subjectsData.filter(item => {
      const matchBoard = (selectedBoard === 'all' || item.board === selectedBoard);
      const matchLevel = (selectedLevel === 'all' || item.level === selectedLevel);
      const matchSearch = (!query || item.name.toLowerCase().includes(query) || item.code.toLowerCase().includes(query));
      return matchBoard && matchLevel && matchSearch;
    });

    subjectList.innerHTML = '';

    if (filtered.length === 0) {
      subjectList.innerHTML = `
        <div class="col-12 text-center py-4 text-muted">
          <i class="fa-solid fa-book-open fa-2x mb-2 text-gold"></i>
          <p class="mb-1">No matching subject found for these filters.</p>
          <small>We teach 14 core subjects across Cambridge & Edexcel. Contact admissions for bespoke inquiries.</small>
        </div>
      `;
      return;
    }

    filtered.forEach(sub => {
      const boardLabel = sub.board === 'cambridge' ? 'Cambridge' : 'Pearson Edexcel';
      const levelLabel = sub.level === 'o-level' ? 'O Level' : (sub.level === 'igcse' ? 'IGCSE' : 'AS & A Level');
      const badgeClass = sub.featured ? 'badge-code-gold' : 'badge-code';

      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4 mb-3';
      col.innerHTML = `
        <div class="card h-100 p-3 border" style="background:#fff; border-color:var(--border-hairline);">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="${badgeClass}">${boardLabel} [${sub.code}]</span>
            <small class="text-muted fw-bold">${levelLabel}</small>
          </div>
          <h5 class="font-serif mb-2" style="font-size:1.1rem; color:var(--navy-primary);">${sub.name}</h5>
          <p class="text-muted small mb-3">Line-by-line syllabus teaching, weekly quizzes and timed past-paper practice.</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <a href="${sub.url}" class="btn-editorial-link small">Syllabus Details <i class="fa-solid fa-arrow-right"></i></a>
            <a href="#trial-section" class="btn btn-sm btn-goalpac-gold py-1 px-2" style="font-size:0.75rem;">Free Trial</a>
          </div>
        </div>
      `;
      subjectList.appendChild(col);
    });
  }

  boardFilter.addEventListener('change', renderSubjects);
  levelFilter.addEventListener('change', renderSubjects);
  if (searchInput) searchInput.addEventListener('input', renderSubjects);

  renderSubjects();
}

/* ==========================================================================
   5. SAMPLE MONTHLY PROGRESS REPORT SWITCHER
   ========================================================================== */
function initMonthlyReportSwitcher() {
  const tabs = document.querySelectorAll('.report-switcher-btn');
  const targetGradeEl = document.getElementById('report-metric-target');
  const workingGradeEl = document.getElementById('report-metric-working');
  const attendanceEl = document.getElementById('report-metric-attendance');
  const testAvgEl = document.getElementById('report-metric-test');
  const feedbackEl = document.getElementById('report-teacher-feedback');
  const subjectTitleEl = document.getElementById('report-subject-title');

  if (!tabs.length || !targetGradeEl) return;

  const reportData = {
    maths: {
      title: 'Cambridge O Level Mathematics (4024)',
      target: 'A*',
      working: 'A (78%)',
      attendance: '96%',
      test: '84%',
      feedback: 'Teacher next step: Focus on non-calculator mental arithmetic speed for Paper 1 (Section B algebra and coordinate geometry). Recommended 2 past-paper clinics this month.'
    },
    physics: {
      title: 'Cambridge International A Level Physics (9702)',
      target: 'A*',
      working: 'A (76%)',
      attendance: '100%',
      test: '81%',
      feedback: 'Teacher next step: Review Paper 4 structured questions on magnetic fields and electric potential. Calculation layout is sound; focus on written explanations of physics definitions.'
    },
    economics: {
      title: 'Pearson Edexcel IAL Economics (WEC11)',
      target: 'A',
      working: 'B+ (71%)',
      attendance: '92%',
      test: '75%',
      feedback: 'Teacher next step: Great progress on Section A data response. Work on Section B 20-mark evaluation structure and counter-arguments to lock in top band marks.'
    }
  };

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active', 'btn-goalpac-gold'));
      tabs.forEach(t => t.classList.add('btn-outline-secondary'));

      btn.classList.add('active', 'btn-goalpac-gold');
      btn.classList.remove('btn-outline-secondary');

      const subjectKey = btn.getAttribute('data-subject');
      const data = reportData[subjectKey];
      if (data) {
        subjectTitleEl.textContent = data.title;
        targetGradeEl.textContent = data.target;
        workingGradeEl.textContent = data.working;
        attendanceEl.textContent = data.attendance;
        testAvgEl.textContent = data.test;
        feedbackEl.textContent = data.feedback;
      }
    });
  });
}

/* ==========================================================================
   6. FREE TRIAL CLASS FORM VALIDATION & CONFIRMATION
   ========================================================================== */
function initTrialFormValidation() {
  const form = document.getElementById('goalpac-trial-form');
  const successBox = document.getElementById('trial-success-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentName = form.querySelector('[name="student_name"]');
    const parentEmail = form.querySelector('[name="parent_email"]');
    const board = form.querySelector('[name="exam_board"]');
    const subject = form.querySelector('[name="subject"]');

    if (!studentName.value.trim() || !parentEmail.value.trim() || !board.value || !subject.value) {
      alert('Please fill in the required fields to book your free trial class.');
      return;
    }

    // Simulate successful placement dispatch
    form.style.display = 'none';
    if (successBox) {
      successBox.style.display = 'block';
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

/* ==========================================================================
   7. COOKIE CONSENT BANNER
   ========================================================================== */
function initCookieConsent() {
  const banner = document.getElementById('cookie-notice-banner');
  const acceptBtn = document.getElementById('btn-accept-cookies');

  if (!banner || !acceptBtn) return;

  if (localStorage.getItem('goalpac_cookie_consent') === 'true') {
    banner.classList.add('dismissed');
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('goalpac_cookie_consent', 'true');
    banner.classList.add('dismissed');
  });
}

/* ==========================================================================
   8. GSAP REVEAL ANIMATIONS (Purposeful Editorial Cadence)
   ========================================================================== */
function initGSAPMotion() {
  if (typeof gsap === 'undefined') return;

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  gsap.from('.hero-editorial-section h1', {
    duration: 0.9,
    y: 25,
    opacity: 0,
    ease: 'power2.out'
  });

  gsap.from('.live-world-board-card', {
    duration: 1,
    y: 35,
    opacity: 0,
    delay: 0.2,
    ease: 'power2.out'
  });

  gsap.from('.proof-pillar', {
    duration: 0.8,
    y: 15,
    opacity: 0,
    stagger: 0.15,
    delay: 0.4,
    ease: 'power2.out'
  });
}
