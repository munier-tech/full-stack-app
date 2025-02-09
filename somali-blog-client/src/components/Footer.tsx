import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-green-500 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0 md:px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          SomaliBlog
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/services" className="hover:underline">
            Services
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        {/* Copyright Section */}
        <p className="text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} SomaliBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
