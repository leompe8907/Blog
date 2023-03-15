import React from 'react'
import { useRef,useEffect,useState } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./SingIn.scss"


const userRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
const pwdRegex = /^(?=.*[0-9])(?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%]).{8,24}$/

const SingIn = () => {
    const userRef = useRef();
    const errRef = useRef();

    //hook del usuario
    const [user,setUser] = useState("");
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    //hook del Password
    const [pass,setPass] = useState("");
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    //hook de error
    const [errMsg,setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    //
    useEffect(() => {
        userRef.current.focus();
    },[])

    // useEffect validar si el usuario esta bien 
    useEffect(() => {
        const result = userRegex.test(user);
        console.log(result);
        setValidUser(result)
    },[user])

    //useEffect validar si la contraseña es valida
    useEffect(() => {
        const result = pwdRegex.test(pass);
        console.log(result);
        setValidPass(result);
    },[pass])

    //useEffect para el mensaje de error
    useEffect(() =>{
        setErrMsg("");
    },[user,pass])

    //funcion para enviar la informacion del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        // verificar datos
        const v1 = userRegex.test(user);
        const v2 = pwdRegex.test(pass);
        if (!v1 || !v2){
            setErrMsg("Invalid Entry");
            return
        }
        console.log(user,pass)
        setSuccess(true)
    }

    const register =  (e) =>{
        e.preventDefault()
    } 


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
              <label className='tittleForm' htmlFor='usermane'>
                  Username:
                  <span className={validUser ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck}/>
                  </span>
                  <span className={validUser || !user ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes}/>
                  </span>
              </label>
              <input
                  className='user'
                  type="email"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  placeholder='Email'
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validUser ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
              />
              <p id='uidnote' className= {userFocus && user && !validUser ? "instructions" : "offscreen"}>
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
              <button className='submit' disabled={!validUser || !validPass ? true : false}> Sing In </button>
          </form>
          <p> 
              Already registered ?<br/>
              <span>
                  <a className='link' onClick={register}> Sign up </a>
              </span>        
          </p>
      </section>
    </div>
    )}
    </>
  )
}

export default SingIn
