
import logo from './k-logo.svg';
import background from './img/background.jpg';
import './App.css';
import HairSurvey from './hairSurvey';

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      </header>
      
      <HairSurvey />
    </div>
  );
}

export default App;
