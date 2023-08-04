import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './page/Home';
import About from './page/About/index';
import React from "react";

export default function App() {

  console.log(1111)
  return (
    <div>
      <h1>Basic Example</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />}/>
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
