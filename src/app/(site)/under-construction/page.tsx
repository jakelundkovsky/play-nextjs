"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
// import Faq from "@/components/Faq";
import Pricing from "@/components/Pricing";
import PricingBox from "@/components/Pricing/PricingBox";
import { pricingData } from "@/stripe/pricingData";
import { Price } from "@/types/price";

const UnderConstructionPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Thanks for registering!"
        pageDescription="We're putting the final touches on the site now and we'll email you know when it's ready."
        hideBreadcrumb
      />
      <section className="text-center max-w-xl mx-auto mt-2">
        <h3 className="text-2xl font-bold">
          If you&apos;d like to buy the beta pre-release as a lifetime deal, you
          can do so below:
        </h3>
        <br />
      </section>
      <div className="flex justify-center items-center w-full">
        <PricingBox product={LTD_PRICE} />
      </div>
      {/* <Faq /> */}
    </>
  );
};

const LTD_PRICE: Price = {
  id: "price_1Q9nyfFG2n7yOeuGBsc5hdoL", // todo: this is a test price id
  unit_amount: 1 * 100,
  nickname: "Lifetime Deal",
  offers: [
    "1 User",
    "All UI components",
    "Lifetime access",
    "Free updates",
    "Use on 1 (one) project",
    "3 Months support",
  ],
};

export default UnderConstructionPage;
