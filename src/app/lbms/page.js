"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import accountStyles from "./lbms.module.css";

export default function LBMS() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (loginEmail === "librarian" && loginPassword === "admin123") {
      router.push("/lbms/dashboard");
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <main className={accountStyles.body}>
      <div className={accountStyles.content}>
        <div className={accountStyles.login}>
          <div className={accountStyles.input}>
            <h4 className={accountStyles.h4}>Librarian Login</h4>
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
              <button
                className={accountStyles.button}
                onClick={() => {
                  setLoginEmail("");
                  setLoginPassword("");
                }}
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
