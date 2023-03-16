import { BrowserRouter as Router,Routes,Route  } from "react-router-dom";

import { AuthProvider } from "./Context/UserContext";
import SignIn from "./Components/SingIn/SingIn";


import "./App.scss"
import SignUp from "./Components/SignUp/SignUp";

function App() {


  return (
    <AuthProvider>
      <div className="App">
        <SignIn/>
      </div>
    </AuthProvider>
  );
}

export default App;
