export function createModal(element: HTMLElement, content: string, onNext: () => void, onPrev: () => void, onClose: () => void): void {
    const modal = document.createElement('div');
    modal.className = 'walkthrough-modal';
    modal.innerHTML = `
    <div class="walkthrough-content">
      ${content}
      <div class="walkthrough-buttons">
        <button id="walkthrough-prev">Previous</button>
        <button id="walkthrough-next">Next</button>
        <button id="walkthrough-close">Close</button>
      </div>
    </div>
  `;

    element.appendChild(modal);

    document.getElementById('walkthrough-next')?.addEventListener('click', onNext);
    document.getElementById('walkthrough-prev')?.addEventListener('click', onPrev);
    document.getElementById('walkthrough-close')?.addEventListener('click', onClose);
    positionModal(element, modal);

}
function positionModal(element: HTMLElement, tooltip: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
}