import { ReactElement } from 'react';

const Loading = (): ReactElement => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex items-center justify-center space-x-3 animate-pulse">
        <div className="w-5 h-5 bg-primary rounded-full"></div>
        <div className="w-5 h-5 bg-primary rounded-full"></div>
        <div className="w-5 h-5 bg-primary rounded-full"></div>
      </div>
    </div>
  );
};

export default Loading;
