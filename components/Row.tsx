import { Text, StyleSheet, Pressable } from 'react-native'
import { Task } from '../types/Task'

interface TodoRowProps {
    item: Task
    onToggle: () => void
}

export default function Row({ item, onToggle }: TodoRowProps) {
    return (
        <Pressable onPress={onToggle} style={styles.todoRow}>
            <Text 
            key={item.completed ? 'done' : 'undone'}
            style={[styles.todoText, item.completed && styles.completedText]}
            >
                {item.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    todoRow: {
        flexDirection: 'row',
        padding: 4,
        margin: 4,
        marginBottom: 8,
        alignItems: 'center',
    },
    todoText: {
        flex: 1,
        color: '#000',
        fontSize: 16,
    },
    completedText: {
        textDecorationLine: 'line-through'
    }
}) 