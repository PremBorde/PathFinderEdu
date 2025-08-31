document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Get the start assessment button
    const startButton = document.querySelector('.start-assessment-btn');

    if (startButton) {
        startButton.addEventListener('click', function() {
            resetAssessment(); // Reset before starting
            startAssessment();
        });
    }

    // Assessment Questions
    const questions = [
        {
            question: "Imagine you have a free Saturday. What would you love to do?",
            options: [
                "Build something with a science kit 🔬",
                "Create art or music 🎨",
                "Organize a fun event with friends 👥",
                "Learn a new app or game 💻"
            ],
            feedback: "Great choice! This shows what naturally interests you when you're free!"
        },
        {
            question: "If you could solve one big problem in your school, what would it be?",
            options: [
                "Make learning math and science more fun",
                "Add more creative activities and competitions",
                "Help students who are struggling",
                "Improve the computer lab and technology"
            ],
            feedback: "Interesting! Your choice reveals what matters most to you!"
        },
        {
            question: "In a group project, which role makes you happiest?",
            options: [
                "The one solving the tricky problems 🧩",
                "The one making the presentation look amazing ✨",
                "The one helping everyone work together 🤝",
                "The one handling all technical stuff 🖥️"
            ],
            feedback: "This shows your natural leadership style!"
        },
        {
            question: "What kind of YouTube videos do you enjoy watching?",
            options: [
                "Science experiments and discoveries",
                "DIY and craft tutorials",
                "Motivational and educational content",
                "Tech reviews and gaming"
            ],
            feedback: "Your entertainment choices often reflect your interests!"
        },
        {
            question: "If you could invent anything, what would it be?",
            options: [
                "A new scientific discovery 🔬",
                "Something beautiful and unique 🎨",
                "Something that helps people 🤝",
                "A cool new gadget or app 📱"
            ],
            feedback: "Your creativity shows where your passion lies!"
        },
        {
            question: "Which superpower would you choose?",
            options: [
                "Super intelligence to solve complex problems",
                "Ability to create anything you imagine",
                "Power to understand and help everyone",
                "Control over all technology"
            ],
            feedback: "Superpower choices often reveal our real-world aspirations!"
        },
        {
            question: "What's your idea of a perfect future job?",
            options: [
                "Making exciting discoveries 🔍",
                "Creating beautiful things ✨",
                "Helping others succeed 🌟",
                "Working with latest technology 💻"
            ],
            feedback: "This gives us a glimpse into your dream career!"
        }
    ];

    let currentQuestion = 0;
    let userResponses = [];

    function resetAssessment() {
        currentQuestion = 0;
        userResponses = [];
    }

    // Add career database for search functionality
    const careerDatabase = {
        "Computer Science": {
            description: "Learn to create software, apps, and websites",
            skills: ["Programming", "Problem Solving", "Logic"],
            subjects: ["Mathematics", "Computer Science", "Physics"],
            stream: "Science",
            salary: "₹4-40 LPA",
            scope: "High demand in all sectors"
        },
        "Digital Marketing": {
            description: "Promote products and services through digital channels",
            skills: ["Communication", "Creativity", "Analytics"],
            subjects: ["Marketing", "Business Studies", "English"],
            stream: "Commerce/Arts",
            salary: "₹3-25 LPA",
            scope: "Growing field with many opportunities"
        },
        "Medical": {
            description: "Help people by becoming a doctor or healthcare professional",
            skills: ["Biology", "Patient Care", "Attention to Detail"],
            subjects: ["Biology", "Chemistry", "Physics"],
            stream: "Science",
            salary: "₹5-50 LPA",
            scope: "Always in high demand"
        },
        "Teaching": {
            description: "Shape young minds and contribute to education",
            skills: ["Communication", "Patience", "Leadership"],
            subjects: ["Any subject you want to teach"],
            stream: "Any Stream",
            salary: "₹3-15 LPA",
            scope: "Stable career with growth options"
        },
        // Add more careers as needed
    };

    // Add this after your existing careerDatabase
    const streamCareerDatabase = {
        science: {
            "Medical Doctor": {
                description: "Diagnose and treat patients in various medical fields",
                skills: ["Biology", "Chemistry", "Patient Care", "Critical Thinking"],
                subjects: ["Biology", "Chemistry", "Physics"],
                stream: "Science",
                salary: "₹5-60 LPA",
                scope: "High demand in healthcare sector"
            },
            "Software Engineer": {
                description: "Design and develop software applications",
                skills: ["Programming", "Problem Solving", "Mathematics"],
                subjects: ["Computer Science", "Mathematics", "Physics"],
                stream: "Science",
                salary: "₹4-40 LPA",
                scope: "Excellent growth opportunities"
            },
            // Add more science careers...
        },
        commerce: {
            "Chartered Accountant": {
                description: "Financial expert handling accounts, audit, and taxation",
                skills: ["Accounting", "Analysis", "Attention to Detail"],
                subjects: ["Accountancy", "Economics", "Mathematics"],
                stream: "Commerce",
                salary: "₹6-30 LPA",
                scope: "High demand in all sectors"
            },
            "Business Analyst": {
                description: "Analyze business processes and recommend improvements",
                skills: ["Analytics", "Communication", "Problem Solving"],
                subjects: ["Business Studies", "Economics", "Statistics"],
                stream: "Commerce",
                salary: "₹4-25 LPA",
                scope: "Growing demand in corporate sector"
            },
            // Add more commerce careers...
        },
        arts: {
            "Psychologist": {
                description: "Study human behavior and mental processes",
                skills: ["Empathy", "Analysis", "Communication"],
                subjects: ["Psychology", "Sociology", "Statistics"],
                stream: "Arts",
                salary: "₹3-20 LPA",
                scope: "Growing mental health awareness"
            },
            "Content Creator": {
                description: "Create engaging content for various media platforms",
                skills: ["Creativity", "Writing", "Digital Media"],
                subjects: ["English", "Mass Communication", "Digital Arts"],
                stream: "Arts",
                salary: "₹3-25 LPA",
                scope: "High demand in digital age"
            },
            // Add more arts careers...
        }
    };

    function startAssessment() {
        const modal = document.createElement('div');
        modal.className = 'assessment-modal';
        modal.innerHTML = `
            <div class="assessment-container">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="font-size: 24px; font-weight: bold;">Career Assessment</h2>
                    <button onclick="closeAndResetAssessment(this)" 
                        style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">
                        ×
                    </button>
                </div>
                <div id="question-container"></div>
                <div class="progress-bar">
                    <div class="progress" style="width: 0%"></div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                    <button id="prev-btn" style="padding: 10px 20px; background: #e5e7eb; border-radius: 20px; cursor: pointer;">Previous</button>
                    <button id="next-btn" style="padding: 10px 20px; background: #3b82f6; color: white; border-radius: 20px; cursor: pointer;">Next</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'block';
        
        displayQuestion();
        setupNavigation(modal);
    }

    function displayQuestion() {
        const questionContainer = document.getElementById('question-container');
        const question = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;

        questionContainer.innerHTML = `
            <h3 style="font-size: 18px; margin-bottom: 20px;">${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <button class="option-button ${userResponses[currentQuestion] === index ? 'selected' : ''}" 
                            data-index="${index}">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div id="feedback" style="display: none; margin-top: 20px; padding: 15px; background: #e8f5e9; border-radius: 10px; text-align: center; color: #2e7d32;">
            </div>
        `;

        document.querySelector('.progress').style.width = `${progress}%`;

        // Add click handlers to options
        const optionButtons = questionContainer.querySelectorAll('.option-button');
        const feedbackDiv = questionContainer.querySelector('#feedback');
        
        optionButtons.forEach(button => {
            button.addEventListener('click', () => {
                userResponses[currentQuestion] = parseInt(button.dataset.index);
                optionButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                
                // Show feedback with animation
                feedbackDiv.style.display = 'block';
                feedbackDiv.style.opacity = '0';
                feedbackDiv.innerHTML = `
                    <div style="font-size: 16px;">
                        ${question.feedback}
                    </div>
                    <div style="font-size: 24px; margin-top: 10px;">
                        ${['🌟', '✨', '💫', '⭐️'][Math.floor(Math.random() * 4)]}
                    </div>
                `;
                
                // Fade in animation
                setTimeout(() => {
                    feedbackDiv.style.transition = 'opacity 0.5s';
                    feedbackDiv.style.opacity = '1';
                }, 50);
            });
        });
    }

    function setupNavigation(modal) {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.addEventListener('click', () => {
            if (currentQuestion > 0) {
                currentQuestion--;
                displayQuestion();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (userResponses[currentQuestion] === undefined) {
                // Using SweetAlert2 for better looking alerts
        Swal.fire({
                    title: 'Select an Option',
                    text: 'Please select an option to continue with the assessment.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3b82f6'
                });
                return;
            }

                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    displayQuestion();
                } else {
                showResults(modal);
            }
        });
    }

    function analyzeResponses() {
        const careerPaths = {
            tech: 0,
            creative: 0,
            social: 0,
            business: 0
        };

        userResponses.forEach((response) => {
            switch (response) {
                case 0: careerPaths.tech += 1; break;
                case 1: careerPaths.creative += 1; break;
                case 2: careerPaths.social += 1; break;
                case 3: careerPaths.tech += 1; break;
            }
        });

        const topPath = Object.entries(careerPaths).reduce((a, b) => 
            a[1] > b[1] ? a : b)[0];

        const recommendations = {
            tech: {
                title: "Technology & Science Path 🚀",
                careers: [
                    "Computer Science (Programming)",
                    "Information Technology",
                    "Data Science",
                    "Robotics Engineering",
                    "App Development"
                ],
                message: "You show a strong interest in technology and problem-solving! These fields would be perfect for your analytical mind."
            },
            creative: {
                title: "Creative & Design Path 🎨",
                careers: [
                    "Digital Art & Animation",
                    "Graphic Design",
                    "Content Creation",
                    "Web Design",
                    "Fashion Design"
                ],
                message: "Your creative spirit shines through! These careers would let you express your artistic talents."
            },
            social: {
                title: "Social Impact Path 🤝",
                careers: [
                    "Teaching",
                    "Counseling",
                    "Social Work",
                    "Community Management",
                    "Healthcare Services"
                ],
                message: "You have a natural talent for helping others! These careers would let you make a real difference."
            },
            business: {
                title: "Business & Management Path 💼",
                careers: [
                    "Business Administration",
                    "Digital Marketing",
                    "Entrepreneurship",
                    "Project Management",
                    "E-commerce"
                ],
                message: "You show great leadership potential! These careers would put your management skills to good use."
            }
        };

        return recommendations[topPath];
    }

    function showResults(modal) {
        const results = analyzeResponses();
        const container = modal.querySelector('.assessment-container');
        
        container.innerHTML = `
            <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Your Career Assessment Results ✨</h2>
            <div class="results" style="margin-bottom: 20px;">
                <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <h3 style="color: #3b82f6; margin-bottom: 10px;">${results.title}</h3>
                    <p style="margin-bottom: 15px; color: #4b5563;">${results.message}</p>
                    <h4 style="margin-bottom: 10px; color: #4b5563;">Recommended Career Paths:</h4>
                    <ul style="list-style-type: disc; margin-left: 20px; color: #4b5563;">
                        ${results.careers.map(career => `<li>${career}</li>`).join('')}
                    </ul>
                </div>
                <p style="font-size: 16px; color: #6b7280; text-align: center;">
                    Remember, this is just a guide! Talk to your teachers and parents about these options. 😊
                </p>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="this.closest('.assessment-modal').remove()" 
                        style="padding: 10px 20px; background: #3b82f6; color: white; border-radius: 20px; cursor: pointer;">
                    CLOSE
                </button>
                <button onclick="restartAssessment(this)" 
                        style="padding: 10px 20px; background: #10b981; color: white; border-radius: 20px; cursor: pointer;">
                    START AGAIN
                </button>
            </div>
        `;
    }

    // Add this function to handle closing and resetting
    window.closeAndResetAssessment = function(button) {
        button.closest('.assessment-modal').remove();
        resetAssessment();
    }

    // Add this function to handle assessment restart
    window.restartAssessment = function(button) {
        button.closest('.assessment-modal').remove();
        resetAssessment();
        startAssessment();
    }

    // Add function to show career details
    function showCareerDetails(career) {
        const info = careerDatabase[career];
        const modal = document.createElement('div');
        modal.className = 'career-detail-modal';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1003;';
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto;">
                <h2 style="font-size: 24px; color: #3b82f6; margin-bottom: 20px;">${career} Career Path 🎯</h2>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; color: #4b5563; margin-bottom: 10px;">Description</h3>
                    <p style="color: #6b7280;">${info.description}</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; color: #4b5563; margin-bottom: 10px;">Required Skills</h3>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${info.skills.map(skill => `
                            <span style="background: #e5e7eb; padding: 5px 10px; border-radius: 15px;">
                                ${skill}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; color: #4b5563; margin-bottom: 10px;">Key Subjects</h3>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${info.subjects.map(subject => `
                            <span style="background: #e5e7eb; padding: 5px 10px; border-radius: 15px;">
                                ${subject}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; color: #4b5563; margin-bottom: 10px;">Career Details</h3>
                    <p style="color: #6b7280;"><strong>Stream:</strong> ${info.stream}</p>
                    <p style="color: #6b7280;"><strong>Salary Range:</strong> ${info.salary}</p>
                    <p style="color: #6b7280;"><strong>Future Scope:</strong> ${info.scope}</p>
                </div>

                <button onclick="this.closest('.career-detail-modal').remove()" 
                        style="width: 100%; padding: 10px; background: #3b82f6; color: white; border-radius: 20px; cursor: pointer;">
                    Close
                </button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Add this function to handle stream-specific searches
    function initializeStreamSearch() {
        document.querySelectorAll('.career-search').forEach(searchInput => {
            const stream = searchInput.dataset.stream;
            const searchResults = searchInput.closest('.stream-search-section').querySelector('.search-results');
            const clearButton = searchInput.nextElementSibling;

            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                if (searchTerm.length < 2) {
                    searchResults.style.display = 'none';
                    return;
                }

                let resultsHTML = '';
                const careers = streamCareerDatabase[stream];
                
                for (const [career, info] of Object.entries(careers)) {
                    const matchesCareer = career.toLowerCase().includes(searchTerm);
                    const matchesSkills = info.skills.some(skill => skill.toLowerCase().includes(searchTerm));
                    const matchesSubjects = info.subjects.some(subject => subject.toLowerCase().includes(searchTerm));

                    if (matchesCareer || matchesSkills || matchesSubjects) {
                        resultsHTML += `
                            <div class="career-result" onclick="showStreamCareerDetails('${career}', '${stream}')">
                                <h3>${career} 🎯</h3>
                                <p>${info.description}</p>
                                <div class="career-tags">
                                    <span class="tag">${info.stream}</span>
                                    <span class="tag">${info.salary}</span>
                                </div>
                            </div>
                        `;
                    }
                }

                searchResults.innerHTML = resultsHTML || `
                    <div class="no-results">
                        No careers found for "${searchTerm}" 🔍
                    </div>
                `;
                searchResults.style.display = 'block';
            });

            clearButton.addEventListener('click', () => {
                searchInput.value = '';
                searchResults.style.display = 'none';
    });
});
    }

    // Add this function to show career details
    function showStreamCareerDetails(career, stream) {
        const info = streamCareerDatabase[stream][career];
        const modal = document.createElement('div');
        modal.className = 'career-detail-modal';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1003;';
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto;">
                <h2 style="font-size: 24px; color: #3b82f6; margin-bottom: 20px;">${career} Career Path 🎯</h2>
                
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; color: #4b5563; margin-bottom: 10px;">Description</h3>
                    <p style="color: #6b7280;">${info.description}</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; color: #4b5563; margin-bottom: 10px;">Required Skills</h3>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${info.skills.map(skill => `
                            <span style="background: #e5e7eb; padding: 5px 10px; border-radius: 15px;">
                                ${skill}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; color: #4b5563; margin-bottom: 10px;">Key Subjects</h3>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${info.subjects.map(subject => `
                            <span style="background: #e5e7eb; padding: 5px 10px; border-radius: 15px;">
                                ${subject}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; color: #4b5563; margin-bottom: 10px;">Career Details</h3>
                    <p style="color: #6b7280;"><strong>Stream:</strong> ${info.stream}</p>
                    <p style="color: #6b7280;"><strong>Salary Range:</strong> ${info.salary}</p>
                    <p style="color: #6b7280;"><strong>Future Scope:</strong> ${info.scope}</p>
                </div>

                <button onclick="this.closest('.career-detail-modal').remove()" 
                        style="width: 100%; padding: 10px; background: #3b82f6; color: white; border-radius: 20px; cursor: pointer;">
                    Close
                </button>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Initialize the search functionality when the page loads
    initializeStreamSearch();

    // Add this at the start of your DOMContentLoaded function
    const ctaButton = document.querySelector('.hero-content .cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const insightsSection = document.querySelector('#insights');
            if (insightsSection) {
                insightsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Add highlight animation to the insights section
                insightsSection.style.transition = 'background-color 0.5s';
                insightsSection.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        setTimeout(() => {
                    insightsSection.style.backgroundColor = 'transparent';
                }, 1000);
            }
        });
    }

    // Add this to your existing script.js
    function showEngineeringGuide(field) {
        const guides = {
            computer: {
                title: "Computer Engineering",
                icon: "fas fa-laptop-code",
                description: "Design and develop computer systems and software applications",
                skills: {
                    technical: [
                        "Programming Languages (C++, Java, Python)",
                        "Data Structures & Algorithms",
                        "Database Management",
                        "Operating Systems",
                        "Software Engineering"
                    ],
                    soft: [
                        "Problem Solving",
                        "Analytical Thinking",
                        "Team Collaboration",
                        "Project Management"
                    ]
                },
                courses: [
                    {
                        name: "B.Tech in Computer Engineering",
                        duration: "4 years",
                        eligibility: "12th with PCM, JEE Main/State CETs"
                    },
                    {
                        name: "M.Tech in Computer Engineering",
                        duration: "2 years",
                        eligibility: "B.Tech, GATE qualified"
                    }
                ],
                careers: [
                    "Software Developer",
                    "System Analyst",
                    "Database Administrator",
                    "Software Architect",
                    "DevOps Engineer"
                ],
                companies: [
                    "Google",
                    "Microsoft",
                    "Amazon",
                    "IBM",
                    "TCS"
                ],
                salary: "₹4-40 LPA (Based on experience)",
                scope: "Excellent growth prospects with continuous technological advancement"
            },
            // Add similar detailed objects for other engineering fields
        };

        const guide = guides[field] || guides.computer; // Default to computer if field not found
        
        const modal = document.createElement('div');
        modal.className = 'guide-modal';
        modal.innerHTML = `
            <div class="guide-container">
                <div class="guide-header">
                    <h2><i class="${guide.icon}"></i> ${guide.title} Guide</h2>
                    <button onclick="this.closest('.guide-modal').remove()" class="close-btn">×</button>
                </div>
                
                <div class="guide-content">
                    <div class="guide-section">
                        <h3>Overview</h3>
                        <p>${guide.description}</p>
                    </div>

                    <div class="guide-section">
                        <h3>Required Skills</h3>
                        <div class="skills-grid">
                            <div class="skill-category">
                                <h4>Technical Skills</h4>
                                <ul>
                                    ${guide.skills.technical.map(skill => `<li>${skill}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="skill-category">
                                <h4>Soft Skills</h4>
                                <ul>
                                    ${guide.skills.soft.map(skill => `<li>${skill}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="guide-section">
                        <h3>Education Path</h3>
                        <div class="courses-grid">
                            ${guide.courses.map(course => `
                                <div class="course-card">
                                    <h4>${course.name}</h4>
                                    <p><strong>Duration:</strong> ${course.duration}</p>
                                    <p><strong>Eligibility:</strong> ${course.eligibility}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="guide-section">
                        <h3>Career Opportunities</h3>
                        <div class="career-info">
                            <div class="career-roles">
                                <h4>Popular Roles</h4>
                                <ul>
                                    ${guide.careers.map(career => `<li>${career}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="top-companies">
                                <h4>Top Recruiting Companies</h4>
                                <ul>
                                    ${guide.companies.map(company => `<li>${company}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="guide-section">
                        <h3>Industry Insights</h3>
                        <div class="insights-box">
                            <p><strong>Average Salary Range:</strong> ${guide.salary}</p>
                            <p><strong>Future Scope:</strong> ${guide.scope}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }
});