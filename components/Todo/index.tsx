import React from 'react';
import {Button, Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';

interface IProps {
  todo: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };
  deleteItem: (id: number) => void;
}
export function Todo({todo, deleteItem}: IProps): JSX.Element {
  return (
    <View>
      <Text>{todo?.title}</Text>
      <CheckBox checked={todo.completed} />
      <Button title="Delete" onPress={() => deleteItem(todo?.id)} />
    </View>
  );
}
