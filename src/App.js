
import logo from './k-logo.svg';
import background from './img/background.jpg';
import './App.css';
import HairSurvey from './hairSurvey';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';
import { Survey } from './components/Survey';

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      </header>
      
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='about' element={< About />} />
        <Route path='survey' element={<Survey />}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
