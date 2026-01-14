// About Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize team member modals
    initTeamModals();
    
    // Initialize timeline animation
    initTimelineAnimation();
    
    // Initialize counters for stats
    initStatsCounters();
});

// Team Member Modal Functionality
function initTeamModals() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberName = this.querySelector('.member-info h4').textContent;
            const memberRole = this.querySelector('.member-role').textContent;
            const memberBio = this.getAttribute('data-bio') || 'More information coming soon...';
            
            showTeamModal(memberName, memberRole, memberBio);
        });
    });
    
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 2000;
        align-items: center;
        justify-content: center;
    `;
    
    modalContainer.innerHTML = `
        <div class="modal-content" style="
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        ">
            <button class="modal-close" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #BB0000;
            ">&times;</button>
            <h3 id="modal-name"></h3>
            <p id="modal-role" style="color: #BB0000; font-weight: bold; margin-bottom: 20px;"></p>
            <p id="modal-bio"></p>
        </div>
    `;
    
    document.body.appendChild(modalContainer);
    
    // Close modal functionality
    const closeBtn = modalContainer.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });
    
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });
    
    function showTeamModal(name, role, bio) {
        modalContainer.querySelector('#modal-name').textContent = name;
        modalContainer.querySelector('#modal-role').textContent = role;
        modalContainer.querySelector('#modal-bio').textContent = bio;
        modalContainer.style.display = 'flex';
    }
}

// Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}

// Stats Counters Animation
function initStatsCounters() {
    const stats = [
        { selector: '.youth-count', target: 500, suffix: '+' },
        { selector: '.women-count', target: 200, suffix: '+' },
        { selector: '.partnerships-count', target: 50, suffix: '+' },
        { selector: '.communities-count', target: 10, suffix: '+' }
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = stats.find(s => entry.target.classList.contains(s.selector.replace('.', '')));
                if (stat) {
                    animateCounter(entry.target, stat.target, stat.suffix);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        const element = document.querySelector(stat.selector);
        if (element) observer.observe(element);
    });
    
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }
}

// Add CSS for animations
const aboutStyles = document.createElement('style');
aboutStyles.textContent = `
    .team-member {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .team-member:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.15);
    }
    
    .initiative-detail {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .initiative-detail.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(aboutStyles);

// Initialize initiative animations
const initiativeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.initiative-detail').forEach(item => {
    initiativeObserver.observe(item);
});