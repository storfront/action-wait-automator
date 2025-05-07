
import React, { useState } from 'react';
import TriggerCard from './TriggerCard';
import WaitCard from './WaitCard';
import ActionCard from './ActionCard';

const AutomationSequence = () => {
  const [sequenceItems, setSequenceItems] = useState([
    { id: 'trigger-1', type: 'trigger' }
  ]);

  const handleAddAfterTrigger = () => {
    const waitId = `wait-${Date.now()}`;
    const actionId = `action-${Date.now()}`;
    
    setSequenceItems([
      ...sequenceItems,
      { id: waitId, type: 'wait' },
      { id: actionId, type: 'action' }
    ]);
  };

  const handleAddAfterAction = () => {
    const waitId = `wait-${Date.now()}`;
    const actionId = `action-${Date.now()}`;
    
    setSequenceItems([
      ...sequenceItems,
      { id: waitId, type: 'wait' },
      { id: actionId, type: 'action' }
    ]);
  };

  const handleDeleteLastPair = () => {
    // Only allow deletion if we have more than just the trigger
    if (sequenceItems.length > 1) {
      // Remove the last wait and action pair
      setSequenceItems(sequenceItems.slice(0, sequenceItems.length - 2));
    }
  };

  return (
    <div className="automation-container">
      <h1 className="text-2xl font-bold mb-2">Email Automation Sequence</h1>
      <p className="text-gray-600 mb-4">
        Build your email automation flow by adding wait times and actions
      </p>
      
      <div className="sequence-list">
        <div className="sequence-connector"></div>
        
        {sequenceItems.map((item, index) => (
          <div className="sequence-item" key={item.id}>
            {item.type === 'trigger' && (
              <TriggerCard 
                onAdd={handleAddAfterTrigger} 
                isLast={sequenceItems.length === 1} 
              />
            )}
            {item.type === 'wait' && (
              <WaitCard id={item.id} />
            )}
            {item.type === 'action' && (
              <ActionCard 
                id={item.id}
                onAdd={handleAddAfterAction}
                onDelete={handleDeleteLastPair}
                isLast={index === sequenceItems.length - 1}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomationSequence;
