import { SWAP_COLUMNS, UPDATE_TASKS, UPDATE_TASKS_FROM_DIFFERENT_LISTS, CREATE_NEW_LIST, ADD_TASK } from "../constants"

export const updateTasks = (tasks, id) => {
  return {
    type: UPDATE_TASKS,
    payload: { tasks, id }
  }
}

export const updateTasksFromDifferentLists = (payload) => {
  return {
    type: UPDATE_TASKS_FROM_DIFFERENT_LISTS,
    payload,
  }
}

export const swapColumns = (payload) => {
  return {
    type: SWAP_COLUMNS,
    payload,
  }
}

export const createNewList = (title) => {
  return {
    type: CREATE_NEW_LIST,
    payload: title,
  }
}
export const addTask = (text, parentId) => {
  return {
    type: ADD_TASK,
    payload: { text, parentId },
  }
}