import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import uuidv1 from "uuid/v1";
interface indexable {
  [id: string]: any;
}
class TodoStore {
  @observable todoList: indexable = {};

  @action
  loadToDo = async () => {
    try {
      const toDosValue = await AsyncStorage.getItem("toDos");
      const toDos: string = toDosValue || "";
      const parsedToDos = JSON.parse(toDos);
      this.todoList = parsedToDos;
    } catch (e) {
      this.todoList = {};
      console.log(e);
    }
  };

  @action
  addToDo = (todo: any) => {
    const ID = uuidv1();
    const newToDoObject = {
      id: ID,
      isCompleted: false,
      text: todo,
      createdAt: Date.now()
    };
    this.todoList[ID] = newToDoObject;
    this.saveToDos(this.todoList);
  };

  @action
  deleteToDo = (id: string) => {
    delete this.todoList[id];
    this.saveToDos(this.todoList);
  };

  @action
  completeToDo = (id: string) => {
    this.todoList[id].isCompleted = true;
    this.saveToDos(this.todoList);
  };

  @action
  uncompleteToDo = (id: string) => {
    this.todoList[id].isCompleted = false;
    this.saveToDos(this.todoList);
  };

  @action
  updateToDoList = (id: string, text: string) => {
    this.todoList[id].text = text;
    this.saveToDos(this.todoList);
  };

  saveToDos = (newToDos: any) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };
}
export default TodoStore;
