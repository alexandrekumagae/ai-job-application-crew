import { TechJobResearcher } from '../agents/researcher';
import { PersonalProfiler } from '../agents/profiler';
import { ResumeStrategist } from '../agents/resume-strategist';
import { InterviewPreparer } from '../agents/interview-preparer';
import { JobApplicationInputs, CrewResult, AgentResult } from '../types';

export class JobApplicationCrew {
  private researcher: TechJobResearcher;
  private profiler: PersonalProfiler;
  private resumeStrategist: ResumeStrategist;
  private interviewPreparer: InterviewPreparer;
  private verbose: boolean;

  constructor(verbose: boolean = true) {
    this.verbose = verbose;
    this.researcher = new TechJobResearcher();
    this.profiler = new PersonalProfiler();
    this.resumeStrategist = new ResumeStrategist();
    this.interviewPreparer = new InterviewPreparer();
  }

  async kickoff(inputs: JobApplicationInputs): Promise<CrewResult> {
    try {
      if (this.verbose) {
        console.log('🚀 Starting Job Application Crew (Sequential)...');
        console.log('📋 Inputs:', inputs);
      }

      const results: AgentResult[] = [];

      const jobRequirements = await this.researcher.analyzeJobPosting(inputs.jobPostingUrl);
      results.push({
        agentRole: 'Tech Job Researcher',
        taskResult: jobRequirements,
        success: true
      });

      const candidateProfile = await this.profiler.compileProfile(
        inputs.githubUrl, 
        inputs.personalWriteup
      );
      results.push({
        agentRole: 'Personal Profiler for Engineers',
        taskResult: candidateProfile,
        success: true
      });

      const tailoredResume = await this.resumeStrategist.tailorResume(
        jobRequirements,
        candidateProfile
      );
      results.push({
        agentRole: 'Resume Strategist for Engineers',
        taskResult: tailoredResume,
        success: true
      });

      const interviewMaterials = await this.interviewPreparer.prepareInterview(
        jobRequirements,
        candidateProfile,
        tailoredResume
      );
      results.push({
        agentRole: 'Engineering Interview Preparer',
        taskResult: interviewMaterials,
        success: true
      });

      if (this.verbose) {
        console.log('✅ Job Application Crew completed successfully!');
      }

      return {
        results,
        success: true,
        finalOutput: 'Job application crew completed successfully with sequential execution.'
      };

    } catch (error) {
      console.error('❌ Error in Job Application Crew:', error);
      
      return {
        results: [{
          agentRole: 'Crew',
          taskResult: `Error: ${error}`,
          success: false,
          error: error instanceof Error ? error.message : String(error)
        }],
        success: false
      };
    }
  }
} 