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
    initLetterReveal();
    initTimeCounter();
    initScrollIndicator();
    initStatisticCounters();
    initBoxBreathing();
    initQuiz();
    initEbookDownload();
    initBackToTop();
    initParticleAnimation();
    initAdditionalAnimations();
    initVideoFallback();
});

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
// Moduł: Animacja tekstu litera po literze
// ==============================================
function initLetterReveal() {
    const revealText = document.querySelector('.reveal-text');
    if (!revealText) return;
    
    const text = revealText.textContent;
    revealText.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.animationDelay = `${i * 0.1}s`;
        span.classList.add('letter');
        revealText.appendChild(span);
    }
}

// ==============================================
// Moduł: Licznik czasu spędzonego na stronie
// ==============================================
function initTimeCounter() {
    const timeDisplay = document.getElementById('time-display');
    if (!timeDisplay) return;
    
    let seconds = 0;
    let minutes = 0;
    
    setInterval(function() {
        seconds++;
        
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        
        // Format: MM:SS
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        
        timeDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
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
// Moduł: Animacja liczników statystyk
// ==============================================
function initStatisticCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    
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
                const target = parseFloat(el.getAttribute('data-target'));
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
        
        statBars.forEach(bar => {
            barObserver.observe(bar);
        });
    }
}

// ==============================================
// Moduł: Box Breathing - ćwiczenie oddechowe
// ==============================================
function initBoxBreathing() {
    const startBtn = document.getElementById('start-breathing');
    const stopBtn = document.getElementById('stop-breathing');
    const breathingBox = document.querySelector('.breathing-box');
    const boxTimer = document.querySelector('.box-timer');
    const progressBar = document.querySelector('.breathe-progress-bar');
    
    if (!startBtn || !stopBtn || !breathingBox || !boxTimer || !progressBar) return;
    
    let breathingInterval;
    let currentPhase = 'idle';
    let secondsLeft = 0;
    let totalDuration = 0;
    let elapsedTime = 0;
    
    // Box Breathing: wdech (4s), zatrzymanie (4s), wydech (4s), zatrzymanie (4s)
    const phases = {
        inhale: { duration: 4, text: 'Wdech', class: 'inhale' },
        holdIn: { duration: 4, text: 'Zatrzymaj', class: 'hold' },
        exhale: { duration: 4, text: 'Wydech', class: 'exhale' },
        holdOut: { duration: 4, text: 'Zatrzymaj', class: 'hold' }
    };
    
    // Obliczanie całkowitego czasu jednego cyklu
    for (const phase in phases) {
        totalDuration += phases[phase].duration;
    }
    
    startBtn.addEventListener('click', function() {
        startBreathing();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });
    
    stopBtn.addEventListener('click', function() {
        stopBreathing();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });
    
    function startBreathing() {
        // Resetowanie stanu
        elapsedTime = 0;
        breathingBox.classList.remove('inhale', 'hold', 'exhale');
        
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
                        startPhase('holdIn');
                        break;
                    case 'holdIn':
                        startPhase('exhale');
                        break;
                    case 'exhale':
                        startPhase('holdOut');
                        break;
                    case 'holdOut':
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
        
        // Aktualizacja klas CSS dla animacji
        breathingBox.classList.remove('inhale', 'hold', 'exhale');
        breathingBox.classList.add(phases[phase].class);
        
        // Podświetlenie aktywnej strony kwadratu
        const allSides = document.querySelectorAll('.box-side');
        allSides.forEach(side => side.classList.remove('active'));
        
        if (phase === 'inhale') {
            document.querySelector('.left-side').classList.add('active');
        } else if (phase === 'holdIn') {
            document.querySelector('.top-side').classList.add('active');
        } else if (phase === 'exhale') {
            document.querySelector('.right-side').classList.add('active');
        } else if (phase === 'holdOut') {
            document.querySelector('.bottom-side').classList.add('active');
        }
    }
    
    function stopBreathing() {
        clearInterval(breathingInterval);
        breathingBox.classList.remove('inhale', 'hold', 'exhale');
        boxTimer.textContent = '4';
        progressBar.style.width = '0';
        currentPhase = 'idle';
        
        // Usunięcie podświetlenia stron
        const allSides = document.querySelectorAll('.box-side');
        allSides.forEach(side => side.classList.remove('active'));
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
    });
    
    // Dodanie obsługi kliknięcia na całą etykietę opcji
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
    
    // Inicjalizacja - pokazanie pierwszego pytania
    showQuestion(1);
}

