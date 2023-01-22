import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

var uuid = require("uuid");

const firebaseConfig = {
  apiKey: "AIzaSyAsYmPysRFDNKTT6jwG9LsoegFs3e9sEMU",
  authDomain: "hair-survey-app.firebaseapp.com",
  projectId: "hair-survey-app",
  storageBucket: "hair-survey-app.appspot.com",
  messagingSenderId: "526490795482",
  appId: "1:526490795482:web:26163607e7c57ac99854e3"
};

const app = initializeApp(firebaseConfig);
//   export
export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(app);

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(require.context("./img", false, /\.(png|jpe?g|svg)$/));

class HairSurvey extends Component {
  studentNameSubmit(event) {
    var name = this.refs.name.value;
    this.setState({ studentName: name }, function () {
      console.log(this.state);
    });
  }

  async surveySubmit(event) {
    event.preventDefault()
    const doc = await addDoc(collection(db, 'responses'),{
        uid: this.state.uid,
        studentName: this.state.studentName,
        answers: this.state.answers
    });

    console.log("new document added: ", doc.id)

    this.setState({ isSubmitted: true });
  }

  answerSelected(event) {
    var answers = this.state.answers;

    if (event.target.name === "ans1") {
      answers.ans1 = event.target.value;
    } else if (event.target.name === "ans2") {
      answers.ans2 = event.target.value;
    } else if (event.target.name === "ans3") {
      answers.ans3 = event.target.value;
    } else if (event.target.name === "ans4") {
      answers.ans4 = event.target.value;
    }
    this.setState({ answers: answers }, function () {
      console.log(this.state);
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: "",
      answers: {
        ans1: "",
        ans2: "",
        ans3: "",
        ans4: "",
        ans5: "",
      },
      isSubmitted: false,
    };
    this.studentNameSubmit = this.studentNameSubmit.bind(this);
    this.surveySubmit = this.surveySubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
  }

  render() {
    // jan.11th
    var name = "";
    var questions = "";
    var result = ""

    if (this.state.studentName === "" && this.state.isSubmitted === false) {
      name = (
        <div className="top">
          <h2>Enter Name</h2>
          <form onSubmit={this.studentNameSubmit}>
            <input
              className="sName"
              type="text"
              placeholder="名前を入力"
              ref="name"
            />
          </form>
        </div>
      );
    } else if (
      this.state.studentName !== "" &&
      this.state.isSubmitted === false
    ) {
      name = (
        <div>
          <h2>Hello {this.state.studentName}, please answer the questionnaire.</h2>
        </div>
      );
      questions = (
        <div>
          <h2>下記の質問に答えてください。</h2>
          <form onSubmit={this.surveySubmit}>
            <div className="card">
              <label>Choose the status.</label>
              <br />
              <div className="answer-row">
                <div className="answer">
                  <input
                    type="radio"
                    name="ans1"
                    value="normal"
                    onChange={this.answerSelected}
                  />
                  <img alt="KEVIN.MURPHY" src={images["scalpNormal.png"]} />
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans1"
                    value="dry"
                    onChange={this.answerSelected}
                  />
                  <img alt="KEVIN.MURPHY" src={images["scalpDry.png"]} />
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans1"
                    value="oily"
                    onChange={this.answerSelected}
                  />
                  <img alt="KEVIN.MURPHY" src={images["scalpOily.png"]} />
                </div>
              </div>
            </div>
            <div className="card">
              <label>Type of Damage</label>
              <br />
              <div className="answer-row">
                <div className="answer">
                  <input
                    type="radio"
                    name="ans2"
                    value="low"
                    onChange={this.answerSelected}
                  />
                  <img alt="KEVIN.MURPHY" src={images["img004-low.png"]} />
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans2"
                    value="middle"
                    onChange={this.answerSelected}
                  />
                  <img alt="KEVIN.MURPHY" src={images["img005-middle.png"]} />
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans2"
                    value="high"
                    onChange={this.answerSelected}
                  />
                  <img alt="KEVIN.MURPHY" src={images["img006-high.png"]} />
                </div>
              </div>
            </div>
            <div className="card">
              <label>HAIR TYPE</label>
              <br />
              <div className="answer-row">
                <div className="answer">
                  <input
                    type="radio"
                    name="ans3"
                    value="curly"
                    onChange={this.answerSelected}
                  />
                  クセ毛
                  <img alt="KEVIN.MURPHY" src={images["img007-curly.png"]} />
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans3"
                    value="dry"
                    onChange={this.answerSelected}
                  />
                  細・軟
                  <img alt="KEVIN.MURPHY" src={images["img008-thin.png"]} />
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans3"
                    value="oily"
                    onChange={this.answerSelected}
                  />
                  硬・多
                  <img alt="KEVIN.MURPHY" src={images["img009-thick.png"]} />
                </div>
              </div>
            </div>
            <div className="card">
              <label>FINISH</label>
              <br />
              <div className="answer-row">
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="scalp"
                    onChange={this.answerSelected}
                  />
                  Scalp
                </div>
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="finish"
                    onChange={this.answerSelected}
                  />
                  Feel
                </div>
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="style"
                    onChange={this.answerSelected}
                  />
                  Style
                </div>
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="damage"
                    onChange={this.answerSelected}
                  />
                  Damaged Hair Care
                </div>
              </div>
            </div>

            <input className="feedback-button" type="submit" value="回答する" />
          </form>
        </div>
      );
    }

    if (this.state.isSubmitted) {
      result = (<div>
        <div> answer 1 - {this.state.answers.ans1}</div>
        <div> answer 2 -  {this.state.answers.ans2}</div>
        <div> answer 3 - {this.state.answers.ans3}</div>
        <div> answer 4 - {this.state.answers.ans4}</div>
      </div>)
    }

    return (
      <div>
        {name}
        
        {questions}
        {result}
      </div>
    );
  }
}

export default HairSurvey;