// Comprehensive search data for PathFinderEdu
export const searchData = {
  careers: [
    // Engineering & Technology
    {
      id: 'software-engineer',
      type: 'career',
      title: 'Software Engineer',
      subtitle: 'Technology • High Demand • Remote Work',
      category: 'Engineering',
      stream: 'Science',
      description: 'Design, develop, and maintain software applications. Work with programming languages like Python, Java, JavaScript to create innovative solutions for web, mobile, and desktop platforms.',
      tags: ['Programming', 'Problem Solving', 'High Salary', 'Remote Work', 'Innovation', 'Tech'],
      rating: 4.8,
      location: 'Global',
      duration: 'Full-time',
      salary: '₹8-25 LPA',
      growth: '22% growth expected',
      path: '/career/software-engineer',
      icon: '#4299e1',
      skills: ['Programming', 'Algorithms', 'Data Structures', 'System Design'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Netflix', 'Spotify']
    },
    {
      id: 'data-scientist',
      type: 'career',
      title: 'Data Scientist',
      subtitle: 'Analytics • AI/ML • Future-Ready Career',
      category: 'Science',
      stream: 'Science',
      description: 'Analyze complex data to extract insights and drive business decisions. Use machine learning, statistics, and programming to solve real-world problems and predict future trends.',
      tags: ['Machine Learning', 'Statistics', 'Python', 'Research', 'Big Data', 'AI'],
      rating: 4.7,
      location: 'Major Cities',
      duration: 'Full-time',
      salary: '₹10-30 LPA',
      growth: '31% growth expected',
      path: '/career/data-scientist',
      icon: '#9f7aea',
      skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
      companies: ['Meta', 'Netflix', 'Uber', 'Airbnb', 'LinkedIn']
    },
    {
      id: 'doctor-mbbs',
      type: 'career',
      title: 'Doctor (MBBS)',
      subtitle: 'Healthcare • Life Saving • Noble Profession',
      category: 'Medical',
      stream: 'Science',
      description: 'Diagnose and treat patients, save lives, and contribute to public health. Work in hospitals, clinics, or private practice to provide medical care and improve quality of life.',
      tags: ['Healthcare', 'Patient Care', 'Medical Research', 'Social Service', 'Life Saving'],
      rating: 4.9,
      location: 'All India',
      duration: 'Full-time',
      salary: '₹6-20 LPA',
      growth: '4% growth expected',
      path: '/career/doctor-mbbs',
      icon: '#e53e3e',
      skills: ['Medical Knowledge', 'Patient Care', 'Diagnosis', 'Surgery', 'Communication'],
      companies: ['AIIMS', 'Apollo', 'Fortis', 'Max Healthcare', 'Government Hospitals']
    },
    {
      id: 'civil-engineer',
      type: 'career',
      title: 'Civil Engineer',
      subtitle: 'Infrastructure • Construction • Nation Building',
      category: 'Engineering',
      stream: 'Science',
      description: 'Design and build infrastructure projects like roads, bridges, buildings, and dams. Play a crucial role in urban development and improving quality of life.',
      tags: ['Construction', 'Infrastructure', 'Design', 'Project Management', 'AutoCAD'],
      rating: 4.4,
      location: 'All India',
      duration: 'Full-time',
      salary: '₹4-15 LPA',
      growth: '8% growth expected',
      path: '/science',
      icon: '#38a169',
      skills: ['AutoCAD', 'Project Management', 'Structural Design', 'Construction Management'],
      companies: ['L&T', 'Tata Projects', 'Godrej', 'DLF', 'Government PWD']
    },

    // Commerce & Business
    {
      id: 'chartered-accountant',
      type: 'career',
      title: 'Chartered Accountant (CA)',
      subtitle: 'Finance • Professional • High Respect',
      category: 'Commerce',
      stream: 'Commerce',
      description: 'Manage financial records, conduct audits, provide tax advice, and ensure compliance with financial regulations. One of the most respected professions in business.',
      tags: ['Accounting', 'Taxation', 'Audit', 'Finance', 'Professional', 'High Respect'],
      rating: 4.6,
      location: 'All India',
      duration: 'Full-time',
      salary: '₹8-25 LPA',
      growth: '6% growth expected',
      path: '/commerce',
      icon: '#38a169',
      skills: ['Accounting', 'Taxation', 'Audit', 'Financial Analysis', 'GST'],
      companies: ['Big 4 Firms', 'Banks', 'Corporations', 'Government', 'Private Practice']
    },
    {
      id: 'digital-marketing-manager',
      type: 'career',
      title: 'Digital Marketing Manager',
      subtitle: 'Marketing • Creative • Strategic • High Growth',
      category: 'Commerce',
      stream: 'Commerce',
      description: 'Plan and execute digital marketing campaigns across multiple channels. Manage social media, SEO, content marketing, and paid advertising to drive business growth.',
      tags: ['SEO', 'Social Media', 'Content Strategy', 'Analytics', 'Creative', 'Growth Hacking'],
      rating: 4.5,
      location: 'Pan India',
      duration: 'Full-time',
      salary: '₹6-20 LPA',
      growth: '13% growth expected',
      path: '/commerce',
      icon: '#ed8936',
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Creation'],
      companies: ['Google', 'Facebook', 'Startups', 'E-commerce', 'Agencies']
    },
    {
      id: 'investment-banker',
      type: 'career',
      title: 'Investment Banker',
      subtitle: 'Finance • High Salary • Prestigious • Wall Street',
      category: 'Commerce',
      stream: 'Commerce',
      description: 'Help companies raise capital, facilitate mergers and acquisitions, and provide financial advisory services. Work with high-profile clients and complex financial transactions.',
      tags: ['Finance', 'High Salary', 'Prestigious', 'Wall Street', 'M&A', 'Capital Markets'],
      rating: 4.3,
      location: 'Mumbai, Delhi, Bangalore',
      duration: 'Full-time',
      salary: '₹15-50 LPA',
      growth: '5% growth expected',
      path: '/commerce',
      icon: '#2d3748',
      skills: ['Financial Modeling', 'Valuation', 'Excel', 'Presentation', 'Client Management'],
      companies: ['Goldman Sachs', 'Morgan Stanley', 'JP Morgan', 'Citibank', 'ICICI']
    },

    // Arts & Creative
    {
      id: 'graphic-designer',
      type: 'career',
      title: 'Graphic Designer',
      subtitle: 'Design • Creative • Visual Communication',
      category: 'Arts',
      stream: 'Arts',
      description: 'Create visual content for digital and print media. Work on branding, advertising, web design, and multimedia projects to communicate messages effectively.',
      tags: ['Creativity', 'Adobe Suite', 'Visual Communication', 'Branding', 'Design Thinking'],
      rating: 4.4,
      location: 'Major Cities',
      duration: 'Full-time/Freelance',
      salary: '₹3-12 LPA',
      growth: '3% growth expected',
      path: '/arts',
      icon: '#d53f8c',
      skills: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Typography'],
      companies: ['Design Studios', 'Ad Agencies', 'Startups', 'Freelance', 'In-house Teams']
    },
    {
      id: 'journalist',
      type: 'career',
      title: 'Journalist',
      subtitle: 'Media • Communication • Truth Seeking',
      category: 'Arts',
      stream: 'Arts',
      description: 'Research, write, and report news stories for newspapers, magazines, websites, TV, and radio. Play a crucial role in keeping the public informed about current events.',
      tags: ['Writing', 'Research', 'Communication', 'Current Affairs', 'Investigation'],
      rating: 4.2,
      location: 'All India',
      duration: 'Full-time',
      salary: '₹3-10 LPA',
      growth: '-11% decline expected',
      path: '/arts',
      icon: '#3182ce',
      skills: ['Writing', 'Research', 'Interview', 'Video Editing', 'Social Media'],
      companies: ['Times of India', 'NDTV', 'CNN', 'BBC', 'Digital Media']
    },
    {
      id: 'psychologist',
      type: 'career',
      title: 'Psychologist',
      subtitle: 'Mental Health • Counseling • Social Impact',
      category: 'Arts',
      stream: 'Arts',
      description: 'Study human behavior and mental processes. Provide therapy, counseling, and psychological assessments to help people overcome mental health challenges.',
      tags: ['Mental Health', 'Counseling', 'Therapy', 'Research', 'Social Impact'],
      rating: 4.5,
      location: 'Urban Areas',
      duration: 'Full-time/Private Practice',
      salary: '₹4-15 LPA',
      growth: '3% growth expected',
      path: '/arts',
      icon: '#805ad5',
      skills: ['Counseling', 'Assessment', 'Research Methods', 'Communication', 'Empathy'],
      companies: ['Hospitals', 'Clinics', 'Schools', 'Private Practice', 'NGOs']
    }
  ],

  courses: [
    // Engineering Courses
    {
      id: 'computer-science-engineering',
      type: 'course',
      title: 'Computer Science Engineering',
      subtitle: 'B.Tech • 4 Years • Top Engineering Course',
      category: 'Engineering',
      stream: 'Science',
      description: 'Comprehensive program covering programming, algorithms, software engineering, and computer systems. Gateway to high-paying tech industry careers.',
      tags: ['Programming', 'Algorithms', 'Software Development', 'System Design', 'AI/ML'],
      rating: 4.6,
      location: 'All India',
      duration: '4 Years',
      fees: '₹2-15 LPA',
      path: '/course/computer-science-engineering',
      icon: '#4299e1',
      subjects: ['Programming', 'Data Structures', 'Operating Systems', 'DBMS', 'Computer Networks'],
      careers: ['Software Engineer', 'Data Scientist', 'AI Engineer', 'Product Manager']
    },
    {
      id: 'mechanical-engineering',
      type: 'course',
      title: 'Mechanical Engineering',
      subtitle: 'B.Tech • 4 Years • Core Engineering',
      category: 'Engineering',
      stream: 'Science',
      description: 'Study design, manufacturing, and maintenance of mechanical systems. Work with automobiles, aerospace, manufacturing, and energy sectors.',
      tags: ['Manufacturing', 'Design', 'Automobiles', 'Aerospace', 'Energy'],
      rating: 4.3,
      location: 'All India',
      duration: '4 Years',
      fees: '₹2-12 LPA',
      path: '/science',
      icon: '#2d3748',
      subjects: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Manufacturing', 'CAD'],
      careers: ['Mechanical Engineer', 'Design Engineer', 'Manufacturing Engineer', 'Automotive Engineer']
    },
    {
      id: 'mbbs',
      type: 'course',
      title: 'MBBS',
      subtitle: 'Medical • 5.5 Years • Healthcare Professional',
      category: 'Medical',
      stream: 'Science',
      description: 'Comprehensive medical education to become a doctor. Study human anatomy, physiology, pathology, and clinical practice to save lives and serve society.',
      tags: ['Healthcare', 'Patient Care', 'Medical Research', 'Social Service', 'Life Saving'],
      rating: 4.8,
      location: 'All India',
      duration: '5.5 Years',
      fees: '₹5-25 LPA',
      path: '/science',
      icon: '#e53e3e',
      subjects: ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Clinical Medicine'],
      careers: ['Doctor', 'Surgeon', 'Specialist', 'Medical Researcher', 'Public Health Officer']
    },

    // Commerce Courses
    {
      id: 'bachelor-of-commerce',
      type: 'course',
      title: 'Bachelor of Commerce (B.Com)',
      subtitle: 'Commerce • 3 Years • Business Foundation',
      category: 'Commerce',
      stream: 'Commerce',
      description: 'Study accounting, finance, economics, and business management. Perfect foundation for careers in business, finance, and entrepreneurship.',
      tags: ['Accounting', 'Finance', 'Business', 'Economics', 'Management'],
      rating: 4.3,
      location: 'All India',
      duration: '3 Years',
      fees: '₹50K-3 LPA',
      path: '/commerce',
      icon: '#38a169',
      subjects: ['Accounting', 'Economics', 'Business Studies', 'Statistics', 'Computer Applications'],
      careers: ['Accountant', 'Financial Analyst', 'Business Analyst', 'Entrepreneur', 'CA']
    },
    {
      id: 'bba',
      type: 'course',
      title: 'Bachelor of Business Administration (BBA)',
      subtitle: 'Management • 3 Years • Leadership Skills',
      category: 'Commerce',
      stream: 'Commerce',
      description: 'Develop management and leadership skills. Study marketing, finance, human resources, and operations management for business careers.',
      tags: ['Management', 'Leadership', 'Marketing', 'HR', 'Operations'],
      rating: 4.2,
      location: 'All India',
      duration: '3 Years',
      fees: '₹1-8 LPA',
      path: '/commerce',
      icon: '#ed8936',
      subjects: ['Management', 'Marketing', 'Finance', 'HR', 'Business Communication'],
      careers: ['Manager', 'Marketing Executive', 'HR Executive', 'Business Analyst', 'Entrepreneur']
    },

    // Arts Courses
    {
      id: 'bachelor-of-arts',
      type: 'course',
      title: 'Bachelor of Arts (B.A)',
      subtitle: 'Liberal Arts • 3 Years • Diverse Specializations',
      category: 'Arts',
      stream: 'Arts',
      description: 'Explore humanities, social sciences, and liberal arts. Choose from psychology, sociology, political science, literature, and more.',
      tags: ['Humanities', 'Social Sciences', 'Literature', 'Psychology', 'Political Science'],
      rating: 4.1,
      location: 'All India',
      duration: '3 Years',
      fees: '₹30K-2 LPA',
      path: '/arts',
      icon: '#d53f8c',
      subjects: ['English', 'History', 'Political Science', 'Psychology', 'Sociology'],
      careers: ['Teacher', 'Civil Services', 'Journalist', 'Social Worker', 'Counselor']
    },
    {
      id: 'mass-communication',
      type: 'course',
      title: 'Mass Communication & Journalism',
      subtitle: 'Media • 3 Years • Communication Skills',
      category: 'Arts',
      stream: 'Arts',
      description: 'Study media, journalism, advertising, and public relations. Develop skills in writing, video production, and digital media.',
      tags: ['Media', 'Journalism', 'Advertising', 'PR', 'Digital Media'],
      rating: 4.2,
      location: 'Major Cities',
      duration: '3 Years',
      fees: '₹1-6 LPA',
      path: '/arts',
      icon: '#3182ce',
      subjects: ['Journalism', 'Mass Media', 'Advertising', 'Public Relations', 'Digital Media'],
      careers: ['Journalist', 'Content Writer', 'PR Executive', 'Video Editor', 'Social Media Manager']
    }
  ],

  colleges: [
    // Engineering Colleges
    {
      id: 'iit-delhi',
      type: 'college',
      title: 'Indian Institute of Technology Delhi',
      subtitle: 'IIT Delhi • Premier Engineering Institute',
      category: 'Engineering',
      stream: 'Science',
      description: 'Top-ranked engineering college offering undergraduate and postgraduate programs in engineering, technology, and applied sciences.',
      tags: ['Top Ranked', 'Research Excellence', 'Industry Connections', 'Global Recognition'],
      rating: 4.9,
      location: 'New Delhi',
      established: '1961',
      ranking: '#2 NIRF Engineering',
      path: '/college/iit-delhi',
      icon: '#4299e1',
      courses: ['B.Tech', 'M.Tech', 'PhD', 'MBA'],
      placements: '₹15-50 LPA average'
    },
    {
      id: 'iit-bombay',
      type: 'college',
      title: 'Indian Institute of Technology Bombay',
      subtitle: 'IIT Bombay • Top Engineering College',
      category: 'Engineering',
      stream: 'Science',
      description: 'Premier technical institute known for excellence in engineering education and research. Strong industry partnerships and alumni network.',
      tags: ['Top Ranked', 'Research', 'Innovation', 'Industry Partners'],
      rating: 4.9,
      location: 'Mumbai',
      established: '1958',
      ranking: '#3 NIRF Engineering',
      path: '/science',
      icon: '#4299e1',
      courses: ['B.Tech', 'M.Tech', 'PhD', 'MBA'],
      placements: '₹18-60 LPA average'
    },
    {
      id: 'aiims-delhi',
      type: 'college',
      title: 'All India Institute of Medical Sciences Delhi',
      subtitle: 'AIIMS Delhi • Premier Medical Institute',
      category: 'Medical',
      stream: 'Science',
      description: 'Top medical college in India offering MBBS, MD, MS, and other medical programs. Known for excellent medical education and research.',
      tags: ['Top Medical College', 'Research Excellence', 'Patient Care', 'Government'],
      rating: 4.9,
      location: 'New Delhi',
      established: '1956',
      ranking: '#1 NIRF Medical',
      path: '/science',
      icon: '#e53e3e',
      courses: ['MBBS', 'MD', 'MS', 'DM', 'MCh'],
      placements: 'Government Service + Private Practice'
    },

    // Commerce Colleges
    {
      id: 'srcc-delhi',
      type: 'college',
      title: 'Shri Ram College of Commerce',
      subtitle: 'SRCC • Top Commerce College',
      category: 'Commerce',
      stream: 'Commerce',
      description: 'Premier commerce college under Delhi University. Known for excellent commerce and economics education with strong industry connections.',
      tags: ['Top Commerce College', 'Delhi University', 'Industry Connections', 'Alumni Network'],
      rating: 4.7,
      location: 'New Delhi',
      established: '1926',
      ranking: '#1 Commerce College',
      path: '/commerce',
      icon: '#38a169',
      courses: ['B.Com', 'B.A Economics', 'M.Com'],
      placements: '₹8-25 LPA average'
    },
    {
      id: 'lsr-delhi',
      type: 'college',
      title: 'Lady Shri Ram College',
      subtitle: 'LSR • Top Women\'s College',
      category: 'Commerce',
      stream: 'Commerce',
      description: 'Premier women\'s college offering commerce, arts, and economics programs. Known for academic excellence and women empowerment.',
      tags: ['Women\'s College', 'Academic Excellence', 'Delhi University', 'Empowerment'],
      rating: 4.6,
      location: 'New Delhi',
      established: '1956',
      ranking: '#2 Commerce College',
      path: '/commerce',
      icon: '#d53f8c',
      courses: ['B.Com', 'B.A', 'B.A Economics'],
      placements: '₹6-20 LPA average'
    },

    // Arts Colleges
    {
      id: 'jamia-millia',
      type: 'college',
      title: 'Jamia Millia Islamia',
      subtitle: 'Central University • Diverse Programs',
      category: 'Arts',
      stream: 'Arts',
      description: 'Central university offering diverse programs in arts, social sciences, engineering, and management. Known for inclusive education.',
      tags: ['Central University', 'Diverse Programs', 'Inclusive', 'Research'],
      rating: 4.4,
      location: 'New Delhi',
      established: '1920',
      ranking: '#12 NIRF University',
      path: '/arts',
      icon: '#805ad5',
      courses: ['B.A', 'B.Tech', 'MBA', 'Mass Communication'],
      placements: '₹4-15 LPA average'
    }
  ],

  scholarships: [
    {
      id: 'national-merit-scholarship',
      type: 'scholarship',
      title: 'National Merit Scholarship',
      subtitle: 'Government • Merit Based • ₹12,000/year',
      category: 'Merit',
      description: 'Government scholarship for meritorious students from economically weaker sections.',
      amount: '₹12,000/year',
      eligibility: 'Family income < ₹6 LPA, 80%+ marks',
      path: '/home#scholarships',
      icon: '#4299e1'
    },
    {
      id: 'inspire-scholarship',
      type: 'scholarship',
      title: 'INSPIRE Scholarship',
      subtitle: 'Science • Research • ₹80,000/year',
      category: 'Science',
      description: 'For students pursuing science education and research careers.',
      amount: '₹80,000/year',
      eligibility: 'Top 1% in 12th Science, pursue BSc/MSc',
      path: '/science',
      icon: '#9f7aea'
    }
  ]
};

// Search categories for filtering
export const searchCategories = {
  'All': { icon: '🔍', count: 0 },
  'Engineering': { icon: '⚙️', count: 0 },
  'Medical': { icon: '🏥', count: 0 },
  'Commerce': { icon: '💼', count: 0 },
  'Arts': { icon: '🎨', count: 0 },
  'Science': { icon: '🔬', count: 0 }
};

// Popular search terms
export const popularSearches = [
  'Software Engineer',
  'Doctor',
  'CA',
  'IIT',
  'MBBS',
  'Engineering',
  'Data Science',
  'Digital Marketing',
  'Psychology',
  'Commerce'
];

// Search suggestions
export const searchSuggestions = [
  { text: 'High salary careers', category: 'career' },
  { text: 'Engineering colleges', category: 'college' },
  { text: 'Medical courses', category: 'course' },
  { text: 'Government scholarships', category: 'scholarship' },
  { text: 'Remote work careers', category: 'career' },
  { text: 'Creative careers', category: 'career' }
];

// Helper function to get all search data
export const getAllSearchData = () => {
  return [
    ...searchData.careers,
    ...searchData.courses,
    ...searchData.colleges,
    ...searchData.scholarships
  ];
};

// Helper function to search through data
export const searchInData = (query, filters = {}) => {
  const allData = getAllSearchData();
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return allData;
  
  let results = allData.filter(item => {
    const searchableText = [
      item.title,
      item.subtitle,
      item.description,
      item.category,
      ...(item.tags || []),
      ...(item.skills || []),
      ...(item.subjects || []),
      ...(item.careers || []),
      item.location,
      item.stream
    ].join(' ').toLowerCase();
    
    return searchableText.includes(searchTerm);
  });
  
  // Apply filters
  if (filters.type && filters.type !== 'all') {
    results = results.filter(item => item.type === filters.type);
  }
  
  if (filters.category && filters.category.length > 0) {
    results = results.filter(item => filters.category.includes(item.category));
  }
  
  if (filters.stream && filters.stream !== 'all') {
    results = results.filter(item => item.stream === filters.stream);
  }
  
  return results;
};

export default searchData;
