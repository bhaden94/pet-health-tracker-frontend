import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import AddModifyForm from './components/AddModifyForm';
import WorkoutTable from './components/WorkoutTable';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      <Route path="/">
        <Navbar />
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
