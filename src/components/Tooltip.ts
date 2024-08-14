export function createTooltip(element: HTMLElement, content: string, onNext: () => void): void {
    const tooltip = document.createElement('div');
    tooltip.className = 'walkthrough-tooltip';
    tooltip.innerHTML = `<div class="walkthrough-container">
          ${content}
      </div>`;

    element.appendChild(tooltip);
    document.querySelector('.walkthrough-tooltip')?.addEventListener('click', onNext);
    positionTooltip(element, tooltip);
}

function positionTooltip(element: HTMLElement, tooltip: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    tooltip.style.top = rect.top - tooltip.offsetHeight < 0 ? '0' : `${rect.top - tooltip.offsetHeight}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
}
