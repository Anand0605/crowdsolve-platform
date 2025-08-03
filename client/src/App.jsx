// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ProblemDetails from './pages/ProblemDetails';
import PrivateRoute from './components/Auth/PrivateRoute';
import AllProblems from './components/Problems/AllProblems';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/problems"
          element={
            <PrivateRoute>
              <AllProblems />
            </PrivateRoute>
          }
        />

        <Route
          path="/problem/:problemId"
          element={
            <PrivateRoute>
              <ProblemDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
