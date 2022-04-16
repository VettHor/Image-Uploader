import './LoginForm.css';
import profile from "./images/login.png";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const changePage = (event) => {
        event.preventDefault();
        fetch(`https://localhost:44309/api/Images/contains_administrator/${email}/${password}`)
        .then(res => res.json())
        .then(json => navigate(`/${json ? 'administrator' : 'user'}`));
    }

    return (
    <div className="main">
        <div className="sub-main">
            <div className="inputs">
                <div className="imgs">
                    <div className="container-image">
                        <img src={profile} alt="profile" className="profile"/>
                    </div>
                </div>
                <form onSubmit={changePage} className="mt-3">
                    <h1>User authorization</h1>
                    <div className="mt-4">
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Email" 
                            className="name"
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-3">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="name"
                            onChange={event => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="login-button mt-1 mb-5">
                        <input type="submit" value="Login"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default LoginForm;