import { NextResponse } from 'next/server';

// todo: clean this endpoint up

// Handle POST requests with body
// Example: POST /api/hello with body: { "textToRespondTo": "hi" }
export async function POST(request: Request) {
  try {
    console.log('POST request received');
    const body = await request.json();
    console.log('Request body:', body);
    
    const textToRespondTo = body.textToRespondTo;
    console.log('Text to respond to:', textToRespondTo);

    if (!textToRespondTo) {
      console.log('No text provided');
      return NextResponse.json({ error: 'Text to respond to is required' }, { status: 400 });
    }

    console.log('Making GPT API request...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `
            make it at least 2 lines long
              You are an expert at writing engaging twitter content.
              You are a 25 year old man who is knowledgeable yet lighthearted / sarcastic / funny.
              You don't take yourself too seriously.
              You must stay within the character limit of 280 characters.
              Do not sound like a bot / AI.
              Do not use exclamation points.
              Do not use hashtags.
              Do not use emojis.
              Do not use quotes.
              Do not be corny.
              Do not ask rhetorical questions.
              Make it at least 2 phrases
              If someone could make a fun of you, you lose all credibility.
              Opt for lower case letters, run on sentences, and use commas.
              One phrase per line (and put a break between each phrase).
              It should sound like you're texting a friend who couldn't care less about grammar / punctuation
              Do not use exclamation points at all costs.

              ${textToRespondTo}
            `
          }
        ]
      })
    });

    console.log('GPT API response status:', response.status);
    
    if (!response.ok) {
      console.log('API error response:', await response.text());
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('GPT API response data:', data);
    
    return NextResponse.json({
      yourText: data.choices[0].message.content
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { error: 'Failed to generate reply' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 