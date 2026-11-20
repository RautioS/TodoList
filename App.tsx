import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Task } from './types/Task';
import Row from './components/Row';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todo_list:tasks'

export default function App() {
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const loadTodos = async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setTasks(JSON.parse(data));
    };
    loadTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!input.trim()) return
    setTasks([{ id: Date.now(), text: input, completed: false }, ...tasks])
    setInput('')
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder='Add new task...'
          onSubmitEditing={addTask}
        />
        <Pressable onPress={addTask}>
          <Text style={styles.save}>Save</Text>
        </Pressable>
      </View>
      <FlatList<Task>
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Row item={item} onToggle={() => toggleTask(item.id)} />}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    padding: 4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  save: {
    color: '#007AFF',
    fontSize: 16,
  }
});
