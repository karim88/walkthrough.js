import { selectElement } from './utils/selectors';
import { createTooltip } from './components/Tooltip';
import { createModal } from './components/Modal';
import './styles/walkthrough.scss';

interface Step {
    selector: string;
    type: 'tooltip' | 'modal';
    content: string;
}

let currentStep = 0;
let steps: Step[] = [];

export function showStep(index: number): void {
    console.log(index, steps.length)
    //if (index < 0 || index >= steps.length) return;

    const step = steps[index];
    const element = selectElement(step.selector);

    if (!element) return;

    if (step.type === 'tooltip') {
        createTooltip(element, step.content, nextStep);
    } else if (step.type === 'modal') {
        console.log(element, step.content, index);
        document.querySelectorAll('.walkthrough-modal')
            .forEach(item => item.remove())
        createModal(
            element,
            step.content,
            nextStep,
            prevStep,
            closeWalkthrough
        );
    }

    highlightElement(element);
    currentStep = index;
}

export function nextStep(): void {
    console.log('next')
    showStep(currentStep + 1);
}

export function prevStep(): void {
    console.log('prev')
    showStep(currentStep - 1);
}

export function highlightElement(element: HTMLElement): void {
    selectElement('.walkthrough-highlight')?.classList.remove('walkthrough-highlight');
    element.classList.add('walkthrough-highlight');
}

export function closeWalkthrough(): void {
    console.log('close')
    const highlights = document.querySelectorAll('.walkthrough-highlight');
    highlights.forEach(el => el.classList.remove('walkthrough-highlight'));
    const modals = document.querySelectorAll('.walkthrough-modal');
    modals.forEach(modal => modal.remove());
    currentStep = 0;
}

export function startWalkthrough(walkthroughSteps: Step[]): void {
    steps = walkthroughSteps;
    showStep(0);
}
