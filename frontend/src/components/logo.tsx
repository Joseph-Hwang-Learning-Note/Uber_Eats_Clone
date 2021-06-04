import React from 'react';
import logo from 'src/img/logo.svg';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({
  className,
}) => {
  return <img 
    className={className} 
    src={logo} 
    alt="Nuber Eats"
  />;
};

export default Logo;
