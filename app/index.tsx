import { useSearchText, useTaskActions, useTasks } from "@/hooks/tasks-query"
import { Link } from "expo-router"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"

// Route : Index (Home Page)
// Index route retrieves the list of tasks from the database and displays it using FlatList.
// Clicking on a list item will route to the task-edit page with pre-filled editable  title and description.
// Clicking on "Add Task" will route to the task-edit page with option to add new task.

export default function Index() {
	const tasks = useTasks()
	const searchText = useSearchText()
	const { refetch } = useTaskActions()

	const filteredTasks = tasks.filter(
		(task) =>
			task.title?.toLowerCase().includes(searchText.toLowerCase()) ||
			task.description?.toLowerCase().includes(searchText.toLowerCase())
	)

	return (
		<FlatList style={styles.flatlist}
			data={filteredTasks}
			refreshing={false}
			onRefresh={refetch}
			keyExtractor={(task) => String(task.id)}
			contentInsetAdjustmentBehavior="automatic"
			ItemSeparatorComponent = {() => (
				<View style={styles.separator}/>
			)}
			renderItem={({ item: task }) => (
				<Link
					asChild
					href={{
						pathname: "/task-edit",
						params: { id: task.id },
					}}
				>
					<Pressable>
						<Text>Title: {task.title}</Text>
						<Text>Description: {task.description}</Text>
						<Text>Due Date: {task.dueDate} </Text>
					</Pressable>
				</Link>
			)}
		/>
	)
}

// StyleSheet for the Index Page
const styles = StyleSheet.create({
  flatlist: {
    padding: 20,
    fontSize: 20
  },
	separator: {
		backgroundColor: 'gray',
		height: 2,
		marginTop: 10,
		marginBottom: 10
	}
});