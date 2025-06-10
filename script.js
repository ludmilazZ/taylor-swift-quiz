const questions = [
    {
        question: "Em que ano Taylor Swift nasceu?",
        options: ["1987", "1988", "1989", "1990"],
        correct: 2
    },
    {
        question: "Em qual álbum está a música 'Shake It Off'?",
        options: ["Fearless", "Speak Now", "1989", "Red"],
        correct: 2
    },
    {
        question: "Qual foi o primeiro álbum da Taylor Swift?",
        options: ["Fearless", "Taylor Swift", "Speak Now", "Red"],
        correct: 1
    },
    {
        question: "Qual música ganhou o primeiro Grammy da Taylor Swift para Música do Ano?",
        options: ["Love Story", "You Belong With Me", "Mean", "Blank Space"],
        correct: 2
    },
    {
        question: "Qual é o nome do primeiro gato da Taylor Swift?",
        options: ["Meredith", "Olivia", "Benjamin", "Dusty"],
        correct: 0
    },
    {
        question: "Em qual álbum está a música 'All Too Well'?",
        options: ["Speak Now", "Red", "1989", "Fearless"],
        correct: 1
    },
    {
        question: "Qual é o nome da versão regravada do álbum 'Fearless' pela Taylor Swift?",
        options: ["Fearless (Taylor's Version)", "Fearless (Re-recorded)", "Fearless (2021)", "Fearless (New Version)"],
        correct: 0
    },
    {
        question: "Em qual música aparece a letra 'I'm the problem, it's me'?",
        options: ["Anti-Hero", "Blank Space", "Look What You Made Me Do", "You Need To Calm Down"],
        correct: 0
    },
    {
        question: "Qual foi o primeiro single número um da Taylor Swift na Billboard Hot 100?",
        options: ["Love Story", "You Belong With Me", "We Are Never Ever Getting Back Together", "Shake It Off"],
        correct: 2
    },
    {
        question: "Em qual álbum está a música 'Lover'?",
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
        feedback.textContent = 'Correto! 🎉';
        feedback.className = 'correct';
        score++;
    } else {
        selectedOption.classList.add('incorrect');
        correctOption.classList.add('correct');
        feedback.textContent = 'Incorreto! A resposta correta era: ' + question.options[question.correct];
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