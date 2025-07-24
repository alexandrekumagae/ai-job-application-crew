import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { BaseAgent } from './base-agent';
import { WebScrapeTool, SearchTool, FileReadTool, SemanticSearchTool } from '../tools';
import { AgentConfig } from '../types';

export class PersonalProfiler extends BaseAgent {
  private webScraper: WebScrapeTool;
  private searchTool: SearchTool;
  private fileReader: FileReadTool;
  private semanticSearch: SemanticSearchTool;

  constructor() {
    const config: AgentConfig = {
      role: "Personal Profiler for Engineers",
      goal: "Do incredible research on job applicants to help them stand out in the job market",
      backstory: "Equipped with analytical prowess, you dissect and synthesize information from diverse sources to craft comprehensive personal and professional profiles, laying the groundwork for personalized resume enhancements.",
      tools: ["scrape_tool", "search_tool", "read_resume", "semantic_search_resume"],
      verbose: true
    };

    super(config);
    this.webScraper = new WebScrapeTool();
    this.searchTool = new SearchTool();
    this.fileReader = new FileReadTool('./fake_resume.md');
    this.semanticSearch = new SemanticSearchTool('./fake_resume.md');
    this.setupTools();
  }

  private setupTools(): void {
    const scrapeTool = new DynamicStructuredTool({
      name: "scrape_website",
      description: "Scrape content from a website URL",
      schema: z.object({
        url: z.string().describe("The URL to scrape"),
      }),
      func: async ({ url }) => {
        return await this.webScraper.scrapeWebsite(url);
      },
    });

    const searchTool = new DynamicStructuredTool({
      name: "search_internet",
      description: "Search the internet for information",
      schema: z.object({
        query: z.string().describe("The search query"),
      }),
      func: async ({ query }) => {
        return await this.searchTool.search(query);
      },
    });

    const readResume = new DynamicStructuredTool({
      name: "read_resume",
      description: "Read the candidate's resume file",
      schema: z.object({}),
      func: async () => {
        return await this.fileReader.readFile();
      },
    });

    const semanticSearchResume = new DynamicStructuredTool({
      name: "semantic_search_resume",
      description: "Search for specific information in the resume",
      schema: z.object({
        query: z.string().describe("The search query"),
      }),
      func: async ({ query }) => {
        return await this.semanticSearch.searchInFile(query);
      },
    });

    this.tools = [scrapeTool, searchTool, readResume, semanticSearchResume];
  }

  async compileProfile(githubUrl: string, personalWriteup: string): Promise<string> {
    const task = `Compile a detailed personal and professional profile using the GitHub (${githubUrl}) URLs, and personal write-up (${personalWriteup}). Utilize tools to extract and synthesize information from these sources.

    Expected output: A comprehensive profile document that includes skills, project experiences, contributions, interests, and communication style.`;

    return await this.execute(task);
  }
} 