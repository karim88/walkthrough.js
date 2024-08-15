export function createModal(
    element: HTMLElement,
    content: string,
    index: number = 0,
    length: number,
    onNext: () => void,
    onPrev: () => void,
    onClose: () => void): void {
    const modal = document.createElement('div');
    modal.className = 'walkthrough-modal';
    modal.innerHTML = `
    <div class="walkthrough-content">
      <button id="walkthrough-close">X</button>
      <div class="walkthrough-container">
          ${content}
      </div>
      <div class="walkthrough-buttons">
        <div id="walkthrough-steps"></div>
        <div>
            <button id="walkthrough-prev" ${index === 0 ? 'disabled' : ''}>Previous</button>
            <button id="walkthrough-next" class="${index < length -1 ? '' : 'hidden'}">Next</button>
            <button id="walkthrough-finish" class="${index < length -1 ? 'hidden' : ''}">Finish</button>
        </div>
      </div>
    </div>
  `;
    element.appendChild(modal);

    for (let i = 0; i < length; i++) {
        const dot = document.createElement('p');
        dot.className = 'walkthrough-step'
        if (i === index) {
            dot.className += ' current';
        }
        dot.innerHTML = `•`
        document.getElementById('walkthrough-steps')?.appendChild(dot);
    }
    document.getElementById('walkthrough-next')?.addEventListener('click', onNext);
    document.getElementById('walkthrough-prev')?.addEventListener('click', onPrev);
    document.getElementById('walkthrough-close')?.addEventListener('click', onClose);
    document.getElementById('walkthrough-finish')?.addEventListener('click', onClose);
    positionModal(element, modal);
}

function positionModal(element: HTMLElement, modal: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    modal.style.top = rect.top - modal.offsetHeight < 0 ? '0' :`${rect.top - modal.offsetHeight}px`;

    modal.style.left = `${rect.left + (rect.width / 2) - (modal.offsetWidth / 2)}px`;
}