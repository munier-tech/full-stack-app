import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearRegisterState, RegisterFn,  } from "@/redux/slices/registerSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const registerState = useSelector((state: RootState) => state.register);
  const toastId = "register-toast";

  useEffect(() => {
    // Clear previous state when entering the page
    dispatch(clearRegisterState());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
    },
    onSubmit(values) {
      const data = {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      dispatch(RegisterFn(data));
        toast.loading("Registering...", { id: toastId });
    },
    validationSchema: yup.object({
      fullname: yup.string().required("Fullname is required"),
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .required("Confirm password is required"),
    }),
  });

  useEffect(() => {
    if (registerState.error) {
      toast.error(registerState.error, { id: toastId });
    } else if (registerState.data?.isSuccess) {
      toast.success("Successfully registered!", { id: toastId });
      localStorage.setItem("registerstate", JSON.stringify(registerState.data));
    }
  }, [registerState.error, registerState.data]);

  return (
    <div className="mx-auto w-[80%] my-10 rounded-md md:w-[60%] lg:w-[30%] ">
      <form
        onSubmit={formik.handleSubmit}
        className=" border border-gray-100  rounded-md p-5 "
      >
        <h1 className="text-3xl text-center font-bold my-5">Sign Up</h1>

        <h1 className="text-red-500 text-center">
          {registerState.error}
        </h1>

        <div className="grid gap-5">
          {/* Fullname */}
          <div>
            <label htmlFor="fullname">Fullname</label>
            <Input
              name="fullname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullname}
              className="placeholder:text-gray-600 px-3 py-5 border-2 border-gray-400"
              type="text"
              placeholder="Munir Mohamed"
            />
            {formik.touched.fullname && formik.errors.fullname && (
              <p className="text-red-500">{formik.errors.fullname}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <Input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="placeholder:text-gray-600 px-3 py-5 border-2 border-gray-400"
              type="email"
              placeholder="m@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">Password</label>
            <Input
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className="placeholder:text-gray-600 px-3 py-5 border-2 border-gray-400"
              type="password"
              placeholder="*******"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="placeholder:text-gray-600  px-3 py-5 border-2 border-gray-400"
              type="password"
              placeholder="*******"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500">{formik.errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="my-7">
          <Button
            disabled={registerState.loading}
            type="submit"
            className="w-full border bg-green-500 text-black hover:bg-gray-200 transition-all cursor-pointer"
          >
            {registerState.loading ? <Spinner /> : "Sign Up"}
          </Button>
        </div>

        <p className="text-center flex gap-2 my-3 justify-center">
          Already have an account?
          <span className="text-green-400">
            <Link to="/auth/login">Sign In</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
