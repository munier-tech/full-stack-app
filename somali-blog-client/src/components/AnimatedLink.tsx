import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

 const  AnimatedButtonLink = () => {
  return (
    <Button className="relative text-green-500 group" variant="outline">
      <Link to="/auth/register" className="relative">
        <span className="group-hover:text-blue-600">Sign up</span>
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full" />
      </Link>
    </Button>
  );
}


export default AnimatedButtonLink