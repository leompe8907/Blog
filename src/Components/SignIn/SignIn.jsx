import React from 'react'
import { useRef,useEffect,useState } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./SingIn.scss"
import { useAuth } from '../../Context/UserContext';

import { Link, Navigate } from 'react-router-dom';



const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const pwdRegex = /^(?=.*[0-9])(?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%]).{8,24}$/

const SignIn = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const errRef = useRef();
    const auth =useAuth()

    //hook del usuario
    const [email,setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    //hook del Password
    const [pass,setPass] = useState("");
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    //hook de error
    const [errMsg,setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    //
    useEffect(() => {
        emailRef.current.focus();
    },[])

    // useEffect validar si el usuario esta bien
    useEffect(() => {
        const result = emailRegex.test(email);
        console.log(result);
        setValidEmail(result)
    },[email])

    //useEffect validar si la contraseña es valida
    useEffect(() => {
        const result = pwdRegex.test(pass);
        console.log(result);
        setValidPass(result);
    },[pass])

    //useEffect para el mensaje de error
    useEffect(() =>{
        setErrMsg("");
    },[email,pass])

    //funcion para enviar la informacion del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await auth.signin(email, pass);
          setSuccess(true); // Iniciar sesión exitosa
          Navigate("/blog")
        } catch (error) {
          if (error.code === "auth/user-not-found") {
            setErrMsg("El usuario no existe. ");
          } else if (error.code === "auth/wrong-password") {
            setErrMsg("Credenciales incorrectas. ");
          } else {
            setErrMsg("Error al iniciar sesión. ");
          }
        }
      };

  return (
    <>
    {success ? (
        <section>
            <h1>Success!</h1>
            <p>
                <a href='#'> Sign In</a>
            </p>
        </section>
    ) : (
    <div className="general">
      <section className="sectionGeneral">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1 className='tittleForm tittleSignIn'> Sign In </h1>
          <form className='form' onSubmit={handleSubmit} >
              <label className='tittleForm' htmlFor='email'>
                  Email:
                  <span className={validEmail ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck}/>
                  </span>
                  <span className={validEmail || !email ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes}/>
                  </span>
              </label>
              <input
                  className='user'
                  type="email"
                  id="username"
                  ref={emailRef}
                  autoComplete="off"
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
              />
              <p id='uidnote' className= {emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                  Must begin with a letter. <br />
                  Letters, numbers, underscores, hyphens allowed.
              </p>
              <label className='tittleForm' htmlFor='password'>
                  password:
                  <span className={validPass ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck}/>
                  </span>
                  <span className={validPass || !pass ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes}/>
                  </span>
              </label>
              <input
                  className='password'
                  type="password"
                  id="password"
                  placeholder='Password'
                  ref={passwordRef}
                  onChange={(e) => setPass(e.target.value)}
                  required
                  aria-invalid={validPass ? "false" : "true"}
                  aria-describedby="passnote"
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
              />
              <p id="passnote" className={passFocus && !validPass ? "instructions" : "offscreen"} >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 charters. <br/>
                  Must include uppercase and lowercase letters, a number and a speacial character. <br/>
                  Allwed speacial charters: <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
              <button className='submit' disabled={!validEmail || !validPass ? true : false}> Sing In </button>
          </form>
          <p> 
              Already registered ?<br/>
              <span>
              <Link to="/signup"> Sign Up.</Link>
              </span>        
          </p>
      </section>
    </div>
    )}
    </>
  )
}

export default SignIn
