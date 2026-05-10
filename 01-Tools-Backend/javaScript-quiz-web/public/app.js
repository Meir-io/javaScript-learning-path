const questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Creative Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which built-in method adds one or more elements to the end of an array and returns the new length of the array?",
        answers: [
            { text: "last()", correct: false },
            { text: "put()", correct: false },
            { text: "push()", correct: true },
            { text: "None of the above", correct: false }
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "msgBox('Hello World');", correct: false },
            { text: "alertBox('Hello World');", correct: false },
            { text: "msg('Hello World');", correct: false },
            { text: "alert('Hello World');", correct: true }
        ]
    },
    {
        question: "Which of the following is not a reserved word in JavaScript?",
        answers: [
            { text: "interface", correct: false },
            { text: "throws", correct: false },
            { text: "program", correct: true },
            { text: "short", correct: false }
        ]
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
            { text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", correct: false },
            { text: "var colors = ['red', 'green', 'blue']", correct: true },
            { text: "var colors = 'red', 'green', 'blue'", correct: false },
            { text: "var colors = (1:'red', 2:'green', 3:'blue')", correct: false }
        ]
    }
];

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const currentQuestionNumElement = document.getElementById('current-question-num');
const totalQuestionsElement = document.getElementById('total-questions');
const progressBar = document.getElementById('progress-bar');

const timeLeftElement = document.getElementById('time-left');
const timerContainer = document.querySelector('.timer');
const scoreElement = document.getElementById('score');
const totalScoreElement = document.getElementById('total-score');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

// Initialize
totalQuestionsElement.innerText = questions.length;
totalScoreElement.innerText = questions.length;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startScreen.classList.remove('active');
    startScreen.classList.add('hide');
    resultScreen.classList.remove('active');
    resultScreen.classList.add('hide');
    
    // Tiny delay for smooth transitions 
    setTimeout(() => {
        quizScreen.classList.remove('hide');
        quizScreen.classList.add('active');
    }, 100);

    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
    updateProgress();
}

function showQuestion(question) {
    currentQuestionNumElement.innerText = currentQuestionIndex + 1;
    questionText.innerText = question.question;
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        // Stagger animation effect
        button.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
        button.style.opacity = '0';
        button.style.transform = 'translateX(-20px)';
        
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearInterval(timer);
    timeLeft = 15;
    updateTimerDisplay();
    timerContainer.classList.remove('warning');
    
    nextBtn.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    clearInterval(timer);
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    // Reveal correct answer and disable all buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    if (questions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    } else {
        setTimeout(showResult, 1000);
    }
}

function startTimer() {
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 5) {
            timerContainer.classList.add('warning');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

function updateTimerDisplay() {
    timeLeftElement.innerText = `${timeLeft}s`;
}

function handleTimeOut() {
    // Disable all buttons and show correct answer
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    
    if (questions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide');
    } else {
        setTimeout(showResult, 1500);
    }
}

function updateProgress() {
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function showResult() {
    quizScreen.classList.remove('active');
    quizScreen.classList.add('hide');
    
    setTimeout(() => {
        resultScreen.classList.remove('hide');
        resultScreen.classList.add('active');
        
        scoreElement.innerText = score;
        
        // Update conic gradient based on score
        const percentage = (score / questions.length) * 100;
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.background = `conic-gradient(#a78bfa ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%)`;
    }, 100);
}

// Add animation keyframes via JS for dynamic button insertion
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
