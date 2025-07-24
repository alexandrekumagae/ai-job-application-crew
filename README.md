# 🤖 Job Application Multi-Agent System

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Langchain](https://img.shields.io/badge/Langchain-00FF00?style=for-the-badge&logo=langchain&logoColor=black)](https://js.langchain.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> **Sistema multi-agente de IA para automatizar e otimizar candidaturas de emprego usando TypeScript e Langchain**

Um sistema avançado de IA que utiliza múltiplos agentes especializados para analisar vagas de emprego, personalizar currículos e preparar candidatos para entrevistas. Desenvolvido com TypeScript e Langchain, oferece performance otimizada e flexibilidade total.

## ✨ Funcionalidades

- 🔍 **Análise Inteligente de Vagas**: Extração automática de requisitos e qualificações
- 👤 **Perfilamento Avançado**: Análise de GitHub e informações pessoais
- 📝 **Personalização de Currículo**: Adaptação automática baseada nos requisitos da vaga
- 🎤 **Preparação para Entrevistas**: Geração de perguntas e pontos de discussão

## 🏗️ Arquitetura

```
src/
├── agents/                    # 🤖 Agentes especializados
│   ├── baseAgent.ts          # Classe base para todos os agentes
│   ├── researcher.ts         # Análise de vagas de emprego
│   ├── profiler.ts           # Perfilamento de candidatos
│   ├── resumeStrategist.ts   # Estratégia de currículo
│   └── interviewPreparer.ts  # Preparação para entrevistas
├── tools/                    # 🔧 Ferramentas e utilitários
│   └── index.ts              # Web scraping, busca, leitura de arquivos
├── crew/                     # 🎯 Orquestração dos agentes
│   └── jobApplicationCrew.ts # Coordenador principal
├── types/                    # 📋 Interfaces TypeScript
├── utils/                    # ⚙️ Configurações e utilitários
└── index.ts                  # 🚀 Ponto de entrada da aplicação
```

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**
- **Chaves de API**:
  - OpenAI API Key
  - Serper API Key (para busca web)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/job-application-agents-ts.git
cd job-application-agents-ts
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env
```

Edite o arquivo `.env`:
```env
OPENAI_API_KEY=sua_chave_openai_aqui
SERPER_API_KEY=sua_chave_serper_aqui
OPENAI_MODEL_NAME=gpt-4.1-mini
```

4. **Compile o projeto**
```bash
npm run build
```

### Uso Básico

```bash
# Execução padrão
npm start

# Execução em modo desenvolvimento
npm run dev

```

## 🤖 Agentes do Sistema

### 🔍 Tech Job Researcher
**Responsabilidade**: Análise profunda de vagas de emprego

- **Ferramentas**: Web scraping, busca web
- **Entrada**: URL da vaga
- **Saída**: Análise estruturada de requisitos e qualificações

### 👤 Personal Profiler
**Responsabilidade**: Compilação de perfil do candidato

- **Ferramentas**: Análise de GitHub, busca semântica
- **Entrada**: GitHub URL + descrição pessoal
- **Saída**: Perfil profissional detalhado

### 📝 Resume Strategist
**Responsabilidade**: Personalização inteligente de currículo

- **Ferramentas**: Análise cruzada de requisitos e perfil
- **Entrada**: Requisitos da vaga + perfil do candidato
- **Saída**: Currículo personalizado (`tailored_resume.md`)

### 🎤 Interview Preparer
**Responsabilidade**: Preparação para entrevistas

- **Ferramentas**: Análise de currículo e requisitos
- **Entrada**: Todos os dados anteriores
- **Saída**: Materiais de entrevista (`interview_materials.md`)

## 🔧 Ferramentas Disponíveis

| Ferramenta | Descrição | Uso |
|------------|-----------|-----|
| `WebScrapeTool` | Web scraping com Cheerio | Extração de conteúdo de vagas |
| `SearchTool` | Busca web via Serper API | Pesquisa de informações |
| `FileReadTool` | Leitura de arquivos | Acesso a currículos |
| `SemanticSearchTool` | Busca semântica | Análise de conteúdo |

## 📊 Saídas do Sistema

### 📄 tailored_resume.md
Currículo personalizado que destaca:
- Experiências relevantes à vaga
- Habilidades alinhadas aos requisitos
- Formatação profissional
- Palavras-chave otimizadas

### 📋 interview_materials.md
Materiais de preparação incluindo:
- Perguntas técnicas esperadas
- Pontos de discussão estratégicos
- Exemplos de projetos relevantes
- Dicas de apresentação