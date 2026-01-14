// Donate Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize donation form
    initDonationForm();
    
    // Initialize impact counters
    initImpactCounters();
    
    // Initialize partnership cards animation
    initPartnershipAnimations();
});

// Donation form functionality
function initDonationForm() {
    const donationForm = document.getElementById('donationForm');
    
    if (!donationForm) return;
    
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData);
        
        // Validate form
        if (!validateDonationForm(formValues)) {
            return;
        }
        
        // Show success message
        showSuccessMessage(formValues);
        
        // Reset form
        this.reset();
    });
    
    function validateDonationForm(data) {
        // Required fields
        const required = ['companyName', 'contactPerson', 'email', 'companyType'];
        
        for (const field of required) {
            if (!data[field] || data[field].trim() === '') {
                alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                document.getElementById(field).focus();
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            document.getElementById('email').focus();
            return false;
        }
        
        return true;
    }
    
    function showSuccessMessage(data) {
        // Create success modal
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        modal.innerHTML = `
            <div class="success-content" style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                position: relative;
            ">
                <button class="close-btn" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #BB0000;
                ">&times;</button>
                <div style="color: #006600; font-size: 4rem; margin-bottom: 20px;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 style="color: #006600; margin-bottom: 15px;">Thank You!</h3>
                <p style="margin-bottom: 20px; color: #333;">
                    Thank you for expressing interest in becoming a Corporate Donor Partner, 
                    <strong>${data.companyName}</strong>.
                </p>
                <p style="color: #666;">
                    We have received your information and will contact you at 
                    <strong>${data.email}</strong> within 24-48 hours.
                </p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 5000);
    }
}

// Impact counters animation
function initImpactCounters() {
    const impactItems = document.querySelectorAll('.impact-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.impact-number');
                const currentText = numberElement.textContent;
                const targetNumber = parseInt(currentText.replace('+', ''));
                
                if (!isNaN(targetNumber)) {
                    animateCounter(numberElement, targetNumber);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    impactItems.forEach(item => {
        observer.observe(item);
    });
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 50);
    }
}

// Partnership cards animation
function initPartnershipAnimations() {
    const partnershipCards = document.querySelectorAll('.partnership-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    partnershipCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add CSS for animations
const donateStyles = document.createElement('style');
donateStyles.textContent = `
    .partnership-card {
        transition: all 0.3s ease;
    }
    
    .partnership-card:hover {
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    
    .success-modal {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(donateStyles);