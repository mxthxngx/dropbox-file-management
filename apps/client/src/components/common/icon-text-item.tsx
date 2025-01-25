import { Button } from '@dropbox/ui/components/button';
import React, { FC, ReactNode } from 'react';
import { ButtonVariantType } from '../../types/button-variant'

interface IconTextItemProps {
  icon: ReactNode; 
  title: string;
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariantType;
  disabled?: boolean;
  textClassName?: string;
}

 const IconTextItem  = ({ 
  icon, 
  title, 
  onClick, 
  className = '' ,
  textClassName = '',
  variant=ButtonVariantType.Link,
  disabled=false
}:IconTextItemProps) => {
  return (
    <Button variant={variant}
      className={` ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div>{icon}</div> 
      <span className={`text-sm font-medium ${textClassName}`}>{title}</span>
    </Button>
  );
};

export default IconTextItem;