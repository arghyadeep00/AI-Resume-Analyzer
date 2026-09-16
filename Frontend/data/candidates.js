export const mockCandidates = [
  {
    id: '1',
    jobId: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Senior Full Stack Developer',
    matchScore: 87,
    experience: '5 yrs',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'AWS', 'Docker', 'Git'],
    missingSkills: ['Kubernetes', 'GraphQL'],
    status: 'Shortlisted',
    appliedDate: '2023-10-20',
    timeline: [
      { status: 'Applied', date: '2023-10-20' },
      { status: 'AI Screened', date: '2023-10-21' },
      { status: 'Shortlisted', date: '2023-10-22' }
    ],
    experienceDetails: [
      { company: 'TechNova', role: 'Full Stack Developer', duration: '2020 - Present' },
      { company: 'WebSolutions', role: 'Frontend Developer', duration: '2018 - 2020' }
    ],
    education: 'B.S. Computer Science, University of Technology',
    aiRecommendation: 'Strong Match',
    supportingFactors: ['Strong React experience', 'Relevant Node.js experience', 'Good cloud exposure', 'Meets required experience level'],
    concerns: ['Limited Kubernetes experience', 'No GraphQL experience'],
    resumeSummary: 'Experienced full-stack developer with 5+ years of experience building React and Node.js applications. Passionate about scalable architecture and mentoring junior developers.'
  },
  {
    id: '2',
    jobId: '1',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    role: 'React Developer',
    matchScore: 92,
    experience: '6 yrs',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'GraphQL', 'Jest'],
    missingSkills: ['AWS'],
    status: 'Interview',
    appliedDate: '2023-10-18',
    timeline: [
      { status: 'Applied', date: '2023-10-18' },
      { status: 'AI Screened', date: '2023-10-18' },
      { status: 'Shortlisted', date: '2023-10-19' },
      { status: 'Interview', date: '2023-10-25' }
    ],
    experienceDetails: [
      { company: 'InnovateX', role: 'Senior React Engineer', duration: '2021 - Present' },
      { company: 'CreativeWeb', role: 'Web Developer', duration: '2017 - 2021' }
    ],
    education: 'B.A. Graphic Design, State University',
    aiRecommendation: 'Excellent Match',
    supportingFactors: ['Extensive React and Next.js experience', 'Has GraphQL experience', 'Strong frontend testing skills'],
    concerns: ['No AWS experience'],
    resumeSummary: 'Frontend specialist focused on building highly performant and accessible web applications using React and Next.js.'
  },
  {
    id: '3',
    jobId: '2',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    role: 'Backend Engineer',
    matchScore: 78,
    experience: '4 yrs',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'AWS', 'Python', 'Redis'],
    missingSkills: ['MongoDB', 'Docker'],
    status: 'Screening',
    appliedDate: '2023-10-25',
    timeline: [
      { status: 'Applied', date: '2023-10-25' },
      { status: 'AI Screened', date: '2023-10-26' }
    ],
    experienceDetails: [
      { company: 'CloudCore', role: 'Backend Developer', duration: '2019 - Present' }
    ],
    education: 'M.S. Computer Engineering, Tech Institute',
    aiRecommendation: 'Moderate Match',
    supportingFactors: ['Strong Node.js and PostgreSQL background', 'AWS experience'],
    concerns: ['Missing MongoDB experience', 'No Docker exposure'],
    resumeSummary: 'Backend engineer with 4 years of experience building APIs and microservices.'
  }
];
