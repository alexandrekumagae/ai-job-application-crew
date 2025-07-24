import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import * as fs from 'fs-extra';
import { BaseAgent } from './base-agent';
import { WebScrapeTool, SearchTool, FileReadTool, SemanticSearchTool } from '../tools';
import { AgentConfig } from '../types';

export class ResumeStrategist extends BaseAgent {
  private webScraper: WebScrapeTool;
  private searchTool: SearchTool;
  private fileReader: FileReadTool;
  private semanticSearch: SemanticSearchTool;

  constructor() {
    const config: AgentConfig = {
      role: "Resume Strategist for Engineers",
      goal: "Find all the best ways to make a resume stand out in the job market.",
      backstory: "With a strategic mind and an eye for detail, you excel at refining resumes to highlight the most relevant skills and experiences, ensuring they resonate perfectly with the job's requirements.",
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

  async tailorResume(jobRequirements: string, candidateProfile: string): Promise<string> {
    const task = `Using the profile and job requirements obtained from previous tasks, tailor the resume to highlight the most relevant areas. Employ tools to adjust and enhance the resume content. Make sure this is the best resume even but don't make up any information. Update every section, including the initial summary, work experience, skills, and education. All to better reflect the candidates abilities and how it matches the job posting.

    Job Requirements: ${jobRequirements}
    
    Candidate Profile: ${candidateProfile}

    Expected output: An updated resume that effectively highlights the candidate's qualifications and experiences relevant to the job.`;

    const result = await this.execute(task);
    
    await this.saveToFile(result, 'output/tailored_resume.md');
    
    return result;
  }

  private async saveToFile(content: string, fileName: string): Promise<void> {
    try {
      await fs.writeFile(fileName, content, 'utf-8');
      console.log(`Resume saved to ${fileName}`);
    } catch (error) {
      console.error(`Error saving resume to ${fileName}:`, error);
    }
  }
} 