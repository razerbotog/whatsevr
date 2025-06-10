import React from "react";
import { appleIcon } from "./svg";

export const Button = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <button
        className="flex gap-2 items-center justify-center bg-black text-slate-200 rounded-4xl cursor-pointer"
        style={{ padding: "0.7rem 3rem" }}
      >
        <span>{appleIcon}</span>
        <p className="font-medium text-2xl">Get the iOS App</p>
      </button>
      <button className="bg-slate-100 text-black rounded-lg cursor-pointer" style={{ padding: "0.3rem 1rem" }}>Continue</button>
    </div>
  );
};
