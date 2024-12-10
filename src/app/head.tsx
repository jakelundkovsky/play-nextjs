export default function Head() {
  return (
    <>
      <title>
      Play Next.js - SaaS Starter Kit and Boilerplate for Next.js
      </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="This SaaS Boilerplate and Starter Kit for Next.js is designed specifically for SaaS startups. It's a free resource complete with all the necessary integrations, pages, and components you require to build and launch a comprehensive SaaS website with robust features." />
      {/* todo: clean this up */}
      <meta 
        httpEquiv="Content-Security-Policy" 
        content="default-src 'self'; connect-src 'self' http://localhost:3000 https://api.anthropic.com https://play-nextjs-taupe.vercel.app; script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'self'; style-src 'self' 'unsafe-inline'; media-src *"
      />
      <link rel="icon" href="/images/favicon.ico" />
    </>
  );
}
