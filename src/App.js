import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Exchanges,
  CryptoCurruncies,
  CryptoDetails,
  HomePage,
  News,
} from "./Components";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>

        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/exchanges" element={<Exchanges />} />
                <Route
                  path="/cryptocurruncies"
                  element={<CryptoCurruncies />}
                />
                <Route path="/news" element={<News />} />
                <Route path="/crypto/:coinID" element={<CryptoDetails />} />
              </Routes>
            </div>
          </Layout>

          <div className="footer">
            <Typography.Title level={5} style={{ color: "white" }}>
              Cryptop Currunices <br />
              All rights Reserved @Wajeeh Shah
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">exchanges</Link>
              <Link to="/cryptocurruncies">cryptocurruncies</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
