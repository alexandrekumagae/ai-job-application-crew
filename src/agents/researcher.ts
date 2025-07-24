import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { BaseAgent } from './base-agent';
import { WebScrapeTool, SearchTool } from '../tools';
import { AgentConfig } from '../types';

export class TechJobResearcher extends BaseAgent {
  private webScraper: WebScrapeTool;
  private searchTool: SearchTool;

  constructor() {
    const config: AgentConfig = {
      role: "Tech Job Researcher",
      goal: "Make sure to do amazing analysis on job posting to help job applicants",
      backstory: "As a Job Researcher, your prowess in navigating and extracting critical information from job postings is unmatched. Your skills help pinpoint the necessary qualifications and skills sought by employers, forming the foundation for effective application tailoring.",
      tools: ["scrape_tool", "search_tool"],
      verbose: true
    };

    super(config);
    this.webScraper = new WebScrapeTool();
    this.searchTool = new SearchTool();
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

    this.tools = [scrapeTool, searchTool];
  }

  async analyzeJobPosting(jobPostingUrl: string): Promise<string> {
    const task = `Analyze the job posting URL provided (${jobPostingUrl}) to extract key skills, experiences, and qualifications required. Use the tools to gather content and identify and categorize the requirements.

    Expected output: A structured list of job requirements, including necessary skills, qualifications, and experiences.`;

    return await this.execute(task);
  }
} 