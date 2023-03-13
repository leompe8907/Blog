import React from 'react'
import { useRef,useEffect,useState } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const userRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3.23}$/;
const pwdRegex = /(?= (.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8, }$/

const Registro = () => {
    const userRef = useRef();
    const errRef = useRef();

    //hook del usuario
    const [user,setUser] = useState("");
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    //hook del Password
    const [pass,setpass] = useState("");
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    //hook para comprobar la contraseña
    const [matchPass,setMatchPass] = useState("");
    const [ValidMatch, setValidMatch] = useState(false);
    const [MatchFocus, setMatchFocus] = useState(false);

    //hook de error
    const [errMsg,setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    //
    useEffect(() => {
        useRef.current.focus();
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
        const match = pass === matchPass;
        setValidMatch(match)
    },[pass, matchPass])

    //useEffect para el mensaje de error
    useEffect(() =>{
        setErrMsg("");
    },[user,pass,matchPass])






  return (
    <section>
        <h1> Registro </h1>
        <form>
            <label htmlFor='usermane'>
                Username:
                <span className={validUser ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validUser || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>
            <input 
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser (e.target.value)}
                required
                aria-invalid={validUser ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
            />
            <p id='uidnote' className= {userFocus && user && !validUser ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                4 to 24 charcters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor='password'>
                Paswword:
                <span className={validPass ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validUser || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>
            <input 
                type="passwprd"
                id="password"
                onChange={(e) => setpass(e.target.value)}
                required
                aria-invalid={validPass ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
            />
        </form>
    </section>
  )
}

export default Registro
