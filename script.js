    let isDark = false;

    function toggleTheme() {
      isDark = !isDark;
      document.body.classList.toggle('dark', isDark);
      updateThemeIcons();
    }

    function updateThemeIcons() {
      const sunIcon = document.getElementById('sun-icon');
      const moonIcon = document.getElementById('moon-icon');
      const sunIconMobile = document.getElementById('sun-icon-mobile');
      const moonIconMobile = document.getElementById('moon-icon-mobile');
      
      if (isDark) {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        sunIconMobile.style.display = 'block';
        moonIconMobile.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
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
      
      document.querySelectorAll('.also-familiar').forEach(el => {
        if (isElementInView(el)) el.classList.add('animate');
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

    // Initialize theme icons
    updateThemeIcons();