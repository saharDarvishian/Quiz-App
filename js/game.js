import formatData from "./helper.js";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerText = document.querySelectorAll(".answer-text");

const URL =
  "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple";
let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;

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
  const { question, answers, correctIndex } = formatedData[questionIndex];
  questionText.innerText = question;
  correctAnswer = correctIndex;
  console.log(correctAnswer);
  answers.forEach((answer, index) => {
    answerText[index].innerText = answer;
  });
};

const showAnswer = (event, index) => {
  const result = index === correctAnswer ? true : false;
  if (result) {
    event.target.classList.add("correct");
  } else {
    event.target.classList.add("incorrect");
    answerText[correctAnswer].classList.add("correct");
  }
};

window.addEventListener("load", fetchData);

answerText.forEach((button, index) => {
  button.addEventListener("click", (event) => showAnswer(event, index));
});
