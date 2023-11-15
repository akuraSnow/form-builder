// @ts-nocheck
import { Routes, Route, Outlet, Link } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Home from './page/Home';
import About from './page/About/index';
import React, { useEffect, useState } from "react";

export default function App() {

  let [val , setVal] = useState(1);

  useEffect(() => {

    // setInterval(() => {
    //   setVal(val++);
    // }, 1000);

    setTimeout(() => {
      setVal(++val);
    }, 1000)

  }, [])

  return (
    <div>
      <h1>Basic Example</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={React.createElement(Home as any)} />
          <Route path="about" element={ 
            <div>
              <About value = {val}></About>
              {/* <Home value = {val}></Home>
              <Home value = {val}></Home> */}
            </div>

          } />
        </Route>
      </Routes>
    </div>
  );
}

function Layout(props: any) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}


const Names = function() {

  return <div></div>
}