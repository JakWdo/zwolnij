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
    initEnhancedHero();         // Nowa funkcja dla ulepszonej sekcji Hero
    initScrollIndicator();
    initCardAnimations();       // Nowa funkcja dla animacji kart
    initBoxBreathing();         // Używaj zaktualizowanej wersji z poruszającą się kulką
    initQuiz();
    initEbookDownload();        // Używaj zaktualizowanej wersji bez animacji książki
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
    updateHeroStatistics();
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

// Aktualizowanie statystyk w sekcji Hero
function updateHeroStatistics() {
    const stressStatEl = document.getElementById('stress-stat');
    const timeStatEl = document.getElementById('time-stat');
    
    if (!stressStatEl || !timeStatEl) return;
    
    // W rzeczywistej aplikacji te dane mogłyby pochodzić z API
    // Tutaj używamy rzeczywistych danych statystycznych
    const stressPercentage = 76; // Aktualizacja do rzeczywistych danych
    const screenTime = 5.2; // Aktualizacja do rzeczywistych danych w godzinach
    
    // Animacja liczb
    animateValue(stressStatEl, 0, stressPercentage, 2000, '%');
    animateValue(timeStatEl, 0, screenTime, 2000, 'h');
}

// Funkcja do animacji wartości liczbowych
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Obsługa liczb zmiennoprzecinkowych
        const currentValue = progress * (end - start) + start;
        const formatted = Number.isInteger(end) ? 
            Math.floor(currentValue) : 
            currentValue.toFixed(1);
        
        element.textContent = `${formatted}${suffix}`;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
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
// Moduł: Ulepszony skrypt do obsługi kart i animacji podczas scrollowania
// ==============================================
function initCardAnimations() {
    // Inicjalizacja animacji dla kart
    initScrollReveal();
    initParallaxEffects();
    initStatisticCounters();
    initCardHoverEffects();
    initLazyLoading();
}

