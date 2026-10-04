// Helper function to grab saved theme from local storage and toggle the html body element
export const checkAndSetDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);

  return isDarkTheme;
};
