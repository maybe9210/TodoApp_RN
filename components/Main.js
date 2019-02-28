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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_1 = require("react");
const mobx_react_1 = require("mobx-react");
const react_native_1 = require("react-native");
const expo_1 = require("expo");
const ToDo_1 = __importDefault(require("./ToDo"));
const { width } = react_native_1.Dimensions.get("window");
let Main = class Main extends react_1.Component {
    constructor(prop) {
        super(prop);
        this._loadToDos = () => __awaiter(this, void 0, void 0, function* () {
            const { store } = this.props;
            store.loadToDo();
        });
        this._controlNewToDo = (text) => {
            this.setState({
                newToDo: text
            });
        };
        this._addToDo = () => {
            const { store } = this.props;
            const { newToDo } = this.state;
            if (newToDo !== "") {
                store.addToDo(newToDo);
            }
        };
        this._deleteToDo = (id) => {
            const { store } = this.props;
            store.deleteToDo(id);
        };
        this._uncompleteToDo = (id) => {
            const { store } = this.props;
            store.uncompleteToDo(id);
        };
        this._completeToDo = (id) => {
            const { store } = this.props;
            store.completeToDo(id);
        };
        this._updateToDo = (id, text) => {
            const { store } = this.props;
            store.updateToDoList(id, text);
        };
        this.state = {
            newToDo: "",
            loadedToDos: false
        };
    }
    componentDidMount() {
        const { store } = this.props;
        store.loadToDo();
        this.setState({
            loadedToDos: true
        });
    }
    render() {
        const { store } = this.props;
        const { newToDo, loadedToDos } = this.state;
        if (!loadedToDos) {
            return <expo_1.AppLoading />;
        }
        return (<react_native_1.View style={styles.container}>
        <react_native_1.StatusBar barStyle="light-content"/>
        <react_native_1.Text style={styles.title}> Kwai To do </react_native_1.Text>
        <react_native_1.View style={styles.card}>
          <react_native_1.TextInput style={styles.input} placeholder={"New To Do"} value={newToDo} onChangeText={this._controlNewToDo} placeholderTextColor={"#999"} returnKeyType={"done"} autoCorrect={false} onSubmitEditing={this._addToDo} underlineColorAndroid={"transparent"}/>
          <react_native_1.ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(store.todoList)
            .reverse()
            .map((toDo) => {
            console.log(toDo.id);
            return (<ToDo_1.default key={toDo.id} deleteToDo={this._deleteToDo} uncompleteToDo={this._uncompleteToDo} completeToDo={this._completeToDo} updateToDo={this._updateToDo} text={toDo.text} isCompleted={toDo.isCompleted} id={toDo.id}/>);
        })}
          </react_native_1.ScrollView>
        </react_native_1.View>
      </react_native_1.View>);
    }
};
Main = __decorate([
    mobx_react_1.inject("store"),
    mobx_react_1.observer
], Main);
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F23657",
        alignItems: "center"
    },
    title: {
        color: "white",
        fontSize: 30,
        marginTop: 50,
        fontWeight: "200",
        marginBottom: 30
    },
    card: Object.assign({ backgroundColor: "white", flex: 1, width: width - 25, borderTopLeftRadius: 10, borderTopRightRadius: 10 }, react_native_1.Platform.select({
        ios: {
            shadowColor: "rgb(50, 50, 50)",
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
                height: -1,
                width: 0
            }
        },
        android: {
            elevation: 3
        }
    })),
    input: {
        padding: 20,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 25
    },
    toDos: {
        alignItems: "center"
    }
});
exports.default = Main;
