import React from "react";

import { Helmet } from "react-helmet";
const Layout = ({ children, title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
      <main style={{ minHeight: "70vh" }}>

        {children}
      </main>
    </div>
  );
};

Layout.defaultProps = {
  title: "AI Dekho - Find The Best AI Tools & Websites",
  description: "AI Dekho is a free website to help you discover top AI tools and software, making your work and life more  productive.",
  keywords: "aidekho, aitools, gpts, plugins, gpttools, aitoollist, totalAi",
};

export default Layout;