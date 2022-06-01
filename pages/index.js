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
import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";

export default function Home() {
  const [formData, setFormData] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [phone, setPhone] = useState();
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  const { data: allUsers, isLoading } = useAllUserQuery();
  const [postUser] = usePostUserMutation();

  if (!mounted) return null;
  return (
    <Layout>
      <div>
        <div>
          <div className=" z-10 absolute w-full">
            <div className="border shadow-md sm:mx-4 md:mx-10 lg:mx-28 my-6 rounded-md dark:shadow-gray-600 ">
              <div className="flex justify-between sm:mx-7 lg:mx-12">
                <h1 className="font-bold text-xl m-3 ">Register New Doctor</h1>
                <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="text-2xl">
                  {theme === "light" ? <BsMoonStarsFill /> : <MdWbSunny />}
                </button>
              </div>

              <Formik
                onSubmit={(values) => {
                  const allValues = { ...values, phone };
                  setFormData([allValues]);
                  const result = postUser(allValues);
                  console.log(result);
                }}
                initialValues={{ name: "", username: "", email: "", city: "", website: "" }}
              >
                {() => {
                  return (
                    <Form className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-11/12 mx-auto gap-5 py-4">
                      <MyInput className="border-2 w-full p-2 rounded-xl" name="name" label="Name" type="text" />
                      <MyInput
                        className="border-2 w-full  p-2 rounded-xl"
                        name="username"
                        label="Username"
                        type="text"
                      />
                      <MyInput className="border-2 w-full  p-2 rounded-xl" name="email" label="Email" type="email " />
                      <div>
                        <label htmlFor="phone" className="mylabel">
                          Phone
                        </label>
                        <PhoneInput
                          country="US"
                          name="phone"
                          placeholder="Enter your phone number"
                          onChange={setPhone}
                          value={phone}
                          className="border-2 w-full h-[42px] px-2 rounded-xl mt-2"
                        />
                      </div>
                      <MyInput className="border-2 w-full  p-2 rounded-xl" name="city" label="City" type="text" />
                      <MyInput className="border-2 w-full  p-2 rounded-xl" name="website" label="Website" type="text" />
                      <button type="submit">Register</button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <div>
              {isLoading && !allUsers && <p>Loading</p>}
              {allUsers && !isLoading && <Table allUsers={allUsers} formData={formData} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
