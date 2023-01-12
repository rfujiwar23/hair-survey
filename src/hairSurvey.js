import React, {Component} from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
// import { getFirestore } from "firebase/firestore"
var uuid = require('uuid');


const firebaseConfig = {
    apiKey: "AIzaSyClJ_yvYw1GWvojRRYaKyg6fLHu2hUQdpU",
    authDomain: "about-hair-survey.firebaseapp.com",
    projectId: "about-hair-survey",
    storageBucket: "about-hair-survey.appspot.com",
    messagingSenderId: "47092076851",
    appId: "1:47092076851:web:aaf357bfccdb96ca296e46"
  };

  const app = initializeApp(firebaseConfig);
//   export
  export const auth = getAuth(app);

  export const googleAuthProvider = new GoogleAuthProvider();
//   const db = getFirestore(app);

class HairSurvey extends Component {

    studentNameSubmit(event) {
        var name = this.refs.name.value;
        this.setState({studentName : name}, function(){
            console.log(this.state);
        })
    };

    surveySubmit(event) {
        Firebase.database().ref('kevin-murphy-survey/' + this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });

        this.setState({isSubmitted: true})
    };

    answerSelected(event) {
        
        var answers = this.state.answers;

        if(event.target.name === "ans1") {
            answers.ans1 = event.target.value;
        }
        else if(event.target.name === "ans2") {
            answers.ans2 = event.target.value;
        }
        else if(event.target.name === "ans3") {
            answers.ans3 = event.target.value;
        }
        else if(event.target.name === "ans4") {
            answers.ans4 = event.target.value;
        }
        this.setState({answers:answers},function(){
            console.log(this.state);
        })
    };

    constructor(props){
        super(props);

        this.state = {
            uid: uuid.v1(),
            studentName: '',
            answers: {
                ans1: '',
                ans2: '',
                ans3: '',
                ans4: '',
                ans5: '',
            },
            isSubmitted: false
        }
        this.studentNameSubmit = this.studentNameSubmit.bind(this);
        this.surveySubmit = this.surveySubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
    }

    render() {

// jan.11th
        var name = '';
        var questions= '';

        if(this.state.studentName === '' && this.state.isSubmitted === false) {
            name = <div>
                <h2>名前を入力してください</h2>
                <form onSubmit={this.studentNameSubmit}>
                    <input className="sName" type="text" placeholder="名前を入力" ref="name"/>
                </form>
            </div>
        }
        else if(this.state.studentName !== '' && this.state.isSubmitted === false){
            name = <div>
                <h2>{this.state.studentName} 様, アンケートのご回答お願いします</h2>
            </div>;
            questions = <div>
                <h2>下記の質問に答えてください。</h2>
                <form onSubmit={this.surveySubmit}>
                    <div className="card">
                        <label>Choose the status.</label><br />
                        <input type="radio" name="ans1" value="ノーマル" onChange={this.answerSelected} />Normal
                        <input type="radio" name="ans1" value="ドライ" onChange={this.answerSelected} />Dry
                        <input type="radio" name="ans1" value="オイリー" onChange={this.answerSelected} />Oily
                    </div>
                    <div className="card">
                        <label>Type of Damage</label><br />
                        <input type="radio" name="ans2" value="low" onChange={this.answerSelected} />LOW
                        <input type="radio" name="ans2" value="middle" onChange={this.answerSelected} />MIDDLE
                        <input type="radio" name="ans2" value="high" onChange={this.answerSelected} />HIGH
                    </div>
                    <div className="card">
                        <label>HAIR TYPE</label><br />
                        <input type="radio" name="ans3" value="curly" onChange={this.answerSelected} />クセ毛
                        <input type="radio" name="ans3" value="dry" onChange={this.answerSelected} />細・軟
                        <input type="radio" name="ans3" value="oily" onChange={this.answerSelected} />硬・多
                    </div>
                    <div className="card">
                        <label>FINISH</label><br />
                        <input type="radio" name="ans4" value="scalp" onChange={this.answerSelected} />頭皮
                        <input type="radio" name="ans4" value="finish" onChange={this.answerSelected} />質感
                        <input type="radio" name="ans4" value="style" onChange={this.answerSelected} />スタイル
                        <input type="radio" name="ans4" value="damage" onChange={this.answerSelected} />ダメージケア
                    </div>

                    <input className='feedback-button' type="submit" value="回答する"/>
                </form>
            </div>
        }

        return (
            <div>
                {name}
                =============================
                {questions}
            </div>
        );
    }
}

export default HairSurvey

