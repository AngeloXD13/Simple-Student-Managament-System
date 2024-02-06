import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import Home from "./pages/Home";
import Admin_Dashboard from "./pages/admin/Admin_Dashboard";

import Encoder_Dashboard from "./pages/encoder/Encoder_Dashboard";

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin_Dashboard />} />
          <Route path="encoder" element={<Encoder_Dashboard />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <div>
    //   <Button label="Admin" icon="pi pi-check" />
    //   </div>

    // </div>
  );
}

export default App;
