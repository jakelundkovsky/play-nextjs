"use client";

import SideNav from "@/components/SideNav";
import TweetCard from "@/components/TweetCard";
import { useSession } from "next-auth/react";

const tweets = [
  {
    text: "Next.js is an amazing framework for building modern web apps",
    highlights: ["Next.js", "modern web apps"],
    tweetUrl: "https://x.com/elonmusk/status/1866338423252127764",
  },
  {
    text: "TypeScript makes JavaScript development so much better",
    highlights: ["TypeScript", "JavaScript"],
    tweetUrl: "https://x.com/elonmusk/status/1866338423252127764",
  },
  {
    text: "Tailwind CSS is a game changer for rapid UI development",
    highlights: ["Tailwind CSS", "UI development"],
    tweetUrl: "https://x.com/elonmusk/status/1866338423252127764",
  },
  {
    text: "React Hooks have revolutionized state management",
    highlights: ["React Hooks", "state management"],
    tweetUrl: "https://x.com/elonmusk/status/1866338423252127764",
  },
  {
    text: "Vercel deployment makes shipping web apps a breeze",
    highlights: ["Vercel", "web apps"],
    tweetUrl: "https://x.com/elonmusk/status/1866338423252127764",
  }
];

const TestRoutePage = () => {
  const { data: session, status } = useSession();

  return (
    <div className="w-full px-16 pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="flex flex-row gap-4">
        <SideNav />
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6">
            {tweets.map((tweet, index) => (
              <TweetCard 
                key={index}
                text={tweet.text}
                highlights={tweet.highlights}
                tweetUrl={tweet.tweetUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestRoutePage;
