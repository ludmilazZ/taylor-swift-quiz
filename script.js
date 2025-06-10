const questions = [
    {
        question: "What year was Taylor Swift born?",
        options: ["1987", "1988", "1989", "1990"],
        correct: 2
    },
    {
        question: "Which album features the song 'Shake It Off'?",
        options: ["Fearless", "Speak Now", "1989", "Red"],
        correct: 2
    },
    {
        question: "What was Taylor Swift's first album?",
        options: ["Fearless", "Taylor Swift", "Speak Now", "Red"],
        correct: 1
    },
    {
        question: "Which song won Taylor Swift her first Grammy for Song of the Year?",
        options: ["Love Story", "You Belong With Me", "Mean", "Blank Space"],
        correct: 2
    },
    {
        question: "What is the name of Taylor Swift's first cat?",
        options: ["Meredith", "Olivia", "Benjamin", "Dusty"],
        correct: 0
    },
    {
        question: "Which album features the song 'All Too Well'?",
        options: ["Speak Now", "Red", "1989", "Fearless"],
        correct: 1
    },
    {
        question: "What is the name of Taylor Swift's re-recorded version of 'Fearless'?",
        options: ["Fearless (Taylor's Version)", "Fearless (Re-recorded)", "Fearless (2021)", "Fearless (New Version)"],
        correct: 0
    },
    {
        question: "Which song features the lyrics 'I'm the problem, it's me'?",
        options: ["Anti-Hero", "Blank Space", "Look What You Made Me Do", "You Need To Calm Down"],
        correct: 0
    },
    {
        question: "What was Taylor Swift's first number one single on the Billboard Hot 100?",
        options: ["Love Story", "You Belong With Me", "We Are Never Ever Getting Back Together", "Shake It Off"],
        correct: 2
    },
    {
        question: "Which album features the song 'Lover'?",
        options: ["Reputation", "Lover", "Folklore", "Evermore"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let canAnswer = true;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreValue = document.getElementById('score-value');
const finalScore = document.getElementById('final-score');
const maxScore = document.getElementById('max-score');

// Initialize the quiz
function initQuiz() {
    currentQuestion = 0;
    score = 0;
    canAnswer = true;
    totalQuestionsSpan.textContent = questions.length;
    maxScore.textContent = questions.length;
    showQuestion();
}

// Show the current question
function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    currentQuestionSpan.textContent = currentQuestion + 1;
    scoreValue.textContent = score;

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    if (!canAnswer) return;
    canAnswer = false;

    const question = questions[currentQuestion];
    const options = optionsContainer.children;
    const selectedOption = options[selectedIndex];
    const correctOption = options[question.correct];

    if (selectedIndex === question.correct) {
        selectedOption.classList.add('correct');
        feedback.textContent = 'Correct! 🎉';
        feedback.className = 'correct';
        score++;
    } else {
        selectedOption.classList.add('incorrect');
        correctOption.classList.add('correct');
        feedback.textContent = 'Incorrect! The correct answer was: ' + question.options[question.correct];
        feedback.className = 'incorrect';
    }

    feedback.classList.remove('hidden');
    scoreValue.textContent = score;

    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            canAnswer = true;
            feedback.classList.add('hidden');
            showQuestion();
        } else {
            showEndScreen();
        }
    }, 2000);
}

// Show end screen
function showEndScreen() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalScore.textContent = score;
}

// Event Listeners
startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    initQuiz();
});

restartBtn.addEventListener('click', () => {
    endScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    initQuiz();
}); 