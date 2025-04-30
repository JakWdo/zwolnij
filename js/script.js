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
    initThemeToggle();
    initNavigation();
    initLetterReveal();
    initTimeCounter();
    initScrollIndicator();
    initStatisticCounters();
    initBreathingExercise();
    initQuiz();
    initSubscribeForm();
    initBackToTop();
});

// ==============================================
// Moduł: Przełącznik trybu ciemnego/jasnego
// ==============================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Dodajemy animację podczas zmiany motywu
        document.documentElement.classList.add('theme-transition');
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 1000);
    });

    // Sprawdzenie zapisanego motywu w localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Jeśli nie ma zapisanego motywu, sprawdzamy preferencje systemowe
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// ==============================================
// Moduł: Nawigacja
// ==============================================
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!nav || !menuToggle || !navMenu) return;

    // Zmiana przezroczystości nawigacji podczas przewijania
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Obsługa menu mobilnego
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Aktualizacja atrybutu aria-expanded
        const isExpanded = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Zamknięcie menu po kliknięciu na link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Aktywny link podczas przewijania
    window.addEventListener('scroll', function() {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Płynne przewijanie do sekcji po kliknięciu linków
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId !== '#') {
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
        const start = parseInt(el.textContent) || 0;
        
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
}

// ==============================================
// Moduł: Ćwiczenie oddechowe
// ==============================================
function initBreathingExercise() {
    const startBtn = document.getElementById('start-breathing');
    const stopBtn = document.getElementById('stop-breathing');
    const breatheCircle = document.querySelector('.breathe-circle');
    const breatheInstruction = document.querySelector('.breathe-instruction');
    const breatheTimer = document.querySelector('.breathe-timer');
    const progressBar = document.querySelector('.breathe-progress-bar');
    
    if (!startBtn || !stopBtn || !breatheCircle || !breatheInstruction || !breatheTimer || !progressBar) return;
    
    let breathingInterval;
    let currentPhase = 'idle';
    let secondsLeft = 0;
    let totalDuration = 0;
    let elapsedTime = 0;
    
    const phases = {
        inhale: { duration: 4, text: 'Wdech' },
        holdIn: { duration: 7, text: 'Zatrzymaj' },
        exhale: { duration: 8, text: 'Wydech' },
        holdOut: { duration: 0, text: 'Zatrzymaj' }
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
        breatheCircle.classList.remove('inhale', 'hold', 'exhale');
        
        // Rozpoczynamy od wdechu
        startPhase('inhale');
        
        // Główna pętla ćwiczenia
        breathingInterval = setInterval(function() {
            secondsLeft--;
            breatheTimer.textContent = secondsLeft;
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
        breatheInstruction.textContent = phases[phase].text;
        breatheTimer.textContent = secondsLeft;
        
        // Aktualizacja klas CSS dla animacji
        breatheCircle.classList.remove('inhale', 'hold', 'exhale');
        
        if (phase === 'inhale') {
            breatheCircle.classList.add('inhale');
        } else if (phase === 'holdIn') {
            breatheCircle.classList.add('hold');
        } else if (phase === 'exhale') {
            breatheCircle.classList.add('exhale');
        }
        
        // Jeśli faza ma 0 sekund, natychmiast przechodzimy dalej
        if (secondsLeft === 0) {
            if (phase === 'holdOut') {
                startPhase('inhale');
            }
        }
    }
    
    function stopBreathing() {
        clearInterval(breathingInterval);
        breatheCircle.classList.remove('inhale', 'hold', 'exhale');
        breatheInstruction.textContent = 'Wdech';
        breatheTimer.textContent = '4';
        progressBar.style.width = '0';
        currentPhase = 'idle';
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
// Moduł: Obsługa formularza subskrypcji
// ==============================================
function initSubscribeForm() {
    const subscribeForm = document.querySelector('.subscribe-form');
    const formMessage = document.querySelector('.form-message');
    
    if (!subscribeForm || !formMessage) return;
    
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('#name');
        const emailInput = this.querySelector('#email');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        
        if (name && email) {
            // Symulacja wysyłki formularza (w prawdziwej aplikacji tutaj byłby kod do wysyłania danych do API)
            subscribeForm.style.display = 'none';
            formMessage.style.display = 'block';
            
            // Czyszczenie pól
            nameInput.value = '';
            emailInput.value = '';
            
            // Po 5 sekundach można ponownie wypełnić formularz
            setTimeout(function() {
                subscribeForm.style.display = 'flex';
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    // Efekt "focus" dla pól formularza
    const formInputs = subscribeForm.querySelectorAll('input');
    formInputs.forEach(input => {
        // Aktualizacja stanu przy załadowaniu
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
        
        // Aktualizacja stanu przy zmianie
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
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