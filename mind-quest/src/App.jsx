import './App.css';
import QuestSimple from './components/QuestSimple';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hello World!
      </header>
      <QuestSimple quest="Caçar gnomos" />
      <QuestSimple quest="Caçar fadas" />
      <QuestSimple quest="Proteger a vila" />
    </div>
  );
}

export default App;
