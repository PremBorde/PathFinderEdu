document.addEventListener('DOMContentLoaded', function() {
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
            }
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
            }
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
            }
            // Add more arts careers...
        }
    };

    // Initialize stream search
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
                        <div class="career-result" onclick="showCareerDetails('${career}', '${stream}')">
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

    // Add to window object so it's accessible from HTML
    window.showCareerDetails = function(career, stream) {
        const info = streamCareerDatabase[stream][career];
        const modal = document.createElement('div');
        modal.className = 'career-detail-modal';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1003;';
        
        modal.innerHTML = `
            <div style="background: white; padding: 30px; border-radius: 15px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="font-size: 24px; color: #3b82f6;">${career} Career Path 🎯</h2>
                    <button onclick="this.closest('.career-detail-modal').remove()" 
                        style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">
                        ×
                    </button>
                </div>
                <!-- Rest of the career details content -->
            </div>
        `;

        document.body.appendChild(modal);
    };
}); 