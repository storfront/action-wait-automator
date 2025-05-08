
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import TriggerCard from './TriggerCard';
import WaitCard from './WaitCard';
import ActionCard from './ActionCard';
import ConditionCard from './ConditionCard';
import DeleteConfirmation from './DeleteConfirmation';
import 'bootstrap/dist/css/bootstrap.min.css';

const AutomationSequence = () => {
  const [groups, setGroups] = useState([
    {
      id: 'group-1',
      parentGroupId: null,
      branchId: null,
      type: 'main',
      items: [{ id: 'trigger-1', type: 'trigger' }]
    }
  ]);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Helper function to generate unique IDs
  const generateId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Helper to find a group by ID
  const findGroupById = (groupId) => {
    return groups.find(group => group.id === groupId);
  };
  
  // Add a wait-condition-action sequence after trigger
  const handleAddAfterTrigger = () => {
    const mainGroup = groups[0]; // The main group that contains the trigger
    
    // Add wait-condition-action to the main sequence
    const waitId = generateId('wait');
    const conditionId = generateId('condition');
    const actionId = generateId('action');
    
    const updatedMainGroup = {
      ...mainGroup,
      items: [
        ...mainGroup.items,
        { id: waitId, type: 'wait' },
        { id: conditionId, type: 'condition' },
        { id: actionId, type: 'action' }
      ]
    };
    
    // Create new groups for true and false branches of the condition
    const trueGroupId = generateId('group');
    const falseGroupId = generateId('group');
    
    setGroups([
      updatedMainGroup,
      {
        id: trueGroupId,
        parentGroupId: mainGroup.id,
        branchId: 'true',
        conditionId: conditionId,
        type: 'branch',
        items: []
      },
      {
        id: falseGroupId,
        parentGroupId: mainGroup.id,
        branchId: 'false',
        conditionId: conditionId,
        type: 'branch',
        items: []
      }
    ]);
  };
  
  // Add a wait-condition-action sequence after an action in the main flow
  const handleAddAfterAction = (groupId) => {
    const waitId = generateId('wait');
    const conditionId = generateId('condition');
    const actionId = generateId('action');
    
    // Find and update the target group
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          items: [...group.items, { id: waitId, type: 'wait' }, { id: conditionId, type: 'condition' }, { id: actionId, type: 'action' }]
        };
      }
      return group;
    }));
    
    // Create new branch groups for the condition
    const trueGroupId = generateId('group');
    const falseGroupId = generateId('group');
    
    setGroups(prevGroups => [
      ...prevGroups,
      {
        id: trueGroupId,
        parentGroupId: groupId,
        branchId: 'true',
        conditionId: conditionId,
        type: 'branch',
        items: []
      },
      {
        id: falseGroupId,
        parentGroupId: groupId,
        branchId: 'false',
        conditionId: conditionId,
        type: 'branch',
        items: []
      }
    ]);
  };
  
  // Add action to a true branch
  const handleAddToTrueBranch = (parentGroupId, conditionId) => {
    const trueGroup = groups.find(g => 
      g.parentGroupId === parentGroupId && 
      g.conditionId === conditionId && 
      g.branchId === 'true'
    );
    
    if (trueGroup) {
      const actionId = generateId('action');
      
      setGroups(groups.map(group => {
        if (group.id === trueGroup.id) {
          return {
            ...group,
            items: [...group.items, { id: actionId, type: 'action' }]
          };
        }
        return group;
      }));
    }
  };
  
  // Add action to a false branch
  const handleAddToFalseBranch = (parentGroupId, conditionId) => {
    const falseGroup = groups.find(g => 
      g.parentGroupId === parentGroupId && 
      g.conditionId === conditionId && 
      g.branchId === 'false'
    );
    
    if (falseGroup) {
      const actionId = generateId('action');
      
      setGroups(groups.map(group => {
        if (group.id === falseGroup.id) {
          return {
            ...group,
            items: [...group.items, { id: actionId, type: 'action' }]
          };
        }
        return group;
      }));
    }
  };
  
  // Prepare to delete a group
  const handlePrepareDelete = (groupId) => {
    setItemToDelete({ type: 'group', id: groupId });
    setShowDeleteModal(true);
  };
  
  // Complete the delete operation after confirmation
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'group') {
      // Delete the group and any child groups
      const groupsToKeep = groups.filter(g => 
        g.id !== itemToDelete.id && g.parentGroupId !== itemToDelete.id
      );
      setGroups(groupsToKeep);
    }
    
    setShowDeleteModal(false);
    setItemToDelete(null);
  };
  
  // Render a single sequence item
  const renderSequenceItem = (item, groupId, isLast, branchId = null) => {
    switch (item.type) {
      case 'trigger':
        return (
          <TriggerCard 
            key={item.id}
            id={item.id}
            onAdd={handleAddAfterTrigger}
            isLast={isLast}
          />
        );
      
      case 'wait':
        return (
          <WaitCard 
            key={item.id}
            id={item.id}
            groupId={groupId}
            branchId={branchId}
          />
        );
        
      case 'condition':
        return (
          <ConditionCard 
            key={item.id}
            id={item.id}
            onAddToTrueBranch={() => handleAddToTrueBranch(groupId, item.id)}
            onAddToFalseBranch={() => handleAddToFalseBranch(groupId, item.id)}
          />
        );
        
      case 'action':
        return (
          <ActionCard 
            key={item.id}
            id={item.id}
            onAdd={() => handleAddAfterAction(groupId)}
            onDelete={() => handlePrepareDelete(groupId)}
            isLast={isLast}
            groupId={groupId}
            branchId={branchId}
          />
        );
        
      default:
        return null;
    }
  };
  
  // Render a branch group
  const renderBranchGroup = (group) => {
    if (group.items.length === 0) {
      return (
        <Box 
          key={group.id}
          sx={{ 
            my: 2,
            mx: group.branchId === 'true' ? 'auto 0' : '0 auto',
            width: '80%',
            p: 2,
            border: '1px dashed',
            borderColor: group.branchId === 'true' ? 'success.light' : 'error.light',
            borderRadius: 1,
            backgroundColor: group.branchId === 'true' ? 'rgba(0, 128, 0, 0.05)' : 'rgba(255, 0, 0, 0.05)',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Empty {group.branchId === 'true' ? 'true' : 'false'} branch
          </Typography>
        </Box>
      );
    }
    
    return (
      <Box 
        key={group.id}
        sx={{ 
          position: 'relative',
          px: 2,
          ml: group.branchId === 'true' ? 4 : 0,
          mr: group.branchId === 'false' ? 4 : 0,
          borderLeft: group.branchId === 'true' ? '2px dashed green' : 'none',
          borderRight: group.branchId === 'false' ? '2px dashed red' : 'none',
          pl: group.branchId === 'true' ? 4 : 2,
          pr: group.branchId === 'false' ? 4 : 2
        }}
      >
        {/* Branch label */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'inline-block',
              py: 0.5, 
              px: 1, 
              borderRadius: 1,
              bgcolor: group.branchId === 'true' ? 'success.light' : 'error.light',
              color: 'white'
            }}
          >
            {group.branchId === 'true' ? 'True branch' : 'False branch'}
          </Typography>
        </Box>
        
        {/* Branch items */}
        {group.items.map((item, index) => (
          renderSequenceItem(
            item,
            group.id,
            index === group.items.length - 1,
            group.branchId
          )
        ))}
      </Box>
    );
  };
  
  // Find all branches connected to a condition
  const findConditionBranches = (conditionId) => {
    return groups.filter(group => group.conditionId === conditionId);
  };
  
  // Render all groups
  const renderGroups = () => {
    // Render main flow first
    const mainGroup = groups.find(g => g.type === 'main');
    if (!mainGroup) return null;
    
    return (
      <Box sx={{ position: 'relative' }}>
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
        
        {/* Main flow items */}
        {mainGroup.items.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderSequenceItem(
              item,
              mainGroup.id,
              index === mainGroup.items.length - 1
            )}
            
            {/* If this is a condition, render its branches */}
            {item.type === 'condition' && (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                mb: 4
              }}>
                {findConditionBranches(item.id).map(branch => renderBranchGroup(branch))}
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    );
  };
  
  return (
    <Box className="automation-container">
      {renderGroups()}
      
      {/* Delete confirmation modal */}
      <DeleteConfirmation 
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
        itemType={itemToDelete?.type || 'item'}
      />
    </Box>
  );
};

export default AutomationSequence;
