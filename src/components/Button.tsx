
interface ButtonProps {
    text: string;
    onClick: () => void;
    size: number;
    disabled?: boolean;
}

export const Button = ({ text, onClick, size, disabled }: ButtonProps) => {
    return (
        <button onClick={onClick}
            className="button"
            disabled={disabled}
            style={{ '--countdown-size': `${size}px` } as React.CSSProperties}>
            {text}
        </button>
    )
}
