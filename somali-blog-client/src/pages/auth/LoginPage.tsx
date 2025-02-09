import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFormik } from "formik"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"

import Spinner from "../Spinner"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { LoginFn, removeLoginState } from "@/redux/slices/loginSlice"


const LoginPage = () => {
   const loginState =  useSelector((state : RootState) => state.Login)
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()

   let toastId = "login"

   useEffect(() => {
    dispatch(removeLoginState())
   }, [dispatch])

  const formik = useFormik({
    initialValues : {
      email : "",
      password : ""
    },onSubmit(values) {
      const data = {
        email : values.email,
        password : values.password
      }
      toast.loading("logging in" , {id : toastId})
      dispatch(LoginFn(data))
    },
    validationSchema : yup.object({
      email : yup.string().email('please enter a valid email address').required('email is required'),
      password : yup.string().required("password is required").min(8, "password must be atleast 8 characters")
    }
  )})


  useEffect(() => {
    if (loginState.error) {
      toast.error(loginState.error , {id : toastId})
    }
    if (loginState.data.isSuccess) {
      toast.success("successfully signed in", {id : toastId})
      localStorage.setItem("userLogin", JSON.stringify(loginState.data) )
    }
  } , [loginState.error, loginState.data.isSuccess])


  useEffect(() => {
    if (loginState.data.isSuccess) {
      navigate("/")
    }
  }, [loginState.data.isSuccess])
  return (
    <div className="mx-auto w-[80%] rounded-md  my-10 md:w-[60%] lg:w-[30%]  text-green-500">
       <form onSubmit={formik.handleSubmit} className="  border  rounded-md p-5 text-green-500" >
        <div>
          <h1 className="text-3xl font-bold text-center">
            Login  
          </h1>
          
          <p className="text-red-600 font-bold my-5">
            {loginState.error || loginState.error}
          </p>
          <div className="mt-5">
          <label className=""> Email </label>
          <Input 
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
          className="px-3 py-5   border border-gray-400 " placeholder="Enter your email" />
          <p className="text-red-500 font-bold">
            {formik.errors.email || formik.touched.email}
          </p>
          </div>
          <div className="mt-5">
          <label className="text-black"> Password </label>
          <Input
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
           className="p-3  py-5  border border-gray-400 " type="password" placeholder="Enter your password" />
           <p className="text-red-500 font-bold">
            {formik.errors.password || formik.touched.password}
          </p>
          <div className="my-8">
          </div>
          <Button disabled={loginState.loading} className="disabled:text-gray-400 " variant="outline">
            {loginState.loading ? <Spinner/> : "sign in"}
          </Button>
          <p className="text-center flex gap-2 my-3 justify-center">
          Don't have an account?  
          <span className="text-green-400">
            <Link to="/auth/register">Sign up</Link>
          </span>
           </p>

          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
