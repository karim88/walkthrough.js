import {Step} from "../utils/common.interface.ts";

export function createTooltip(step: Step): void {
    const tooltip = document.createElement('div');
    tooltip.className = 'walkthrough-tooltip';
    tooltip.innerHTML = step.content;

    document.body.appendChild(tooltip);
}

