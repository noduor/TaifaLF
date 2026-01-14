// Events Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize event filtering
    initEventFiltering();
    
    // Initialize event cards animation
    initEventAnimations();
    
    // Initialize event registration
    initEventRegistration();
});

// Event filtering functionality
function initEventFiltering() {
    const eventTabs = document.querySelectorAll('.event-tab');
    const themeFilter = document.getElementById('themeFilter');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (!eventTabs.length || !eventCards.length) return;
    
    // Tab filtering
    eventTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            eventTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            filterEvents(this.getAttribute('data-tab'), themeFilter.value);
        });
    });
    
    // Theme filtering
    if (themeFilter) {
        themeFilter.addEventListener('change', function() {
            const activeTab = document.querySelector('.event-tab.active');
            filterEvents(activeTab.getAttribute('data-tab'), this.value);
        });
    }
    
    function filterEvents(tab, theme) {
        eventCards.forEach((card, index) => {
            const status = card.getAttribute('data-status');
            const categories = card.getAttribute('data-category');
            
            let showCard = true;
            
            // Check tab filter
            if (tab !== 'all' && status !== tab) {
                showCard = false;
            }
            
            // Check theme filter
            if (theme !== 'all' && !categories.includes(theme)) {
                showCard = false;
            }
            
            // Show/hide card with animation
            if (showCard) {
                setTimeout(() => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 50);
                }, index * 50);
            } else {
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Animation for event cards
function initEventAnimations() {
    const eventCards = document.querySelectorAll('.event-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    eventCards.forEach(card => {
        observer.observe(card);
    });
}

// Event registration functionality
function initEventRegistration() {
    const registerButtons = document.querySelectorAll('.btn-register');
    
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const eventTitle = this.closest('.event-card').querySelector('h3').textContent;
            
            // Show registration modal
            showRegistrationModal(eventTitle);
        });
    });
    
    // Create registration modal
    const modal = document.createElement('div');
    modal.className = 'registration-modal';
    modal.style.cssText = `
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
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
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
            <h3 style="margin-bottom: 20px;">Event Registration</h3>
            <p id="modal-event-title" style="margin-bottom: 20px; font-weight: bold;"></p>
            <form id="registrationForm">
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Full Name *</label>
                    <input type="text" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div class="form-group" style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Email *</label>
                    <input type="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <div class="form-group" style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: 600;">Phone Number</label>
                    <input type="tel" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                </div>
                <button type="submit" style="
                    background: #BB0000;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    width: 100%;
                ">Register Now</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Form submission
    const form = modal.querySelector('#registrationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your registration! We will contact you with more details.');
        modal.style.display = 'none';
        this.reset();
    });
    
    function showRegistrationModal(eventTitle) {
        modal.querySelector('#modal-event-title').textContent = `Register for: ${eventTitle}`;
        modal.style.display = 'flex';
    }
}

// Add CSS for animations
const eventsStyles = document.createElement('style');
eventsStyles.textContent = `
    .event-card {
        transition: all 0.3s ease;
    }
    
    .event-card:hover {
        transform: translateY(-5px);
    }
    
    .registration-modal {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(eventsStyles);