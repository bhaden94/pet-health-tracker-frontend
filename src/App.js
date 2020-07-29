import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import AddModifyForm from './components/AddModifyForm';
import WorkoutTable from './components/WorkoutTable';
import Navbar from './components/Navbar';
import Home from './components/Home'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add_modify">
          <AddModifyForm />
        </Route>
        <Route path="/workouts">
          <WorkoutTable />
        </Route>
      </div>
    </Router>
  );
}

export default App;
