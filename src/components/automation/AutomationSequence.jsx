
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import TriggerCard from './TriggerCard';
import WaitCard from './WaitCard';
import ActionCard from './ActionCard';
import ConditionCard from './ConditionCard';
import DeleteConfirmation from './DeleteConfirmation';
import CardSelectionModal from './CardSelectionModal';
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
  const [showCardSelectionModal, setShowCardSelectionModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [cardInsertPosition, setCardInsertPosition] = useState(null);
  
  // Helper function to generate unique IDs
  const generateId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  // Helper to find a group by ID
  const findGroupById = (groupId) => {
    return groups.find(group => group.id === groupId);
  };
  
  // Add a card after trigger
  const handleAddAfterTrigger = () => {
    setCardInsertPosition({
      type: 'after',
      groupId: 'group-1',
      afterItemId: 'trigger-1'
    });
    setShowCardSelectionModal(true);
  };
  
  // Add a card after an action in any flow
  const handleAddAfterAction = (actionId, groupId) => {
    setCardInsertPosition({
      type: 'after',
      groupId: groupId,
      afterItemId: actionId
    });
    setShowCardSelectionModal(true);
  };
  
  // Insert a card between existing cards
  const handleInsertCard = (itemId, groupId) => {
    setCardInsertPosition({
      type: 'insert',
      groupId: groupId,
      insertBeforeItemId: itemId
    });
    setShowCardSelectionModal(true);
  };
  
  // Handle card selection from modal
  const handleCardSelect = (cardType, position) => {
    const { type, groupId } = position;
    
    if (type === 'after') {
      const { afterItemId } = position;
      const newCardId = generateId(cardType);
      
      // Add the new card after the specified item
      setGroups(prevGroups => {
        return prevGroups.map(group => {
          if (group.id === groupId) {
            const itemIndex = group.items.findIndex(item => item.id === afterItemId);
            if (itemIndex !== -1) {
              const newItems = [...group.items];
              newItems.splice(itemIndex + 1, 0, { id: newCardId, type: cardType });
              return { ...group, items: newItems };
            }
          }
          return group;
        });
      });
      
      // If a condition card was added, create branch groups
      if (cardType === 'condition') {
        const trueGroupId = generateId('group');
        const falseGroupId = generateId('group');
        
        setGroups(prevGroups => [
          ...prevGroups,
          {
            id: trueGroupId,
            parentGroupId: groupId,
            branchId: 'true',
            conditionId: newCardId,
            type: 'branch',
            items: []
          },
          {
            id: falseGroupId,
            parentGroupId: groupId,
            branchId: 'false',
            conditionId: newCardId,
            type: 'branch',
            items: []
          }
        ]);
      }
    } 
    else if (type === 'insert') {
      const { insertBeforeItemId } = position;
      const newCardId = generateId(cardType);
      
      // Insert the new card before the specified item
      setGroups(prevGroups => {
        return prevGroups.map(group => {
          if (group.id === groupId) {
            const itemIndex = group.items.findIndex(item => item.id === insertBeforeItemId);
            if (itemIndex !== -1) {
              const newItems = [...group.items];
              newItems.splice(itemIndex, 0, { id: newCardId, type: cardType });
              return { ...group, items: newItems };
            }
          }
          return group;
        });
      });
      
      // If a condition card was inserted, create branch groups
      if (cardType === 'condition') {
        const trueGroupId = generateId('group');
        const falseGroupId = generateId('group');
        
        setGroups(prevGroups => [
          ...prevGroups,
          {
            id: trueGroupId,
            parentGroupId: groupId,
            branchId: 'true',
            conditionId: newCardId,
            type: 'branch',
            items: []
          },
          {
            id: falseGroupId,
            parentGroupId: groupId,
            branchId: 'false',
            conditionId: newCardId,
            type: 'branch',
            items: []
          }
        ]);
      }
    }
    else if (type === 'branch') {
      const { branchId, conditionId, parentGroupId } = position;
      const newCardId = generateId(cardType);
      
      // Find the branch group and add card to it
      const branchGroup = groups.find(g => 
        g.parentGroupId === parentGroupId && 
        g.conditionId === conditionId && 
        g.branchId === branchId
      );
      
      if (branchGroup) {
        setGroups(prevGroups => {
          return prevGroups.map(group => {
            if (group.id === branchGroup.id) {
              return {
                ...group,
                items: [...group.items, { id: newCardId, type: cardType }]
              };
            }
            return group;
          });
        });
      }
    }
  };
  
  // Add action to a true branch
  const handleAddToTrueBranch = (parentGroupId, conditionId) => {
    setCardInsertPosition({
      type: 'branch',
      parentGroupId: parentGroupId,
      conditionId: conditionId,
      branchId: 'true'
    });
    setShowCardSelectionModal(true);
  };
  
  // Add action to a false branch
  const handleAddToFalseBranch = (parentGroupId, conditionId) => {
    setCardInsertPosition({
      type: 'branch',
      parentGroupId: parentGroupId,
      conditionId: conditionId,
      branchId: 'false'
    });
    setShowCardSelectionModal(true);
  };
  
  // Prepare to delete an item
  const handlePrepareDelete = (itemId, groupId) => {
    // Check if it's a condition card - if so, warn about deleting branches
    const group = findGroupById(groupId);
    if (group) {
      const item = group.items.find(i => i.id === itemId);
      if (item && item.type === 'condition') {
        // This is a condition card - check for branches
        const hasConnectedBranches = groups.some(g => g.conditionId === itemId);
        setItemToDelete({ 
          type: 'condition', 
          id: itemId, 
          groupId: groupId,
          hasChildren: hasConnectedBranches
        });
      } else {
        setItemToDelete({ 
          type: item ? item.type : 'card', 
          id: itemId, 
          groupId: groupId,
          hasChildren: false
        });
      }
      setShowDeleteModal(true);
    }
  };
  
  // Prepare to delete a group
  const handlePrepareDeleteGroup = (groupId) => {
    const group = findGroupById(groupId);
    if (group) {
      const hasChildren = group.items.some(item => 
        item.type === 'condition' && 
        groups.some(g => g.conditionId === item.id)
      );
      
      setItemToDelete({ 
        type: 'group', 
        id: groupId,
        hasChildren: hasChildren
      });
      setShowDeleteModal(true);
    }
  };
  
  // Complete the delete operation after confirmation
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    
    if (itemToDelete.type === 'group') {
      // Delete the group and any child groups
      const groupsToDelete = [itemToDelete.id];
      
      // Find all descendant groups (recursively)
      let checkGroups = [itemToDelete.id];
      while (checkGroups.length > 0) {
        const currentGroup = checkGroups.shift();
        const childGroups = groups.filter(g => g.parentGroupId === currentGroup);
        childGroups.forEach(child => {
          groupsToDelete.push(child.id);
          checkGroups.push(child.id);
        });
      }
      
      setGroups(prevGroups => prevGroups.filter(g => !groupsToDelete.includes(g.id)));
    }
    else if (itemToDelete.type === 'condition') {
      // Delete the condition and all its branches
      const { id: conditionId, groupId } = itemToDelete;
      
      // Remove the condition from its group
      setGroups(prevGroups => {
        const updatedGroups = prevGroups.map(group => {
          if (group.id === groupId) {
            return {
              ...group,
              items: group.items.filter(item => item.id !== conditionId)
            };
          }
          return group;
        });
        
        // Remove all branch groups connected to this condition
        return updatedGroups.filter(group => group.conditionId !== conditionId);
      });
    }
    else {
      // Delete a single card
      const { id: itemId, groupId } = itemToDelete;
      setGroups(prevGroups => {
        return prevGroups.map(group => {
          if (group.id === groupId) {
            return {
              ...group,
              items: group.items.filter(item => item.id !== itemId)
            };
          }
          return group;
        });
      });
    }
    
    setShowDeleteModal(false);
    setItemToDelete(null);
  };
  
  // Close the card selection modal
  const handleCloseCardSelectionModal = () => {
    setShowCardSelectionModal(false);
    setCardInsertPosition(null);
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
            onDelete={(itemId) => handlePrepareDelete(itemId, groupId)}
            onInsert={(itemId) => handleInsertCard(itemId, groupId)}
          />
        );
        
      case 'condition':
        return (
          <ConditionCard 
            key={item.id}
            id={item.id}
            onAddToTrueBranch={() => handleAddToTrueBranch(groupId, item.id)}
            onAddToFalseBranch={() => handleAddToFalseBranch(groupId, item.id)}
            onDelete={() => handlePrepareDelete(item.id, groupId)}
            onInsert={() => handleInsertCard(item.id, groupId)}
          />
        );
        
      case 'action':
        return (
          <ActionCard 
            key={item.id}
            id={item.id}
            onAdd={() => handleAddAfterAction(item.id, groupId)}
            onDelete={() => handlePrepareDelete(item.id, groupId)}
            onInsert={() => handleInsertCard(item.id, groupId)}
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
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <Button 
            size="small" 
            color="error" 
            variant="outlined" 
            onClick={() => handlePrepareDeleteGroup(group.id)}
            sx={{ fontSize: '0.7rem', py: 0 }}
          >
            Delete Branch
          </Button>
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
        hasChildren={itemToDelete?.hasChildren || false}
      />
      
      {/* Card selection modal */}
      <CardSelectionModal
        show={showCardSelectionModal}
        handleClose={handleCloseCardSelectionModal}
        handleSelect={handleCardSelect}
        position={cardInsertPosition}
      />
    </Box>
  );
};

export default AutomationSequence;
