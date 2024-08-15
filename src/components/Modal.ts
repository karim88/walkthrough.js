import {bindEvent} from "../utils/common.ts";
import {ModalOptions} from "../utils/common.interface.ts";

export function createModal({
                                element,
                                content,
                                index = 0,
                                length = 1,
                                onNext,
                                onPrev,
                                onClose,
                            }: ModalOptions): void {
    const modal = document.createElement('div');
    modal.className = 'walkthrough-modal';

    modal.innerHTML = `
    <div class="walkthrough-content">
      <button id="walkthrough-close">X</button>
      <div class="walkthrough-container">${content}</div>
      <div class="walkthrough-buttons">
        <div id="walkthrough-steps"></div>
        <div>
          <button id="walkthrough-prev" ${index === 0 ? 'disabled' : ''}>Previous</button>
          <button id="walkthrough-next" class="${index < length - 1 ? '' : 'hidden'}">Next</button>
          <button id="walkthrough-finish" class="${index < length - 1 ? 'hidden' : ''}">Finish</button>
        </div>
      </div>
    </div>
  `;

    element.appendChild(modal);

    const stepsContainer = document.getElementById('walkthrough-steps')!;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < length; i++) {
        const dot = document.createElement('p');
        dot.className = `walkthrough-step${i === index ? ' current' : ''}`;
        dot.textContent = '•';
        fragment.appendChild(dot);
    }

    stepsContainer.appendChild(fragment);

    bindEvent('walkthrough-next', onNext);
    bindEvent('walkthrough-prev', onPrev);
    bindEvent('walkthrough-close', onClose);
    bindEvent('walkthrough-finish', onClose);

    positionModal(element, modal);
}

function positionModal(element: HTMLElement, modal: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const modalRect = modal.getBoundingClientRect();
    const margin = 10; // Margin to keep the modal a little inside the viewport

    // Calculate the default top position
    let top = rect.top - modalRect.height - margin;

    // If the modal is above the top of the viewport, place it below the element
    if (top < 0) {
        top = rect.bottom + margin;
    }

    // If the modal is still offscreen, adjust to fit within the viewport
    if (top + modalRect.height > window.innerHeight) {
        top = window.innerHeight - modalRect.height - margin;
    }

    // Calculate the default left position
    let left = rect.left + (rect.width / 2) - (modalRect.width / 2);

    // Ensure the modal doesn't go offscreen to the left
    if (left < margin) {
        left = margin;
    }

    // Ensure the modal doesn't go offscreen to the right
    if (left + modalRect.width > window.innerWidth) {
        left = window.innerWidth - modalRect.width - margin;
    }

    modal.style.top = `${top}px`;
    modal.style.left = `${left}px`;
}

