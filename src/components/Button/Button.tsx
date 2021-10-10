import { ReactElement } from 'react';
import './Button.scss';

const Button = ({
  children,
  onClick,
  buttonStyleType,
  style,
  ...props
}: any): ReactElement => {
  return (
    <button
      onClick={onClick}
      className={`btn ${buttonStyleType}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
