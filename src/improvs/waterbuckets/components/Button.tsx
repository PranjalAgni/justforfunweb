import React from "react";
import "./Button.css"; // Import the CSS file for styling

export interface IButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const Button = ({
  onClick,
  children,
  className,
  color = "blue",
}: IButtonProps) => {
  return (
    <button
      className={`custom-button ${className} button-${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
