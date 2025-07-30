import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent } from "react";

import $ from "./Button.module.css";
import Spinner from "../Spinner/Spinner";

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  return (
    <button
      className={`${$.button} ${variant === "primary" ? $.primary : $.secondary}`}
      type={type}
      onClick={onClick}
    >
      {loading && <Spinner data-testid="loading-spinner" fill="white" width={16} height={16} />}
      {children}
    </button>
  );
};

export default Button;
