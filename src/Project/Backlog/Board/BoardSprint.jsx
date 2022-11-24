import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import Select from 'react-select';
import { Button } from 'components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { addIssue } from 'store/reducers/backlogSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-project-management';
import Divider from '../Divider';
import "./Board.css";

const options = [
    { value: 'task', label: 'Task' },
    { value: 'bug', label: 'Bug' },
    { value: 'error', label: 'Error' }
]

const BoardSprint = (props) => {
    const dispatch = useDispatch();
    const {droppableId, boardState, getListStyle, getItemStyle} = props;
    const [isCreateIssue, setIsCreateIssue] = useState(false);
    const [issueContent, setIssueContent] = useState("")
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const onCreateIssue = () => {
        if (issueContent.trim() === "") {
            toast.error('Vui lòng nhập tên issue');
        } else {
            dispatch(addIssue({
                boardId: droppableId,
                issue: {
                    id: uuid(),
                    content: issueContent,
                    type: selectedOption.value
                }
            }))
            setIsCreateIssue(false);
        }
        
    }

    return (
        <React.Fragment>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className="droppable">

                        <details open>
                            <summary className="collopse">
                                Backlog
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

                            <div className="createIssueArea">
                                <span 
                                    className={isCreateIssue ? 'hidden' : undefined}
                                    onClick={() => setIsCreateIssue(true)}
                                >
                                    + Create issue
                                </span>
                                { isCreateIssue &&
                                    <div className="createIssueGroupInput">
                                        <div className="createIssueGroupInputWrapper">
                                            <div className="createIssueSelect">
                                                <Select 
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}/>
                                            </div>
                                            <input 
                                                type="text"
                                                value={issueContent}
                                                onChange={(e) => setIssueContent(e.target.value)}
                                                className="createIssueInput" 
                                            />
                                        </div> 
                                        <div className="createIssueGroupButton">
                                            <Button 
                                                type="submit" 
                                                variant="primary" 
                                                className="btn"
                                                onClick={onCreateIssue}>
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
        </React.Fragment>
    );
}

export default BoardSprint;