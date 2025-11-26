import React from 'react';
import { Outlet } from 'react-router-dom';
import { WebHeader } from './WebHeader';
import { WebFooter } from './WebFooter';
import { AiAssistant } from '../../shared/AiAssistant';

export const WebLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <WebHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <WebFooter />
      <AiAssistant />
    </div>
  );
};
