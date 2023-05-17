import { useRef, useEffect, useState } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../Context/UserContext';
import "./SignUp.scss"
import { Navigate } from 'react-router-dom';

const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const pwdRegex = /^(?=.*[0-9])(?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = useAuth();

  // Hook del usuario
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  // Hook del Password
  const [pass, setPass] = useState('');
  const [validPass, setValidPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = emailRegex.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = pwdRegex.test(pass);
    setValidPass(result);
  }, [pass]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    auth.signup(email, pass);
    Navigate("/blog")
  };

  return (
    <div className="general">
      <section className="sectionGeneral">
        <h1 className="tittleForm tittleSignIn">Create Account</h1>
        <form className="form" onSubmit={handleSignUp}>
          <label className="tittleForm" htmlFor="username">
            Email:
            <span className={validEmail ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="user"
            type="email"
            id="username"
            ref={emailRef}
            autoComplete="off"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby="uidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p id="uidnote" className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Must begin with a letter. <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <label className="tittleForm" htmlFor="password">
            Password:
            <span className={validPass ? 'valid' : 'hide'}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPass || !pass ? 'hide' : 'invalid'}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            className="password"
            type="password"
            id="password"
            placeholder="Password"
            ref={passwordRef}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            aria-invalid={validPass ? 'false' : 'true'}
            aria-describedby="passnote"
            onFocus={() => setPassFocus(true)}
            onBlur={() => setPassFocus(false)}
          />
          <p id="passnote" className={passFocus && !validPass ? 'instructions' : 'offscreen'}>
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters. <br />
            Must include uppercase and lowercase letters, a number, and a special character. <br />
            Allowed special characters: <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>
          <button className="submit" disabled={!validEmail || !validPass}>
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
