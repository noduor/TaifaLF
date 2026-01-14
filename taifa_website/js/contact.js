// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    initContactForm();
    
    // Initialize map functionality
    initMap();
    
    // Initialize social links
    initSocialLinks();
    
    // Initialize info cards animation
    initInfoCardsAnimation();
});

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData);
        
        // Validate form
        if (!validateContactForm(formValues)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            // Show success message
            showContactSuccess(formValues);
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    function validateContactForm(data) {
        // Required fields
        const required = ['title', 'firstName', 'lastName', 'phoneNumber', 'emailAddress', 'subject', 'message'];
        
        for (const field of required) {
            if (!data[field] || data[field].trim() === '') {
                alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                document.getElementById(field).focus();
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.emailAddress)) {
            alert('Please enter a valid email address');
            document.getElementById('emailAddress').focus();
            return false;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(data.phoneNumber)) {
            alert('Please enter a valid phone number');
            document.getElementById('phoneNumber').focus();
            return false;
        }
        
        return true;
    }
    
    function showContactSuccess(data) {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background: #d4edda;
            color: #155724;
            padding: 15px 20px;
            border-radius: 8px;
            margin-top: 20px;
            border: 1px solid #c3e6cb;
            animation: slideIn 0.3s ease;
        `;
        
        successDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-check-circle" style="color: #155724;"></i>
                <div>
                    <strong>Thank you, ${data.firstName}!</strong>
                    <p style="margin: 5px 0 0; font-size: 0.9em;">
                        Your message has been sent successfully. We'll respond to you at 
                        <strong>${data.emailAddress}</strong> within 24-48 hours.
                    </p>
                </div>
            </div>
        `;
        
        // Insert after form
        contactForm.parentNode.insertBefore(successDiv, contactForm.nextSibling);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(-10px)';
            successDiv.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 300);
        }, 5000);
    }
}

// Map functionality
function initMap() {
    const mapContainer = document.querySelector('.map-container');
    
    if (!mapContainer) return;
    
    // Create map placeholder
    const mapPlaceholder = document.createElement('div');
    mapPlaceholder.className = 'map-placeholder';
    
    mapPlaceholder.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-map-marker-alt" style="font-size: 3rem; color: #BB0000; margin-bottom: 15px;"></i>
            <h3 style="color: #333; margin-bottom: 10px;">TAIFA LA FURSA CENTRE</h3>
            <p style="color: #666; margin-bottom: 10px;">
                518 Royal Park, Police Dog Unit Road<br>
                Nairobi, Kenya
            </p>
            <a href="https://maps.google.com/?q=518+Royal+Park+Police+Dog+Unit+Road+Nairobi+Kenya" 
               target="_blank" 
               style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #BB0000; color: white; text-decoration: none; border-radius: 5px;">
                <i class="fas fa-directions"></i> Get Directions
            </a>
        </div>
    `;
    
    mapContainer.appendChild(mapPlaceholder);
}

// Social links
function initSocialLinks() {
    const socialLinksContainer = document.querySelector('.social-links');
    
    if (!socialLinksContainer) return;
    
    const socialLinks = [
        { icon: 'fab fa-facebook-f', url: '#', color: '#1877F2' },
        { icon: 'fab fa-twitter', url: '#', color: '#1DA1F2' },
        { icon: 'fab fa-linkedin-in', url: '#', color: '#0077B5' },
        { icon: 'fab fa-instagram', url: '#', color: '#E4405F' },
        { icon: 'fab fa-youtube', url: '#', color: '#FF0000' }
    ];
    
    socialLinks.forEach(social => {
        const link = document.createElement('a');
        link.className = 'social-link';
        link.href = social.url;
        link.target = '_blank';
        link.innerHTML = `<i class="${social.icon}"></i>`;
        link.style.backgroundColor = social.color;
        
        socialLinksContainer.appendChild(link);
    });
}

// Info cards animation
function initInfoCardsAnimation() {
    const infoCards = document.querySelectorAll('.info-card');
    
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
    
    infoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add CSS for animations
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .info-card {
        transition: all 0.3s ease;
    }
    
    .social-link {
        transition: all 0.3s ease;
    }
    
    .social-link:hover {
        transform: translateY(-3px) scale(1.1);
    }
`;
document.head.appendChild(contactStyles);