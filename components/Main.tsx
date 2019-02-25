import * as React from "react";
import { Component } from "react";
import { observer, inject, Provider } from "mobx-react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import TodoStore from "../store/todoStore";
const { width } = Dimensions.get("window");

interface IProps {
  todoStore: TodoStore;
}
interface IStates {
  newToDo: string;
  loadedToDos: boolean;
}
@inject("store")
@observer
class Main extends Component<any, IStates> {
  constructor(prop: any) {
    super(prop);
    this.state = {
      newToDo: "",
      loadedToDos: false
    };
  }
  componentDidMount = () => {
    const { store } = this.props;
    store.loadToDo();
    this.setState({
      loadedToDos: true
    });
  };
  render() {
    const { store } = this.props;
    const { newToDo, loadedToDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}> Kwai To do </Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
            underlineColorAndroid={"transparent"}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(store.todoList)
              .reverse()
              .map((toDo: any) => (
                <ToDo
                  key={toDo.id}
                  deleteToDo={this._deleteToDo}
                  uncompleteToDo={this._uncompleteToDo}
                  completeToDo={this._completeToDo}
                  updateToDo={this._updateToDo}
                  text={toDo.text}
                  isCompleted={toDo.isCompleted}
                  id={toDo.id}
                />
              ))}
          </ScrollView>
        </View>
      </View>
    );
  }
  _loadToDos = async () => {
    const { store } = this.props;
    store.loadToDo();
  };

  _controlNewToDo = (text: string) => {
    this.setState({
      newToDo: text
    });
  };

  _addToDo = () => {
    const { store } = this.props;
    const { newToDo } = this.state;
    if (newToDo !== "") {
      store.addToDo(newToDo);
    }
  };
  _deleteToDo = (id: string) => {
    const { store } = this.props;
    store.deleteToDo(id);
  };

  _uncompleteToDo = (id: string) => {
    const { store } = this.props;
    store.uncompleteToDo(id);
  };
  _completeToDo = (id: string) => {
    const { store } = this.props;
    store.completeToDo(id);
  };

  _updateToDo = (id: string, text: string) => {
    const { store } = this.props;
    store.updateToDoList(id, text);
  };
}

const styles = StyleSheet.create({
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
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
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
    })
  },
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

export default Main;
