import { ReactNode, MouseEvent } from "react";

type ButtonProps = {
  children?: ReactNode;
  classname?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = ({
  children = "...",
  classname = "bg-slate-700",
  onClick = () => {},
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`h-10 px-6 font-normal transition duration-300 rounded-md ${classname}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
