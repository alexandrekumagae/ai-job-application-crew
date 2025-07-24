# 🤖 Job Application Multi-Agent System

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Langchain](https://img.shields.io/badge/Langchain-00FF00?style=for-the-badge&logo=langchain&logoColor=black)](https://js.langchain.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **AI multi-agent system to automate and optimize job applications using TypeScript and Langchain**

An advanced AI system that uses multiple specialized agents to analyze job postings, customize resumes, and prepare candidates for interviews. Developed with TypeScript and Langchain, it offers optimized performance and total flexibility.

## ✨ Features

- 🔍 **Intelligent Job Analysis**: Automatic extraction of requirements and qualifications
- 👤 **Advanced Profiling**: GitHub analysis and personal information
- 📝 **Resume Customization**: Automatic adaptation based on job requirements
- 🎤 **Interview Preparation**: Generation of questions and discussion points

## 🏗️ Architecture

```
src/
├── agents/                    # 🤖 Specialized agents
│   ├── base-agent.ts          # Base class for all agents
│   ├── researcher.ts         # Job posting analysis
│   ├── profiler.ts           # Candidate profiling
│   ├── resume-strategist.ts   # Resume strategy
│   └── interview-preparer.ts  # Interview preparation
├── tools/                    # 🔧 Tools and utilities
│   └── index.ts              # Web scraping, search, file reading
├── crew/                     # 🎯 Agent orchestration
│   └── job-application-crew.ts # Main coordinator
├── types/                    # 📋 TypeScript interfaces
├── utils/                    # ⚙️ Configuration and utilities
└── index.ts                  # 🚀 Application entry point
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **API Keys**:
  - OpenAI API Key
  - Serper API Key (for web search)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/seu-usuario/job-application-agents-ts.git
cd job-application-agents-ts
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp env.example .env
```

Edit the `.env` file:
```env
OPENAI_API_KEY=your_openai_key_here
SERPER_API_KEY=your_serper_key_here
OPENAI_MODEL_NAME=gpt-4.1-mini
```

4. **Build the project**
```bash
npm run build
```

### Basic Usage

```bash
# Standard execution
npm start

# Development mode execution
npm run dev

```

## 🤖 System Agents

### 🔍 Tech Job Researcher
**Responsibility**: Deep analysis of job postings

- **Tools**: Web scraping, web search
- **Input**: Job posting URL
- **Output**: Structured analysis of requirements and qualifications

### 👤 Personal Profiler
**Responsibility**: Candidate profile compilation

- **Tools**: GitHub analysis, semantic search
- **Input**: GitHub URL + personal description
- **Output**: Detailed professional profile

### 📝 Resume Strategist
**Responsibility**: Intelligent resume customization

- **Tools**: Cross-analysis of requirements and profile
- **Input**: Job requirements + candidate profile
- **Output**: Customized resume (`tailored_resume.md`)

### 🎤 Interview Preparer
**Responsibility**: Interview preparation

- **Tools**: Resume and requirements analysis
- **Input**: All previous data
- **Output**: Interview materials (`interview_materials.md`)

## 🔧 Available Tools

| Tool | Description | Usage |
|------|-------------|-------|
| `WebScrapeTool` | Web scraping with Cheerio | Job posting content extraction |
| `SearchTool` | Web search via Serper API | Information research |
| `FileReadTool` | File reading | Resume access |
| `SemanticSearchTool` | Semantic search | Content analysis |

## 📊 System Outputs

### 📄 tailored_resume.md
Customized resume that highlights:
- Experiences relevant to the job
- Skills aligned with requirements
- Professional formatting
- Optimized keywords

### 📋 interview_materials.md
Preparation materials including:
- Expected technical questions
- Strategic discussion points
- Relevant project examples
- Presentation tips