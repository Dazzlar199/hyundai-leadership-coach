# 리더십 코칭 웹앱 (MVP)

이 프로젝트는 AI 기반의 리더십 코칭 웹앱의 최소 기능 제품(MVP)입니다. 사용자는 자신의 리더십 스타일을 진단하고, 맞춤형 코칭을 받으며, 가상 대화 시나리오를 통해 실전 연습을 할 수 있습니다.

## 주요 기능

- **/assess**: 텍스트 입력을 통해 리더십 성향을 10대 핵심 가치 기준으로 분석하고, 점수, 근거, 개선 미션을 제공합니다.
- **/coach**: 10대 가치별 상세 코칭 카드와 실행 체크리스트를 탐색할 수 있는 라이브러리입니다.
- **/scenarios**: 원하는 상황을 설정하면 AI가 리더-구성원 간의 대화 시나리오를 생성해줍니다.
- **/voice**: 음성으로 리더십에 대해 질문하면 AI가 음성으로 답변해주는 인터랙티브 코칭 기능입니다.
- **/admin**: 앱의 핵심 데이터인 10대 가치, 정책, AI 프롬프트를 직접 수정하고 파일에 저장할 수 있는 관리자 페이지입니다.

## 기술 스택

- **프레임워크**: Next.js (App Router)
- **언어**: TypeScript
- **UI**: Tailwind CSS, shadcn/ui
- **상태 관리**: Zustand
- **폼**: React Hook Form, Zod
- **차트**: Recharts
- **Markdown**: react-markdown
- **AI**: OpenAI API (gpt-4o)
- **데이터**: 파일 기반 Mock Data (`./src/data/*.json`)

## 시작하기

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고, 발급받은 OpenAI API 키를 입력합니다.

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. 개발 서버 실행

```bash
npm run dev
```

이제 브라우저에서 `http://localhost:3000`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 불명확한 부분에 대한 가정

- **사용자 인증**: MVP 범위에서는 사용자 인증 및 프로필 기능을 구현하지 않았습니다. 모든 데이터는 로컬 상태로 관리됩니다.
- **데이터베이스**: 실제 DB 대신 파일 시스템 (`.json` 파일)을 데이터 소스로 사용했습니다. Admin 페이지에서 이 파일을 직접 수정할 수 있습니다.
- **STT/TTS API**: Voice 페이지의 음성 인식(STT) 및 음성 합성(TTS) 기능은 실제 API를 연동하지 않고, 브라우저 내장 Web Audio API와 SpeechSynthesis API를 사용한 모의 기능으로 구현되었습니다.
- **이미지 저작권**: UI에 사용된 이미지는 Placeholder이며, 실제 서비스 시에는 저작권이 확보된 이미지로 교체해야 합니다.
