import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { promises as fs } from 'fs';
import path from 'path';

let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const jsonFilePath = path.join(process.cwd(), 'src', 'data', 'rules.json');

export async function POST(request: NextRequest) {
  if (!openai) {
    return NextResponse.json({ message: 'OpenAI API key is not configured.' }, { status: 500 });
  }

  try {
    const { messages, userContext } = await request.json();

    const rulesFile = await fs.readFile(jsonFilePath, 'utf8');
    const rules = JSON.parse(rulesFile);
    
    // Construct the system prompt from the structured persona object
    const persona = rules.prompts.coach_persona;
    const systemPrompt = `
      You are ${persona.name}, ${persona.role}.
      Follow these instructions strictly:
      ${persona.instructions.map((inst: string) => `- ${inst}`).join('\n')}
      Adhere to these constraints:
      ${persona.constraints.map((constraint: string) => `- ${constraint}`).join('\n')}
    `.trim();

    const initialMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `팀원인 제가 겪은 상황은 다음과 같습니다: "${userContext}" 이 상황에 대해 대화를 시작해주세요.`
      }
    ];

    // If there's a history, filter out the initial user context message to avoid duplication
    const history = messages.length > 1 ? messages.slice(1) : [];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [...initialMessages, ...history],
      temperature: 0.7,
      stream: false,
    });

    const botMessage = response.choices[0].message.content;

    return NextResponse.json({ message: botMessage });

  } catch (error) {
    console.error('[API Chat Error]', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
