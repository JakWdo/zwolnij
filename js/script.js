// Główny plik JavaScript dla landing page "Zwolnij."

// Czekamy na załadowanie DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja biblioteki AOS do animacji
    AOS.init({
        once: true,  // Animacja wystąpi tylko raz
        duration: 1500,  // Domyślny czas trwania animacji
        easing: 'ease-in-out',  // Rodzaj przejścia
        offset: 100  // Offset w pikselach
    });
    console.log('AOS initialized.'); // Potwierdzenie inicjalizacji AOS

    // Inicjalizacja wszystkich modułów
    initEnhancedHero();
    initScrollIndicator();
    initCardAnimations();
    initBoxBreathing();         // Zupełnie nowa implementacja Box Breathing
    initEbookDownload();
    initBackToTop();

    // Optymalizacje i dostępność
    optimizeAnimations();
    optimizeResourceLoading();
    initAccessibility();
});

// ==============================================
// Moduł: Inicjalizacja ulepszonej sekcji Hero
// ==============================================
function initEnhancedHero() {
    initClockAnimation();
    initTypingEffect();
    initParticlesJS();
}

// Animacja zegara w sekcji Hero
function initClockAnimation() {
    const clockHour = document.querySelector('.clock-hour');
    const clockMinute = document.querySelector('.clock-minute');
    const clockSecond = document.querySelector('.clock-second');

    if (!clockHour || !clockMinute || !clockSecond) return;

    // Ustawienie początkowych pozycji wskazówek zegara
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDegrees = (hours * 30) + (minutes * 0.5); // 30 stopni na godzinę + 0.5 stopnia na minutę
    const minuteDegrees = minutes * 6; // 6 stopni na minutę
    const secondDegrees = seconds * 6; // 6 stopni na sekundę

    clockHour.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    clockMinute.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    clockSecond.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;

    // Dodanie interakcji do zegara
    const heroClock = document.querySelector('.hero-clock');
    if (heroClock) {
        heroClock.addEventListener('mouseenter', () => {
            clockSecond.style.animationPlayState = 'paused';
            clockMinute.style.animationPlayState = 'paused';
            clockHour.style.animationPlayState = 'paused';
        });

        heroClock.addEventListener('mouseleave', () => {
            clockSecond.style.animationPlayState = 'running';
            clockMinute.style.animationPlayState = 'running';
            clockHour.style.animationPlayState = 'running';
        });
    }
}

// Efekt pisania na maszynie dla tytułu
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const text = typingText.textContent;
    typingText.textContent = '';

    let i = 0;
    const typingSpeed = 150; // szybkość pisania w ms

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Dodanie kursora po zakończeniu pisania
            typingText.classList.add('typing-complete');
        }
    }

    // Opóźnienie rozpoczęcia animacji
    setTimeout(typeWriter, 500);
}

// Inicjalizacja tła z cząsteczkami przy użyciu particles.js
function initParticlesJS() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // Sprawdzenie, czy biblioteka particles.js jest załadowana
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.6
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    } else {
        // Jeśli biblioteka nie jest załadowana, dodaj alternatywne tło
        console.warn('Particles.js nie jest załadowany. Używanie alternatywnego tła.');

        // Proste cząsteczki za pomocą czystego JS
        createSimpleParticles(particlesContainer);
    }
}

