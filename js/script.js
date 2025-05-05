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

    // Inicjalizacja wszystkich modułów
    initEnhancedHero();         
    initScrollIndicator();
    initCardAnimations();       
    initBoxBreathing();         // Zupełnie nowa implementacja Box Breathing
    initEbookDownload();        
    initBackToTop();
    initVideoFallback();
    
    // Optymalizacje i dostępność
    optimizeAnimations();
    optimizeResourceLoading();
    optimizeVideoPlayback();
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
    
    // Dodatkowe efekty parallax dla innych elementów
    const heroVideo = document.querySelector('.video-container video');
    if (heroVideo) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition <= window.innerHeight) {
                heroVideo.style.transform = `scale(1.05) translateY(${scrollPosition * 0.1}px)`;
            }
        });
    }
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
// Moduł: Box Breathing - NOWA IMPLEMENTACJA
// ==============================================
// ==============================================
// Moduł: Box Breathing - NOWA IMPLEMENTACJA v2 (requestAnimationFrame)
// ==============================================
function initBoxBreathing() {
    console.log('Inicjalizacja Box Breathing v2.1...'); // Log startowy

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
    const startBtn = document.getElementById('start-breathing');
    const stopBtn = document.getElementById('stop-breathing');
    const breathingCircle = document.querySelector('.breathing-circle');
    // Pobierz wszystkie etykiety faz
    const breathingTexts = PHASES.map(phase => document.querySelector(phase.selector));
    const instructionTextElement = document.querySelector('.breathing-circle .breathing-instruction');
    const breatheExerciseContainer = document.querySelector('.breathe-exercise'); // Potrzebny do dodania komunikatu

    // --- Sprawdzenie istnienia elementów ---
    let elementsMissing = false;
    if (!startBtn) { console.error('Box Breathing Error: Nie znaleziono przycisku #start-breathing'); elementsMissing = true; }
    if (!stopBtn) { console.error('Box Breathing Error: Nie znaleziono przycisku #stop-breathing'); elementsMissing = true; }
    if (!breathingCircle) { console.error('Box Breathing Error: Nie znaleziono elementu .breathing-circle'); elementsMissing = true; }
    if (!instructionTextElement) { console.error('Box Breathing Error: Nie znaleziono elementu .breathing-instruction wewnątrz .breathing-circle'); elementsMissing = true; }
    if (!breatheExerciseContainer) { console.error('Box Breathing Error: Nie znaleziono kontenera .breathe-exercise'); elementsMissing = true; }
    // Sprawdź, czy wszystkie teksty faz istnieją (jeśli są używane)
    breathingTexts.forEach((el, index) => {
        if (!el) {
            console.warn(`Box Breathing Warning: Nie znaleziono etykiety fazy: ${PHASES[index].selector}`);
            // Można kontynuować bez etykiet, ale warto o tym wiedzieć
        }
    });

    if (elementsMissing) {
        console.error('Box Breathing: Inicjalizacja przerwana z powodu braku elementów DOM.');
        // Opcjonalnie: ukryj całą sekcję, jeśli brakuje kluczowych elementów
        const breatheSection = document.getElementById('breathe');
        if(breatheSection) breatheSection.style.display = 'none';
        return; // Przerwij inicjalizację
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
             cycleStartTime = timestamp; // Ustaw czas startu przy pierwszej klatce
             console.log(`Animation started at: ${timestamp}`);
        }

        const elapsedTotalTime = timestamp - cycleStartTime;
        const elapsedCycleTime = elapsedTotalTime % TOTAL_CYCLE_DURATION;

        // Określenie aktualnej fazy
        let phaseElapsedTime = 0;
        let calculatedPhaseIndex = 0;
        for (let i = 0; i < PHASES.length; i++) {
            if (elapsedCycleTime < phaseElapsedTime + PHASES[i].duration) {
                calculatedPhaseIndex = i;
                break;
            }
            phaseElapsedTime += PHASES[i].duration;
        }

        // Aktualizacja UI tylko jeśli faza się zmieniła
        if (calculatedPhaseIndex !== currentPhaseIndex) {
            console.log(`Changing phase from ${currentPhaseIndex} to ${calculatedPhaseIndex} at ${elapsedTotalTime}ms`);
            currentPhaseIndex = calculatedPhaseIndex;
            updateActivePhase(currentPhaseIndex);
            updateInstructionText(currentPhaseIndex); // Aktualizuj też główny tekst

            // Sprawdzenie ukończenia cyklu
            if (currentPhaseIndex === 0 && elapsedTotalTime > 100) {
                let justCompletedCycles = Math.floor(elapsedTotalTime / TOTAL_CYCLE_DURATION);
                 // Zliczaj tylko raz na cykl
                if (justCompletedCycles > completedCycles) {
                    completedCycles = justCompletedCycles;
                    console.log(`Ukończono cykl: ${completedCycles}`);
                    if (completedCycles >= TOTAL_CYCLES) {
                        console.log('Osiągnięto maksymalną liczbę cykli.');
                        naturalStop = true;
                        stopBreathing(); // Zakończ ćwiczenie
                        return; // Wyjdź z pętli
                    }
                }
            }
        }

        // Aktualizacja okręgu postępu w każdej klatce
        const progress = elapsedCycleTime / TOTAL_CYCLE_DURATION;
        updateProgressCircle(progress);

        // Kontynuuj pętlę
        animationFrameId = requestAnimationFrame(animationLoop);
    }

    // --- Funkcje pomocnicze ---
    function updateActivePhase(activeIndex) {
        breathingTexts.forEach((text, index) => {
            if (text) { // Sprawdź, czy element istnieje
                 if (index === activeIndex) {
                    text.classList.add('active');
                 } else {
                    text.classList.remove('active');
                 }
            }
        });
        // Dodaj klasę do okręgu dla ewentualnej stylizacji
        breathingCircle.className = 'breathing-circle'; // Reset
        breathingCircle.classList.add(`phase-${PHASES[activeIndex].name}`);
    }

    function updateProgressCircle(progress) {
        // Używamy Math.min/max dla pewności, że wartość jest w zakresie 0-1
        const angle = Math.min(1, Math.max(0, progress)) * 360;
        // Ustawienie zmiennej CSS --progress-angle
        breathingCircle.style.setProperty('--progress-angle', `${angle}deg`);
    }

    function updateInstructionText(phaseIndex) {
        const phase = PHASES[phaseIndex];
        // Wyświetl nazwę fazy w centralnym miejscu
        instructionTextElement.textContent = `${phase.text}`;
    }

    function resetUI() {
        console.log('Resetting UI...');
        breathingTexts.forEach(text => { if(text) text.classList.remove('active'); });
        updateProgressCircle(0); // Resetuj okrąg postępu
        instructionTextElement.textContent = 'Rozpocznij'; // Tekst początkowy
        breathingCircle.className = 'breathing-circle'; // Reset klas okręgu

        // Usuń ewentualny komunikat o ukończeniu
        const existingCompletion = breatheExerciseContainer.querySelector('.completion-message');
        if (existingCompletion) {
            console.log('Removing existing completion message.');
            existingCompletion.remove();
        }
    }

    function showCompletionMessage() {
        console.log('Showing completion message.');
         // Upewnij się, że kontener nadal istnieje
        if (!breatheExerciseContainer) {
             console.error("Cannot show completion message: container not found.");
             return;
        }
        // Usuń stary komunikat, jeśli jakimś cudem pozostał
         const existingCompletion = breatheExerciseContainer.querySelector('.completion-message');
         if (existingCompletion) existingCompletion.remove();

        // Utwórz nowy komunikat
        const completionMessage = document.createElement('div');
        completionMessage.className = 'completion-message';
        completionMessage.innerHTML = `
            <div class="success-icon" aria-hidden="true">✓</div>
            <h3>Świetnie!</h3>
            <p>Ukończyłeś ${completedCycles} ${completedCycles === 1 ? 'cykl' : (completedCycles > 1 && completedCycles < 5 ? 'cykle' : 'cykli')} oddechowych.</p>
        `; // Prosta obsługa liczby mnogiej

        breatheExerciseContainer.appendChild(completionMessage);
        // Pokaż z animacją
        requestAnimationFrame(() => { // Użyj rAF dla pewności, że element jest w DOM
             completionMessage.classList.add('show');
        });

        // Usuń wiadomość po 5 sekundach
        setTimeout(() => {
             if (completionMessage.parentNode) {
                 completionMessage.classList.remove('show');
                 // Poczekaj na zakończenie animacji zanikania przed usunięciem
                 completionMessage.addEventListener('transitionend', () => {
                      if (completionMessage.parentNode) completionMessage.remove();
                 }, { once: true });
             }
        }, 5000);
    }

    // --- Funkcje Start/Stop ---
    function startBreathing() {
        console.log('startBreathing called.');
        if (isBreathing) return;
        isBreathing = true;
        naturalStop = false;
        currentPhaseIndex = -1; // Ustaw na -1, aby wymusić aktualizację przy pierwszej klatce
        cycleStartTime = 0;
        completedCycles = 0;

        resetUI(); // Przygotuj UI przed startem
        // updateActivePhase(0); // Nie ustawiaj aktywnej fazy tutaj, pętla to zrobi

        startBtn.disabled = true;
        stopBtn.disabled = false;
        startBtn.classList.add('clicked');
        setTimeout(() => startBtn.classList.remove('clicked'), 300);

        // Rozpocznij pętlę animacji
        console.log('Requesting animation frame...');
        animationFrameId = requestAnimationFrame(animationLoop);
    }

    function stopBreathing() {
        console.log('stopBreathing called.');
        if (!isBreathing) return;
        isBreathing = false;
        cancelAnimationFrame(animationFrameId); // Zatrzymaj pętlę
        animationFrameId = null; // Wyczyść ID

        startBtn.disabled = false;
        stopBtn.disabled = true;
        // Dodaj efekt kliknięcia tylko jeśli przycisk jest faktycznie klikany
        // (Tutaj jest to wywoływane programowo, więc pomijamy efekt)
        // stopBtn.classList.add('clicked');
        // setTimeout(() => stopBtn.classList.remove('clicked'), 300);

        if (naturalStop) {
             showCompletionMessage();
             naturalStop = false;
        }
        // Zawsze resetuj UI po zatrzymaniu (nawet naturalnym, bo komunikat jest osobno)
        // ale z opóźnieniem, żeby komunikat był widoczny
        if (!naturalStop) {
             resetUI();
        } else {
             // Przy naturalnym stopie, resetujemy z opóźnieniem, żeby użytkownik zdążył zobaczyć ostatni stan
             setTimeout(resetUI, 500); // Krótkie opóźnienie
        }
    }

    // --- Inicjalizacja ---
    // Dodaj event listenery do przycisków
    startBtn.addEventListener('click', startBreathing);
    stopBtn.addEventListener('click', stopBreathing);

    // Ustaw stan początkowy interfejsu
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetUI();

    console.log('Box Breathing v2.1 zainicjowane pomyślnie.');
}

