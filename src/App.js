import { BrowserRouter as Router,Routes,Route  } from "react-router-dom";

import { AuthProvider } from "./Context/UserContext";
import SignIn from "./Components/SignIn/SignIn";


import "./App.scss"
import SignUp from "./Components/SignUp/SignUp";
import Blog from "./Components/Blog/Blog";
import ProtectedRoute from "./Context/ProtectedRoute";

function App() {


  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/blog"  element={<ProtectedRoute><Blog/></ProtectedRoute>}/>
        </Routes>
    </AuthProvider>
  );
}

export default App;
