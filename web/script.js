// Mobile hamburger toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Download button feedback — show toast notification on click
document.querySelectorAll('a.btn[href*="/download/"]').forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove any existing toast
        const old = document.getElementById('dl-toast');
        if (old) old.remove();

        const toast = document.createElement('div');
        toast.id = 'dl-toast';
        toast.setAttribute('role', 'status');
        toast.innerHTML = '<svg width="18" height="18" viewBox="0 0 16 16" fill="#4ade80" aria-hidden="true"><path d="M13.485 1.929a.75.75 0 0 1 .086 1.057l-7.25 8.5a.75.75 0 0 1-1.1.043L2.22 8.529a.75.75 0 1 1 1.06-1.06l2.44 2.44 6.708-7.893a.75.75 0 0 1 1.057-.087z"/></svg> Your download has started \u2014 check your downloads folder';
        Object.assign(toast.style, {
            position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            background: '#1a1a1a', color: '#e8e8e8', border: '1px solid #333',
            padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '0.9rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            zIndex: '9999', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            animation: 'dl-toast-in 0.3s ease'
        });
        document.body.appendChild(toast);

        setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; }, 5000);
        setTimeout(() => toast.remove(), 5300);
    });
});

if (!document.getElementById('dl-toast-style')) {
    const s = document.createElement('style');
    s.id = 'dl-toast-style';
    s.textContent = '@keyframes dl-toast-in{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
    document.head.appendChild(s);
}

// Screenshot lightbox
const screenshot = document.querySelector('.app-screenshot');
if (screenshot) {
    screenshot.addEventListener('click', function () {
        const overlay = document.createElement('div');
        overlay.className = 'screenshot-overlay';
        const img = document.createElement('img');
        img.src = this.src;
        img.alt = this.alt;
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        // Trigger transition
        requestAnimationFrame(() => overlay.classList.add('active'));
        overlay.addEventListener('click', () => {
            overlay.classList.remove('active');
            overlay.addEventListener('transitionend', () => overlay.remove());
        });
    });
}
