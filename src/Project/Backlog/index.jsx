import React, { useEffect, useState } from 'react';
import { Button, Breadcrumbs } from 'components';
import { DragDropContext } from 'react-beautiful-dnd';
import { FormHeading } from '../ProjectSettings/Styles';
import BoardSprint from './Board/BoardSprint';
import BoardBacklog from './Board/BoardBacklog';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

const boards = [
    {
        id: 'droppable1',
        isBacklog: true,
        status: 1,
        issues:  [
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
    },
    {
        id: 'droppable2',
        isBacklog: false,
        status: 1,
        issues: [
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
    },
    {
        id: 'droppable3',
        isBacklog: false,
        status: 1,
        issues: [
            {
                id: '8',
                content: 'Code giao diện trang tganh toán',
            },
            {
                id: '9',
                content: 'Code giao diện xem chi tiết đơn hàng',
            },
            {
                id: '10',
                content: 'Thiết kê giao diện trang thanh toán',
            },
        ]
    }
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
    { value: 'task', label: 'Task' },
    { value: 'bug', label: 'Bug' },
    { value: 'error', label: 'Error' }
]

const Backlog = () => {
    const [state, setState] = useState(boards);

    const getList = (id) => boards.filter(board => board.id === id);

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

            setState(prev => prev.forEach(board => {
                if (board.id === source.droppableId) {
                    board = [...items];
                }

                return board;
            }))

            // if (source.droppableId === 'droppable') {
            //     setState({
            //         items: items,
            //         selected: [...state.selected]
            //     });
            // }

            // if (source.droppableId === 'droppable2') {
            //     setState({
            //         items: [...state.items],
            //         selected: items
            //     });
            // }

        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            setState(prev => prev.forEach(board => {
                if (board.id === source.droppableId) {
                    board = [...result[source.droppableId]];
                }

                if (board.id === destination.droppableId) {
                    board = [...result[destination.droppableId]]
                }

                return board;
            }))

            // setState({
            //     items: result.droppable,
            //     selected: result.droppable2
            // });
        }
    };

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
                {/* <Droppable droppableId="droppable">
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
                                        className={isCreateIssueSprint ? 'hidden' : undefined}
                                        onClick={() => setIsCreateIssueSprint(true)}
                                    >
                                        + Create issue
                                    </span>
                                    { isCreateIssueSprint &&
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
                                                    onClick={() => setIsCreateIssueSprint(false)}
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
                </Droppable> */}
                { boards.map(board => {
                    if(board.isBacklog) {
                        return (
                            <BoardBacklog
                                key={board.id}
                                droppableId={board.id}
                                boardState={board.issues}
                                getListStyle={getListStyle}
                                getItemStyle={getItemStyle}
                            />
                        )
                    } else {
                        return (
                            <BoardSprint
                                key={board.id}
                                droppableId={board.id}
                                boardState={board.issues}
                                getListStyle={getListStyle}
                                getItemStyle={getItemStyle}
                            />
                        )
                    }
                })}
                

            </DragDropContext>
        </div>
    );
    
}


export default Backlog;
