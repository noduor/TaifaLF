// Legal Pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize legal page functionality
    initLegalNavigation();
    initLegalSectionHighlight();
    initLegalPrintButton();
    initLegalBackToTop();
    initLegalTableOfContents();
});

// Smooth navigation for legal sidebar
function initLegalNavigation() {
    const navLinks = document.querySelectorAll('.legal-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Highlight current section based on scroll
    window.addEventListener('scroll', highlightCurrentSection);
}

// Highlight current section in sidebar
function highlightCurrentSection() {
    const sections = document.querySelectorAll('.legal-section');
    const navLinks = document.querySelectorAll('.legal-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 150 && 
            window.scrollY < sectionTop + sectionHeight - 150) {
            currentSection = '#' + section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Initialize section highlighting on page load
function initLegalSectionHighlight() {
    // Check if there's a hash in URL
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            // Highlight corresponding nav link
            const navLinks = document.querySelectorAll('.legal-nav a');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === window.location.hash) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to section
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}

// Add print button functionality
function initLegalPrintButton() {
    // Check if we're on a legal page
    if (document.querySelector('.legal-content')) {
        // Create print button
        const printButton = document.createElement('button');
        printButton.className = 'legal-print-btn';
        printButton.innerHTML = '<i class="fas fa-print"></i> Print This Page';
        printButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-red);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 30px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(187, 0, 0, 0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        `;
        
        printButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 15px rgba(187, 0, 0, 0.4)';
        });
        
        printButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(187, 0, 0, 0.3)';
        });
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printButton);
        
        // Hide button on print
        const printStyles = document.createElement('style');
        printStyles.textContent = `
            @media print {
                .legal-print-btn {
                    display: none !important;
                }
                .navbar {
                    display: none !important;
                }
                .footer {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(printStyles);
    }
}

// Back to top button
function initLegalBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 70px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-green);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 102, 0, 0.3);
        z-index: 999;
        display: none;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 15px rgba(0, 102, 0, 0.4)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 102, 0, 0.3)';
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
}

// Generate table of contents for sections
function initLegalTableOfContents() {
    const legalMain = document.querySelector('.legal-main');
    if (!legalMain) return;
    
    const sections = legalMain.querySelectorAll('.legal-section');
    if (sections.length === 0) return;
    
    // Check if we already have a sidebar
    const existingSidebar = document.querySelector('.legal-sidebar');
    if (!existingSidebar) {
        // Create table of contents
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents';
        tocContainer.style.cssText = `
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-left: 4px solid var(--primary-red);
        `;
        
        const tocTitle = document.createElement('h3');
        tocTitle.textContent = 'Table of Contents';
        tocTitle.style.cssText = `
            color: var(--primary-black);
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
        `;
        
        const tocList = document.createElement('ul');
        tocList.style.cssText = `
            list-style: none;
            padding: 0;
            margin: 0;
        `;
        
        sections.forEach((section, index) => {
            const sectionId = section.id || `section-${index}`;
            const sectionTitle = section.querySelector('h2')?.textContent || `Section ${index + 1}`;
            
            // Set ID if not already set
            if (!section.id) {
                section.id = sectionId;
            }
            
            const tocItem = document.createElement('li');
            tocItem.style.marginBottom = '8px';
            
            const tocLink = document.createElement('a');
            tocLink.href = `#${sectionId}`;
            tocLink.textContent = sectionTitle;
            tocLink.style.cssText = `
                color: var(--text-color);
                text-decoration: none;
                padding: 5px 10px;
                border-radius: 5px;
                display: block;
                transition: all 0.3s ease;
            `;
            
            tocLink.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--light-gray)';
                this.style.color = 'var(--primary-red)';
            });
            
            tocLink.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.color = 'var(--text-color)';
            });
            
            tocLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: section.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
            
            tocItem.appendChild(tocLink);
            tocList.appendChild(tocItem);
        });
        
        tocContainer.appendChild(tocTitle);
        tocContainer.appendChild(tocList);
        
        // Insert at beginning of legal main
        legalMain.insertBefore(tocContainer, legalMain.firstChild);
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Ctrl + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
        return;
    }
    
    // Escape to close any open modals (if added later)
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Add CSS for animations
const legalStyles = document.createElement('style');
legalStyles.textContent = `
    .legal-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .legal-section.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .legal-nav a.active {
        background: var(--kenya-red) !important;
        color: white !important;
        font-weight: bold;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(legalStyles);

// Initialize section animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.legal-section').forEach(section => {
    sectionObserver.observe(section);
});