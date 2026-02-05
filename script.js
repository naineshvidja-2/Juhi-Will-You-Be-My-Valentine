// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Check required fields
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach((warning) => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757",
    };
    return defaults[key];
}

// Set page title
document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
    // Validate configuration first
    validateConfig();

    // Set texts from config
    document.getElementById("valentineTitle").textContent = `${config.valentineName}, my love...`;

    // ---------- Intro ----------
    document.getElementById("introTitle").textContent = config.intro.title;
    document.getElementById("introText").innerText = config.intro.text;
    document.getElementById("introBtn").textContent = config.intro.button;

    // ---------- Transition ----------
    document.getElementById("transitionTitle").textContent = config.transition.title;
    document.getElementById("transitionText").textContent = config.transition.text;
    document.getElementById("transitionBtn").textContent = config.transition.button;

    // ---------- Letter ----------
    document.getElementById("letterTitle").textContent = config.letter.title;
    document.getElementById("letterText").innerText = config.letter.text;

    // Set first question texts
    document.getElementById("question1Text").textContent = config.questions.first.text;
    document.getElementById("yesBtn1").textContent = config.questions.first.yesBtn;
    document.getElementById("noBtn1").textContent = config.questions.first.noBtn;
    document.getElementById("secretAnswerBtn").textContent = config.questions.first.secretAnswer;

    // Set second question texts
    document.getElementById("question2Text").textContent = config.questions.second.text;
    document.getElementById("startText").textContent = config.questions.second.startText;
    document.getElementById("nextBtn").textContent = config.questions.second.nextBtn;

    // Set third question texts
    document.getElementById("question3Text").textContent = config.questions.third.text;
    document.getElementById("yesBtn3").textContent = config.questions.third.yesBtn;
    document.getElementById("noBtn3").textContent = config.questions.third.noBtn;

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();
});

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector(".floating-elements");

    // Create hearts
    config.floatingEmojis.hearts.forEach((heart) => {
        const div = document.createElement("div");
        div.className = "heart";
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create bears
    config.floatingEmojis.bears.forEach((bear) => {
        const div = document.createElement("div");
        div.className = "bear";
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + "vw";
    element.style.animationDelay = Math.random() * 5 + "s";
    element.style.animationDuration = 10 + Math.random() * 20 + "s";
}

// Function to show next question
let currentMemoryIndex = 0;
let memoryHistory = [];
let historyStack = [];
let currentQuestion = 0;

function showNextQuestion(questionNumber) {
    if (currentQuestion !== questionNumber) {
        historyStack.push({
            question: currentQuestion,
            memoryIndex: currentMemoryIndex,
        });
    }

    currentQuestion = questionNumber;

    document.querySelectorAll(".question-section").forEach((q) => q.classList.add("hidden"));

    document.getElementById(`question${questionNumber}`).classList.remove("hidden");

    toggleBackButton();

    // Reset memory index when entering memory screen
    if (questionNumber === 3) {
        currentMemoryIndex = 0;
        memoryHistory = [];
        renderMemory(currentMemoryIndex);
    }
}

function renderMemory(memoryIndex) {
    const memory = config.memories[memoryIndex];

    const questionEl = document.getElementById("memoryQuestion");
    const optionsEl = document.getElementById("memoryOptions");
    const revealEl = document.getElementById("memoryReveal");
    const nextBtn = document.getElementById("memoryNextBtn");

    questionEl.textContent = memory.question;
    optionsEl.innerHTML = "";
    optionsEl.style.display = "flex";

    revealEl.classList.add("hidden");
    revealEl.textContent = "";
    nextBtn.classList.add("hidden");

    memory.options.forEach((option) => {
        const btn = document.createElement("button");
        btn.className = "cute-btn";
        btn.textContent = option.label;

        btn.onclick = () => {
            optionsEl.style.display = "none";
            revealEl.textContent = option.reveal;
            revealEl.classList.remove("hidden");
            nextBtn.classList.remove("hidden");
        };

        optionsEl.appendChild(btn);
    });
}

function goToNextMemory() {
    currentMemoryIndex++;

    document.getElementById("memoryNextBtn").classList.add("hidden");

    if (currentMemoryIndex < config.memories.length) {
        renderMemory(currentMemoryIndex);
    } else {
        showNextQuestion(6);
    }
}

function goBack() {
    // Case 1: We are inside memory flow
    if (currentQuestion === 3 && memoryHistory.length > 0) {
        currentMemoryIndex = memoryHistory.pop();
        renderMemory(currentMemoryIndex);
        return;
    }

    // Case 2: Go back to previous question
    if (historyStack.length === 0) return;

    const prev = historyStack.pop();

    currentQuestion = prev.question;
    currentMemoryIndex = prev.memoryIndex || 0;

    document.querySelectorAll(".question-section").forEach((q) => q.classList.add("hidden"));

    document.getElementById(`question${currentQuestion}`).classList.remove("hidden");

    if (currentQuestion === 3) {
        renderMemory(currentMemoryIndex);
    }

    toggleBackButton();
}

function toggleBackButton() {
    const backBtn = document.getElementById("backBtn");

    if (currentQuestion === 0) {
        backBtn.classList.add("hidden");
    } else {
        backBtn.classList.remove("hidden");
    }
}

let noClickCount = 0;

function handleNo() {
    const textEl = document.getElementById("noResponseText");
    const messages = config.finalNoResponses;
    const length = messages.length;

    textEl.classList.remove("hidden");

    textEl.textContent = messages[Math.min(noClickCount, length - 1)];

    noClickCount = (noClickCount + 1) % length;
}

// Function to move the "No" button when clicked
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = "fixed";
    button.style.left = x + "px";
    button.style.top = y + "px";
}

function attachDodgeBehavior(button) {
    const dodge = () => moveButton(button);

    button.addEventListener("mouseenter", dodge);
    button.addEventListener("click", dodge);
}

function decreaseButtonSize(button, step = 0.08, minScale = 0) {
    // Get current scale (default = 1)
    const currentScale = button.dataset.scale ? parseFloat(button.dataset.scale) : 1;

    // Calculate next scale
    const nextScale = Math.max(currentScale - step, minScale);

    // Save scale
    button.dataset.scale = nextScale;

    // Apply transform
    button.style.transform = `scale(${nextScale})`;
    button.style.transition = "transform 0.2s ease";
}

attachDodgeBehavior(document.getElementById("noBtn1"));
// attachDodgeBehavior(document.getElementById("noBtn3"));

// Love meter functionality
const loveMeter = document.getElementById("loveMeter");
const loveValue = document.getElementById("loveValue");
const extraLove = document.getElementById("extraLove");

function setInitialPosition() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = "100%";
}

loveMeter.addEventListener("input", () => {
    const value = parseInt(loveMeter.value);
    loveValue.textContent = value;

    if (value > 100) {
        extraLove.classList.remove("hidden");
        const overflowPercentage = (value - 100) / 9900;
        const extraWidth = overflowPercentage * window.innerWidth * 0.8;
        loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
        loveMeter.style.transition = "width 0.3s";

        // Show different messages based on the value
        if (value >= 5000) {
            extraLove.classList.add("super-love");
            extraLove.textContent = config.loveMessages.extreme;
        } else if (value > 1000) {
            extraLove.classList.remove("super-love");
            extraLove.textContent = config.loveMessages.high;
        } else {
            extraLove.classList.remove("super-love");
            extraLove.textContent = config.loveMessages.normal;
        }
    } else {
        extraLove.classList.add("hidden");
        extraLove.classList.remove("super-love");
        loveMeter.style.width = "100%";
    }
});

// Initialize love meter
window.addEventListener("DOMContentLoaded", setInitialPosition);
window.addEventListener("load", setInitialPosition);

// Celebration function
function celebrate() {
    document.querySelectorAll(".question-section").forEach((q) => q.classList.add("hidden"));
    document.getElementById("backBtn").classList.add("hidden");
    const celebration = document.getElementById("celebration");
    celebration.classList.remove("hidden");
    document.getElementById("celebrationTitle").textContent = config.celebration.title;
    document.getElementById("celebrationMessage").textContent = config.celebration.message;
    document.getElementById("celebrationEmojis").textContent = config.celebration.emojis;

    // Heart explosion first
    createHeartExplosion();

    // 🔊 Handle audio transition for celebration
    const bgMusic = document.getElementById("bgMusic");
    const celebrationAudio = document.getElementById("celebrationAudio");

    // Pause background music if playing
    if (bgMusic && !bgMusic.paused) {
        bgMusic.pause();
    }

    // Play celebration audio in loop at low volume
    if (celebrationAudio) {
        celebrationAudio.pause(); // safety reset
        celebrationAudio.currentTime = 0;
        celebrationAudio.loop = true;
        celebrationAudio.volume = 0.35; // low & warm (0.25–0.4 sweet spot)

        celebrationAudio.play().catch(() => {
            console.log("Celebration audio autoplay blocked");
        });
    }

    // Then show the teddy/kiss GIF after a short pause
    setTimeout(() => {
        document.getElementById("celebrationGifWrapper").classList.remove("hidden");
    }, 1800);
}

// Create heart explosion animation
function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement("div");
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = "heart";
        document.querySelector(".floating-elements").appendChild(heart);
        setRandomPosition(heart);
    }
}

// Music Player Setup
function setupMusicPlayer() {
    const musicControls = document.getElementById("musicControls");
    const musicToggle = document.getElementById("musicToggle");
    const bgMusic = document.getElementById("bgMusic");
    const musicSource = document.getElementById("musicSource");

    // Only show controls if music is enabled in config
    if (!config.music.enabled) {
        musicControls.style.display = "none";
        return;
    }

    // Set music source and volume
    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    // Try autoplay if enabled
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Toggle music on button click
    musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}
