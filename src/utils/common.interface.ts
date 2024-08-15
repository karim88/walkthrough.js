export interface TooltipProps {
    top?: number,
    left?: number,
    right?: number,
    bottom?: number,
    delay?: number
}

export interface Step {
    selector?: string;
    type: 'tooltip' | 'modal';
    content: string;
    callback?: () => void;
}