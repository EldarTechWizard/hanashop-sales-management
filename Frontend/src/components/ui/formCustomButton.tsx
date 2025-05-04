import { Button, ButtonProps } from "@radix-ui/themes";
import React from "react";

type ButtonColor = NonNullable<ButtonProps["color"]>;

type Props = {
  text?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  color?: ButtonColor
  onClick?: () => void;
};

const CustomButton: React.FC<Props> = ({ text, leftIcon, rightIcon, onClick,color="indigo" }) => {
  return (
    <Button onClick={onClick} className="!cursor-pointer" color={color} >
      {leftIcon && <span >{leftIcon}</span>}
      {text}
      {rightIcon && <span >{rightIcon}</span>}
    </Button>
  );
};

export default CustomButton;
