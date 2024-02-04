import formatData from "./helper.js";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const questionNum = document.getElementById("question-number");
const nextButton = document.getElementById("next-button");

const CORRECT_BONUS = 10;
const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
  const result = await fetch(URL);
  const json = await result.json();
  formatedData = formatData(json.results);
  start();
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNum.innerText = ++questionIndex; 

  const { question, answers, correctIndex } = formatedData[questionIndex];
  questionText.innerText = question;
  correctAnswer = correctIndex;
  console.log(correctAnswer);
  answers.forEach((answer, index) => {
    answerList[index].innerText = answer;
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;

  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  questionIndex++;

  if (questionIndex < formatedData.length) {
    isAccepted = true;
    removeClasses();
    showQuestion();
  } else {
    console.log("finish");
  }
};

const removeClasses = () => {
  answerList.forEach((button) => (button.className = "answer-text"));
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
