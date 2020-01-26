import Questions from "./questions";
class Paper {
  constructor(data) {
    const { marks, difficultyWheitage } = data;
    this.marks = marks;
    this.difficultyWheitage = difficultyWheitage;
    this.questions = new Questions().createQuestions();
    console.log(this);
  }
  findQuestionsByDifficulty(difficulty) {
    return this.questions.filter(q => q.difficulty === difficulty);
  }
  selectQuestions(difficulty, marks) {
    let questionsSubset = this.findQuestionsByDifficulty(difficulty);
    let marksCounter = 0;
    let selectedQuestions = [];
    for (let i = 0; marksCounter < marks; i++) {
      marksCounter += questionsSubset[i].marks;
      if (marksCounter + questionsSubset[i] > marks) {
        continue;
      } else {
        selectedQuestions.push(questionsSubset[i]);
      }
    }
    let s = 0;
    for (let i = 0; i < selectedQuestions.length; i++) {
      s = s + selectedQuestions[i].marks;
    }
    if (s !== marks) {
      throw new Error(
        `Not enough questions in ${difficulty} to make the paper.`
      );
    } else {
      return selectedQuestions;
    }
  }
  create() {
    const { marks, difficultyWheitage } = this;
    let marksWheitage = {};
    let selectedQuestions = {};
    Object.keys(difficultyWheitage).map(d => {
      marksWheitage[d] = (marks * difficultyWheitage[d]) / 100;
      try {
        selectedQuestions[d] = this.selectQuestions(d, marksWheitage[d]);
      } catch (err) {
       throw new Error(err.message);
      }
    });
       console.log('asda', marksWheitage);
    let totalCounter = 0;
    let questionPaper = [];
    Object.keys(selectedQuestions).map(d => {
      let m = 0;
      selectedQuestions[d].map(q => {
        m = m + q.marks;
        totalCounter = totalCounter + q.marks;
        questionPaper.push(q);
      });
    });
    console.log(totalCounter, marks);
    if (totalCounter !== marks) {
      // return console.log(`Unable to generate paper as per your requirements`);
      throw new Error(`Unable to generate paper as per your requirements`);
    } else {
      return questionPaper;
    }
  }
}
export default Paper;
