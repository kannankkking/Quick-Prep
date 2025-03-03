import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Student/Home';
import EBooks from './components/Student/EBooks';
import CheatSheets from './components/Student/CheatSheets';
import SubjectEBooks from './components/Student/SubjectEBooks';
import InterviewQuestions from './components/Student/InterviewQuestions';
import AdminDashboard from './components/Admin/AdminDashboard';
import UploadPage from './components/Admin/UploadPage';
import Login from './components/Logins/Login'
import './App.css'
import FrontPage from './components/Student/FrontPage';
import UserLogin from './components/Logins/UserLogin';
import UserRegister from './components/Logins/UserRegister';
import AdminLogin from './components/Admin/AdminLogin';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />}/>
        <Route path='/upload' element={<UploadPage />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/ebooks" element={<EBooks />} />
        <Route path="/cheatsheets" element={<CheatSheets />} />
        <Route path="/subjectebooks" element={<SubjectEBooks />} />
        <Route path="/interviewquestions" element={<InterviewQuestions />} />
        <Route path="/Userlogin" element={<UserLogin />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
