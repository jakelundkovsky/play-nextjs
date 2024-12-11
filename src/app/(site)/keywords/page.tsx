"use client";

import SideNav from "@/components/SideNav";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Keyword } from "@prisma/client";

type KeywordForm = {
  'keyword-1': string;
  'keyword-2': string;
  'keyword-3': string;
  'keyword-4': string;
  'keyword-5': string;
}

const KeywordsPage = () => {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm<KeywordForm>();
  const userId = (session?.user as any)?.id || '';

  useEffect(() => {
    if (!userId) return;
    
    fetch(`/api/keywords?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        const formValues = data.keywords.reduce((acc: Partial<KeywordForm>, curr: Keyword) => {
          acc[`keyword-${curr.position}` as keyof KeywordForm] = curr.keyword;
          return acc;
        }, {});
        
        reset(formValues);
      })
      .catch(error => console.error('Error fetching keywords:', error));
  }, [userId, reset]);

  const onSubmit = (data: KeywordForm) => {
    const keywordsToSubmit = Object.entries(data).map(([key, value]) => ({
      keyword: value,
      position: parseInt(key.replace('keyword-', '')),
      userId
    }));
    
    fetch('/api/keywords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(keywordsToSubmit)
    });
  };

  return (
    <div className="w-full px-16 pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="flex flex-row gap-4">
        <SideNav />
        <div className="container mx-auto px-4 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {Array.from({ length: 5 }, (_, index) => index + 1).map((num) => (
              <input
                key={`keyword-${num}`}
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