// ==============================================
// Moduł: Obsługa pobierania ebooka
// ==============================================
function initEbookDownload() {
    const downloadBtn = document.getElementById('download-ebook');
    const downloadSuccess = document.getElementById('download-success');
    const retryDownload = document.getElementById('retry-download');
    
    if (!downloadBtn || !downloadSuccess || !retryDownload) return;
    
    // Funkcja do obsługi pobierania ebooka
    function downloadEbook() {
        // Symulacja pobierania pliku
        setTimeout(() => {
            // W prawdziwej aplikacji tutaj byłby kod do rozpoczęcia pobierania pliku
            const link = document.createElement('a');
            link.href = 'assets/ebooks/zwolnij-ebook.pdf'; // ścieżka do prawdziwego pliku
            link.download = 'Zwolnij-Praktyczny-Przewodnik.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Pokazanie komunikatu o sukcesie
            downloadSuccess.style.display = 'block';
            
            // Dodanie efektu przewijania do komunikatu o sukcesie
            window.scrollTo({
                top: downloadSuccess.offsetTop,
                behavior: 'smooth'
            });
            
            // Ogłoszenie dla czytników ekranu
            if (window.announceToScreenReader) {
                window.announceToScreenReader('Pobieranie ebooka rozpoczęte. Sprawdź folder pobierania.');
            }
        }, 1000);
    }
    
    // Obsługa kliknięcia przycisku "Pobierz"
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Dodanie animacji do przycisku
        this.classList.add('shake');
        setTimeout(() => {
            this.classList.remove('shake');
        }, 500);
        
        downloadEbook();
    });
    
    // Obsługa kliknięcia przycisku "Spróbuj ponownie"
    retryDownload.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Dodanie animacji do przycisku
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 1000);
        
        downloadEbook();
    });
}

