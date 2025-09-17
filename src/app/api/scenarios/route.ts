import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { generateScenario } from '@/lib/openai';

const jsonFilePath = path.join(process.cwd(), 'src', 'data', 'rules.json');

export async function POST(request: NextRequest) {
  try {
    const { situation, tone, turns } = await request.json();
    
    // Admin에서 수정한 최신 프롬프트를 사용
    const rulesFile = await fs.readFile(jsonFilePath, 'utf8');
    const rules = JSON.parse(rulesFile);
    const systemPrompt = rules.prompts.scenario;

    const scenarioResult = await generateScenario({ situation, tone, turns, systemPrompt });

    if (!scenarioResult) {
      throw new Error("AI did not return a scenario script.");
    }

    return NextResponse.json(scenarioResult);
  } catch (error) {
    console.error('Scenarios API Error:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
