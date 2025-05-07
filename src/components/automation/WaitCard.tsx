
import React from 'react';

type WaitCardProps = {
  id: string;
};

const WaitCard: React.FC<WaitCardProps> = ({ id }) => {
  return (
    <div className="sequence-card wait-card">
      <div className="card-header">
        <h3 className="text-sm font-medium">Wait</h3>
      </div>
      <div className="card-body">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-amber-600 text-sm">⏱️</span>
            </div>
            <span className="text-sm font-medium">Time Delay</span>
          </div>
          
          <div className="pl-10">
            <div className="flex items-center space-x-2">
              <div className="relative w-24">
                <select 
                  id={`wait-time-${id}`}
                  className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  defaultValue="1"
                >
                  {[...Array(24)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              <div className="relative w-32">
                <select 
                  id={`wait-unit-${id}`}
                  className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  defaultValue="hours"
                >
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="connector-dot"></div>
    </div>
  );
};

export default WaitCard;
