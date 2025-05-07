
import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
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
    <Box className="automation-container">
      <Box sx={{ position: 'relative', px: 2 }}>
        {/* Timeline connector */}
        <Box 
          className="sequence-connector" 
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: '#ccc',
            transform: 'translateX(-50%)',
            zIndex: 0
          }}
        />
        
        {sequenceItems.map((item, index) => (
          <Box className="sequence-item" key={item.id} sx={{ position: 'relative', zIndex: 1 }}>
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
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AutomationSequence;
