import { JobApplicationCrew } from './crew/job-application-crew';
import { JobApplicationInputs } from './types';

const DEFAULT_JOB_APPLICATION_INPUTS: JobApplicationInputs = {
  jobPostingUrl: 'https://jobs.lever.co/AIFund/0d2acaf5-1b5d-4fc7-b00f-d0536066ca5f',
  githubUrl: 'https://github.com/alexandrekumagae',
  personalWriteup: `I am Alexandre Kumagae, a Full-Stack Developer and Software Architect with over 10 years of experience in technologies such as Ruby on Rails, React, Node.js, PHP, MySQL, PostgreSQL, Git, AWS, Docker, Kubernetes, Jenkins, and WordPress. My journey has provided me with a solid technical foundation and a deep understanding of business needs, enabling me to deliver scalable, user-centered digital solutions.

  Currently, I work as a Software Architect and Full-Stack Developer, collaborating on the design of robust and flexible systems that align technical vision with strategic objectives. My approach seeks to solve real problems and generate positive impact, using DevOps practices and modern technologies to deliver high-quality products.
  
  In recent months, I have also taken on the leadership of Artificial Intelligence initiatives at Twygo, working on the implementation and evolution of practical and integrated solutions to add value to the company's products and processes.`
};

async function main() {
  try {
    console.log('🔄 Running Job Application Crew');
    
    const jobApplicationCrew = new JobApplicationCrew(true);
    
    await jobApplicationCrew.kickoff(DEFAULT_JOB_APPLICATION_INPUTS);
  } catch (error) {
    console.error('💥 Sequential execution error:', error);
  }
}

main();

export { JobApplicationCrew, JobApplicationInputs, DEFAULT_JOB_APPLICATION_INPUTS }; 