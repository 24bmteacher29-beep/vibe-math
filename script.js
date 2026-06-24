const quizData = [
  {
    question: "일차함수 y = 2x + 3에서 x = 4일 때 y의 값은?",
    choices: ["7", "9", "11", "12"],
    answer: "11"
  },
  {
    question: "일차함수 y = -x + 5에서 x = 2일 때 y의 값은?",
    choices: ["2", "3", "5", "7"],
    answer: "3"
  },
  {
    question: "기울기가 3이고 y절편이 1인 일차함수는?",
    choices: ["y = x + 3", "y = 3x + 1", "y = x - 3", "y = -3x + 1"],
    answer: "y = 3x + 1"
  },
  {
    question: "연립방정식 x + y = 7, x - y = 1의 해는?",
    choices: ["x=3, y=4", "x=4, y=3", "x=5, y=2", "x=2, y=5"],
    answer: "x=4, y=3"
  },
  {
    question: "3x + 2 = 11일 때 x의 값은?",
    choices: ["2", "3", "4", "5"],
    answer: "3"
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  answered = false;
  resultEl.textContent = "";

  const current = quizData[currentQuestion];

  questionNumber.textContent = `문제 ${currentQuestion + 1} / ${quizData.length}`;
  questionEl.textContent = current.question;
  choicesEl.innerHTML = "";

  current.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("choice-btn");

    button.addEventListener("click", () => checkAnswer(button, choice));

    choicesEl.appendChild(button);
  });
}

function checkAnswer(button, choice) {
  if (answered) return;

  answered = true;
  const correctAnswer = quizData[currentQuestion].answer;

  if (choice === correctAnswer) {
    button.classList.add("correct");
    resultEl.textContent = "정답입니다!";
    score++;
    scoreEl.textContent = score;
  } else {
    button.classList.add("wrong");
    resultEl.textContent = `오답입니다. 정답은 ${correctAnswer}입니다.`;

    const allButtons = document.querySelectorAll(".choice-btn");
    allButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
});

function showFinalResult() {
  questionNumber.textContent = "퀴즈 완료!";
  questionEl.textContent = `총 ${quizData.length}문제 중 ${score}문제를 맞혔습니다.`;
  choicesEl.innerHTML = "";
  resultEl.textContent = score >= 4 ? "훌륭합니다!" : "다시 한번 도전해 봅시다!";
  nextBtn.textContent = "처음부터 다시";
  
  nextBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = score;
    nextBtn.textContent = "다음 문제";
    nextBtn.onclick = null;
    location.reload();
  };
}

loadQuestion();