// ==============================================
// Moduł: Obsługa fallbacku wideo
// ==============================================
function initVideoFallback() {
    const videoContainer = document.querySelector('.video-container');
    const video = videoContainer ? videoContainer.querySelector('video') : null;
    
    if (!video || !videoContainer) return;
    
    // Obsługa błędu wideo
    video.addEventListener('error', function() {
        console.log('Nie można odtworzyć wideo - przełączanie na fallback');
        videoContainer.classList.add('video-error');
    });
    
    // Sprawdzenie, czy wideo zostało poprawnie załadowane
    video.addEventListener('loadeddata', function() {
        videoContainer.classList.remove('video-error');
        console.log('Wideo załadowane pomyślnie');
    });
    
    // Efekt parallax dla wideo podczas przewijania
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            videoContainer.classList.add('scrolled');
        } else {
            videoContainer.classList.remove('scrolled');
        }
    });
    
    // Obsługa płynnego przewijania przy kliknięciu na linki kotwiczne
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==============================================
// Moduł: Przycisk powrotu do góry
// ==============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    // Pokazywanie/ukrywanie przycisku w zależności od przewinięcia
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Obsługa kliknięcia przycisku
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==============================================
// Optymalizacje wydajności
// ==============================================

// Optimize animations with requestAnimationFrame
function optimizeAnimations() {
    // Check if browser supports requestAnimationFrame
    const requestAnimFrame = window.requestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            function(callback) { window.setTimeout(callback, 1000/60); };
    
    window.requestAnimFrame = requestAnimFrame;
    
    // Debounce scroll events
    let scrollTimeout;
    function debounceScroll(func, wait = 10) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(func, wait);
    }
    
    // Replace standard scroll listeners with debounced versions
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function(type, listener, options) {
        if (type === 'scroll') {
            const debouncedListener = function(e) {
                debounceScroll(() => listener(e));
            };
            return originalAddEventListener.call(this, type, debouncedListener, options);
        }
        return originalAddEventListener.call(this, type, listener, options);
    };
}

