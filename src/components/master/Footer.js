import React from "react";

function Footer() {
  return (
    <>
      <footer className="h-20 w-full flex items-center justify-between px-10 border-t border-gray">
        <h1><a href="#">PakLabour</a> &#169; All rights reserved.</h1>
        <div className="flex gap-4">
            <a href="#">Terms & Conditions</a>
            <a href="#">Search jobs</a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
