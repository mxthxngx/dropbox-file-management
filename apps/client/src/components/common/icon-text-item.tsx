import { Button } from "@dropbox/ui/components/button";
import React, { FC, ReactNode } from "react";
import { ButtonVariantType } from "../../types/button-variant";

interface IconTextItemProps {
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariantType;
  disabled?: boolean;
  textClassName?: string;
  children?: ReactNode; 
}

const IconTextItem = ({
  icon,
  onClick,
  className = "",
  variant = ButtonVariantType.Link,
  disabled = false,
  children,
}: IconTextItemProps) => {
  return (
    <Button

      variant={variant}
      className={` ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div>{icon}</div>
      {/* <span className={`text-sm font-medium ${textClassName}`}>{title}</span> */}
      {children}
    </Button>
  );
};

export default IconTextItem;
