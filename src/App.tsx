import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Todos } from "./pages/Todos";

function App() {
  return (
    <Routes>
      {/* <Route element={<Layout />}>
      <Route path="/" element={<PublicPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/protected"
        element={
          <RequireAuth>
            <ProtectedPage />
          </RequireAuth>
        }
      />
    </Route> */}
      <Route path='/' element={<LegacyApp />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/todo' element={<Todos />} />
    </Routes>
  );
}
const LegacyApp = () => (
  <>
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  </>
);

export default App;
