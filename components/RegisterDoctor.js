import { Form, Formik } from "formik";
import MyInput from "../components/Formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardTitle from "./CardTitle";

const RegisterDoctor = ({ submitForm }) => {
  //--------------------Validate all fields----------------------------
  const formValidator = Yup.object({
    name: Yup.string().required("Name is required").min(2, "Name is too short").max(20, "Name must be max of 20 chars"),
    phone: Yup.string()
      .required("Phone is required")
      .min(11, "Phone must be 11 digits")
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
      <div className="register_doctor_background">
        <CardTitle title="Register New Doctor" showIcon={true} />
        <Formik
          onSubmit={submitForm}
          validationSchema={formValidator}
          initialValues={{ name: "", phone: "", username: "", email: "", city: "", website: "" }}
        >
          {() => {
            return (
              <Form className="form_background">
                <MyInput className="input_style" name="name" label="Name" type="text" />
                <MyInput className="input_style" name="username" label="Username" type="text" />
                <MyInput className="input_style" name="email" label="Email" type="email " />
                <MyInput className="input_style" name="phone" label="Phone" type="tel" />
                <MyInput className="input_style" name="city" label="City" type="text" />
                <MyInput className="input_style" name="website" label="Website" type="text" />
                <button className="register_doctor_button" type="submit">
                  Register
                </button>
              </Form>
            );
          }}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegisterDoctor;
