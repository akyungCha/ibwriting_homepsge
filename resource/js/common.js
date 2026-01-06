$(document).ready(function () {

    // 1024px 햄버거 메뉴 & 검색
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.drawer-overlay');
    const drawer = document.querySelector('.drawer');
    const closeBtn = document.querySelector('.drawer-close');

    const searchToggle = document.querySelector('.search-toggle');
    const searchMobile = document.querySelector('.search.search-mobile');

    function lockScroll(lock) {
      document.documentElement.style.overflow = lock ? 'hidden' : '';
    }

    function closeSearch() {
      searchMobile.classList.remove('is-open');
      searchToggle.setAttribute('aria-expanded', 'false');
      searchMobile.setAttribute('aria-hidden', 'true');
    }

    function openDrawer() {
      drawer.classList.add('is-open');
      overlay.hidden = false;
      drawer.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      lockScroll(true);
      closeSearch();
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      overlay.hidden = true;
      drawer.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      lockScroll(false);
    }

    function toggleSearch() {
      const isOpen = searchMobile.classList.toggle('is-open');
      searchToggle.setAttribute('aria-expanded', String(isOpen));
      searchMobile.setAttribute('aria-hidden', String(!isOpen));
      if (isOpen) closeDrawer();
    }

    hamburger?.addEventListener('click', openDrawer);
    overlay?.addEventListener('click', closeDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    searchToggle?.addEventListener('click', toggleSearch);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
        closeSearch();
      }
    });

    //section_seven 슬라이드
    document.querySelectorAll('.step-slider .panel').forEach(panel => {
        panel.addEventListener('click', () => {
            document.querySelectorAll('.step-slider .panel')
                .forEach(p => p.classList.remove('on'));
            panel.classList.add('on');
        });
    });

    //section_nine 슬라이드
    const reviewSwiper = new Swiper('.review-swiper', {
        slidesPerView: 1,
        speed: 600,
        loop: true,
        grabCursor: true,
        navigation: {
            nextEl: '.nav-btn.next',
            prevEl: '.nav-btn.prev',
        },

        breakpoints: {
            360: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });

});
