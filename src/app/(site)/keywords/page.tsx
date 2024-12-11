"use client";

import SideNav from "@/components/SideNav";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

type KeywordForm = {
  keyword1: string;
  keyword2: string;
  keyword3: string;
  keyword4: string;
  keyword5: string;
}

const KeywordsPage = () => {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm<KeywordForm>();

  const onSubmit = (data: KeywordForm) => {
    console.log({data});
    fetch('/api/keywords', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  };

  return (
    <div className="w-full px-16 pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="flex flex-row gap-4">
        <SideNav />
        <div className="container mx-auto px-4 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <input
                key={num}
                {...register(`keyword-${num}` as keyof KeywordForm)}
                className="w-full p-2 border rounded-md"
                placeholder={`Enter keyword ${num}`}
              />
            ))}
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Keywords
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KeywordsPage;
