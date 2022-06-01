import Layout from "../components/Layout";
import "react-phone-number-input/style.css";
import Table from "../components/Table";
import { useAllUserQuery, usePostUserMutation } from "../store/fetcherApi";
import RegisterDoctor from "../components/RegisterDoctor";

export default function Home() {
  const { data: allUsers, isLoading } = useAllUserQuery();

  return (
    <Layout>
      <div>
        <RegisterDoctor />
        {isLoading && !allUsers && <p>Loading</p>}
        {allUsers && !isLoading && <Table allUsers={allUsers} />}
      </div>
    </Layout>
  );
}
