import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/Shared/Navigation/Navigation";
import Hotels from "./pages/Hotels/Hotels";
import SingleHotel from "./pages/SingleHotel/SingleHotel";
import Footer from "./components/Shared/Footer/Footer";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/singlehotel" element={<SingleHotel />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
