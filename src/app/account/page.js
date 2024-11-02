"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import accountStyles from "./account.module.css";

export default function Account() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const router = useRouter();

  const handleLogin = () => {
    if (loginEmail === "user" && loginPassword === "pass") {
      router.push("/mylibrary");
    } else {
      alert("Invalid login credentials");
    }
  };

  const handleSignUp = () => {
    if (signupFirstName && signupLastName && signupEmail && signupPassword) {
      router.push("/mylibrary");
    } else {
      alert("Please fill in all signup fields");
    }
  };

  return (
    <main className={accountStyles.body}>
      <div className={accountStyles.content}>
        <div className={accountStyles.login}>
          <div className={accountStyles.input}>
            <h4 className={accountStyles.h4}>Login Here!</h4>
            <input
              type="email"
              className={accountStyles.data}
              placeholder="Email Address:"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              className={accountStyles.data}
              placeholder="Password:"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <div className="buttonHolder">
              <button className={accountStyles.button} onClick={handleLogin}>
                LOGIN
              </button>
              <button className={accountStyles.button}>LOGOUT</button>
            </div>
          </div>
        </div>
        <div className="signup">
          <div className={accountStyles.input}>
            <h4 className={accountStyles.h4}>Sign Up!</h4>
            <input
              type="text"
              className={accountStyles.data}
              placeholder="First Name:"
              value={signupFirstName}
              onChange={(e) => setSignupFirstName(e.target.value)}
            />
            <input
              type="text"
              className={accountStyles.data}
              placeholder="Last Name:"
              value={signupLastName}
              onChange={(e) => setSignupLastName(e.target.value)}
            />
            <input
              type="email"
              className={accountStyles.data}
              placeholder="Email Address:"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              type="password"
              className={accountStyles.data}
              placeholder="Password:"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <div className="buttonHolder">
              <button className={accountStyles.button} onClick={handleSignUp}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
