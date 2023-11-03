import React from "react";

import dynamic from "next/dynamic";

export async function fetchStateCityAdvisors() {
  const base64Credentials =
    "N1loTkNHYlhHbjd2eHFBRHBSdmkzSW1EYmNSYlB2bkY6QU51Mm52Y0hsS1EwVXN6eA==";
  const headers = new Headers({
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json"
  });

  const requestOptions = {
    method: "GET",
    headers: headers
  };

  const response = await fetch(
    "https://api.usbank.com/services/wealth-management/advisors/v1/state-city-advisors",
    requestOptions
  );
  const data = await response.json();
  return data;
}

export async function getStaticProps() {
  const data = await fetchStateCityAdvisors();
  return {
    props: { data }
  };
}

const DynamicSimpleForm = dynamic(() => import("./SimpleForm"), {
  loading: () => <p>Loading...</p>, // You can customize this loading component
  ssr: false // Disable server-side rendering for this component
});

const Home = ({ data }) => {
  return (
    <div>
      Home Page
      <DynamicSimpleForm />
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default Home;
