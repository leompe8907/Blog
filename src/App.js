import { BrowserRouter as Router,Routes,Route  } from "react-router-dom";

import Registro from "./Components/Resgistro/Registro";
import SingIn from "./Components/SingIn/SingIn";

import "./App.scss"

function App() {

  const user = null

  return (
    <main className="App">
      <Router>
      {!user ? (
        <SingIn/>
      ):(
        <Routes>
          <Route path="/" element={<SingIn/>}/>
          
        </Routes>
      )}
      </Router>
    </main>
  );
}

export default App;
