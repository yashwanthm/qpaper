import React, { useState, Fragment } from "react";
import "./App.css";
import Paper from "./models/paper";
import ErrorBoundary from "./errorBoundary";
import { Button, InputNumber, Row, Col, Card } from "antd";
import {difficulties} from './models/globals'
function App() {
  const [paper, setPaper] = useState([]);
  const [marks, setMarks] = useState(100);
  const [difficultyWheitage, setDifficultyWheitage] = useState(()=>{
    let s = {};
     difficulties.map(k=>{
      s[k] = null;
    })
    return s;
  });
  const getDifficultyError = (difficultyWheitage) => {
    let total = 0;
    Object.keys(difficultyWheitage).map(k => {
      total = total + difficultyWheitage[k];
    });
    console.log("total is ", total);
    if (total != 100) {
      return `Please make sure that the total wheitage sums up to exactly 100`
      
    }
    return null
  }
  const [errorMessage, setError] = useState(getDifficultyError(difficultyWheitage));
  const generatePaper = paperOpts => {
    let paper = [];
    try {
      paper = new Paper(paperOpts).create();
      setError();
    } catch (err) {
      console.log('msg', err.message);
      
      setError(err.message);
    }
    setPaper(paper);
  };

  

  const changeDifficultyWheitage = (type, val) => {
    console.log(val, type);
    let nextDifficultyWheitage = Object.assign({}, difficultyWheitage);
    nextDifficultyWheitage[type] = val;
    setDifficultyWheitage(nextDifficultyWheitage);
    setError(getDifficultyError(nextDifficultyWheitage));
  };

  

  // const renderTotalError = difficultyWheitage => {

  // };

  return (
    <div className="App">
      <ErrorBoundary>
        <h1>Question Paper Generator</h1>
        <p>Generates a random library of questions and selects questions to match the criterion from the paper as per your inputs of score and difficulties</p>
        <Row>
          <Col span={5}>
            <div>
            <span>Total Marks for the Paper</span>
            <InputNumber
              placeholder="Marks"
              value={marks}
              onChange={val => {
                setMarks(val);
              }}
            />
            </div>
            
            {Object.keys(difficultyWheitage).map(k => {
              return (
                <div>
                    <span>% of {k} questions</span>
                    <InputNumber
                      key={k}
                      placeholder={`% of ${k} questions to be in the paper`}
                      // parser={value => value.replace("%", "")}
                      min={0}
                      max={100}
                      // formatter={value => `${value}%`}
                      value={difficultyWheitage[k]}
                      onChange={value => {
                        // console.log(k, value);
                        changeDifficultyWheitage(k, value);
                      }}
                    />
                </div>
              );
            })}
            {errorMessage ? <p>{errorMessage}</p> : null}
            <Button
              block={true}
              type="primary"
              onClick={e => {
                let paperOpts = {
                  marks,
                  difficultyWheitage
                };
                generatePaper(paperOpts);
              }}
            >
              Generate Paper
            </Button>
          </Col>
          <Col span={7}>
            {
              paper.map(p=>{
                return <Card style={{alignItems: 'center'}}>
                  {Object.keys(p).map(k=>{
                  return <div>{k} - {p[k]} </div>
                  })}
                </Card>
              })
            }
          </Col>
        </Row>
      </ErrorBoundary>
    </div>
  );
}

export default App;
