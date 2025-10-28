import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY, // Store your key in .env
});

export async function POST(req: Request) {
  try {
    // const { messages }: { messages: UIMessage[] } = await req.json();
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be short like maximum 5-6 words separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
  
    const result = await generateText({
        model: openrouter('nvidia/nemotron-nano-9b-v2:free'),
        prompt,
        providerOptions: {
            openai: {
            textVerbosity: 'low', // 'low' for concise, 'medium' (default), or 'high' for verbose
            },
        },
    });
   return NextResponse.json({ text: result.text });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      console.error('An unexpected error occurred:', error);
      return NextResponse.json(
        { error: 'Internal Server Error', details: (error as Error).message },
        { status: 500 }
      );
    }
  }
}