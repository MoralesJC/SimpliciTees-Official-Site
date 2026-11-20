/* ============================= THEME DETECTION ============================= */

// Detects the user's preferred system color scheme (light or dark)
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Updates the Bootstrap theme attribute based on the user's system preference
function updateTheme() {
    document.documentElement.setAttribute(
        'data-bs-theme',
        userPrefersDark.matches ? 'dark' : 'light'
    );
}

/* ============================= NAVBAR SCROLL ============================= */

// Selects the navbar element on the page
const navbar = document.querySelector('.navbar');

// Adds or removes 'navbar-scrolled' depending on vertical scroll position
function updateNavbarOnScroll() {
    // Stops if no navbar exists on the current page
    if (!navbar) return;

    // Toggles 'navbar-scrolled' when scrolled past 40px from the top
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 40);
}

/* ============================= INITIALIZATION ============================= */

// Runs initial checks when the script loads
updateTheme();
updateNavbarOnScroll();

// Listens for system theme changes and page scroll events
userPrefersDark.addEventListener('change', updateTheme);
window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });