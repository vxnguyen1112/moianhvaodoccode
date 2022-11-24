import { createSlice } from '@reduxjs/toolkit';
import { uuid } from 'uuidv4';

const boards = [
    {
        id: 'droppable1',
        isBacklog: true,
        status: 1,
        issues:  [
            {
                id: uuid(),
                content: 'Thiết kế database',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Chuẩn bị môi trường phát triển',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Thiết kế giao diện đăng kí',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Thiết kế giao diện trang chủ',
                type: 'task'
            },
        ]
    },
    {
        id: 'droppable2',
        isBacklog: false,
        status: 1,
        issues: [
            {
                id: uuid(),
                content: 'Code giao diện trang chủ',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Code giao diện đăng kí',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Thiết kê giao diện trang admin',
                type: 'task'
            },
        ]
    },
    {
        id: 'droppable3',
        isBacklog: false,
        status: 1,
        issues: [
            {
                id: uuid(),
                content: 'Code giao diện trang thanh toán',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Code giao diện xem chi tiết đơn hàng',
                type: 'task'
            },
            {
                id: uuid(),
                content: 'Thiết kê giao diện trang thanh toán',
                type: 'task'
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

const getList = (list, id) => {
    const res = list.filter(board => board.id === id)[0];
    return [...res.issues];
};

export const backlogSlice = createSlice({
    name: 'backlog',
    initialState: boards,
    reducers: {
        changeIssuesOrder: (state, action) => {
            const { source, destination } = action.payload;

            // dropped outside the list
            if (!destination) {
                return;
            }

            if (source.droppableId === destination.droppableId) {
                const items = reorder(
                    getList(state, source.droppableId),
                    source.index,
                    destination.index
                );
                console.log(items);

                state.forEach(board => {
                    if (board.id === source.droppableId) {
                        board.issues = items;
                    }
                })

            } else {
                const items = move(
                    getList(state, source.droppableId),
                    getList(state, destination.droppableId),
                    source,
                    destination
                );

                state.forEach(board => {
                    if (board.id === source.droppableId) {
                        board.issues = items[source.droppableId];
                    }

                    if (board.id === destination.droppableId) {
                        board.issues = items[destination.droppableId];
                    }
                })
            }
        },
        addIssue: (state, action) => {
            const {boardId, issue} = action.payload;

            state.forEach(board => {
                if(board.id === boardId) {
                    board.issues.push(issue);
                }
            })
        }
    }
})

export const { changeIssuesOrder, addIssue } = backlogSlice.actions;

export const selectBacklog = (state) => state.backlog;

export default backlogSlice.reducer;