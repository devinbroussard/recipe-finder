import './App.css';

import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

import RecipeFinder from './pages/RecipeFinder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeFinder />} />
      </Routes>
    </Router>
  );
} 

export default App;
