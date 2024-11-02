"use client";
import { useState } from "react";
import accountStyles from "./account.module.css";


export default function Account() {
  return (
    <main className={accountStyles.body}>
      <div className={accountStyles.content}>
  <div className={accountStyles.login}>
    <div className={accountStyles.input}>
      <h4 className={accountStyles.h4}>Login Here!</h4>
      <input type="email" className={accountStyles.data} placeholder="Email Address:" />
      <input type="password" className={accountStyles.data} placeholder="Password:" />
      <div class="buttonHolder">
        <button className={accountStyles.button}>LOGIN</button>
        <button className={accountStyles.button}>LOGOUT</button>
      </div>
    </div>
  </div>
  <div class="signup">
    <div className={accountStyles.input}>
      <h4 className={accountStyles.h4}>Sign Up!</h4>
      <input type="text" className={accountStyles.data} placeholder="First Name:" />
      <input type="text" className={accountStyles.data} placeholder="Last Name:" />
      <input type="email" className={accountStyles.data} placeholder="Email Address:" />
      <input type="password" className={accountStyles.data} placeholder="Password:" />
      <div class="buttonHolder">
        <button className={accountStyles.button}>SIGN UP</button>
      </div>
    </div>
  </div>
</div>
    </main>
  );
}