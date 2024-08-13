import "./App.css";
import ScoutList from "./components/ScoutList";
import SearchForm from "./components/SearchForm";

function App() {
    return (
        <div className="App">
            <header className="App-header" />
            <SearchForm />
            <ScoutList />
        </div>
    );
}

export default App;
