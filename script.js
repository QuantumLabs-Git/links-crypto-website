// Clock functionality
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    document.getElementById('clock').textContent = `${displayHours}:${minutes} ${ampm}`;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

// Start menu toggle
function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    startMenu.classList.toggle('active');
}

// Close start menu when clicking outside
document.addEventListener('click', function(event) {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.start-button');
    
    if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.classList.remove('active');
    }
});

// Copy contract address
function copyContract() {
    const contractInput = document.getElementById('contractAddress');
    contractInput.select();
    document.execCommand('copy');
    
    // Visual feedback
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 1500);
}

// Open links
function openLink(type) {
    const links = {
        'video': '#', // YouTube video link to be added
        'chart': '#', // Dextools chart link to be added
        'blog': 'blog.html',
        'pump': '#', // Pump.fun link to be added
        'twitter': '#', // Twitter/X link to be added
        'apple': '#' // Apple Pay link to be added
    };
    
    if (type === 'blog') {
        window.location.href = links[type];
    } else if (links[type] !== '#') {
        window.open(links[type], '_blank');
    } else {
        alert('Link coming soon!');
    }
}

// Make contract window draggable (with touch support)
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

const contractWindow = document.getElementById('contractWindow');
const windowHeader = contractWindow.querySelector('.window-header');

// Check if device is mobile
const isMobile = window.matchMedia('(max-width: 767px)').matches;

// Mouse events
windowHeader.addEventListener('mousedown', function(e) {
    if (e.target.classList.contains('window-control')) return;
    if (isMobile) return; // Disable dragging on mobile
    
    isDragging = true;
    dragOffset.x = e.clientX - contractWindow.offsetLeft;
    dragOffset.y = e.clientY - contractWindow.offsetTop;
    
    contractWindow.style.zIndex = '1000';
});

document.addEventListener('mousemove', function(e) {
    if (isDragging && !isMobile) {
        contractWindow.style.left = (e.clientX - dragOffset.x) + 'px';
        contractWindow.style.top = (e.clientY - dragOffset.y) + 'px';
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

// Touch events for mobile
windowHeader.addEventListener('touchstart', function(e) {
    if (e.target.classList.contains('window-control')) return;
    if (isMobile) return; // Disable dragging on mobile
    
    isDragging = true;
    const touch = e.touches[0];
    dragOffset.x = touch.clientX - contractWindow.offsetLeft;
    dragOffset.y = touch.clientY - contractWindow.offsetTop;
    
    contractWindow.style.zIndex = '1000';
    e.preventDefault();
});

document.addEventListener('touchmove', function(e) {
    if (isDragging && !isMobile) {
        const touch = e.touches[0];
        contractWindow.style.left = (touch.clientX - dragOffset.x) + 'px';
        contractWindow.style.top = (touch.clientY - dragOffset.y) + 'px';
        e.preventDefault();
    }
});

document.addEventListener('touchend', function() {
    isDragging = false;
});

// Window controls
document.querySelector('.window-control.close').addEventListener('click', function() {
    contractWindow.style.display = 'none';
});

document.querySelector('.window-control.minimize').addEventListener('click', function() {
    contractWindow.style.display = 'none';
    // Could add to taskbar as minimized
});

document.querySelector('.window-control.maximize').addEventListener('click', function() {
    if (contractWindow.style.width === '100%') {
        contractWindow.style.width = '400px';
        contractWindow.style.height = 'auto';
        contractWindow.style.top = '20px';
        contractWindow.style.right = '20px';
        contractWindow.style.left = 'auto';
    } else {
        contractWindow.style.width = '100%';
        contractWindow.style.height = 'calc(100vh - 40px)';
        contractWindow.style.top = '0';
        contractWindow.style.left = '0';
        contractWindow.style.right = '0';
    }
});

// Links the Cat animation
const linksCat = document.getElementById('linksCat');
let catPosition = { x: window.innerWidth - 270, y: window.innerHeight - 240 };

linksCat.style.left = catPosition.x + 'px';
linksCat.style.top = catPosition.y + 'px';

// Make Links draggable (with touch support)
let isDraggingCat = false;
let catDragOffset = { x: 0, y: 0 };

// Mouse events
linksCat.addEventListener('mousedown', function(e) {
    if (isMobile) return; // Disable dragging on mobile
    isDraggingCat = true;
    catDragOffset.x = e.clientX - linksCat.offsetLeft;
    catDragOffset.y = e.clientY - linksCat.offsetTop;
    linksCat.style.zIndex = '999';
});

document.addEventListener('mousemove', function(e) {
    if (isDraggingCat && !isMobile) {
        linksCat.style.left = (e.clientX - catDragOffset.x) + 'px';
        linksCat.style.top = (e.clientY - catDragOffset.y) + 'px';
    }
});

document.addEventListener('mouseup', function() {
    isDraggingCat = false;
});

// Touch events for mobile
linksCat.addEventListener('touchstart', function(e) {
    if (isMobile) return; // Disable dragging on mobile
    isDraggingCat = true;
    const touch = e.touches[0];
    catDragOffset.x = touch.clientX - linksCat.offsetLeft;
    catDragOffset.y = touch.clientY - linksCat.offsetTop;
    linksCat.style.zIndex = '999';
    e.preventDefault();
});

document.addEventListener('touchmove', function(e) {
    if (isDraggingCat && !isMobile) {
        const touch = e.touches[0];
        linksCat.style.left = (touch.clientX - catDragOffset.x) + 'px';
        linksCat.style.top = (touch.clientY - catDragOffset.y) + 'px';
        e.preventDefault();
    }
});

document.addEventListener('touchend', function() {
    isDraggingCat = false;
});

// Random cat movements (disabled on mobile for performance)
function animateCat() {
    if (!isMobile && !isDraggingCat && Math.random() > 0.98) {
        const newX = Math.random() * (window.innerWidth - 150);
        const newY = Math.random() * (window.innerHeight - 190);
        
        linksCat.style.transition = 'all 2s ease-in-out';
        linksCat.style.left = newX + 'px';
        linksCat.style.top = newY + 'px';
        
        setTimeout(() => {
            linksCat.style.transition = '';
        }, 2000);
    }
}

if (!isMobile) {
    setInterval(animateCat, 3000);
}

// Easter egg: Double click Links for a message
linksCat.addEventListener('dblclick', function() {
    alert("Meow! Links says: I'm here to protect your privacy, not harvest your data!");
});