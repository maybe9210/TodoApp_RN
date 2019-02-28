import { isCaughtException, isComputedValue } from "mobx/lib/internal";

class API {
  static send(query: string, cb?: (data: object) => any) {
    fetch(
      "https://api-apeast.graphcms.com/v1/cjskigri12coz01bsvrg62u9l/master",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ query })
      }
    )
      .then(r => r.json())
      .then(data => {
        console.log("data returned:", data);
        if (cb) {
          cb(data);
        }
      });
  }

  getToDoListAll(cb: (data: any) => any) {
    const query = `query {
        toDoLists {
          id
          todo
          isCompleted
        }
      }`;
    API.send(query, cb);
  }

  createToDo(
    data: { todo: string; isCompleted: boolean },
    cb: (data: any) => any
  ) {
    const query = `mutation {
        createToDoList(data: {todo: "${data.todo}", isCompleted: ${
      data.isCompleted
    }}) {
          id
          todo
          isCompleted
        }
      }`;
    API.send(query, cb);
  }

  updateToDo(id: string, data: { todo: string; isCompleted: boolean }) {
    const query = `mutation {
        updateToDoList(data: {todo:"${data.todo}", isCompleted: ${
      data.isCompleted
    }}, where: {id:"${id}"}) {
          id
          todo
          isCompleted
        }
      }`;
    API.send(query);
  }

  deleteToDo(id: string) {
    const query = `mutation {
        deleteToDoList(where: {id:"${id}"}) {
          id
          todo
          isCompleted
        }
      }`;
    API.send(query);
  }
}

export default new API();
