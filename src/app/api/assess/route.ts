import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { analyzeLeadership } from '@/lib/openai';

const jsonFilePath = path.join(process.cwd(), 'src', 'data', 'rules.json');

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    if (!text || typeof text !== 'string' || text.length < 50) {
      return NextResponse.json({ message: 'Invalid input text.' }, { status: 400 });
    }

    // Admin에서 수정한 최신 프롬프트를 사용
    const rulesFile = await fs.readFile(jsonFilePath, 'utf8');
    const rules = JSON.parse(rulesFile);
    const systemPrompt = rules.prompts.assess;
    
    const analysisResult = await analyzeLeadership(text, systemPrompt);

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error('[API Assess Error]', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
