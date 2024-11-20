/**
 * Sets the page's color theme based on the device's preferred color scheme.
 *
 * - If the device prefers a dark theme, the `data-bs-theme` attribute of the
 * `<html>` element is set to "dark".
 * - If the device prefers a light theme, the `data-bs-theme` attribute is set
 * to "light".
 *
 * This function also dynamically updates the theme whenever the device's preferred
 * color scheme changes.
 */
function setThemeBasedOnDevice() {
  const preferredColourScheme = window.matchMedia(
      `(prefers-color-scheme: dark)`).matches ? `dark` : `light`;
  document.documentElement.setAttribute(`data-bs-theme`, preferredColourScheme);
}

// Set the initial theme.
setThemeBasedOnDevice();

// Listen for changes in the device's color scheme and update the theme
// dynamically.
window.matchMedia(`(prefers-color-scheme: dark)`).
    addEventListener(`change`, setThemeBasedOnDevice);
