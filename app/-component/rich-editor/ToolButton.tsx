import { FC, ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  active?: boolean;
  onClick?(): void;
  type?: "button" | "submit" | "reset"; 
}

const ToolButton: FC<Props> = ({
  children,
  active,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "p-2 rounded transition-colors",
        active ? "text-accent" : "text-white"
      )}
    >
      {children}
    </button>
  );
};

export default ToolButton;
