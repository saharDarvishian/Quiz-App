const formatData = (data) => {
    const results = data.map((item) => {
      const questionObject = { question: item.question };
      const answers = [...item.incorrect_answers];
      const correctRandomIndex = Math.floor(Math.random() * 4);
      answers.splice(correctRandomIndex, 0, item.correct_answer);
      questionObject.answers = answers;
      questionObject.correctIndex = correctRandomIndex;
      return questionObject;
    });
    return results;
  };
  

export default formatData;
