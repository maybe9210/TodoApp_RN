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
const v1_1 = __importDefault(require("uuid/v1"));
class TodoStore {
    constructor() {
        this.todoList = {};
        this.loadToDo = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const toDosValue = yield react_native_1.AsyncStorage.getItem("toDos");
                const toDos = toDosValue || "";
                const parsedToDos = JSON.parse(toDos);
                this.todoList = parsedToDos;
            }
            catch (e) {
                this.todoList = {};
                console.log(e);
            }
        });
        this.addToDo = (todo) => {
            const ID = v1_1.default();
            const newToDoObject = {
                id: ID,
                isCompleted: false,
                text: todo,
                createdAt: Date.now()
            };
            this.todoList[ID] = newToDoObject;
            this.saveToDos(this.todoList);
        };
        this.deleteToDo = (id) => {
            delete this.todoList[id];
            this.saveToDos(this.todoList);
        };
        this.completeToDo = (id) => {
            this.todoList[id].isCompleted = true;
            this.saveToDos(this.todoList);
        };
        this.uncompleteToDo = (id) => {
            this.todoList[id].isCompleted = false;
            this.saveToDos(this.todoList);
        };
        this.updateToDoList = (id, text) => {
            this.todoList[id].text = text;
            this.saveToDos(this.todoList);
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
