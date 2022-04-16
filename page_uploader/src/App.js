import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import Administrator from './components/Administrator/Administrator'
import User from './components/User/User'
import LoginForm from './components/LoginForm/LoginForm'

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginForm/>}/>
                <Route exact path="/administrator" element={<Administrator/>}/>
                <Route exact path="/user" element={<User/>}/>
            </Routes>
        </Router>
    );
}

export default App;
