export default function makeActive(e: Event): void {
  const currentElement = e.target as HTMLElement;
  const selectorName = currentElement.className;
  const selectorNameActive = `${selectorName}--active`;
  const currentActive: HTMLElement | null = document.querySelector(`.${selectorNameActive}`);
  if (currentActive) {
    currentActive.classList.remove(selectorNameActive);
    currentElement.classList.add(selectorNameActive);
  }
}
