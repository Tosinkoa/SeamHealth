import { Form, Formik } from "formik";
import MyInput from "../components/Formik";
import Layout from "../components/Layout";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Table from "../components/Table";
import { useTheme } from "next-themes";
import { useAllUserQuery, usePostUserMutation } from "../store/fetcherApi";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [phone, setPhone] = useState();
  // const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  const { data: allUsers, isLoading } = useAllUserQuery();
  const [postUser] = usePostUserMutation();

  if (!mounted) return null;

  return (
    <Layout>
      <div>
        <div>
          <div className=" z-10 absolute w-full ">
            {/* <h1>Register New Doctor</h1> */}
            {/* <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              Toggle {theme === "light" ? "Dark" : "Light"}
            </button> */}
            <Formik
              onSubmit={(values) => {
                const allValues = { ...values, phone };
                const result = postUser(allValues);
                console.log(result);
              }}
              initialValues={{ name: "", username: "", email: "", city: "", website: "" }}
            >
              {() => {
                return (
                  <Form className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    <MyInput className="border-2 w-full" name="name" label="Name" type="text" />
                    <MyInput className="border-2 w-full" name="username" label="Username" type="text" />
                    <MyInput className="border-2 w-full" name="email" label="Email" type="email" />
                    <PhoneInput
                      country="US"
                      name="phone"
                      className="auth_form"
                      placeholder="Enter your phone number"
                      onChange={setPhone}
                      value={phone}
                    />{" "}
                    <MyInput className="border-2 w-full" name="city" label="City" type="text" />
                    <MyInput className="border-2 w-full" name="website" label="Website" type="text" />
                    <button type="submit">Register</button>
                  </Form>
                );
              }}
            </Formik>
            <h1>Doctor List</h1>
            <div>
              {isLoading && !allUsers && <p>Loading</p>}
              {allUsers && !isLoading && <Table allUsers={allUsers} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
