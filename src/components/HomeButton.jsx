import React from "react";
import { Link } from "react-router-dom";

export default function HomeButton() {
  const isHomePage = window.location.pathname === "/";

  return (
    <>
      {!isHomePage && (
        <Link to={"/"}>
          <img
            className="w-[40px] h-[40px] hover:opacity-70 transition-opacity duration-300"
            src="/house-home.512x512.png"
            alt=""
          />
        </Link>
      )}
    </>
  );
}
