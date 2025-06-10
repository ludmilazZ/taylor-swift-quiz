from flask import Flask, render_template, jsonify, request, session
import random

app = Flask(__name__)
app.secret_key = 'taylor_swift_quiz_secret_key'  # Required for session

# Quiz questions
QUESTIONS = [
    {
        "question": "What year was Taylor Swift born?",
        "options": ["1987", "1988", "1989", "1990"],
        "correct": 2
    },
    {
        "question": "Which album features the song 'Shake It Off'?",
        "options": ["Fearless", "Speak Now", "1989", "Red"],
        "correct": 2
    },
    {
        "question": "What was Taylor Swift's first album?",
        "options": ["Fearless", "Taylor Swift", "Speak Now", "Red"],
        "correct": 1
    },
    {
        "question": "Which song won Taylor Swift her first Grammy for Song of the Year?",
        "options": ["Love Story", "You Belong With Me", "Mean", "Blank Space"],
        "correct": 2
    },
    {
        "question": "What is the name of Taylor Swift's first cat?",
        "options": ["Meredith", "Olivia", "Benjamin", "Dusty"],
        "correct": 0
    },
    {
        "question": "Which album features the song 'All Too Well'?",
        "options": ["Speak Now", "Red", "1989", "Fearless"],
        "correct": 1
    },
    {
        "question": "What is the name of Taylor Swift's re-recorded version of 'Fearless'?",
        "options": ["Fearless (Taylor's Version)", "Fearless (Re-recorded)", "Fearless (2021)", "Fearless (New Version)"],
        "correct": 0
    },
    {
        "question": "Which song features the lyrics 'I'm the problem, it's me'?",
        "options": ["Anti-Hero", "Blank Space", "Look What You Made Me Do", "You Need To Calm Down"],
        "correct": 0
    },
    {
        "question": "What was Taylor Swift's first number one single on the Billboard Hot 100?",
        "options": ["Love Story", "You Belong With Me", "We Are Never Ever Getting Back Together", "Shake It Off"],
        "correct": 2
    },
    {
        "question": "Which album features the song 'Lover'?",
        "options": ["Reputation", "Lover", "Folklore", "Evermore"],
        "correct": 1
    }
]

@app.route('/')
def index():
    # Initialize or reset session
    session['score'] = 0
    session['current_question'] = 0
    return render_template('index.html')

@app.route('/api/question')
def get_question():
    current_question = session.get('current_question', 0)
    if current_question >= len(QUESTIONS):
        return jsonify({'game_over': True})
    
    question = QUESTIONS[current_question]
    return jsonify({
        'question': question['question'],
        'options': question['options'],
        'current_question': current_question + 1,
        'total_questions': len(QUESTIONS),
        'score': session.get('score', 0)
    })

@app.route('/api/answer', methods=['POST'])
def check_answer():
    data = request.get_json()
    selected_option = data.get('selected_option')
    current_question = session.get('current_question', 0)
    
    if current_question >= len(QUESTIONS):
        return jsonify({'error': 'Game is over'})
    
    question = QUESTIONS[current_question]
    is_correct = selected_option == question['correct']
    
    if is_correct:
        session['score'] = session.get('score', 0) + 1
    
    session['current_question'] = current_question + 1
    
    return jsonify({
        'correct': is_correct,
        'correct_option': question['correct'],
        'score': session.get('score', 0),
        'game_over': current_question + 1 >= len(QUESTIONS)
    })

@app.route('/api/restart')
def restart():
    session['score'] = 0
    session['current_question'] = 0
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True) 