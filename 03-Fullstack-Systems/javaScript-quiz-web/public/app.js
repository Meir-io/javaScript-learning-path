

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

let questions = [];

fetch('/api/questions')
  .then(res => res.json())
  .then(data => {
    questions = data;
    totalQuestionsElement.innerText = questions.length;
    totalScoreElement.innerText = questions.length;
  })
  .catch(err => console.error('Failed to load questions:', err));

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
        const percentage = (score / questions.length) * 100;
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.background = `conic-gradient(#a78bfa ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%)`;
    }, 100);
}

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
