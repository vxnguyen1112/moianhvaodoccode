import React, { useState } from 'react';
import Select from 'react-select';
import { Breadcrumbs } from 'shared/components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FormHeading } from '../ProjectSettings/Styles';
import "./Backlog.css";

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

const sprint = [
    {
        id: '1',
        content: 'Thiết kế database',
    },
    {
        id: '2',
        content: 'Chuẩn bị môi trường phát triển',
    },
    {
        id: '3',
        content: 'Thiết kế giao diện đăng kí',
    },
    {
        id: '4',
        content: 'Thiết kế giao diện trang chủ',
    },
]

const backlog = [
    {
        id: '5',
        content: 'Code giao diện trang chủ',
    },
    {
        id: '6',
        content: 'Code giao diện đăng kí',
    },
    {
        id: '7',
        content: 'Thiết kê giao diện trang admin',
    },
]

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: 0,
    border: '1px solid #EBECF0',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#fff',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightgrey' : 'lightgrey',
    padding: grid,
    width: '100%'
});

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  

const Backlog = () => {
    const [state, setState] = useState({
        items: sprint, 
        selected: backlog,
    });

    const [isCreateIssue, setIsCreateIssue] = useState(false)

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    const id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    const getList = (id) => state[id2List[id]];

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'droppable') {
                setState({
                    items: items,
                    selected: [...state.selected]
                });
            }

            if (source.droppableId === 'droppable2') {
                setState({
                    items: [...state.items],
                    selected: items
                });
            }

            
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
            {console.log(state)}

            <Breadcrumbs items={['Projects', "singularity 1.0", 'Backlog']} />
            <FormHeading>Backlog</FormHeading>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
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
                                </summary>

                                {state.items.map((item, index) => (
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
                                                className="createIssueSelect"
                                            >
                                                <Select options={options} />
                                            </div>
                                            <input 
                                                type="text"
                                                className="createIssueInput" 
                                            />
                                        </div> }
                                </div>
                            </details>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div
                    style={{
                        width: '100%',
                        height: 50
                    }}
                >
                </div>
                <Droppable droppableId="droppable2">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            className="droppable"
                            >

                            <details open>
                                <summary
                                        className="collopse"
                                    >
                                    Backlog
                                </summary>
                                {state.selected.map((item, index) => (
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
                            </details>
                            
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
    
}


export default Backlog;