// Optimize resource loading
function optimizeResourceLoading() {
    // Lazy load images when they enter viewport
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            function lazyLoad() {
                lazyImages.forEach(img => {
                    if (img.getBoundingClientRect().top <= window.innerHeight && 
                        img.getBoundingClientRect().bottom >= 0 && 
                        getComputedStyle(img).display !== 'none') {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                });
            }
            
            // Initial check
            lazyLoad();
            // Add event listeners for scroll and resize
            window.addEventListener('scroll', lazyLoad);
            window.addEventListener('resize', lazyLoad);
        }
    }
    
    // Preload critical resources
    function preloadCriticalResources() {
        // Add preload links for critical resources
        const preloads = [
            { href: 'assets/videos/city-timelapse.mp4', as: 'video', type: 'video/mp4' },
            { href: 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js', as: 'script' }
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
    
    // Execute preloading
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preloadCriticalResources);
    } else {
        preloadCriticalResources();
    }
}

// Optimize video playback
function optimizeVideoPlayback() {
    const video = document.querySelector('.video-container video');
    if (!video) return;
    
    // Reduce initial quality for faster playback
    video.addEventListener('loadedmetadata', function() {
        // Set initial quality to low res
        if (video.videoHeight > 720) {
            video.style.height = '720px';
            video.style.objectFit = 'cover';
        }
    });
    
    // Pause video when not in viewport to save resources
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(err => {
                        console.warn('Auto-play prevented:', err);
                    });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        
        videoObserver.observe(video);
    }
}

// ==============================================
// Dostępność
// ==============================================

// Improve keyboard navigation and screen reader support
function initAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#manifesto';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Przejdź do treści głównej';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    improveKeyboardNavigation();
    setupScreenReaderAnnouncements();
    ensureImageAccessibility();
    checkHeadingHierarchy();
}

// Improve keyboard navigation
function improveKeyboardNavigation() {
    // Add keyboard support for custom interactive elements
    const interactiveElements = document.querySelectorAll('.manifesto-item, .practice-card');
    
    interactiveElements.forEach(item => {
        // Make items focusable
        item.setAttribute('tabindex', '0');
        
        // Add keyboard event handling
        item.addEventListener('keydown', function(e) {
            // If Enter or Space is pressed, trigger click
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Add screen reader announcements for dynamic content
function setupScreenReaderAnnouncements() {
    // Create an ARIA live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.classList.add('sr-only'); // This class visually hides the element
    document.body.appendChild(liveRegion);
    
    // Function to announce messages to screen readers
    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
        
        // Clear after 5 seconds
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 5000);
    };
}

// Add alt text to all images
function ensureImageAccessibility() {
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        // Extract alt text from context if possible
        let altText = '';
        
        // Try to get alt text from parent heading
        const nearestHeading = img.closest('div')?.querySelector('h1, h2, h3, h4, h5, h6');
        if (nearestHeading) {
            altText = nearestHeading.textContent;
        } else {
            // Use image filename as fallback
            const filename = img.src.split('/').pop().split('.')[0];
            altText = filename.replace(/[-_]/g, ' ');
        }
        
        img.setAttribute('alt', altText);
    });
}

// Ensure proper heading hierarchy
function checkHeadingHierarchy() {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const headingLevels = headings.map(h => parseInt(h.tagName.substring(1)));
    
    // Log warnings for skipped heading levels
    for (let i = 1; i < headingLevels.length; i++) {
        if (headingLevels[i] > headingLevels[i-1] + 1) {
            console.warn(`Heading hierarchy issue: Skipped from h${headingLevels[i-1]} to h${headingLevels[i]}`);
        }
    }
}
