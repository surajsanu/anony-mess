import { openai } from '@ai-sdk/openai';
import { streamText, UIMessage, convertToModelMessages, generateText } from 'ai';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
  
    const result = await generateText({
        model: openai('gpt-5-mini'),
        prompt: 'Write a poem about a boy and his first pet dog.',
        providerOptions: {
            openai: {
            textVerbosity: 'low', // 'low' for concise, 'medium' (default), or 'high' for verbose
            },
        },
    });
  
    return result;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      // OpenAI API error handling
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      // General error handling
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
}