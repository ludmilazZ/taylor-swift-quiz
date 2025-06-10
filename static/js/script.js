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
async function initQuiz() {
    canAnswer = true;
    await fetch('/api/restart');
    showQuestion();
}

// Show the current question
async function showQuestion() {
    try {
        const response = await fetch('/api/question');
        const data = await response.json();
        
        if (data.game_over) {
            showEndScreen();
            return;
        }

        questionText.textContent = data.question;
        optionsContainer.innerHTML = '';
        currentQuestionSpan.textContent = data.current_question;
        totalQuestionsSpan.textContent = data.total_questions;
        scoreValue.textContent = data.score;

        data.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(button);
        });
    } catch (error) {
        console.error('Error fetching question:', error);
    }
}

// Handle answer selection
async function selectAnswer(selectedIndex) {
    if (!canAnswer) return;
    canAnswer = false;

    try {
        const response = await fetch('/api/answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selected_option: selectedIndex })
        });
        
        const data = await response.json();
        const options = optionsContainer.children;
        const selectedOption = options[selectedIndex];
        const correctOption = options[data.correct_option];

        if (data.correct) {
            selectedOption.classList.add('correct');
            feedback.textContent = 'Correct! 🎉';
            feedback.className = 'correct';
        } else {
            selectedOption.classList.add('incorrect');
            correctOption.classList.add('correct');
            feedback.textContent = 'Incorrect! The correct answer was: ' + correctOption.textContent;
            feedback.className = 'incorrect';
        }

        feedback.classList.remove('hidden');
        scoreValue.textContent = data.score;

        setTimeout(() => {
            if (!data.game_over) {
                canAnswer = true;
                feedback.classList.add('hidden');
                showQuestion();
            } else {
                showEndScreen();
            }
        }, 2000);
    } catch (error) {
        console.error('Error submitting answer:', error);
    }
}

// Show end screen
async function showEndScreen() {
    try {
        const response = await fetch('/api/question');
        const data = await response.json();
        
        quizScreen.classList.add('hidden');
        endScreen.classList.remove('hidden');
        finalScore.textContent = data.score;
        maxScore.textContent = data.total_questions;
    } catch (error) {
        console.error('Error fetching final score:', error);
    }
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