// ==============================================
// Moduł: Obsługa pobierania ebooka z rzeczywistym licznikiem
// ==============================================
function initEbookDownload() {
    const downloadBtn = document.getElementById('download-ebook');
    const downloadSuccess = document.getElementById('download-success');
    const retryDownload = document.getElementById('retry-download');
    const downloadCount = document.getElementById('download-count');
    
    if (!downloadBtn || !downloadSuccess || !retryDownload || !downloadCount) return;
    
    // Pobranie aktualnej liczby pobrań z localStorage lub ustawienie domyślnej wartości
    let currentDownloads = localStorage.getItem('ebookDownloads');
    
    // Jeśli nie ma zapisanej wartości, generujemy liczbę początkową
    if (!currentDownloads) {
        // Generowanie losowej liczby początkowej między 100 a 500
        currentDownloads = Math.floor(Math.random() * 400) + 100;
        localStorage.setItem('ebookDownloads', currentDownloads);
    }
    
    // Wyświetlenie aktualnej liczby pobrań
    downloadCount.textContent = currentDownloads;
    
    // Animacja licznika pobrań
    function countUpAnimation(element, target, duration) {
        let start = 0;
        const increment = Math.ceil(target / 100); // zwiększanie o 1% wartości docelowej
        const stepTime = Math.floor(duration / 100);
        
        const timer = setInterval(() => {
            start += increment;
            if (start > target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = start;
            }
        }, stepTime);
    }
    
    // Animacja przy załadowaniu strony
    countUpAnimation(downloadCount, currentDownloads, 2000);
    
    // Funkcja do zwiększania licznika pobrań
    function incrementDownloads() {
        currentDownloads = parseInt(currentDownloads) + 1;
        downloadCount.textContent = currentDownloads;
        localStorage.setItem('ebookDownloads', currentDownloads);
    }
    
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
            
            // Zwiększenie licznika pobrań
            incrementDownloads();
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
    
    // Animacja 3D książki przy najechaniu myszką
    const book = document.querySelector('.book');
    if (book) {
        document.addEventListener('mousemove', function(e) {
            if (!isElementInViewport(book)) return;
            
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            book.style.transform = `rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset transformacji po wyjściu myszki
        book.addEventListener('mouseleave', function() {
            book.style.transform = 'rotateY(-30deg) rotateX(0deg)';
            
            // Stopniowy powrót do animacji float
            setTimeout(() => {
                book.style.transition = 'transform 3s ease';
                book.style.animation = 'float 3s ease-in-out infinite';
            }, 1000);
        });
        
        book.addEventListener('mouseenter', function() {
            book.style.transition = 'transform 0.2s ease';
            book.style.animation = 'none';
        });
    }
    
    // Funkcja sprawdzająca, czy element jest w widoku
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
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
// Moduł: Animacja cząsteczek
// ==============================================
function initParticleAnimation() {
    const particles = document.querySelectorAll('.particle');
    if (particles.length === 0) return;
    
    // Losowe animacje dla każdej cząsteczki
    particles.forEach(particle => {
        const randomX = Math.random() * 200 - 100; // -100 do 100
        const randomY = Math.random() * 200 - 100; // -100 do 100
        const randomDelay = Math.random() * 5;
        const randomDuration = 15 + Math.random() * 20;
        
        particle.style.setProperty('--random-x', `${randomX}px`);
        particle.style.setProperty('--random-y', `${randomY}px`);
        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.animationDuration = `${randomDuration}s`;
    });
}

// ==============================================
// Moduł: Dodatkowe animacje i efekty
// ==============================================
function initAdditionalAnimations() {
    // Efekt parallax dla tła
    window.addEventListener('scroll', function() {
        const parallaxBg = document.querySelector('.parallax-bg');
        if (!parallaxBg) return;
        
        const scrollPosition = window.scrollY;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });
    
    // Efekt cienia dla elementów przy przewijaniu
    const shadowElements = document.querySelectorAll('.add-shadow-on-scroll');
    window.addEventListener('scroll', function() {
        shadowElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollPercent = 1 - (rect.top / window.innerHeight);
                const shadowBlur = Math.min(20, scrollPercent * 30);
                element.style.boxShadow = `0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0, 0, 0, 0.1)`;
            }
        });
    });
    
    // Dodanie efektu interaktywności dla elementów po najechaniu
    const interactiveElements = document.querySelectorAll('.interactive');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    });
}
