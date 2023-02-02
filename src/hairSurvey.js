import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import jsonData from "./data/recommendItem.json";
import filteredData from "./data/itemList.json";


const mappedjsondata = jsonData.recommendedItem.map((item) => {
  const item1info = filteredData.itemList.find((item2) => item2.FullProductName === item.recItem1)
  const item2info = filteredData.itemList.find((item2) => item2.FullProductName === item.recItem2)
  const item3info = filteredData.itemList.find((item2) => item2.FullProductName === item.recItem3)
  return {
    patternID: item.patternID,
    scalpType: item.scalpType,
    damageType:item.damageType,
    hairType: item.hairType,
    finishType: item.finishType,
    recItem1: item.recItem1,
    recItem1info: item1info || {},
    recItem2: item.recItem2,
    recItem2info: item2info || {},
    recItem3: item.recItem3,
    recItem3info : item3info || {},
}
});
console.log(mappedjsondata);
// console.log(filteredData.itemList[8].FullProductName);

// console.log(jsonData.recommendedItem[0].recItem1);

// if(filteredData.itemList[8].FullProductName === jsonData.recommendedItem[0].recItem1) {
//   console.log(filteredData.itemList[8].FullProductName,":",filteredData.itemList[8].itemDescription);
// } 

// var itemListNum = filteredData.itemList.length - 1
// console.log(itemListNum);

// for(let i=0; i < itemListNum )

var uuid = require("uuid");

const firebaseConfig = {
  apiKey: "AIzaSyAsYmPysRFDNKTT6jwG9LsoegFs3e9sEMU",
  authDomain: "hair-survey-app.firebaseapp.com",
  projectId: "hair-survey-app",
  storageBucket: "hair-survey-app.appspot.com",
  messagingSenderId: "526490795482",
  appId: "1:526490795482:web:26163607e7c57ac99854e3",
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
    event.preventDefault();
    const doc = await addDoc(collection(db, "responses"), {
      uid: this.state.uid,
      studentName: this.state.studentName,
      answers: this.state.answers,
    });

    console.log("new document added: ", doc.id);
    
    const filteredItems = mappedjsondata.filter((item) => {
      const { ans1, ans2, ans3, ans4 } = this.state.answers;
      const { scalpType, damageType, hairType, finishType } = item;

      if (
        ans1 === scalpType &&
        ans2 === damageType &&
        ans3 === hairType &&
        ans4 === finishType
      ) {
        return true;
      }
    });

    // const getItem = filteredData.itemList.map(product => {

    //   var productList = [];
    //   const { FullProductName } = product
    //   const { recItem1, rectItem2, recItem3 } = product
    //   productList.push(product)

    // })

    console.log(mappedjsondata.length, filteredItems.length);

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
    var result = "";

    if (this.state.studentName === "" && this.state.isSubmitted === false) {
      name = (
        <div className="top">
          <div className="intro">
            <h1>
              <img src={images["logo02.svg"]} alt="KEVIN.MURPHY" />
            </h1>
            <h2>ヘアケア診断</h2>
            <p>お客様の悩みに合う商品をお勧めします。</p>
            <h4>名前を入力してください。</h4>
            <form onSubmit={this.studentNameSubmit}>
              <input
                className="sName"
                type="text"
                placeholder="名前を入力"
                ref="name"
              />
            </form>
          </div>
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
                    id="m"
                  />
                  <label for="m">
                    <img alt="KEVIN.MURPHY" src={images["scalpNormal.png"]} />
                  </label>
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans1"
                    value="dry"
                    onChange={this.answerSelected}
                    id="l"
                  />
                  <label for="l">
                    <img alt="KEVIN.MURPHY" src={images["scalpDry.png"]} />
                  </label>
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans1"
                    value="oily"
                    onChange={this.answerSelected}
                    id="k"
                  />
                  <label for="k">
                    <img alt="KEVIN.MURPHY" src={images["scalpOily.png"]} />
                  </label>
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
                    id="j"
                  />
                  <label for="j">
                    <img alt="KEVIN.MURPHY" src={images["img004-low.png"]} />
                  </label>
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans2"
                    value="middle"
                    onChange={this.answerSelected}
                    id="i"
                  />
                  <label for="i">
                    <img alt="KEVIN.MURPHY" src={images["img005-middle.png"]} />
                  </label>
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans2"
                    value="high"
                    onChange={this.answerSelected}
                    id="h"
                  />
                  <label for="h">
                    <img alt="KEVIN.MURPHY" src={images["img006-high.png"]} />
                  </label>
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
                    id="g"
                  />
                  <label for="g">
                    クセ毛
                    <img alt="KEVIN.MURPHY" src={images["img007-curly.png"]} />
                  </label>
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans3"
                    value="thin"
                    onChange={this.answerSelected}
                    id="f"
                  />
                  <label for="f">
                    細・軟
                    <img alt="KEVIN.MURPHY" src={images["img008-thin.png"]} />
                  </label>
                </div>
                <div className="answer">
                  <input
                    type="radio"
                    name="ans3"
                    value="hard"
                    onChange={this.answerSelected}
                    id="e"
                  />
                  <label for="e">
                    硬・多
                    <img alt="KEVIN.MURPHY" src={images["img009-thick.png"]} />
                  </label>
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
                    id="a"
                  />
                  <label for="a">頭皮ケア</label>
                </div>
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="touch"
                    onChange={this.answerSelected}
                    id="b"
                  />
                  <label for="b">質感重視</label>
                </div>
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="style"
                    onChange={this.answerSelected}
                    id="c"
                  />
                  <label for="c">スタイル</label>
                </div>
                <div className="answer last">
                  <input
                    type="radio"
                    name="ans4"
                    value="damage"
                    onChange={this.answerSelected}
                    id="d"
                  />
                  <label for="d">ダメージケア</label>
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
          <div className="list">
            <div className="successful">
              <h3>完了</h3>

              <p>
                ありがとうございます。<br></br>
                こちらがお勧め商品となります。
              </p>
            </div>
            {this.state.filteredItems.map((item) => (
              <div className="itemList" key={item.patternID}>
                <div className="item">
                  <h4>{item.recItem1}</h4>
                  <div className="item-image">
                    <div className="overlay">
                      <div className="description">
                        {item.recItem1info.itemDescription}
                      </div>
                    </div>
                    <img src={item.recItem1info.itemImage} alt="KEVIN.MURPHY" />
                  </div>
                </div>
                <div className="item">
                  <h4>{item.recItem2}</h4>
                  <div className="item-image">
                    <div className="overlay">
                      <div className="description">
                      {item.recItem2info.itemDescription}
                      </div>
                    </div>
                    <img src={item.recItem2info.itemImage} alt="KEVIN.MURPHY" />
                  </div>
                </div>
                <div className="item">
                  <h4>{item.recItem3}</h4>
                  <div className="item-image">
                    <div className="overlay">
                      <div className="description">
                      {item.recItem3info.itemDescription}
                      </div>
                    </div>
                    <img src={item.recItem3info.itemImage} alt="KEVIN.MURPHY" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
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
