import './App.css';
import TableView from './table';

function App() {
  return (
    <div className="App">
        <nav className="navbar justify-content-between navbar-dark bg-dark">
          <a className="navbar-brand">Company Logo</a>
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search....." aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0">Search</button>
          </form>
        </nav>
        <div className="mt-4">
            <TableView />
        </div>
        <div className="card-footer text-muted text-center">&copy; 2023 Your Company Name. All rights reserved.</div>
    </div>
  );
}

export default App;
