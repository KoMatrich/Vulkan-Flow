import {useState} from "react";

export function useNodeClickHandlers(
    onSingleClick?: () => void,
    onDoubleClick?: () => void,
    delay: number = 250 // Default delay for differentiating clicks
) {
    const [clickTimeout, setClickTimeout] = useState<number | null>(null);

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();

        // If a double-click is detected, clear the single-click timeout
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
            return;
        }

        // Set a timeout for single-click
        const timeout = window.setTimeout(() => {
            if (onSingleClick) onSingleClick();
            setClickTimeout(null);
        }, delay);

        setClickTimeout(timeout);
    };

    const handleDoubleClick = (event: React.MouseEvent) => {
        event.stopPropagation();

        // If double-click happens, cancel the single-click action
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            setClickTimeout(null);
        }

        if (onDoubleClick) onDoubleClick();
    };

    return {handleClick, handleDoubleClick};
}
