// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Juhi",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Will You Be My Valentine? 💖",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ["❤️", "💖", "💝", "💗", "💓"], // Heart emojis
        bears: ["🧸", "🐻"], // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Do you like me?", // First interaction
            yesBtn: "Yes", // Text for "Yes" button
            noBtn: "No", // Text for "No" button
            secretAnswer: "I don't like you, I love you! ❤️", // Secret hover message
        },
        second: {
            text: "How much do you love me?", // For the love meter
            startText: "This much!", // Text before the percentage
            nextBtn: "Next ❤️", // Text for the next button
        },
        third: {
            text: "Will you be my Valentine on February 14th, 2026? 🌹", // The big question!
            yesBtn: "Yes!", // Text for "Yes" button
            noBtn: "No", // Text for "No" button
        },
    },

    intro: {
        title: "Hey Juhuuuuuuuuu 💖",
        text: "I wanted to do something a little special for you. It’s small, a little silly, and very us. Just something to remind you how much you mean to me.\nAlso, yes, I may have absolutely overthought this.",
        button: "Start ❤️",
    },

    transition: {
        title: "Okay… now let’s have some fun 😌",
        text: "I’ve got a few little questions for you.",
        button: "I’m ready ❤️",
    },

    // memories: [
    //     {
    //         question: "Where did we first meet?",
    //     },
    //     {
    //         question: "Who fell first? 😏",
    //     },
    //     {
    //         question: "What’s my favorite thing about you?",
    //     },
    // ],

    memories: [
        {
            question: "Who fell first?",
            options: [
                {
                    label: "Me",
                    reveal: 'Let\'s face it, you had me at "Hey" 🫠',
                },
                {
                    label: "You",
                    reveal: "Of course, Duhhh 💅",
                },
            ],
        },
        {
            question: "What was the most messed-up thing ever happened to us?",
            options: [
                {
                    label: "Getting caught by police on our 3rd month anniversary.",
                    reveal: "Still can’t believe we handled that the way we did. I had it under control though 😭❤️",
                },
                {
                    label: "When aunty unexpectedly found out about us.",
                    reveal: "That was genuinely one of the worst things that could have happened - especially right before Navratri 😭",
                },
                {
                    label: "When my parents showed up at my house out of nowhere.",
                    reveal: "My soul genuinely left my body that day 😭",
                },
                {
                    label: "When we had to drop our BentoB plan because of ... circumstances (iykyk).",
                    reveal: "Hats off to how you handled it. (It was fun though 🙈🤭)",
                },
            ],
        },
        {
            question: "What do I love the most about you?",
            options: [
                {
                    label: "Your smile",
                    reveal: 'Actually the correct answer is Your Smile, Your Eyes, Your Hair, Your Heart, Your Hands, Your Voice, Your Lips, Your Touch, Your Soul, Your Skin, Your "tane khbr che?", Your Laugh, Your Sillyness, Your Presence, Your Warmth, Your Hugs, AND EVERYTHING ELSE 😤❤️',
                },
                {
                    label: "Your eyes",
                    reveal: 'Actually the correct answer is Your Smile, Your Eyes, Your Hair, Your Heart, Your Hands, Your Voice, Your Lips, Your Touch, Your Soul, Your Skin, Your "tane khbr che?", Your Laugh, Your Sillyness, Your Presence, Your Warmth, Your Hugs, AND EVERYTHING ELSE 😤❤️',
                },
                {
                    label: "Your hair",
                    reveal: 'Actually the correct answer is Your Smile, Your Eyes, Your Hair, Your Heart, Your Hands, Your Voice, Your Lips, Your Touch, Your Soul, Your Skin, Your "tane khbr che?", Your Laugh, Your Sillyness, Your Presence, Your Warmth, Your Hugs, AND EVERYTHING ELSE 😤❤️',
                },
            ],
        },
    ],

    letter: {
        title: "Just a few things I want to say…",
        text: "WRITE YOUR 200–300 WORDS HERE",
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝", // Shows when they go past 5000%
        high: "To infinity and beyond! 🚀💝", // Shows when they go past 1000%
        normal: "And beyond! 🥰", // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Yay! I'm the luckiest person in the world! 🎉💝💖💝💓",
        message: "Now come get your gift, a big warm hug and a huge kiss!",
        emojis: "🎁💖🤗💝💋❤️💕", // These will bounce around
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#ffafbd", // Gradient start (try pastel colors for a soft look)
        backgroundEnd: "#ffc3a0", // Gradient end (should complement backgroundStart)
        buttonBackground: "#ff6b6b", // Button color (should stand out against the background)
        buttonHover: "#ff8787", // Button hover color (slightly lighter than buttonBackground)
        textColor: "#ff4757", // Text color (make sure it's readable!)
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    animations: {
        floatDuration: "15s", // How long it takes hearts to float up (10-20s recommended)
        floatDistance: "50px", // How far hearts move sideways (30-70px recommended)
        bounceSpeed: "0.5s", // Speed of bouncing animations (0.3-0.7s recommended)
        heartExplosionSize: 1.5, // Size of heart explosion effect (1.2-2.0 recommended)
    },

    // Background Music (Optional)
    // Add your own music URL after getting proper licenses
    music: {
        enabled: true, // Music feature is enabled
        autoplay: true, // Try to autoplay (note: some browsers may block this)
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3", // Music streaming URL
        startText: "🎵 Play Music", // Button text to start music
        stopText: "🔇 Stop Music", // Button text to stop music
        volume: 0.5, // Volume level (0.0 to 1.0)
    },
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG;
