export function scrollToSection(href: string) {
  if (href === '#') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return;
  }

  const targetId = href.replace('#', '');
  const element = document.getElementById(targetId);

  if (element) {
    const navOffset = 80;
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}