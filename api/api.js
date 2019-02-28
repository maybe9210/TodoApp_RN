"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class API {
    static send(query, cb) {
        fetch("https://api-apeast.graphcms.com/v1/cjskigri12coz01bsvrg62u9l/master", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ query })
        })
            .then(r => r.json())
            .then(data => {
            console.log("data returned:", data);
            if (cb) {
                cb(data);
            }
        });
    }
    getToDoListAll(cb) {
        const query = `query {
        toDoLists {
          id
          todo
          isCompleted
        }
      }`;
        API.send(query, cb);
    }
    createToDo(data, cb) {
        const query = `mutation {
        createToDoList(data: {todo: "${data.todo}", isCompleted: ${data.isCompleted}}) {
          id
          todo
          isCompleted
        }
      }`;
        API.send(query, cb);
    }
    updateToDo(id, data) {
        const query = `mutation {
        updateToDoList(data: {todo:"${data.todo}", isCompleted: ${data.isCompleted}}, where: {id:"${id}"}) {
          id
          todo
          isCompleted
        }
      }`;
        API.send(query);
    }
    deleteToDo(id) {
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
exports.default = new API();
