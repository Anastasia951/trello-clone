import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Board from "./components/Board";
import Header from "./components/Header";
import { swapColumns, updateTasks, updateTasksFromDifferentLists } from "./redux/actions/actions";

function App() {

  const dispatch = useDispatch()
  const lists = useSelector(state => state.lists)

  const onDragEnd = (result) => {
    const { source, destination, type } = result
    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    if (type === 'task') {
      if (destination.droppableId === source.droppableId) {
        const list = lists.find(list => list.id === source.droppableId)
        const newTasks = list.tasks

        const draggableElem = newTasks[source.index]
        newTasks.splice(source.index, 1)
        newTasks.splice(destination.index, 0, draggableElem)
        dispatch(updateTasks(newTasks, list.id))
      } else {
        const startList = lists.find(list => list.id === source.droppableId)
        const endList = lists.find(list => list.id === destination.droppableId)

        endList.tasks.splice(destination.index, 0, startList.tasks[source.index])
        startList.tasks.splice(source.index, 1)
        dispatch(updateTasksFromDifferentLists({
          startTasks: startList.tasks,
          endTasks: endList.tasks,
          startId: startList.id,
          endId: endList.id
        }))
      }
    }

    if (type === 'column') {
      const { destination, source } = result
      if (destination.index === source.index) return
      dispatch(swapColumns({ end: destination.index, start: source.index }))
    }

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Header />
      <Board lists={lists} />
    </DragDropContext>
  );
}

export default App;