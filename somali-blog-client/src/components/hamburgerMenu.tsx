import { useState } from "react";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";

export const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Hamburger toggled={open} toggle={setOpen} />

      {open && (
        <div className="absolute grid gap-5 top-12 left-0 bg-white shadow-md p-5 h-48 w-48 rounded-xl z-50">
          
          <Link to="/articleDetailPage">
              <h1 className="">Article</h1>
              </Link>
         
            
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
