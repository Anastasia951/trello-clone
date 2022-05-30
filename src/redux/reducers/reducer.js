import { nanoid } from "nanoid"
import { ADD_TASK, CREATE_NEW_LIST, SWAP_COLUMNS, UPDATE_TASKS, UPDATE_TASKS_FROM_DIFFERENT_LISTS } from "../constants"

const initialState = {
  lists: [
    {
      id: nanoid(10),
      title: 'Title',
      tasks: [
        {
          id: nanoid(10),
          text: 'Some Task'
        },
        {
          id: nanoid(10),
          text: 'Another text'
        },
        {
          id: nanoid(10),
          text: 'Another text'
        },
        {
          id: nanoid(10),
          text: 'Another text'
        }
      ]
    },
    {
      id: nanoid(10),
      title: 'Another Title',
      tasks: [
        {
          id: nanoid(10),
          text: 'Some Task'
        },
        {
          id: nanoid(10),
          text: 'Another text'
        }
      ]
    }
  ]
}
export function reducer(state = initialState, { type, payload }) {
  let oldLists
  switch (type) {
    case UPDATE_TASKS:
      const oldListIndex = state.lists.findIndex(list => list.id === payload.id)
      oldLists = [...state.lists]
      oldLists[oldListIndex].tasks = payload.tasks
      return {
        ...state,
        lists: oldLists
      }
    case UPDATE_TASKS_FROM_DIFFERENT_LISTS:
      const { startTasks, endTasks, startId, endId } = payload
      const startListIndex = state.lists.findIndex(list => list.id === startId)
      const endListIndex = state.lists.findIndex(list => list.id === endId)

      oldLists = [...state.lists]
      oldLists[startListIndex].tasks = startTasks
      oldLists[endListIndex].tasks = endTasks

      return {
        ...state,
        lists: oldLists
      }
    case SWAP_COLUMNS:
      const { start, end } = payload
      oldLists = [...state.lists]
      const copy = oldLists[start]
      oldLists.splice(start, 1)
      oldLists.splice(end, 0, copy)

      return {
        ...state,
        lists: oldLists
      }
    case CREATE_NEW_LIST:
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            id: nanoid(10),
            title: payload,
            tasks: []
          }
        ]
      }
    case ADD_TASK:
      const { text, parentId } = payload
      const parentIndex = state.lists.findIndex(list => list.id === parentId)
      oldLists = [...state.lists]
      oldLists[parentIndex].tasks.push({
        id: nanoid(10),
        text
      })
      return {
        ...state,
        lists: oldLists,
      }
    default:
      return state
  }
}

export default reducer