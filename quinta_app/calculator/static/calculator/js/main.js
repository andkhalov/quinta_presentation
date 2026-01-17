// Quinta Essentia Marketing Calculator - Main JavaScript

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active state to current nav item
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Animate numbers on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.stat-number, .income-amount, .total-amount');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const value = el.textContent;
                    
                    // Only animate if it contains a number
                    if (/\d/.test(value)) {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }
                    
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    };
    
    animateOnScroll();
    
    // Tooltips
    initTooltips();
    
    // Tables highlight on hover
    document.querySelectorAll('.data-table tbody tr, .bonus-table tbody tr').forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = 'rgba(184, 134, 11, 0.05)';
        });
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });
});

// Tooltip functionality
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = trigger.dataset.tooltip;
        tooltip.style.cssText = `
            position: absolute;
            background: #1A1A1A;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.875rem;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
            max-width: 250px;
            white-space: normal;
        `;
        
        document.body.appendChild(tooltip);
        
        trigger.addEventListener('mouseenter', (e) => {
            const rect = trigger.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8 + window.scrollY}px`;
            tooltip.style.opacity = '1';
        });
        
        trigger.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
}

// Format currency helper
function formatCurrency(value, currency = 'EUR') {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Format number helper
function formatNumber(value) {
    return new Intl.NumberFormat('ru-RU').format(value);
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success notification
        showNotification('Скопировано!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    const colors = {
        success: '#2D5016',
        error: '#8B0000',
        warning: '#B8860B',
        info: '#4169E1'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Export utilities
window.QuintaUtils = {
    formatCurrency,
    formatNumber,
    debounce,
    copyToClipboard,
    showNotification
};
