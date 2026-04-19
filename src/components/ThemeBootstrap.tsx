export function ThemeBootstrap() {
  const themeScript = `
    (function() {
      try {
        var storedTheme = localStorage.getItem('theme');
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : systemTheme;
        var root = document.documentElement;
        root.dataset.theme = theme;
        root.style.colorScheme = theme;
      } catch (error) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}