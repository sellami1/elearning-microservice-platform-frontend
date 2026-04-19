/**
 * Possible theme modes for the application.
 */
export type ThemeMode = "light" | "dark";

/**
 * The key used to store the user's theme preference in localStorage.
 */
export const THEME_STORAGE_KEY = "theme";

/**
 * Type guard to check if a value is a valid ThemeMode.
 * @param value - The value to check.
 * @returns True if the value is "light" or "dark".
 */
export function isThemeMode(value: string | null | undefined): value is ThemeMode {
  return value === "light" || value === "dark";
}

/**
 * Detects the system theme preference (dark or light).
 * Defaults to "light" if window is undefined (SSR).
 * @returns The system's preferred theme mode.
 */
export function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Retrieves the stored theme preference from localStorage.
 * @returns The stored ThemeMode or null if not found or invalid.
 */
export function getStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeMode(storedTheme) ? storedTheme : null;
}

/**
 * Resolves the theme to be used, prioritizing stored preference, then system preference.
 * @returns The resolved ThemeMode.
 */
export function resolveTheme(): ThemeMode {
  return getStoredTheme() ?? getSystemTheme();
}

/**
 * Applies the specified theme to the document root and sets the color-scheme.
 * @param theme - The ThemeMode to apply.
 */
export function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}