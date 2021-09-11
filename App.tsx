import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, ScrollView, TextInput} from 'react-native';
import {API_END_POINT} from './common/constants';
import {Todo} from './components/Todo';
import styles from './styles';
interface ITodo {
  title: string;
  completed: boolean;
  id: number;
  userId: number;
}

const INITIAL_TODO_STATE: ITodo = {
  userId: 1,
  id: -1,
  title: '',
  completed: false,
};
const App = (): JSX.Element => {
  const [todos, setToDos] = useState<Array<ITodo>>([]);
  const [todo, setToDo] = useState<ITodo>(INITIAL_TODO_STATE);
  useEffect(() => {
    fetch(API_END_POINT)
      .then(data => data.json())
      .then(data => {
        setToDos(data);
      });
  }, [todos]);

  const addToDo = (): void => {
    setToDos([...todos, todo]);
    setToDo(INITIAL_TODO_STATE);
  };

  const deleteItem = (id: number): void => {
    const newTodos = todos.filter(
      (todoItem: ITodo): boolean => todoItem.id !== id,
    );
    setToDos(newTodos);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          value={todo.title}
          onChangeText={(text: string) =>
            setToDo({
              ...todo,
              title: text,
            })
          }
          style={styles.input}
          autoCapitalize="sentences"
        />
        <Button onPress={addToDo} title="Add" />
        {todos.map((todo, index) => (
          <Todo todo={todo} deleteItem={deleteItem} key={`index${index}`} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
