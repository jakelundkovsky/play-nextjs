"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Faq from "@/components/Faq";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";
import { useSession } from "next-auth/react";

// export const metadata: Metadata = {
//   title:
//     "Pricing Page | Play SaaS Starter Kit and Boilerplate for Next.js",
//   description: "This is pricing page description",
// };

const TestRoutePage = () => {
  const { data: session, status } = useSession();

  console.log({ session, status });

  return (
    <>
      <Breadcrumb pageName="Test Route" />
      <Pricing />
      so theoretically i could go and put all logic right here
      <Faq />
    </>
  );
};

export default TestRoutePage;
