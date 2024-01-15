import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Header from "./component/header/header.component";
import Home from "./routes/home/home.component";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Header/>} path='/'>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
