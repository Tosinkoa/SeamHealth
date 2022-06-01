import { Form, Formik } from "formik";
import MyInput from "../components/Formik";
import PhoneInput from "react-phone-number-input";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { usePostUserMutation } from "../store/fetcherApi";
import * as Yup from "yup";

const RegisterDoctor = () => {
  const [phone, setPhone] = useState();
  const [postUser] = usePostUserMutation();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [phoneError, setPhoneError] = useState("");
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const submitForm = (values) => {
    if (phone === "") {
      setPhoneError("Phone number is required");
    } else {
      setPhoneError("");
    }
    const allValues = { ...values, phone };
    const result = postUser(allValues);
    // if (result) {
    //     toast.error(result.error.data.errors[0].msg);
    //   }
    console.log(result);
  };

  const validation = Yup.object({
    name: Yup.string().required("Name is required").min(2, "Name is too short").max(20, "Name must be max of 20 chars"),
    phone: Yup.string()
      .required("Phone is required")
      .min(11, "Phone is too short")
      .max(20, "Phone must be max of 20 chars")
      .matches(/^[0-9]+$/, "Phone must be numeric"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email")
      .min(4, "Email must be a min of 4 chars")
      .max(40, "Email must be a max of 40 chars"),
    city: Yup.string().required("City is required").min(2, "City is too short").max(20, "City must be max of 20 chars"),
    website: Yup.string()
      .required("Website is required")
      .min(2, "Website is too short")
      .max(20, "Website must be max of 20 chars"),
  });

  return (
    <div>
      <div className="border sm:shadow-md md:shadow-lg sm:mx-4 md:mx-10 lg:mx-28 my-6 rounded-md dark:shadow-gray-600 ">
        <div className="  sm:mx-4 md:mx-10 lg:mx-28  my-6 rounded-md dark:shadow-gray-600 ">
          <div className="flex justify-between sm:px-7 lg:px-12 bg-green-600 shadow-lg text-gray-50 rounded-lg sm:w-full lg:w-2/5 mx-auto mb-5">
            <h1 className="font-bold text-xl m-3 w-full text-center">Register New Doctor</h1>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="text-2xl">
              {theme === "light" ? <BsMoonStarsFill /> : <MdWbSunny />}
            </button>
          </div>
          <Formik
            onSubmit={submitForm}
            validationSchema={validation}
            initialValues={{ name: "", username: "", email: "", city: "", website: "" }}
          >
            {() => {
              return (
                <Form className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-11/12 mx-auto gap-5 py-4">
                  <MyInput
                    className="border-2 border-gray-400 bg-gray-200 w-full p-2 rounded-xl"
                    name="name"
                    label="Name"
                    type="text"
                  />
                  <MyInput
                    className="border-2 border-gray-400 bg-gray-200 w-full  p-2 rounded-xl"
                    name="username"
                    label="Username"
                    type="text"
                  />
                  <MyInput
                    className="border-2 border-gray-400 bg-gray-200 w-full  p-2 rounded-xl"
                    name="email"
                    label="Email"
                    type="email "
                  />
                  <MyInput
                    className="border-2 border-gray-400 bg-gray-200 w-full  p-2 rounded-xl"
                    name="phone"
                    label="Phone"
                    type="tel"
                  />
                  <MyInput
                    className="border-2 border-gray-400 bg-gray-200 w-full  p-2 rounded-xl"
                    name="city"
                    label="City"
                    type="text"
                  />
                  <MyInput
                    className="border-2 border-gray-400 bg-gray-200 w-full  p-2 rounded-xl"
                    name="website"
                    label="Website"
                    type="text"
                  />
                  <button
                    className="border rounded-md w-24 px-4 py-2 font-bold text-center bg-green-600 border-gray-500 text-gray-50 shadow-md hover:bg-green-500 hover:text-white"
                    type="submit"
                  >
                    Register
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterDoctor;
