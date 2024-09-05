export type GroupType =
	| "Hackathon"
	| "Project"
	| "Startup";

export const GroupTypeArray = [
	"Hackathon",
	"Project",
	"Startup"
] as const;

export type TimeZone = 
    | "Pacific Time (PT)"
    | "Mountain Time (MT)"
    | "Central Time (CT)"
    | "Eastern Time (ET)"
    | "Greenwich Mean Time (GMT)"
    | "Central European Time (CET)"
    | "Indian Standard Time (IST)"
    | "Japan Standard Time (JST)"
    | "Australian Eastern Time (AET)"
    | "Other";

export const TimeZoneArray = [
    "Pacific Time (PT)",
    "Mountain Time (MT)",
    "Central Time (CT)",
    "Eastern Time (ET)",
    "Greenwich Mean Time (GMT)",
    "Central European Time (CET)",
    "Indian Standard Time (IST)",
    "Japan Standard Time (JST)",
    "Australian Eastern Time (AET)",
    "Other"
] as const;

export type Skill = 
    | 'Frontend Development'
    | 'Backend Development'
    | 'Full Stack Development'
    | 'Mobile App Development'
    | 'Data Science'
    | 'Machine Learning'
    | 'Artificial Intelligence'
    | 'DevOps'
    | 'Cloud Computing'
    | 'Cybersecurity'
    | 'Database Management'
    | 'Blockchain Development'
    | 'Game Development'
    | 'UI/UX Design'
    | 'Embedded Systems'
    | 'Software Testing'
    | 'Data Engineering'
    | 'Networking'
    | 'Systems Architecture'
    | 'API Development'
    | 'Web Development'
    | 'Robotics'
    | 'Big Data'
    | 'AR/VR Development';

export const SkillArray = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Mobile App Development',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'DevOps',
    'Cloud Computing',
    'Cybersecurity',
    'Database Management',
    'Blockchain Development',
    'Game Development',
    'UI/UX Design',
    'Embedded Systems',
    'Software Testing',
    'Data Engineering',
    'Networking',
    'Systems Architecture',
    'API Development',
    'Web Development',
    'Robotics',
    'Big Data',
    'AR/VR Development',
] as const;


export type TechStack = 
    | 'JavaScript'
    | 'TypeScript'
    | 'Python'
    | 'Java'
    | 'C++'
    | 'C#'
    | 'Ruby'
    | 'PHP'
    | 'Swift'
    | 'Kotlin'
    | 'Go'
    | 'Rust'
    | 'HTML'
    | 'CSS'
    | 'Sass'
    | 'LESS'
    | 'Node.js'
    | 'React'
    | 'Angular'
    | 'Vue.js'
    | 'Svelte'
    | 'Next.js'
    | 'Nuxt.js'
    | 'Express'
    | 'Django'
    | 'Flask'
    | 'Ruby on Rails'
    | 'Spring'
    | 'Laravel'
    | 'ASP.NET'
    | 'Bootstrap'
    | 'Tailwind CSS'
    | 'jQuery'
    | 'Redux'
    | 'GraphQL'
    | 'Apollo'
    | 'MySQL'
    | 'PostgreSQL'
    | 'MongoDB'
    | 'Firebase'
    | 'Docker'
    | 'Kubernetes'
    | 'AWS'
    | 'Azure'
    | 'Google Cloud'
    | 'Terraform'
    | 'Ansible'
    | 'Jenkins'
    | 'Git'
    | 'GitHub'
    | 'GitLab'
    | 'Bitbucket'
    | 'Webpack'
    | 'Babel'
    | 'Vite'
    | 'Gulp'
    | 'Gradle'
    | 'Maven'
    | 'Yarn'
    | 'NPM'
    | 'Unity'
    | 'Unreal Engine'
    | 'TensorFlow'
    | 'PyTorch'
    | 'Scikit-learn'
    | 'Pandas'
    | 'NumPy'
    | 'Hadoop'
    | 'Spark'
    | 'Elasticsearch'
    | 'Redis'
    | 'RabbitMQ'
    | 'Kafka';

export const TechStackArray = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Ruby',
    'PHP',
    'Swift',
    'Kotlin',
    'Go',
    'Rust',
    'HTML',
    'CSS',
    'Sass',
    'LESS',
    'Node.js',
    'React',
    'Angular',
    'Vue.js',
    'Svelte',
    'Next.js',
    'Nuxt.js',
    'Express',
    'Django',
    'Flask',
    'Ruby on Rails',
    'Spring',
    'Laravel',
    'ASP.NET',
    'Bootstrap',
    'Tailwind CSS',
    'jQuery',
    'Redux',
    'GraphQL',
    'Apollo',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Firebase',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'Google Cloud',
    'Terraform',
    'Ansible',
    'Jenkins',
    'Git',
    'GitHub',
    'GitLab',
    'Bitbucket',
    'Webpack',
    'Babel',
    'Vite',
    'Gulp',
    'Gradle',
    'Maven',
    'Yarn',
    'NPM',
    'Unity',
    'Unreal Engine',
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Pandas',
    'NumPy',
    'Hadoop',
    'Spark',
    'Elasticsearch',
    'Redis',
    'RabbitMQ',
    'Kafka',
] as const;


export type Commitment = 
    | '1-5 hours per week'
    | '6-10 hours per week'
    | '11-15 hours per week'
    | '16-20 hours per week'
    | '20+ hours per week';

export const CommitmentArray = [
    '1-5 hours per week',
    '6-10 hours per week',
    '11-15 hours per week',
    '16-20 hours per week',
    '20+ hours per week',
] as const;

export type Role = 
    | 'Software Engineer'
    | 'Frontend Developer'
    | 'Backend Developer'
    | 'Full Stack Developer'
    | 'UI/UX Designer'
    | 'Product Manager'
    | 'Project Manager'
    | 'Quality Assurance (QA) Engineer'
    | 'DevOps Engineer'
    | 'Data Scientist'
    | 'Data Engineer'
    | 'Machine Learning Engineer'
    | 'Systems Architect'
    | 'Database Administrator'
    | 'Technical Lead'
    | 'Scrum Master'
    | 'Business Analyst'
    | 'Site Reliability Engineer (SRE)'
    | 'Security Engineer'
    | 'Mobile Developer'
    | 'Game Developer'
    | 'Cloud Engineer'
    | 'Research Scientist'
    | 'Technical Writer'
    | 'Support Engineer'
    | 'Operations Engineer'
    | 'Software Tester'
    | 'User Researcher';

export const RoleArray = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Product Manager',
    'Project Manager',
    'Quality Assurance (QA) Engineer',
    'DevOps Engineer',
    'Data Scientist',
    'Data Engineer',
    'Machine Learning Engineer',
    'Systems Architect',
    'Database Administrator',
    'Technical Lead',
    'Scrum Master',
    'Business Analyst',
    'Site Reliability Engineer (SRE)',
    'Security Engineer',
    'Mobile Developer',
    'Game Developer',
    'Cloud Engineer',
    'Research Scientist',
    'Technical Writer',
    'Support Engineer',
    'Operations Engineer',
    'Software Tester',
    'User Researcher',
] as const;



    
    