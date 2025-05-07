
import React from 'react';

type ActionCardProps = {
  id: string;
  onAdd: () => void;
  onDelete: () => void;
  isLast: boolean;
};

const ActionCard: React.FC<ActionCardProps> = ({ id, onAdd, onDelete, isLast }) => {
  return (
    <div className="sequence-card action-card">
      <div className="card-header">
        <h3 className="text-sm font-medium">Action</h3>
      </div>
      <div className="card-body">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-sm">📤</span>
            </div>
            <span className="text-sm font-medium">Send Email</span>
          </div>
          
          <div className="pl-10">
            <div className="space-y-3">
              <input 
                type="text" 
                id={`subject-${id}`}
                placeholder="Email Subject" 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              />
              <textarea 
                id={`content-${id}`}
                rows={2} 
                placeholder="Email Content" 
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              />
            </div>
          </div>

          {isLast && (
            <div className="flex justify-between mt-4 pt-2 border-t border-gray-100">
              <button 
                onClick={onDelete} 
                className="flex items-center px-3 py-1 bg-red-50 text-red-600 text-sm rounded-md hover:bg-red-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                Delete
              </button>
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

export default ActionCard;
