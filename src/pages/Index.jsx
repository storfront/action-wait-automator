
import React from 'react';
import AutomationSequence from '../components/automation/AutomationSequence';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Email Automation Builder</h1>
          <p className="text-gray-600 mt-2">Create automated email sequences with custom wait times</p>
        </header>
        
        <AutomationSequence />
      </div>
    </div>
  );
};

export default Index;
