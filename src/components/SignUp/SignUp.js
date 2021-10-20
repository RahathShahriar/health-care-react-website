import {
    createUserWithEmailAndPassword, getAuth, sendEmailVerification,
} from "firebase/auth";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import initializeFirebaseApp from "../../Firebase/firebase.init";
import useAuth from '../../hooks/useAuth';
initializeFirebaseApp();

const SignUp = () => {
    const { signInUsingGoogle } = useAuth();
    const { user } = useAuth()
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const toggleLogIn = e => {
        setIsLogin(e.target.checked)
    }
    const handleEmailChange = e => {

        setEmail(e.target.value);
    }
    const handlePasswordChange = e => {

        if (e.target.value.length < 6) {
            console.error("password must need to be at least 6 characters");
            return;
        } else {
            setPassword(e.target.value);
        }

    }

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                verifyEmail();
                setError('');
            })
            .catch(error => {
                setError(error.message)
            })

    }
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            // ...
        });
    };
    return (
        <div className="mx-3 text-center mt-5 w-50 mx-auto">
            <div className="pt-5">
            <h3>{user.email}</h3>
            <h3 className="fw-bold mb-4" style={{color: 'rgb(116, 31, 143)'}}>Please {isLogin ? 'Login' : 'Register'}</h3>
            <form onSubmit={handleRegister}>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2               col-form-label">Email</       label>
                    <div className="col-sm-10">
                        <input onChange={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input onChange={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-2">
                        <div className="form-check">
                            <input onChange={toggleLogIn} className="form-check-input" type="checkbox" id="gridCheck1" />
                            <label className="form-check-label" htmlFor="gridCheck1">
                                Already Registered?
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">{error}</div>
                <button type="submit" className="btn btn-primary mb-3">{isLogin ? 'Login' : 'Register'} </button>
            </form>
            <p>Already have an account? <Link to='/login'> Login</Link></p>
            <br />
            <br />

            <button onClick={signInUsingGoogle} className="btn btn-success">Google Sign In</button>
            </div>
        </div>
    );
};

export default SignUp;