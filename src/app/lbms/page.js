"use client";
import { useState } from "react";
import accountStyles from "./lbms.module.css";

export default function LBMS() {
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
            />
            <input
              type="password"
              className={accountStyles.data}
              placeholder="Password:"
            />
            <div class="buttonHolder">
              <button className={accountStyles.button}>LOGIN</button>
              <button className={accountStyles.button}>LOGOUT</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
