export interface AgentConfig {
  role: string;
  goal: string;
  backstory: string;
  tools: string[];
  verbose: boolean;
}

export interface TaskConfig {
  description: string;
  expectedOutput: string;
  outputFile?: string;
  context?: string[];
  agentRole: string;
  asyncExecution?: boolean;
}

export interface JobApplicationInputs {
  jobPostingUrl: string;
  githubUrl: string;
  personalWriteup: string;
}

export interface AgentResult {
  agentRole: string;
  taskResult: string;
  success: boolean;
  error?: string;
}

export interface CrewResult {
  results: AgentResult[];
  success: boolean;
  finalOutput?: string;
} 