import { ChatOpenAI } from '@langchain/openai';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { getOpenAIApiKey, getOpenAIModelName } from '../utils/config';
import { AgentConfig } from '../types';

export class BaseAgent {
  protected config: AgentConfig;
  protected llm: ChatOpenAI;
  protected tools: DynamicStructuredTool[];
  protected agent: AgentExecutor | null = null;

  constructor(config: AgentConfig) {
    this.config = config;
    this.llm = new ChatOpenAI({
      modelName: getOpenAIModelName(),
      temperature: 0.1,
      openAIApiKey: getOpenAIApiKey(),
    });
    this.tools = [];
  }

  protected createPrompt(): ChatPromptTemplate {
    return ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are a ${this.config.role}.
        
        Goal: ${this.config.goal}
        
        Backstory: ${this.config.backstory}
        
        You are working with a team of AI agents to complete tasks. 
        Use the available tools to gather information and complete your assigned tasks.
        Always provide detailed and accurate responses.`
      ],
      ['human', '{input}'],
      new MessagesPlaceholder('agent_scratchpad'),
    ]);
  }

  async initialize(): Promise<void> {
    const prompt = this.createPrompt();
    const agent = await createOpenAIFunctionsAgent({
      llm: this.llm,
      tools: this.tools,
      prompt,
    });

    this.agent = new AgentExecutor({
      agent,
      tools: this.tools,
      verbose: this.config.verbose,
    });
  }

  async execute(input: string): Promise<string> {
    if (!this.agent) {
      await this.initialize();
    }

    try {
      const result = await this.agent!.invoke({
        input: input,
      });

      return result.output;
    } catch (error) {
      console.error(`Error executing agent ${this.config.role}:`, error);
      throw error;
    }
  }
} 