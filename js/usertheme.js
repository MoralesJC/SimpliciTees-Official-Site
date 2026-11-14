// Detects the user's preferred system color scheme (light or dark)
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Updates the Bootstrap theme based on the user's system preference
function updateTheme() {
    document.documentElement.setAttribute(
        'data-bs-theme',
        userPrefersDark.matches ? 'dark' : 'light'
    );
}

// Applies the initial theme when the page loads
updateTheme();

// Listens for system theme changes and updates the Bootstrap theme accordingly
userPrefersDark.addEventListener('change', updateTheme);