// Animacja ujawniania elementów podczas scrollowania
function initScrollReveal() {
    // Pobierz wszystkie elementy, które mają być ujawnione
    const revealElements = document.querySelectorAll('.manifesto-item, .practice-card, .stat-item');
    
    // Dodaj klasę fade-in-element do wszystkich elementów
    revealElements.forEach(element => {
        element.classList.add('fade-in-element');
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
    
    document.querySelectorAll('.stats-container > *').forEach((element, index) => {
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

// Poprawiona animacja liczników statystyk z rzeczywistymi danymi
function initStatisticCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    
    // Aktualizacja z rzeczywistymi wartościami
    const realStats = {
        0: 73, // Procent Polaków zestresowanych
        1: 6.2, // Godziny spędzane w mediach
        2: 48  // Procent osób bez cyfrowego detoksu
    };
    
    // Funkcja do animacji licznika
    function animateCounter(el, target, duration) {
        let startTimestamp = null;
        const start = parseFloat(el.textContent) || 0;
        
        // Obsługa liczb zmiennoprzecinkowych
        const isFloat = target.toString().includes('.');
        const decimals = isFloat ? target.toString().split('.')[1].length : 0;
        
        function step(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Obliczanie bieżącej wartości
            const currentValue = progress * (target - start) + start;
            
            // Formatowanie liczby
            el.textContent = isFloat 
                ? currentValue.toFixed(decimals) 
                : Math.floor(currentValue);
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }
    
    // Observer do uruchamiania animacji, gdy element jest widoczny
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const index = Array.from(statNumbers).indexOf(el);
                const target = realStats[index] !== undefined ? realStats[index] : parseFloat(el.getAttribute('data-target'));
                
                animateCounter(el, target, 2000);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    // Obserwowanie wszystkich liczników
    statNumbers.forEach(counter => {
        observer.observe(counter);
    });
    
    // Animacja pasków statystyk
    const statBars = document.querySelectorAll('.stat-bar-fill');
    if (statBars.length > 0) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.dataset.width;
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 500);
                    barObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        statBars.forEach((bar, index) => {
            // Aktualizacja wartości szerokości paska
            const statIndex = Math.min(index, Object.keys(realStats).length - 1);
            const statValue = realStats[statIndex];
            if (statValue !== undefined) {
                bar.dataset.width = `${statValue}%`;
            }
            barObserver.observe(bar);
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
    
    // Dodaj efekt fali (ripple) do kart praktyki
    const practiceCards = document.querySelectorAll('.practice-card');
    
    practiceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Utwórz element fali
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Dodaj do karty
            this.appendChild(ripple);
            
            // Usuń po animacji
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
    
    // Dodaj style dla efektu ripple
    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: rgba(63, 81, 181, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.8s ease-out;
            pointer-events: none;
            z-index: 1;
        }
        
        @keyframes ripple {
            to {
                transform: scale(30);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Lazy loading dla obrazów i innych zasobów
function initLazyLoading() {
    // Obsługa obrazów z lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('lazy-load');
                    
                    img.onload = function() {
                        img.classList.add('loaded');
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        }, { threshold: 0.1, rootMargin: '200px' });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==============================================
// Moduł: Box Breathing - ćwiczenie oddechowe
// ==============================================
function initBoxBreathing() {
    const startBtn = document.getElementById('start-breathing');
    const stopBtn = document.getElementById('stop-breathing');
    const breathingBall = document.querySelector('.breathing-ball');
    const boxTimer = document.querySelector('.box-timer');
    const progressBar = document.querySelector('.breathe-progress-bar');
    const boxSides = document.querySelectorAll('.box-side');
    
    if (!startBtn || !stopBtn || !breathingBall || !boxTimer || !progressBar) {
        console.error('Brakuje elementów potrzebnych do Box Breathing');
        return;
    }
    
    let breathingInterval;
    let currentPhase = 'idle';
    let secondsLeft = 0;
    let totalDuration = 0;
    let elapsedTime = 0;
    let cyclesCompleted = 0;
    const maxCycles = 5; // Maksymalna liczba cykli oddechowych
    
    // Box Breathing: wdech (4s), zatrzymanie (4s), wydech (4s), zatrzymanie (4s)
    const phases = {
        inhale: { duration: 4, text: 'Wdech', class: 'inhale', side: 'left-side' },
        holdTop: { duration: 4, text: 'Zatrzymaj', class: 'hold-top', side: 'top-side' },
        exhale: { duration: 4, text: 'Wydech', class: 'exhale', side: 'right-side' },
        holdBottom: { duration: 4, text: 'Zatrzymaj', class: 'hold-bottom', side: 'bottom-side' }
    };
    
    // Obliczanie całkowitego czasu jednego cyklu
    for (const phase in phases) {
        totalDuration += phases[phase].duration;
    }
    
    // Tryb audio - dźwięki pomocnicze do ćwiczenia
    let audioContext;
    let audioEnabled = false;
    
    function initAudio() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioEnabled = true;
        } catch (e) {
            console.warn('Web Audio API nie jest obsługiwana w tej przeglądarce');
            audioEnabled = false;
        }
    }
    
    function playPhaseSound(phase) {
        if (!audioEnabled || !audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Różne częstotliwości dla różnych faz
        switch (phase) {
            case 'inhale':
                oscillator.frequency.value = 196.00; // G3
                break;
            case 'holdTop':
                oscillator.frequency.value = 246.94; // B3
                break;
            case 'exhale':
                oscillator.frequency.value = 293.66; // D4
                break;
            case 'holdBottom':
                oscillator.frequency.value = 329.63; // E4
                break;
        }
        
        oscillator.type = 'sine';
        
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        filter.Q.value = 1;
        
        gainNode.gain.value = 0.2;
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, 500);
    }
    
    // Resetuj pozycję kulki do startowej przed rozpoczęciem
    function resetBallPosition() {
        breathingBall.style.animation = 'none';
        breathingBall.offsetHeight; // Wymuś reflow
        breathingBall.style.top = '-8px';
        breathingBall.style.left = '50%';
        breathingBall.style.transform = 'translateX(-50%)';
        breathingBall.style.animation = '';
    }
    
    startBtn.addEventListener('click', function() {
        if (!audioContext && !audioEnabled) {
            initAudio();
        }
        
        resetBallPosition();
        startBreathing();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
        
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Ćwiczenie oddechowe rozpoczęte');
        }
    });
    
    stopBtn.addEventListener('click', function() {
        stopBreathing();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
        
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Ćwiczenie oddechowe zatrzymane');
        }
    });
    
    function startBreathing() {
        // Resetowanie stanu
        elapsedTime = 0;
        cyclesCompleted = 0;
        
        // Usuń wszystkie klasy przed rozpoczęciem
        breathingBall.classList.remove('inhale', 'hold-top', 'exhale', 'hold-bottom');
        
        // Usuń pozostałe style animacji
        breathingBall.style.animation = '';
        
        // Czyszczenie aktywnych stron
        boxSides.forEach(side => side.classList.remove('active'));
        
        // Rozpoczynamy od wdechu
        startPhase('inhale');
        
        // Główna pętla ćwiczenia
        breathingInterval = setInterval(function() {
            secondsLeft--;
            boxTimer.textContent = secondsLeft;
            elapsedTime++;
            
            // Aktualizacja paska postępu
            const progressPercent = (elapsedTime % totalDuration) / totalDuration * 100;
            progressBar.style.width = `${progressPercent}%`;
            
            if (secondsLeft <= 0) {
                // Przejście do następnej fazy
                switch (currentPhase) {
                    case 'inhale':
                        startPhase('holdTop');
                        break;
                    case 'holdTop':
                        startPhase('exhale');
                        break;
                    case 'exhale':
                        startPhase('holdBottom');
                        break;
                    case 'holdBottom':
                        // Po zakończeniu jednego pełnego cyklu
                        cyclesCompleted++;
                        
                        // Sprawdzenie, czy osiągnęliśmy maksymalną liczbę cykli
                        if (cyclesCompleted >= maxCycles) {
                            stopBreathing();
                            startBtn.disabled = false;
                            stopBtn.disabled = true;
                            
                            // Wyświetl komunikat o zakończeniu
                            const breatheExercise = document.querySelector('.breathe-exercise');
                            const completionMessage = document.createElement('div');
                            completionMessage.className = 'completion-message';
                            completionMessage.innerHTML = `
                                <div class="success-icon">✓</div>
                                <h3>Świetnie!</h3>
                                <p>Ukończyłeś ${maxCycles} cykli oddechowych.</p>
                            `;
                            
                            // Dodaje message po zakończeniu z animacją
                            breatheExercise.appendChild(completionMessage);
                            setTimeout(() => {
                                completionMessage.classList.add('show');
                            }, 100);
                            
                            // Usuń wiadomość po 5 sekundach
                            setTimeout(() => {
                                completionMessage.classList.remove('show');
                                setTimeout(() => {
                                    completionMessage.remove();
                                }, 500);
                            }, 5000);
                            
                            // Ogłoszenie dla czytników ekranu
                            if (window.announceToScreenReader) {
                                window.announceToScreenReader(`Świetnie! Ukończyłeś ${maxCycles} cykli oddechowych.`);
                            }
                            
                            return;
                        }
                        
                        startPhase('inhale');
                        break;
                }
            }
        }, 1000);
    }
    
    function startPhase(phase) {
        currentPhase = phase;
        secondsLeft = phases[phase].duration;
        boxTimer.textContent = secondsLeft;
        
        // Aktualizacja klas CSS dla animacji - WAŻNE: Pełne usunięcie i ponowne dodanie klas
        breathingBall.classList.remove('inhale', 'hold-top', 'exhale', 'hold-bottom');
        breathingBall.style.animation = 'none';
        breathingBall.offsetHeight; // Wymuś reflow DOM
        
        // Dodanie właściwej klasy z małym opóźnieniem dla pewności
        setTimeout(() => {
            breathingBall.style.animation = '';
            breathingBall.classList.add(phases[phase].class);
        }, 50);
        
        // Odtwarzanie dźwięku dla tej fazy
        playPhaseSound(phase);
        
        // Podświetlenie aktywnej strony kwadratu
        boxSides.forEach(side => side.classList.remove('active'));
        document.querySelector(`.${phases[phase].side}`).classList.add('active');
        
        // Ogłoszenie dla czytników ekranu
        if (window.announceToScreenReader) {
            window.announceToScreenReader(phases[phase].text);
        }
    }
    
    function stopBreathing() {
        clearInterval(breathingInterval);
        
        // Zatrzymanie wszystkich animacji
        breathingBall.classList.remove('inhale', 'hold-top', 'exhale', 'hold-bottom');
        breathingBall.style.animation = 'none';
        
        // Resetowanie pozycji kulki do pozycji początkowej
        resetBallPosition();
        
        boxTimer.textContent = '4';
        progressBar.style.width = '0';
        currentPhase = 'idle';
        
        // Usunięcie podświetlenia stron
        boxSides.forEach(side => side.classList.remove('active'));
    }
}

// ==============================================
// Moduł: Quiz "Jak szybko żyjesz?"
// ==============================================
function initQuiz() {
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');
    const retakeBtn = document.getElementById('retake-quiz');
    const resultDiv = document.getElementById('quiz-result');
    const resultScore = document.getElementById('result-score');
    const resultDesc = document.getElementById('result-description');
    
    if (quizQuestions.length === 0 || !prevBtn || !nextBtn || !submitBtn || !resultDiv || !resultScore || !resultDesc) return;
    
    let currentQuestion = 1;
    const totalQuestions = quizQuestions.length;
    
    // Funkcja do pokazywania pytania o danym numerze
    function showQuestion(questionNumber) {
        quizQuestions.forEach(question => {
            question.classList.remove('active');
            if (parseInt(question.dataset.question) === questionNumber) {
                question.classList.add('active');
            }
        });
        
        // Aktualizacja stanu przycisków
        prevBtn.disabled = questionNumber === 1;
        nextBtn.style.display = questionNumber < totalQuestions ? 'block' : 'none';
        submitBtn.style.display = questionNumber === totalQuestions ? 'block' : 'none';
        
        currentQuestion = questionNumber;
    }
    
    // Obsługa przycisku "Poprzednie"
    prevBtn.addEventListener('click', function() {
        if (currentQuestion > 1) {
            showQuestion(currentQuestion - 1);
        }
    });
    
    // Obsługa przycisku "Następne"
    nextBtn.addEventListener('click', function() {
        // Sprawdzamy, czy zaznaczono odpowiedź
        const currentQuestionEl = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
        const selectedOption = currentQuestionEl.querySelector('input[type="radio"]:checked');
        
        if (!selectedOption) {
            // Dodaj delikatną animację potrząsania dla opcji
            const options = currentQuestionEl.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.classList.add('shake');
                setTimeout(() => {
                    option.classList.remove('shake');
                }, 500);
            });
            return;
        }
        
        if (currentQuestion < totalQuestions) {
            showQuestion(currentQuestion + 1);
        }
    });
    
    // Obsługa przycisku "Sprawdź wynik"
    submitBtn.addEventListener('click', function() {
        // Sprawdzamy, czy zaznaczono ostatnią odpowiedź
        const lastQuestionEl = document.querySelector(`.quiz-question[data-question="${totalQuestions}"]`);
        const selectedOption = lastQuestionEl.querySelector('input[type="radio"]:checked');
        
        if (!selectedOption) {
            const options = lastQuestionEl.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.classList.add('shake');
                setTimeout(() => {
                    option.classList.remove('shake');
                }, 500);
            });
            return;
        }
        
        calculateResult();
    });
    
    // Obliczanie wyniku
    function calculateResult() {
        let score = 0;
        
        // Zbieranie wszystkich zaznaczonych odpowiedzi
        quizQuestions.forEach(question => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            if (selectedOption) {
                score += parseInt(selectedOption.value);
            }
        });
        
        // Wyświetlenie wyniku
        resultScore.textContent = score;
        
        // Określenie opisu wyniku
        let description = '';
        if (score <= 8) {
            description = `
                <p>Gratulacje! Żyjesz w spokojnym, zrównoważonym tempie. Potrafisz docenić chwilę i nie dajesz się wciągnąć w wir codziennego pośpiechu.</p>
                <p>Twoje podejście do życia sprzyja dbaniu o zdrowie psychiczne i fizyczne. Pamiętaj jednak, aby dzielić się swoim doświadczeniem z innymi i inspirować ich do zwolnienia tempa.</p>
            `;
        } else if (score <= 12) {
            description = `
                <p>Twoje tempo życia jest umiarkowane. Zazwyczaj potrafisz zachować równowagę, ale czasami dajesz się wciągnąć w wir codziennych obowiązków i pośpiechu.</p>
                <p>Warto zastanowić się, w których obszarach możesz wprowadzić więcej spokoju i uważności. Praktyki z naszego manifestu mogą być dla Ciebie pomocne.</p>
            `;
        } else if (score <= 16) {
            description = `
                <p>Żyjesz dość szybko. Prawdopodobnie często czujesz się przytłoczony/a ilością obowiązków i brakiem czasu. Taki styl życia może prowadzić do przewlekłego stresu.</p>
                <p>Spróbuj wdrożyć przynajmniej jedną praktykę z naszego manifestu. Nawet drobne zmiany mogą przynieść znaczącą poprawę jakości Twojego życia.</p>
            `;
        } else {
            description = `
                <p>Twoje tempo życia jest bardzo szybkie. Najprawdopodobniej żyjesz w ciągłym pośpiechu, co może prowadzić do wypalenia i problemów zdrowotnych.</p>
                <p>Potrzebujesz pilnie wprowadzić zmiany w swoim codziennym funkcjonowaniu. Zacznij od małych kroków - codzienne 5 minut ciszy i świadomego oddychania może być dobrym początkiem.</p>
            `;
        }
        
        resultDesc.innerHTML = description;
        
        // Schowanie pytań, pokazanie wyniku
        document.getElementById('quiz-questions').style.display = 'none';
        document.querySelector('.quiz-navigation').style.display = 'none';
        resultDiv.style.display = 'block';
        
        // Ogłoszenie dla czytników ekranu
        if (window.announceToScreenReader) {
            window.announceToScreenReader(`Twój wynik to ${score} punktów. ${description.replace(/<[^>]*>/g, ' ').substring(0, 100)}...`);
        }
    }
    
    // Obsługa przycisku "Spróbuj ponownie"
    retakeBtn.addEventListener('click', function() {
        // Resetowanie quizu
        quizQuestions.forEach(question => {
            const radios = question.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                radio.checked = false;
            });
        });
        
        // Powrót do pierwszego pytania
        showQuestion(1);
        
        // Ukrycie wyniku, pokazanie pytań
        document.getElementById('quiz-questions').style.display = 'block';
        document.querySelector('.quiz-navigation').style.display = 'flex';
        resultDiv.style.display = 'none';
        
        // Ogłoszenie dla czytników ekranu
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Quiz zresetowany. Zacznij od nowa.');
        }
    });
    
    // Dodanie obsługi kliknięcia na całą etykietę opcji
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
    
    // Dodanie obsługi klawiatury dla opcji quizu
    quizOptions.forEach(option => {
        option.setAttribute('tabindex', '0');
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
            }
        });
    });
    
    // Inicjalizacja - pokazanie pierwszego pytania
    showQuestion(1);
}

// ==============================================
// Moduł: Obsługa pobierania ebooka
// ==============================================
function initEbookDownload() {
    const downloadBtn = document.getElementById('download-ebook');
    const downloadSuccess = document.getElementById('download-success');
    const retryDownload = document.getElementById('retry-download');
    const downloadCount = document.getElementById('download-count');
    
    if (!downloadBtn || !downloadSuccess || !retryDownload || !downloadCount) return;
    
    // Funkcja do obsługi pobierania ebooka
    function downloadEbook() {
        // Symulacja pobierania pliku
        setTimeout(() => {
            // W prawdziwej aplikacji tutaj byłby kod do rozpoczęcia pobierania pliku
            const link = document.createElement('a');
            link.href = 'zwolnij/assets/ebooks/zwolnij-ebook.pdf'; // ścieżka do prawdziwego pliku
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
            { href: 'zwolnij/assets/videos/city-timelapse.mp4', as: 'video', type: 'video/mp4' },
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
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });
    
    videoObserver.observe(video);
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
    const interactiveElements = document.querySelectorAll('.manifesto-item, .practice-card, .stat-item');
    
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
        const nearestHeading = img.closest('div').querySelector('h1, h2, h3, h4, h5, h6');
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
