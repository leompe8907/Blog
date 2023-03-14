import { BrowserRouter as Router,Routes,Route  } from "react-router-dom";

import Registro from "./Components/Resgistro/Registro";
import SingIn from "./Components/SingIn/SingIn";

import "./App.scss"

function App() {
  return (
    <main className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SingIn/>}/>
          <Route path="/Registro" element={<Registro/>}/>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
