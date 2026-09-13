    let isDark = false;

    function toggleTheme() {
      isDark = !isDark;
      document.body.classList.toggle('dark', isDark);
      updateThemeIcons();
    }

    function updateThemeIcons() {
      const sunIconMobile = document.getElementById('sun-icon-mobile');
      const moonIconMobile = document.getElementById('moon-icon-mobile');

      if (isDark) {
        sunIconMobile.style.display = 'block';
        moonIconMobile.style.display = 'none';
      } else {
        sunIconMobile.style.display = 'none';
        moonIconMobile.style.display = 'block';
      }
    }

    // ========== Mobile Menu ==========
    let isMenuOpen = false;

    function toggleMobileMenu() {
      isMenuOpen = !isMenuOpen;
      const mobileMenu = document.getElementById('mobile-menu');
      const menuIcon = document.getElementById('menu-icon');
      const closeIcon = document.getElementById('close-icon');

      if (isMenuOpen) {
        mobileMenu.classList.add('open');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
      } else {
        mobileMenu.classList.remove('open');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    }

    function closeMobileMenu() {
      isMenuOpen = false;
      document.getElementById('mobile-menu').classList.remove('open');
      document.getElementById('menu-icon').style.display = 'block';
      document.getElementById('close-icon').style.display = 'none';
    }

    // ========== Scroll To Top ==========
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ========== Loading Screen ==========
    window.addEventListener('load', function() {
      setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');
        
        setTimeout(function() {
          loadingScreen.style.display = 'none';
          document.getElementById('navbar').classList.add('visible');
          document.getElementById('hero').classList.add('animate');
        }, 600);
      }, 2000);
    });

    // ========== Scroll Animations ==========
    function isElementInView(el, offset = 100) {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - offset;
    }

    function animateOnScroll() {
      // Section headers
      document.querySelectorAll('.section-header').forEach(el => {
        if (isElementInView(el)) el.classList.add('animate');
      });

      // About section
      document.querySelectorAll('.about-text, .stats-grid').forEach(el => {
        if (isElementInView(el)) el.classList.add('animate');
      });

      // Skills section
      document.querySelectorAll('.skill-row').forEach((el, i) => {
        if (isElementInView(el)) {
          setTimeout(() => el.classList.add('animate'), i * 100);
        }
      });
      
      document.querySelectorAll('.skill-categories').forEach(el => {
        if (isElementInView(el)) el.classList.add('animate');
      });

      // Experience section
      document.querySelectorAll('.experience-item').forEach((el, i) => {
        if (isElementInView(el)) {
          setTimeout(() => el.classList.add('animate'), i * 150);
        }
      });

      // Projects section
      document.querySelectorAll('.project-card').forEach((el, i) => {
        if (isElementInView(el)) {
          setTimeout(() => el.classList.add('animate'), i * 200);
        }
      });

      // Contact section
      document.querySelectorAll('.contact-grid').forEach(el => {
        if (isElementInView(el)) el.classList.add('animate');
      });

      // Resume section
      document.querySelectorAll('.resume-left, .certs-list').forEach(el => {
        if (isElementInView(el)) el.classList.add('animate');
      });
    }

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', function() {
      setTimeout(animateOnScroll, 2600);
    });

    // ========== Skill Icons Follow Mouse ==========
    document.querySelectorAll('.skill-row').forEach(row => {
      const icon = row.querySelector('.skill-icon');
      
      row.addEventListener('mousemove', function(e) {
        const rect = row.getBoundingClientRect();
        const x = e.clientX - rect.left - 64;
        const y = e.clientY - rect.top - 64;
        icon.style.left = x + 'px';
        icon.style.top = y + 'px';
      });
    });

    // ========== Hero Parallax Tilt (z-axis depth on mouse move) ==========
    const heroParallax = document.getElementById('hero-parallax');
    const heroTiltTarget = document.getElementById('hero-tilt-target');

    if (heroParallax && heroTiltTarget) {
      heroParallax.addEventListener('mousemove', function(e) {
        const rect = heroParallax.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateY = px * 16;
        const rotateX = py * -16;
        heroTiltTarget.style.transform =
          'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
      });

      heroParallax.addEventListener('mouseleave', function() {
        heroTiltTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    }

    // Scroll parallax: hero image + badge drift at different depths than the page
    function updateHeroScrollParallax() {
      if (!heroParallax) return;
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight) return;
      heroParallax.style.transform = 'translateY(' + (scrollY * 0.12) + 'px)';
    }

    window.addEventListener('scroll', updateHeroScrollParallax, { passive: true });

    // ========== Hero Tagline Carousel ==========
    const heroTaglines = [
      "AI Engineer · RAG & Agentic Workflows",
      "Building with LangChain, LangGraph & FastAPI",
      "Turning LLMs into reliable, shippable products"
    ];
    let heroTaglineIndex = 0;

    function cycleTagline(direction) {
      const el = document.getElementById('hero-tagline');
      if (!el) return;
      el.classList.add('swap');
      setTimeout(function() {
        heroTaglineIndex = (heroTaglineIndex + direction + heroTaglines.length) % heroTaglines.length;
        el.textContent = heroTaglines[heroTaglineIndex];
        el.classList.remove('swap');
      }, 280);
    }

    // Initialize theme icons
    updateThemeIcons();