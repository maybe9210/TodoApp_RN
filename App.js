"use strict";
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
const mobx_react_1 = require("mobx-react");
const Main_1 = __importDefault(require("./components/Main"));
const todoStore_1 = __importDefault(require("./store/todoStore"));
const store = new todoStore_1.default();
class App extends React.Component {
    render() {
        return (<mobx_react_1.Provider store={store}>
        <Main_1.default />
      </mobx_react_1.Provider>);
    }
}
exports.default = App;
