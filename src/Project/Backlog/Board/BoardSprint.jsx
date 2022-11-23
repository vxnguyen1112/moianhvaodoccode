import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button } from 'components';
import Divider from '../Divider';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import "./Board.css";

const options = [
    { value: 'task', label: 'Task' },
    { value: 'bug', label: 'Bug' },
    { value: 'error', label: 'Error' }
]

const BoardSprint = (props) => {
    const {droppableId, boardState, getListStyle, getItemStyle} = props;
    const [isCreateIssue, setIsCreateIssue] = useState(false);

    return (
        <>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="droppable">

                        <details open>
                            <summary
                                className="collopse"
                            >
                                Sprint 1
                                <Button type="submit" variant="primary" className="btn btnBoard">
                                    Start sprint
                                </Button>
                            </summary>

                            {boardState.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            <div
                                className="createIssueArea"
                            >
                                <span 
                                    className={isCreateIssue ? 'hidden' : undefined}
                                    onClick={() => setIsCreateIssue(true)}
                                >
                                    + Create issue
                                </span>
                                { isCreateIssue &&
                                    <div
                                        className="createIssueGroupInput"
                                    >
                                        <div
                                            className="createIssueGroupInputWrapper"
                                        >
                                            <div
                                                className="createIssueSelect"
                                            >
                                                <Select options={options} />
                                            </div>
                                            <input 
                                                type="text"
                                                className="createIssueInput" 
                                            />
                                        </div> 
                                        <div
                                            className="createIssueGroupButton"
                                        >
                                            <Button type="submit" variant="primary" className="btn">
                                                Create Issue
                                            </Button>
                                            <Button 
                                                type="button" 
                                                variant="empty" 
                                                className="btn"
                                                onClick={() => setIsCreateIssue(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>}
                            </div>
                        </details>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <Divider/>
        </>
    );
}

export default BoardSprint;