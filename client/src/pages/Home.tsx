import React, { useRef, useState } from "react";
import logo from "../logo.svg";
import "../App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";

import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const login = () => {
    if (username === "admin" && password === "admin") {
      navigate("admin");
    } else if (username === "encoder" && password === "encoder") {
      navigate("encoder");
    } else {
      showError();
    }
  };

  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Access Denied",
      life: 3000,
    });
  };

  return (
    <div className="App">
      <Toast ref={toast} />
      <header className="App-header">
        <h1>Student Management System</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>LOGIN</p>
        <InputText
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <Password
          placeholder="password"
          feedback={false}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <br />
        <div>
          <Button label="Login" onClick={login} />
        </div>
      </header>
    </div>
  );
}

export default Home;
