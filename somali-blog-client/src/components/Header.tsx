import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Profile from "@/pages/profile";
import AnimatedButtonLink from "./AnimatedLink";
import { ThemeToggler } from "./theme-toggler";
import HamburgerMenu from "./hamburgerMenu";

const  Header = () => {
  

  const loginState = useSelector((state : RootState) => state.Login)
  return (
    <header className="border mx-auto border-white py-4 shadow-xl fixed top-0 left-0 right-0 bg-transparent backdrop-blur-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4 ">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
         
          <span className="text-xl text-green-500 font-bold">Somali Blog</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-4 items-center">

          {loginState.data.isSuccess ? <div className="flex items-center gap-3">
            <div>
              <Link to="/articleDetailPage">
              <h1 className="hidden md:block lg:block">Articles</h1>
              </Link>
            </div>
            <div className="">
            <Profile/>
            </div>
            <div className="block md:hidden lg:hidden">
            <HamburgerMenu />
            </div>
          </div> :  <div className="flex space-x-4 items-center" > 
        <Button className="text-green-500" variant="outline">
          <Link to="auth/login" > sign in</Link>
          </Button>


        <AnimatedButtonLink/>

    
         
          </div> }
            <div>
            <ThemeToggler/>
            </div>
           
        </nav>
      </div>
    </header>
  );
}


export default Header