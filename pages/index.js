import Layout from "../components/Layout";
import Table from "../components/Table";
import { useAllUserQuery, usePostUserMutation } from "../store/fetcherApi";
import RegisterDoctor from "../components/RegisterDoctor";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../components/Loading";

export default function Home() {
  const { data: allUsers, isLoading } = useAllUserQuery();
  const [secondTableBodyData, setSecondTableBodyData] = useState([]);
  const [postUser] = usePostUserMutation();

  //Function to submit form in RegisterDoctor component
  const submitForm = (values, { resetForm }) => {
    postUser(values);
    toast.success("Doctor registered successfully");
    setSecondTableBodyData((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields.unshift({
        name: values.name,
        username: values.username,
        email: values.email,
        phone: values.phone,
        city: values.city,
        website: values.website,
      });
      return updatedFields;
    });
    resetForm({ values: "" });
  };

  return (
    <Layout>
      <div>
        <RegisterDoctor submitForm={submitForm} />
        {isLoading && !allUsers && !secondTableBodyData && <Loading />}
        {allUsers && !isLoading && secondTableBodyData && (
          <Table allUsers={allUsers} secondTableBodyData={secondTableBodyData} />
        )}
      </div>
    </Layout>
  );
}
