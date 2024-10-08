import { useSearchText, useTaskActions, useTasks } from "@/hooks/tasks-query"
import { Link } from "expo-router"
import { FlatList, Pressable, Text } from "react-native"

export default function Index() {
	const tasks = useTasks()
	const searchText = useSearchText()
	const { refetch } = useTaskActions()

	const filteredTasks = tasks.filter(
		(task) =>
			task.title?.toLowerCase().includes(searchText.toLowerCase()) ||
			task.description?.toLowerCase().includes(searchText.toLowerCase()),
	)

	return (
		<FlatList
			data={filteredTasks}
			refreshing={false}
			onRefresh={refetch}
			keyExtractor={(task) => String(task.id)}
			contentInsetAdjustmentBehavior="automatic"
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
			contentContainerStyle={{ gap: 8, padding: 8 }}
		/>
	)
}
