(function() {
    const fullpage = document.getElementById('fullpage');
    const sections = document.querySelectorAll('.section');
    let index = 0;
    let isAnimating = false;
    let lastWheel = 0;

    function setActiveSection(i) {
        sections.forEach((sec, idx) => {
            sec.classList.toggle('on', idx === i);
        });
    }

    function goTo(i) {
        if (isAnimating) return;
        i = Math.max(0, Math.min(sections.length - 1, i));
        if (i === index) return;
        isAnimating = true;
        index = i;
        fullpage.style.transform = `translateY(${-i*100}vh)`;

        setActiveSection(i);

        setTimeout(() => isAnimating = false, 800);
    }

    function next() {
        goTo(index + 1);
    }

    function prev() {
        goTo(index - 1);
    }

    function onWheel(e) {
        const now = Date.now();
        if (now - lastWheel < 120) return;
        lastWheel = now;
        const d = e.deltaY;
        if (d > 0) next();
        else prev();
    }

    let startY = null;

    function onTouchStart(e) {
        startY = e.touches[0].clientY;
    }

    function onTouchMove(e) {
        if (startY === null) return;
        const d = startY - e.touches[0].clientY;
        if (Math.abs(d) > 50) {
            if (d > 0) next();
            else prev();
            startY = null;
        }
    }

    function onTouchEnd() {
        startY = null;
    }

    window.addEventListener('wheel', onWheel, {
        passive: true
    });
    window.addEventListener('touchstart', onTouchStart, {
        passive: true
    });
    window.addEventListener('touchmove', onTouchMove, {
        passive: true
    });
    window.addEventListener('touchend', onTouchEnd);

    setActiveSection(0);
})();
