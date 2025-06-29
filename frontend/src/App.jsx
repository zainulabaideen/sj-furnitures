import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./component/layout/Header/Header.jsx";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.jsx";
import About from "./component/About/About.jsx";
import LoginSignup from "./component/LoginSignup/LoginSignup.jsx";
import WebFont from "webfontloader";
import { useEffect } from "react";

function App() {
  //   useEffect(() => {
  // //     WebFont.load({
  // //       google: {
  // //         families: ["Roboto"],
  // //       },
  // //     });
  // //   }, []);

  return (
    <div className="bg-bg-clr">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/about" element={<About />} />{" "}

      </Routes>{" "}
      <Footer />
    </div>
  );
}

export default App;
