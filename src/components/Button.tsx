import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
}
const Button = (props: ButtonProps) => {
    const { children, type, onClick, className } = props;

    return (
        <button 
            className={`rounded-lg bg-blue-500 px-3 py-2 text-white font-semibold ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;