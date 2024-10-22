import React from 'react';

interface IconProps {
  type: 'check' | 'cross' | 'money';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ type, className }) => {
  const icons = {
    check: (
      <span className={className} role="img" aria-label="check">
        ✅
      </span>
    ),
    cross: (
      <span className={className} role="img" aria-label="cross">
        ❌
      </span>
    ),
    money: (
      <span className={className} role="img" aria-label="money">
        💰
      </span>
    ),
  };

  return icons[type] || null;
};

export default Icon;
