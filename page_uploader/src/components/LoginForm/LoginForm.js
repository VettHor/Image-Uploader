import './LoginForm.css';
import profile from "./images/login.png";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const LoginForm = () => {
    const [isLogin, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const changePage = (event) => {
        event.preventDefault();
        fetch(`https://localhost:44309/api/Images/add_user/${isLogin ? 'login' : 'create'}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(json => {
            alert(json.Message);
            if(isLogin === true)
            {
                if(json.Exists)
                    navigate(`/${json.User.IsAdministrator ? 'administrator' : 'user'}`);
            }
            else
                if(json.Exists === false)
                    navigate('/user');
        });
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
                    {isLogin
                        ? <h1>User authorization</h1>
                        : <h1>Create account</h1>
                    }
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
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div className="login-button mt-1 mb-3">
                        <input type="submit" value={isLogin ? "Login" : "Create"}/>
                    </div>
                    {isLogin 
                        ? <p className="lg-in-create">Don't have an account? <a href='#' onClick={() => setLogin(false)}>Create</a></p>
                        : <p className="lg-in-create">Have an account? <a href='#' onClick={() => setLogin(true)}>Log in</a></p>
                    }
                </form>
            </div>
        </div>
    </div>
  );
}

export default LoginForm;