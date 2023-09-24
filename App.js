import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button, FlatList} from 'react-native';
import { useState,useEffect } from 'react';
import TodoInput from './components/TodoInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    loadTodos();
  }, []);

  const startModal = () => {
    setModalIsVisible(true);
  }

  const endModal = () => {
    setModalIsVisible(false);
  };

  const addTodo = async (todoTitle) => {
    const newTodo = { text: todoTitle, id: Math.random().toString() };
    await AsyncStorage.setItem(newTodo.id, JSON.stringify(newTodo)); 
    setTodos([...todos, newTodo]);
    endModal();
  };

  const removeTodo = async (todoId) => {
    await AsyncStorage.removeItem(todoId); 
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== todoId)
    ); 
  };
  const loadTodos = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const todoData = await AsyncStorage.multiGet(keys);
      const loadedTodos = todoData.map(([key, value]) => JSON.parse(value));
      setTodos(loadedTodos);
    } catch (error) {
      console.error('Upload data error:', error);
    }
  };
  return (
    <>
    <StatusBar style="light" />
    <View style={styles.container}>
      <Button title="Add Todo" color="blue" onPress={startModal}/>
      <TodoInput
      visible={modalIsVisible}
      onAddTodo={addTodo}
      onCancel={endModal}
      />
      <View>
        <FlatList
          data={todos}
          renderItem={({ item })=>(
            <View style={styles.todoItem}>
              <View style={styles.todoContent}>
              <Text style={styles.todoText} >{item.text}</Text>
              <Button title="X" color="red" onPress={() => removeTodo(item.id)} />
              </View>
            </View>
          )}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:60,
    paddingHorizontal:20,
  },
  todoItem: {
    backgroundColor: 'rgba(230, 245, 225,1.0)',
    margin: 8,
    borderRadius: 5,
  },
  todoText: {
    flex:4,
    padding: 8,
    color: 'rgba(252,101,0,1.0)',
    
  },
  todoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
});
