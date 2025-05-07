
import React from 'react';
import { Card } from "@/components/ui/card";

const TriggerCard = ({ onAdd, isLast }) => {
  return (
    <div className="sequence-card trigger-card">
      <div className="card-header">
        <h3 className="text-sm font-medium">Trigger</h3>
      </div>
      <div className="card-body">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-sm">📧</span>
            </div>
            <span className="text-sm font-medium">Email Received</span>
          </div>
          
          <div className="text-sm text-gray-500 pl-10">
            When a new email is received that matches the criteria
          </div>

          {isLast && (
            <div className="flex justify-end mt-4 pt-2 border-t border-gray-100">
              <button 
                onClick={onAdd} 
                className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add
              </button>
            </div>
          )}
        </div>
      </div>
      {!isLast && <div className="connector-dot"></div>}
    </div>
  );
};

export default TriggerCard;
