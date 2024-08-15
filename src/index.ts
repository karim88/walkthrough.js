import { selectElement } from './utils/common.ts';
import { createModal } from './components/Modal';
import './styles/walkthrough.scss';
import { ModalOptions, Step } from "./utils/common.interface.ts";

let currentStep = 0;
let steps: Step[] = [];

/**
 * Displays a walkthrough step modal and highlights the associated element.
 * @param index - Index of the step to show.
 */
export function showStep(index: number): void {
    if (index < 0 || index >= steps.length) return;  // Ensure index is within bounds

    // Remove any existing modals
    document.querySelectorAll('.walkthrough-modal').forEach(item => item.remove());

    const step = steps[index];
    const element = selectElement(step.selector!);
    if (!element) return;

    currentStep = index;

    // Create modal with the current step's content and controls
    const modalOptions: ModalOptions = {
        element,
        content: step.content,
        index,
        length: steps.length,
        onNext: nextStep,
        onPrev: prevStep,
        onClose: closeWalkthrough
    };
    createModal(modalOptions);

    // Highlight the current element and invoke the callback if provided
    highlightElement(element);
    step.callback?.();
}

/**
 * Advances to the next walkthrough step.
 */
export function nextStep(): void {
    if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);
    }
}

/**
 * Goes back to the previous walkthrough step.
 */
export function prevStep(): void {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}

/**
 * Highlights a specific HTML element during the walkthrough.
 * @param element - The HTML element to highlight.
 */
export function highlightElement(element: HTMLElement): void {
    // Remove existing highlights
    selectElement('.walkthrough-highlight')?.classList.remove('walkthrough-highlight');
    // Add highlight to the new element
    element.classList.add('walkthrough-highlight');
}

/**
 * Closes the walkthrough and removes all highlights and modals.
 */
export function closeWalkthrough(): void {
    // Remove all highlights
    document.querySelectorAll('.walkthrough-highlight').forEach(el => el.classList.remove('walkthrough-highlight'));
    // Remove all modals
    document.querySelectorAll('.walkthrough-modal').forEach(modal => modal.remove());
    // Reset step index
    currentStep = 0;
}

/**
 * Initializes the walkthrough with the given steps.
 * @param walkthroughSteps - Array of steps to use in the walkthrough.
 */
export function initWalkthrough(walkthroughSteps: Step[]): void {
    steps = walkthroughSteps;
    showStep(0);
}
