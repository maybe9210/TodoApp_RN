import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import uuidv1 from "uuid/v1";
import API from "../api/api";
interface indexable {
  [id: string]: any;
}
class TodoStore {
  @observable todoList: indexable = {};

  @action
  loadToDo = async () => {
    try {
      API.getToDoListAll((data: any) => {
        const t = data.data.toDoLists;
        t.map((item: any) => {
          const tmp = {
            id: item.id,
            text: item.todo,
            isCompleted: item.isCompleted || false
          };
          this.todoList[item.id] = tmp;
        });
      });
    } catch (e) {
      this.todoList = {};
      console.log(e);
    }
  };

  @action
  addToDo = (todo: any) => {
    const newToDo = {
      isCompleted: false,
      todo
    };
    API.createToDo(newToDo, (data: any) => {
      const tId = data.data.createToDoList.id;
      this.todoList[tId] = {
        id: tId,
        text: todo,
        isCompleted: false
      };
    });
  };

  @action
  deleteToDo = (id: string) => {
    delete this.todoList[id];
    API.deleteToDo(id);
  };

  @action
  completeToDo = (id: string) => {
    this.todoList[id].isCompleted = true;
    const temp = {
      todo: this.todoList[id].text,
      isCompleted: true
    };
    API.updateToDo(id, temp);
  };

  @action
  uncompleteToDo = (id: string) => {
    this.todoList[id].isCompleted = false;
    const temp = {
      todo: this.todoList[id].text,
      isCompleted: false
    };
    API.updateToDo(id, temp);
  };

  @action
  updateToDoList = (id: string, text: string) => {
    this.todoList[id].text = text;
    const temp = {
      todo: text,
      isCompleted: this.todoList[id].isCompleted
    };
    API.updateToDo(id, temp);
  };

  saveToDos = (newToDos: any) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };
}
export default TodoStore;
