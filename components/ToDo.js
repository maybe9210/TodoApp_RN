"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const { width, height } = react_native_1.Dimensions.get("window");
class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this._toggleComplete = (event) => {
            event.stopPropagation();
            const { isCompleted, uncompleteToDo, completeToDo, id } = this.props;
            if (isCompleted) {
                uncompleteToDo(id);
            }
            else {
                completeToDo(id);
            }
        };
        this._startEditing = (event) => {
            event.stopPropagation();
            this.setState({
                isEditing: true
            });
        };
        this._finishEditing = (event) => {
            event.stopPropagation();
            const { toDoValue } = this.state;
            const { id, updateToDo } = this.props;
            updateToDo(id, toDoValue);
            this.setState({ isEditing: false });
        };
        this._controllInput = (text) => {
            this.setState({ toDoValue: text });
        };
        this.state = { isEditing: false, toDoValue: props.text };
    }
    render() {
        const { isEditing, toDoValue } = this.state;
        const { text, id, deleteToDo, isCompleted } = this.props;
        return (<react_native_1.View style={styles.container}>
        <react_native_1.View style={styles.column}>
          <react_native_1.TouchableOpacity onPress={this._toggleComplete}>
            <react_native_1.View style={[
            styles.circle,
            isCompleted ? styles.completedCircle : styles.uncompletedCircle
        ]}/>
          </react_native_1.TouchableOpacity>
          {isEditing ? (<react_native_1.TextInput style={[
            styles.input,
            styles.text,
            isCompleted ? styles.completedText : styles.uncompletedText
        ]} value={toDoValue} multiline={true} onChangeText={this._controllInput} returnKeyType={"done"} onBlur={this._finishEditing} underlineColorAndroid={"transparent"}/>) : (<react_native_1.Text style={[
            styles.text,
            isCompleted ? styles.completedText : styles.uncompletedText
        ]}>
              {text}
            </react_native_1.Text>)}
        </react_native_1.View>
        {isEditing ? (<react_native_1.View style={styles.actions}>
            <react_native_1.TouchableOpacity onPressOut={this._finishEditing}>
              <react_native_1.View style={styles.actionContainer}>
                <react_native_1.Text style={styles.actionText}>✅</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>) : (<react_native_1.View style={styles.actions}>
            <react_native_1.TouchableOpacity onPressOut={this._startEditing}>
              <react_native_1.View style={styles.actionContainer}>
                <react_native_1.Text style={styles.actionText}>✏️</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.TouchableOpacity>
            <react_native_1.TouchableOpacity onPressOut={event => {
            event.stopPropagation();
            deleteToDo(id);
        }}>
              <react_native_1.View style={styles.actionContainer}>
                <react_native_1.Text style={styles.actionText}>❌</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>)}
      </react_native_1.View>);
    }
}
exports.default = ToDo;
const styles = react_native_1.StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: react_native_1.StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#F23657"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    input: {
        marginVertical: 15,
        width: width / 2,
        paddingBottom: 5
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    }
});
