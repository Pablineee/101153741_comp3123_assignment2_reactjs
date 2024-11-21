import logo from './assets/images/logo.svg';
import './assets/styles/App.css';
import DiviList from './components/DiviList'; // Import DiviList component

function App() {
  return (
    <div className="App">
      <main>
        <section>
          <DiviList />
        </section>
      </main>
    </div>
  );
}

export default App;
