import Head from "next/head";
import Header from "./Header";

const Layout = ({ title, description, keywords, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};

Layout.defaultProps = {
  title: "SeamHealth",
  description: "SeamHealth website",
  keywords: "SeamHealth, SeamHealth website",
};

export default Layout;
