import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs-extra';
import { getSerperApiKey } from '../utils/config';

export class WebScrapeTool {
  async scrapeWebsite(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const $ = cheerio.load(response.data);
      
      $('script, style').remove();
      
      const text = $('body').text();
      
      return text.replace(/\s+/g, ' ').trim();
    } catch (error) {
      console.error(`Error scraping website ${url}:`, error);
      return `Error scraping website: ${error}`;
    }
  }
}

export class SearchTool {
  private apiKey: string;

  constructor() {
    this.apiKey = getSerperApiKey();
  }

  async search(query: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://google.serper.dev/search',
        {
          q: query,
          num: 10
        },
        {
          headers: {
            'X-API-KEY': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      const results = response.data.organic || [];
      let searchResults = '';

      results.forEach((result: any, index: number) => {
        searchResults += `Title: ${result.title}\n`;
        searchResults += `Link: ${result.link}\n`;
        searchResults += `Snippet: ${result.snippet}\n`;
        if (index < results.length - 1) {
          searchResults += '---\n';
        }
      });

      return searchResults;
    } catch (error) {
      console.error(`Error searching for "${query}":`, error);
      return `Error performing search: ${error}`;
    }
  }
}

export class FileReadTool {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async readFile(): Promise<string> {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      return content;
    } catch (error) {
      console.error(`Error reading file ${this.filePath}:`, error);
      return `Error reading file: ${error}`;
    }
  }
}

export class SemanticSearchTool {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async searchInFile(query: string): Promise<string> {
    try {
      const content = await fs.readFile(this.filePath, 'utf-8');
      
      const lines = content.split('\n');
      const relevantLines = lines.filter(line => 
        line.toLowerCase().includes(query.toLowerCase())
      );

      return relevantLines.join('\n') || 'No relevant content found';
    } catch (error) {
      console.error(`Error searching in file ${this.filePath}:`, error);
      return `Error searching in file: ${error}`;
    }
  }
} 