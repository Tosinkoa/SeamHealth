export const Column = [
  { Header: " Name", accessor: "name" },

  { Header: "Username", accessor: "username" },
  { Header: "Email", accessor: "email" },
  { Header: "Phone", accessor: "phone" },
  { Header: "City", accessor: (d) => <p>{d.address.city}</p> },
  { Header: "Website", accessor: "website" },
];