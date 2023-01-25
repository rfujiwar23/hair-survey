import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import jsonData from "./data/recommendItem.json";

console.log(jsonData.recommendedItem.length)

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

    const filteredItems = jsonData.recommendedItem.filter(item => {
      const { ans1, ans2, ans3, ans4 } = this.state.answers;
      const { scalpType, damageType, hairType, finishType } = item

      if(ans1 === scalpType && ans2 === damageType && ans3 === hairType && ans4 === finishType) {
        return true
      }
    })

    console.log(jsonData.recommendedItem.length, filteredItems.length);

    this.setState({ isSubmitted: true, filteredItems });
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
          <h2>名前を入力してください。</h2>
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
          <h2> {this.state.studentName}様、</h2>
        </div>
      );
      questions = (
        <div className="question-list">
          <p>下記の質問に答えてください。</p>
          <form onSubmit={this.surveySubmit}>
            <div className="card">
              <label>頭皮</label>
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
                    value="ドライ"
                    onChange={this.answerSelected}
                  />
                  <img alt="KEVIN.MURPHY" src={images["scalpDry.png"]} />
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans1"
                    value="オイリー"
                    onChange={this.answerSelected}
                  />
                  <img alt="KEVIN.MURPHY" src={images["scalpOily.png"]} />
                </div>
              </div>
            </div>
            <div className="card">
              <label>ダメージ</label>
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
              <label>髪質</label>
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
                    value="thin"
                    onChange={this.answerSelected}
                  />
                  細・軟
                  <img alt="KEVIN.MURPHY" src={images["img008-thin.png"]} />
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans3"
                    value="hard"
                    onChange={this.answerSelected}
                  />
                  硬・多
                  <img alt="KEVIN.MURPHY" src={images["img009-thick.png"]} />
                </div>
              </div>
            </div>
            <div className="card">
              <label>仕上がり</label>
              <br />
              <div className="answer-row">
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="scalp"
                    onChange={this.answerSelected}
                  />
                  頭皮ケア
                </div>
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="touch"
                    onChange={this.answerSelected}
                  />
                  質感重視
                </div>
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="style"
                    onChange={this.answerSelected}
                  />
                  スタイル
                </div>
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="damage"
                    onChange={this.answerSelected}
                  />
                  ダメージケア
                </div>
              </div>
            </div>

            <input className="feedback-button" type="submit" value="回答する" />
          </form>
        </div>
      );
    }

    if (this.state.isSubmitted) {
        result = (
          <div className="survey-Answers">
            {this.state.filteredItems.map(item => (
              <div className="itemList" key={item.patternID}>
                <div className="item">
                  <h4>{item.recItem1}</h4>
                  <p>{item.recItem1description}</p>
                  <img src={item.recItem1img} alt="KEVIN.MURPHY"/>
                </div>
                <div className="item">
                  <h4>{item.recItem2}</h4>
                  <p>{item.recItem2description}</p>
                  <img src={item.recItem2img} alt="KEVIN.MURPHY"/>
                </div>
                <div className="item">
                  <h4>{item.recItem3}</h4>
                  <p>{item.recItem3description}</p>
                  <img src={item.recItem3img} alt="KEVIN.MURPHY"/>
                </div>
              </div>
            ))}
          </div>
        )
      
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
