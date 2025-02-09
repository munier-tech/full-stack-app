import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { AppDispatch, RootState } from "@/redux/store"
import { ImBook } from "react-icons/im"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { MdAddReaction, MdCreateNewFolder, MdCreate } from "react-icons/md"
import { Button } from "@/components/ui/button"
import { logOut } from "@/redux/slices/loginSlice"



const Profile = () => {
  const loginState = useSelector((state :  RootState) => state.Login)
  const dispatch = useDispatch<AppDispatch>()
  const logOutHandler = () => {
    dispatch(logOut())
  }
  return (
    
    <div className="mr-5 ">
   <Popover>
    <PopoverTrigger className="cursor-pointer">
      <div className=" w-[44px] h-[44px] border  font-bold text-2xl p-2 text-center rounded-3xl flex items-center justify-center">
      {loginState.data.user.fullname[0].toUpperCase()}
      </div>
    </PopoverTrigger>
    <PopoverContent>
      <div className="flex gap-2">
      <div className="bg-white w-[44px] h-[44px] border mt-6 text-black font-bold rounded-3xl flex items-center justify-center">
      {loginState.data.user.fullname[0].toUpperCase()}
      </div>
      <span className="grid  p-3 bg-white text-black rounded-md my-2">
      <div className="text-black font-bold rounded-3xl ">
      {loginState.data.user.fullname.toUpperCase()}
      </div>
      <div>
        {loginState.data.user.email}
      </div>
      </span>
      </div>
      <div className="links  grid gap-2 ">
        <div className="linkContainer  flex items-center gap-4 p-3 hover:bg-black hover:text-white transition-all rounded-md">
        <ImBook/>
        <Link to="/post">My posts</Link>
        </div>
        <div className="linkContainer  flex items-center gap-4 p-3 hover:bg-black hover:text-white transition-all rounded-md">
        <MdCreate />
        <Link to="/createPost">CreatePost</Link>
        </div>
        <div className="linkContainer  flex items-center gap-4 p-3 hover:bg-black hover:text-white transition-all rounded-md">
        <MdAddReaction />
        <Link to="/articles">My Reactions</Link>
        </div>
        <div className="linkContainer  flex items-center gap-4 p-3 hover:bg-black hover:text-white transition-all rounded-md">
        <MdCreateNewFolder />
        <Link to="/new">Create Article</Link>
        </div>
      </div>
      <div className="my-2">
      <Button onClick={logOutHandler} className="bg-red-500 w-full hover:bg-red-800  ">Log out</Button>
      </div>
      </PopoverContent>
   </Popover>
 
    </div>
  )
}

export default Profile
