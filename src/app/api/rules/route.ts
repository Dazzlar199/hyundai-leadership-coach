import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { RuleSet } from '@/types';

const jsonFilePath = path.join(process.cwd(), 'src', 'data', 'rules.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading rules file.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newData: RuleSet = await request.json();
    
    // 간단한 유효성 검사
    if (!newData.version || !newData.values || !newData.prompts) {
      return NextResponse.json({ message: 'Invalid data format.' }, { status: 400 });
    }

    await fs.writeFile(jsonFilePath, JSON.stringify(newData, null, 2), 'utf8');
    
    return NextResponse.json({ message: 'Rules updated successfully.' });
  } catch (error) {
    return NextResponse.json({ message: 'Error writing rules file.' }, { status: 500 });
  }
}
