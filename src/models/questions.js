import {topics, difficulties, subjects} from './globals';
class Questions {
    getTopic(){
      return topics[Math.floor(Math.random()*topics.length)];
    }
    getDifficulty(){
      return difficulties[Math.floor(Math.random()*difficulties.length)];
    }
    getSubject(){
      return subjects[Math.floor(Math.random()*subjects.length)]
    }
    getText(i){
      return `Question text ${i}`;
    }
    getMarks(){
      return 10 + (Math.random() > 0.5 ? 5 : 0);
    }
    createQuestions(){
      let tmpQuestions = [];
      for(var i=0; i<100; i++){
        tmpQuestions.push({
          text: this.getText(i),
          subject: this.getSubject(),
          topic: this.getTopic(),
          difficulty: this.getDifficulty(),
          marks: this.getMarks()
        });
      }
      return tmpQuestions;
    }
  }
export default Questions;