// Prosta alternatywa dla particles.js
function createSimpleParticles(container) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'simple-particle';

        // Losowa pozycja
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;

        // Losowy rozmiar
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Losowa przezroczystość
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        // Losowa animacja
        const animationDuration = Math.random() * 20 + 10;
        particle.style.animation = `floatParticle ${animationDuration}s infinite linear`;

        container.appendChild(particle);
    }

    // Dodanie stylu dla prostych cząsteczek
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .simple-particle {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            pointer-events: none;
        }

        @keyframes floatParticle {
            0% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(50px, -50px);
            }
            50% {
                transform: translate(100px, 0);
            }
            75% {
                transform: translate(50px, 50px);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    `;
    document.head.appendChild(styleElement);
}

// ==============================================
// Moduł: Obsługa wskaźnika przewijania
// ==============================================
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', function() {
        const manifestoSection = document.getElementById('manifesto');
        if (manifestoSection) {
            manifestoSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Ukrycie wskaźnika przewijania po przewinięciu
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ==============================================
// Moduł: Animacje kart
// ==============================================
function initCardAnimations() {
    // Inicjalizacja animacji dla kart
    initScrollReveal();
    initParallaxEffects();
    initCardHoverEffects();
}

// Animacja ujawniania elementów podczas scrollowania
function initScrollReveal() {
    // Pobierz wszystkie elementy, które mają być ujawnione
    const revealElements = document.querySelectorAll('.manifesto-item, .practice-card');

    // Dodaj klasę fade-in-element do wszystkich elementów
    revealElements.forEach(element => {
        if (!element.classList.contains('fade-in-element')) {
            element.classList.add('fade-in-element');
        }
    });

    // Funkcja sprawdzająca, czy element jest w widoku
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Element jest widoczny, gdy jego górna krawędź jest pod górną krawędzią okna
        // i dolna krawędź jest nad dolną krawędzią okna
        return (
            rect.top <= windowHeight * 0.85 && // Pojawia się, gdy jest w 85% widoku
            rect.bottom >= 0
        );
    }

    // Funkcja obsługująca ujawnianie elementów
    function handleScrollReveal() {
        revealElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }

    // Wywołaj funkcję raz na początku, aby pokazać widoczne elementy
    handleScrollReveal();

    // Nasłuchuj zdarzenia scroll
    window.addEventListener('scroll', handleScrollReveal);

    // Dodaj opóźnienie do elementów, które pojawiają się jeden po drugim
    document.querySelectorAll('.manifesto-content > *').forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.practices-grid > *').forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Efekty parallax dla elementów tła
function initParallaxEffects() {
    const parallaxBg = document.querySelector('.parallax-bg');
    if (!parallaxBg) return;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    });
}

// Ulepszenie efektów hover dla kart
function initCardHoverEffects() {
    // Dodaj efekt 3D do kart w sekcji manifestu
    const manifestoItems = document.querySelectorAll('.manifesto-item');

    manifestoItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // położenie x myszy względem karty
            const y = e.clientY - rect.top;  // położenie y myszy względem karty

            // Obliczamy kąt obrotu (max 5 stopni)
            const rotateX = ((y - rect.height / 2) / rect.height) * -5;
            const rotateY = ((x - rect.width / 2) / rect.width) * 5;

            // Zastosuj transformację
            this.style.transform = `translateY(-5px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Dodaj dynamiczny efekt cienia
            const shadowX = (x - rect.width / 2) / 10;
            const shadowY = (y - rect.height / 2) / 10;
            this.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.15)`;
        });

        // Reset po wyjściu kursora
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';

            // Dodaj animację powrotu
            this.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    });
}

// ==============================================
// Moduł: Box Breathing - POPRAWIONA IMPLEMENTACJA
// ==============================================
function initBoxBreathing() {
    console.log('Inicjalizacja Box Breathing v2.1 (poprawiona)...'); // Log startowy

    // --- Konfiguracja ---
    const PHASES = [
        { name: 'inhale', text: 'Wdech', duration: 4000, selector: '.phase-inhale' },
        { name: 'hold1', text: 'Zatrzymaj', duration: 4000, selector: '.phase-hold-1' },
        { name: 'exhale', text: 'Wydech', duration: 4000, selector: '.phase-exhale' },
        { name: 'hold2', text: 'Zatrzymaj', duration: 4000, selector: '.phase-hold-2' }
    ];
    const TOTAL_CYCLES = 5;
    const TOTAL_CYCLE_DURATION = PHASES.reduce((sum, phase) => sum + phase.duration, 0);

    // --- Elementy DOM ---
    const breatheSection = document.getElementById('breathe'); // Pobierz całą sekcję
    const startBtn = document.getElementById('start-breathing');
    const stopBtn = document.getElementById('stop-breathing');
    const breathingCircle = document.querySelector('.breathing-circle');
    const breathingTexts = PHASES.map(phase => document.querySelector(phase.selector));
    const instructionTextElement = document.querySelector('.breathing-circle .breathing-instruction');
    const breatheExerciseContainer = document.querySelector('.breathe-exercise');

    // --- Sprawdzenie istnienia elementów ---
    let elementsMissing = false;
    const missingElementsDetails = [];

    if (!breatheSection) { console.error('Box Breathing Critical Error: Nie znaleziono sekcji #breathe'); elementsMissing = true; missingElementsDetails.push('sekcji #breathe'); }
    if (!startBtn) { console.error('Box Breathing Error: Nie znaleziono przycisku #start-breathing'); elementsMissing = true; missingElementsDetails.push('przycisku #start-breathing'); }
    if (!stopBtn) { console.error('Box Breathing Error: Nie znaleziono przycisku #stop-breathing'); elementsMissing = true; missingElementsDetails.push('przycisku #stop-breathing'); }
    if (!breathingCircle) { console.error('Box Breathing Error: Nie znaleziono elementu .breathing-circle'); elementsMissing = true; missingElementsDetails.push('elementu .breathing-circle'); }
    if (!instructionTextElement) { console.error('Box Breathing Error: Nie znaleziono elementu .breathing-instruction'); elementsMissing = true; missingElementsDetails.push('elementu .breathing-instruction'); }
    if (!breatheExerciseContainer) { console.error('Box Breathing Error: Nie znaleziono kontenera .breathe-exercise'); elementsMissing = true; missingElementsDetails.push('kontenera .breathe-exercise'); }

    breathingTexts.forEach((el, index) => {
        if (!el) {
            console.warn(`Box Breathing Warning: Nie znaleziono etykiety fazy: ${PHASES[index].selector}`);
            // Nie traktujemy tego jako błąd krytyczny, ale warto wiedzieć
        }
    });

    // *** POPRAWKA OBSŁUGI BŁĘDU ***
    if (elementsMissing) {
        console.error(`Box Breathing: Inicjalizacja przerwana z powodu braku kluczowych elementów DOM: ${missingElementsDetails.join(', ')}. Ćwiczenie oddechowe nie będzie działać, ale reszta strony powinna być widoczna.`);
        // Zamiast ukrywać całą sekcję, po prostu przerywamy inicjalizację tej funkcji
        // if(breatheSection) breatheSection.style.display = 'none'; // USUNIĘTO tę linię
        return; // Przerwij inicjalizację TYLKO tej funkcji
    }
    console.log('Box Breathing: Wszystkie wymagane elementy DOM znalezione.');

    // --- Zmienne stanu ---
    let isBreathing = false;
    let currentPhaseIndex = 0;
    let cycleStartTime = 0;
    let animationFrameId = null;
    let completedCycles = 0;
    let naturalStop = false;

    // --- Główna pętla animacji ---
    function animationLoop(timestamp) {
        if (!isBreathing) return;

        if (cycleStartTime === 0) {
             cycleStartTime = timestamp;
        }

        const elapsedTotalTime = timestamp - cycleStartTime;
        const elapsedCycleTime = elapsedTotalTime % TOTAL_CYCLE_DURATION;

        let phaseElapsedTime = 0;
        let calculatedPhaseIndex = 0;
        for (let i = 0; i < PHASES.length; i++) {
            if (elapsedCycleTime < phaseElapsedTime + PHASES[i].duration) {
                calculatedPhaseIndex = i;
                break;
            }
            phaseElapsedTime += PHASES[i].duration;
        }

        if (calculatedPhaseIndex !== currentPhaseIndex) {
            currentPhaseIndex = calculatedPhaseIndex;
            updateActivePhase(currentPhaseIndex);
            updateInstructionText(currentPhaseIndex);

            if (currentPhaseIndex === 0 && elapsedTotalTime > 100) {
                let justCompletedCycles = Math.floor(elapsedTotalTime / TOTAL_CYCLE_DURATION);
                if (justCompletedCycles > completedCycles) {
                    completedCycles = justCompletedCycles;
                    if (completedCycles >= TOTAL_CYCLES) {
                        naturalStop = true;
                        stopBreathing();
                        return;
                    }
                }
            }
        }

        const progress = elapsedCycleTime / TOTAL_CYCLE_DURATION;
        updateProgressCircle(progress);

        animationFrameId = requestAnimationFrame(animationLoop);
    }

    // --- Funkcje pomocnicze ---
    function updateActivePhase(activeIndex) {
        breathingTexts.forEach((text, index) => {
            if (text) {
                 if (index === activeIndex) text.classList.add('active');
                 else text.classList.remove('active');
            }
        });
        breathingCircle.className = 'breathing-circle';
        breathingCircle.classList.add(`phase-${PHASES[activeIndex].name}`);
    }

    function updateProgressCircle(progress) {
        const angle = Math.min(1, Math.max(0, progress)) * 360;
        breathingCircle.style.setProperty('--progress-angle', `${angle}deg`);
    }

    function updateInstructionText(phaseIndex) {
        const phase = PHASES[phaseIndex];
        instructionTextElement.textContent = `${phase.text}`;
    }

    function resetUI() {
        console.log('Resetting Box Breathing UI...');
        breathingTexts.forEach(text => { if(text) text.classList.remove('active'); });
        updateProgressCircle(0);
        instructionTextElement.textContent = 'Rozpocznij';
        breathingCircle.className = 'breathing-circle';

        const existingCompletion = breatheExerciseContainer.querySelector('.completion-message');
        if (existingCompletion) {
            existingCompletion.remove();
        }
    }

    function showCompletionMessage() {
        console.log('Showing Box Breathing completion message.');
        if (!breatheExerciseContainer) {
             console.error("Cannot show completion message: container not found.");
             return;
        }
         const existingCompletion = breatheExerciseContainer.querySelector('.completion-message');
         if (existingCompletion) existingCompletion.remove();

        const completionMessage = document.createElement('div');
        completionMessage.className = 'completion-message';
        completionMessage.innerHTML = `
            <div class="success-icon" aria-hidden="true">✓</div>
            <h3>Świetnie!</h3>
            <p>Ukończyłeś ${completedCycles} ${completedCycles === 1 ? 'cykl' : (completedCycles > 1 && completedCycles < 5 ? 'cykle' : 'cykli')} oddechowych.</p>
        `;

        breatheExerciseContainer.appendChild(completionMessage);
        requestAnimationFrame(() => {
             completionMessage.classList.add('show');
        });

        setTimeout(() => {
             if (completionMessage.parentNode) {
                 completionMessage.classList.remove('show');
                 completionMessage.addEventListener('transitionend', () => {
                      if (completionMessage.parentNode) completionMessage.remove();
                 }, { once: true });
             }
        }, 5000);
    }

    // --- Funkcje Start/Stop ---
    function startBreathing() {
        if (isBreathing) return;
        isBreathing = true;
        naturalStop = false;
        currentPhaseIndex = -1;
        cycleStartTime = 0;
        completedCycles = 0;

        resetUI();

        startBtn.disabled = true;
        stopBtn.disabled = false;
        startBtn.classList.add('clicked');
        setTimeout(() => startBtn.classList.remove('clicked'), 300);

        animationFrameId = requestAnimationFrame(animationLoop);
    }

    function stopBreathing() {
        if (!isBreathing) return;
        isBreathing = false;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;

        startBtn.disabled = false;
        stopBtn.disabled = true;

        if (naturalStop) {
             showCompletionMessage();
             naturalStop = false;
             // Przy naturalnym stopie, resetujemy z opóźnieniem
             setTimeout(resetUI, 500);
        } else {
             // Przy ręcznym zatrzymaniu, resetujemy od razu
             resetUI();
        }
    }

    // --- Inicjalizacja ---
    startBtn.addEventListener('click', startBreathing);
    stopBtn.addEventListener('click', stopBreathing);

    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetUI();

    console.log('Box Breathing v2.1 (poprawiona) zainicjowane pomyślnie.');
}


// ==============================================
// Moduł: Obsługa pobierania ebooka
// ==============================================
function initEbookDownload() {
    const downloadBtn = document.getElementById('download-ebook');
    const downloadSuccess = document.getElementById('download-success');
    const retryDownload = document.getElementById('retry-download');

    if (!downloadBtn || !downloadSuccess || !retryDownload) return;

    function downloadEbook() {
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'zwolnij-ebook.pdf'; // Upewnij się, że ścieżka jest poprawna
            link.download = 'Zwolnij-Praktyczny-Przewodnik.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            downloadSuccess.style.display = 'block';

            window.scrollTo({
                top: downloadSuccess.offsetTop - 100, // Przewiń trochę wyżej
                behavior: 'smooth'
            });

            if (window.announceToScreenReader) {
                window.announceToScreenReader('Pobieranie ebooka rozpoczęte. Sprawdź folder pobierania.');
            }
        }, 1000);
    }

    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.add('clicked'); // Użyj klasy clicked
        setTimeout(() => this.classList.remove('clicked'), 300);
        downloadEbook();
    });

    retryDownload.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
        downloadEbook();
    });
}


// ==============================================
// Moduł: Przycisk powrotu do góry
// ==============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==============================================
// Optymalizacje wydajności (pozostawione bez zmian, ale potencjalnie do przeglądu)
// ==============================================
function optimizeAnimations() {
    const requestAnimFrame = window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            function(callback) { window.setTimeout(callback, 1000/60); };
    window.requestAnimFrame = requestAnimFrame;

    let scrollTimeout;
    function debounceScroll(func, wait = 15) { // Zwiększony lekko wait time
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(func, wait);
    }

    const originalAddEventListener = window.addEventListener;
    let scrollListeners = []; // Przechowuj oryginalne listenery

    window.addEventListener = function(type, listener, options) {
        if (type === 'scroll') {
            scrollListeners.push({ listener, options }); // Zapisz listener
            // Nie dodawaj listenera od razu
            return;
        }
        return originalAddEventListener.call(this, type, listener, options);
    };

    // Dodaj jeden główny listener scroll po załadowaniu DOM
    document.addEventListener('DOMContentLoaded', () => {
        originalAddEventListener.call(window, 'scroll', (e) => {
            debounceScroll(() => {
                scrollListeners.forEach(item => {
                    try {
                         item.listener(e); // Wywołaj zapisane listenery
                    } catch (error) {
                         console.error("Błąd w listenerze scroll:", error);
                    }
                });
            });
        });
         // Wywołaj raz na starcie, aby zainicjować stany zależne od scrolla
         scrollListeners.forEach(item => { try { item.listener({ type: 'scroll' }); } catch (error) {} });
    });
}

function optimizeResourceLoading() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => { // Dodano observer do argumentów
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        // Opcjonalnie: dodaj klasę po załadowaniu
                        img.onload = () => img.classList.add('loaded');
                        observer.unobserve(img); // Użyj observer z argumentów
                    }
                });
            }, { rootMargin: "0px 0px 100px 0px" }); // Zacznij ładować 100px przed wejściem w viewport

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback (uproszczony)
            console.warn("IntersectionObserver not supported, fallback lazy loading may be less efficient.");
            lazyImages.forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
        }
    }

    // Preload critical resources (funkcja pozostawiona bez zmian)
    function preloadCriticalResources() {
        const preloads = [
            // Usunięto preload wideo, ponieważ jest duże i może blokować
            // { href: 'assets/videos/city-timelapse.mp4', as: 'video', type: 'video/mp4' },
            // Preload czcionek jest ważniejszy i obsługiwany przez <link> w HTML
            // { href: 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js', as: 'script' } // Jeśli używane, można odkomentować
        ];

        preloads.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.type) link.type = resource.type;
            document.head.appendChild(link);
        });
    }

    // Wykonaj preload tylko jeśli potrzebne
    // preloadCriticalResources(); // Wywołanie opcjonalne
}



// ==============================================
// Dostępność (funkcje pozostawione bez zmian, ale potencjalnie do przeglądu)
// ==============================================
function initAccessibility() {
    // Skip link jest już w HTML, więc ta część może być niepotrzebna
    // const skipLink = document.createElement('a'); ...

    improveKeyboardNavigation();
    setupScreenReaderAnnouncements();
    ensureImageAccessibility();
    checkHeadingHierarchy();
}

function improveKeyboardNavigation() {
    const interactiveElements = document.querySelectorAll('.manifesto-item, .practice-card, .cta-button, .download-button, #back-to-top');

    interactiveElements.forEach(item => {
        // Upewnij się, że elementy interaktywne są fokusowalne
        if (!item.hasAttribute('tabindex') && item.tagName !== 'A' && item.tagName !== 'BUTTON') {
             item.setAttribute('tabindex', '0');
        }

        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Dla linków, Enter powinien działać domyślnie
                // Dla przycisków, Enter i Space powinny działać domyślnie
                // Dla divów itp. symulujemy kliknięcie
                if (item.tagName !== 'A' && item.tagName !== 'BUTTON') {
                     e.preventDefault();
                     this.click();
                } else if (e.key === ' ' && item.tagName === 'A') {
                    // Zapobiegaj przewijaniu strony spacją na linkach
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
}


function setupScreenReaderAnnouncements() {
    // Użyj istniejącego diva z HTML zamiast tworzyć nowy
    const liveRegion = document.querySelector('[aria-live="polite"]');
    if (!liveRegion) {
         console.warn("Accessibility Warning: Nie znaleziono regionu ARIA live dla ogłoszeń.");
         // Stwórz fallback, jeśli nie ma w HTML
         const fallbackRegion = document.createElement('div');
         fallbackRegion.setAttribute('aria-live', 'polite');
         fallbackRegion.setAttribute('aria-atomic', 'true');
         fallbackRegion.className = 'sr-only'; // Zakładamy, że ta klasa istnieje w CSS
         document.body.appendChild(fallbackRegion);
         window.announceToScreenReader = function(message) { fallbackRegion.textContent = message; setTimeout(() => { fallbackRegion.textContent = ''; }, 5000); };
         return;
    }

    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 5000);
    };
}

function ensureImageAccessibility() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
            console.warn(`Accessibility Warning: Obrazek ${img.src} nie ma tekstu alternatywnego (alt).`);
            // Prosty fallback, jeśli alt jest pusty
            if (!img.hasAttribute('alt')) {
                 const filename = img.src.split('/').pop().split('.')[0];
                 const fallbackAlt = filename.replace(/[-_]/g, ' ');
                 img.setAttribute('alt', fallbackAlt);
            } else if (img.getAttribute('alt').trim() === '') {
                // Jeśli alt jest celowo pusty, oznacz go jako prezentacyjny, jeśli to możliwe
                // W przeciwnym razie, zostaw ostrzeżenie
                 if(!img.closest('a')) { // Jeśli nie jest w linku
                     img.setAttribute('role', 'presentation');
                 }
            }
        }
    });
}

function checkHeadingHierarchy() {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let lastLevel = 0;
    headings.forEach(h => {
        const currentLevel = parseInt(h.tagName.substring(1));
        if (currentLevel > lastLevel + 1) {
            console.warn(`Accessibility Warning: Pomięto poziom nagłówka. Przeskok z h${lastLevel} do h${currentLevel} w elemencie:`, h);
        }
        lastLevel = currentLevel;
    });
}
