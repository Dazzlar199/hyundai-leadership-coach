import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import rules from '@/data/rules.json';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, userContext } = await req.json();
    const { initialText, tone } = userContext;

    // Type assertion for tones
    const tones: Record<string, string> = rules.prompts.tones;
    const toneInstruction = tone ? tones[tone] : tones['balanced'];

    // Construct the system prompt from the structured persona object
    const persona = rules.prompts.coach_persona;
    const systemPrompt = `
      You are ${persona.name}, ${persona.role}.
      Follow these instructions strictly:
      ${persona.instructions.map((inst: string) => `- ${inst}`).join('\n')}
      
      Your current conversational tone must be as follows:
      - ${toneInstruction}

      Adhere to these constraints:
      ${persona.constraints.map((constraint: string) => `- ${constraint}`).join('\n')}
    `.trim();

    const initialMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Here is the situation I want to discuss:\n\n${initialText}` },
    ];

    const allMessages = messages.length > 0 ?
      [{ role: 'system', content: systemPrompt }, ...messages] :
      initialMessages;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: allMessages,
      temperature: 0.8,
      stream: false,
    });

    const assistantMessage = response.choices[0].message;

    return NextResponse.json({ message: assistantMessage });

  } catch (error) {
    console.error('Chat API Error:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
