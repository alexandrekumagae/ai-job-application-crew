import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import * as fs from 'fs-extra';
import { BaseAgent } from './base-agent';
import { WebScrapeTool, SearchTool, FileReadTool, SemanticSearchTool } from '../tools';
import { AgentConfig } from '../types';

export class InterviewPreparer extends BaseAgent {
  private webScraper: WebScrapeTool;
  private searchTool: SearchTool;
  private fileReader: FileReadTool;
  private semanticSearch: SemanticSearchTool;

  constructor() {
    const config: AgentConfig = {
      role: "Engineering Interview Preparer",
      goal: "Create interview questions and talking points based on the resume and job requirements",
      backstory: "Your role is crucial in anticipating the dynamics of interviews. With your ability to formulate key questions and talking points, you prepare candidates for success, ensuring they can confidently address all aspects of the job they are applying for.",
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

  async prepareInterview(
    jobRequirements: string, 
    candidateProfile: string, 
    tailoredResume: string
  ): Promise<string> {
    const task = `Create a set of potential interview questions and talking points based on the tailored resume and job requirements. Utilize tools to generate relevant questions and discussion points. Make sure to use these questions and talking points to help the candidate highlight the main points of the resume and how it matches the job posting.

    Job Requirements: ${jobRequirements}
    
    Candidate Profile: ${candidateProfile}
    
    Tailored Resume: ${tailoredResume}

    Expected output: A document containing key questions and talking points that the candidate should prepare for the initial interview.`;

    const result = await this.execute(task);
    
    await this.saveToFile(result, 'output/interview_materials.md');
    
    return result;
  }

  private async saveToFile(content: string, fileName: string): Promise<void> {
    try {
      await fs.writeFile(fileName, content, 'utf-8');
      console.log(`Interview materials saved to ${fileName}`);
    } catch (error) {
      console.error(`Error saving interview materials to ${fileName}:`, error);
    }
  }
} 