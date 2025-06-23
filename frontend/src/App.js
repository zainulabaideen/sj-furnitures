import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.jsx";
import LoginSignup from "./component/LoginSignup/LoginSignup.jsx";

// React.useEffect(() => {
//   WebFont.load({
//     google:{
//       famillies:["Roboto" , ""]
//     }
//   })
// })

function App() {
  return (
    <div className=" bg-bg-clr">

      <Header />
      <Routes>
        <Route exact path="/" Component={LoginSignup} />{" "}

        <Route exact path="/" Component={Home} />{" "}

      </Routes>{" "}
      <Footer />
    </div>
  );
}

export default App;
