// Initiatives Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize filtering
    initInitiativeFiltering();
    
    // Initialize initiative cards animation
    initInitiativeAnimations();
    
    // Initialize initiative details modal
    initInitiativeModal();
});

// Filtering functionality
function initInitiativeFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const initiativeCards = document.querySelectorAll('.initiative-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter cards with animation
            filterCards(filterValue);
        });
    });
    
    function filterCards(filterValue) {
        initiativeCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
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

// Animation for initiative cards
function initInitiativeAnimations() {
    const initiativeCards = document.querySelectorAll('.initiative-card');
    
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
    
    initiativeCards.forEach(card => {
        observer.observe(card);
    });
}

// Initiative details modal
function initInitiativeModal() {
    const initiativeCards = document.querySelectorAll('.initiative-card');
    const modal = document.createElement('div');
    modal.className = 'initiative-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <h3 id="modal-title"></h3>
                <div class="modal-tags" id="modal-tags"></div>
            </div>
            <div class="modal-body">
                <div id="modal-description"></div>
            </div>
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
    
    // Click on initiative card
    initiativeCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('.initiative-body').innerHTML;
            const tags = this.querySelector('.initiative-tags').innerHTML;
            
            showInitiativeModal(title, description, tags);
        });
    });
    
    function showInitiativeModal(title, description, tags) {
        modal.querySelector('#modal-title').textContent = title;
        modal.querySelector('#modal-description').innerHTML = description;
        modal.querySelector('#modal-tags').innerHTML = tags;
        modal.style.display = 'flex';
    }
}

// Add keyboard support
document.addEventListener('keydown', function(e) {
    const modal = document.querySelector('.initiative-modal');
    if (modal && modal.style.display === 'flex' && e.key === 'Escape') {
        modal.style.display = 'none';
    }
});