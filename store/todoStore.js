"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const react_native_1 = require("react-native");
const api_1 = __importDefault(require("../api/api"));
class TodoStore {
    constructor() {
        this.todoList = {};
        this.loadToDo = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // const toDosValue = await AsyncStorage.getItem("toDos");
                // const toDos: string = toDosValue || "";
                // const parsedToDos = JSON.parse(toDos);
                // this.todoList = parsedToDos;
                api_1.default.getToDoListAll((data) => {
                    const t = data.data.toDoLists;
                    t.map((item) => {
                        const tmp = {
                            id: item.id,
                            text: item.todo,
                            isCompleted: item.isCompleted || false
                        };
                        this.todoList[item.id] = tmp;
                        console.log(`[TEST] id = ${item.id} todo = ${item.todo}, isCompleted = ${item.isCompleted}`);
                    });
                });
            }
            catch (e) {
                this.todoList = {};
                console.log(e);
            }
        });
        this.addToDo = (todo) => {
            // const ID = uuidv1();
            // const newToDoObject = {
            //   id: ID,
            //   isCompleted: false,
            //   text: todo
            //   // createdAt: Date.now()
            // };
            // this.todoList[ID] = newToDoObject;
            // this.saveToDos(this.todoList);
            const newToDo = {
                isCompleted: false,
                todo
            };
            api_1.default.createToDo(newToDo, (data) => {
                console.log("callback");
                console.log(data);
                const tId = data.data.createToDoList.id;
                this.todoList[tId] = {
                    id: tId,
                    text: todo,
                    isCompleted: false
                };
            });
        };
        this.deleteToDo = (id) => {
            delete this.todoList[id];
            //this.saveToDos(this.todoList);
            api_1.default.deleteToDo(id);
        };
        this.completeToDo = (id) => {
            console.log("completedToDo");
            console.log(id);
            this.todoList[id].isCompleted = true;
            // this.saveToDos(this.todoList);
            const temp = {
                todo: this.todoList[id].text,
                isCompleted: true
            };
            api_1.default.updateToDo(id, temp);
        };
        this.uncompleteToDo = (id) => {
            this.todoList[id].isCompleted = false;
            // this.saveToDos(this.todoList);
            const temp = {
                todo: this.todoList[id].text,
                isCompleted: false
            };
            api_1.default.updateToDo(id, temp);
        };
        this.updateToDoList = (id, text) => {
            this.todoList[id].text = text;
            // this.saveToDos(this.todoList);
            const temp = {
                todo: text,
                isCompleted: this.todoList[id].isCompleted
            };
            api_1.default.updateToDo(id, temp);
        };
        this.saveToDos = (newToDos) => {
            const saveToDos = react_native_1.AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
        };
    }
}
__decorate([
    mobx_1.observable
], TodoStore.prototype, "todoList", void 0);
__decorate([
    mobx_1.action
], TodoStore.prototype, "loadToDo", void 0);
__decorate([
    mobx_1.action
], TodoStore.prototype, "addToDo", void 0);
__decorate([
    mobx_1.action
], TodoStore.prototype, "deleteToDo", void 0);
__decorate([
    mobx_1.action
], TodoStore.prototype, "completeToDo", void 0);
__decorate([
    mobx_1.action
], TodoStore.prototype, "uncompleteToDo", void 0);
__decorate([
    mobx_1.action
], TodoStore.prototype, "updateToDoList", void 0);
exports.default = TodoStore;
