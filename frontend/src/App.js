
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from './component/layout/Footer/Footer.jsx';
import Home from './component/Home/Home.jsx';



// React.useEffect(() => {
//   WebFont.load({
//     google:{
//       famillies:["Roboto" , ""]
//     }
//   })
// })


function App() {
  return (
    <>
      <Header />
      <Routes>


        <Route exact path="/" Component={Home} />
      </Routes>
      <Footer />
    </>

  );
}

export default App;
