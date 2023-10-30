import { Routes, Route, Outlet, Link } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Home from './page/Home';
import About from './page/About/index';
import React from "react";

export default function App() {

  return (
    <div>
      <h1>Basic Example</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={React.createElement(Home as any)} />
          <Route path="about" element={React.createElement(About as any, { name: '222'})}/>
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
