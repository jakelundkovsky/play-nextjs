"use client";

import SideNav from "@/components/SideNav";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Keyword } from "@prisma/client";
import toast from 'react-hot-toast';

type KeywordForm = {
  'keyword-1': string;
  'keyword-2': string;
  'keyword-3': string;
  'keyword-4': string;
  'keyword-5': string;
}

const KeywordsPage = () => {
  const { data: session } = useSession();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<KeywordForm>();
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
      .catch(error => {
        console.error('Error fetching keywords:', error);
        toast.error('Failed to load keywords');
      });
  }, [userId, reset]);

  const onSubmit = async (data: KeywordForm) => {
    try {
      const keywordsToSubmit = Object.entries(data).map(([key, value]) => ({
        keyword: value,
        position: parseInt(key.replace('keyword-', '')),
        userId
      }));
      
      const response = await fetch('/api/keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(keywordsToSubmit)
      });

      if (!response.ok) {
        throw new Error('Failed to save keywords');
      }

      toast.success('Keywords saved successfully');
    } catch (error) {
      console.error('Error saving keywords:', error);
      toast.error('Failed to save keywords');
    }
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
              disabled={isSubmitting}
              className={`w-full p-2 rounded-md transition-colors ${
                isSubmitting 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Keywords'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KeywordsPage;
