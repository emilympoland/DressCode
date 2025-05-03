"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login attempt with:", { username, password });
    fetch(`${server_url}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // add this line
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
        router.push("/home");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="login-wrapper">
        <div className="login-container">
          <h1>Welcome Back to DressCode!</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="button">
              LOG IN
            </button>
          </form>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <div className="signup-link">
            <p>
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </div>
        </div>

        <div className="nav-bar">
          <div className="nav-icon">
            <svg viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
            </svg>
          </div>
          <div className="nav-icon">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </div>
          <div className="nav-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 6v12M6 12h12"></path>
            </svg>
          </div>
          <div className="nav-icon">
            <svg viewBox="0 0 24 24">
              <path d="M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"></path>
            </svg>
          </div>
          <div className="nav-icon">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="7" r="4"></circle>
              <path d="M12 11c-3.5 0-7 1.75-7 5.25V19h14v-2.75c0-3.5-3.5-5.25-7-5.25z"></path>
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f9f4e7;
          padding: 1rem;
        }

        .login-container {
          width: 100%;
          max-width: 400px;
          padding: 24px;
          background-color: #ef6a3f;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          color: white;
          margin-bottom: 70px;
        }

        .logo {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-placeholder {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #f9f4e7;
          margin: 0 auto;
        }

        h1 {
          margin-bottom: 32px;
          text-align: center;
          font-size: 24px;
          color: #d9f855;
          font-weight: bold;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 16px;
        }

        .input-group input {
          width: 100%;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          color: #171717;
          background-color: #f9f4e7;
        }

        .button {
          width: 100%;
          padding: 12px;
          background-color: #96a8fd;
          color: #d9f855;
          border: none;
          border-radius: 20px;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .button:hover {
          background-color: #96a8fd;
        }

        .forgot-password {
          text-align: center;
          margin-top: 16px;
        }

        .forgot-password a {
          color: white;
          text-decoration: none;
        }

        .signup-link {
          text-align: center;
          margin-top: 32px;
        }

        .signup-link a {
          color: white;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default Login;
