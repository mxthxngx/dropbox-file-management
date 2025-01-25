import { Button } from '@dropbox/ui/components/button';
import React, { FC, ReactNode } from 'react';
import { ButtonVariantType } from '../../types/ButtonVariant'

interface IconTextItemProps {
  icon: ReactNode; 
  title: string;
  onClick?: () => void;
  className?: string;
  variant?: ButtonVariantType
}

const IconTextItem: FC<IconTextItemProps> = ({ 
  icon, 
  title, 
  onClick, 
  className = '' ,
  variant=ButtonVariantType.Link
}) => {
  return (
    <Button variant={variant}
      className={` ${className}`}
      onClick={onClick}
    >
      <div>{icon}</div> 
      <span className="text-sm font-medium">{title}</span>
    </Button>
  );
};

export default IconTextItem;