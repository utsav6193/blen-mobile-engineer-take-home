import { db } from "@/db/client"
import { tasks, type SelectTask } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { create } from "zustand"

type SearchStore = {
	searchText: string
	actions: {
		onChangeSearchText: (text: string) => void
	}
}

const useSearchStore = create<SearchStore>((set) => ({
	searchText: "",
	actions: {
		onChangeSearchText: (text) => set({ searchText: text }),
	},
}))

export const useSearchText = () => useSearchStore((state) => state.searchText)
export const useSearchActions = () => useSearchStore((state) => state.actions)

type TaskStore = {
	tasks: SelectTask[]
	actions: {
		refetch: () => void
	}
}

const useTaskStore = create<TaskStore>((set) => {
	const fetchStatement = db.select().from(tasks).orderBy(desc(tasks.id))
	try {
		return {
			tasks: fetchStatement.all(),
			actions: {
				refetch: () => set({ tasks: fetchStatement.all() }),
			},
		}
	} catch (error) {
		return {
			tasks: [],
			actions: {
				refetch: () => set({ tasks: fetchStatement.all() }),
			},
		}
	}
})

export const useTasks = () => useTaskStore((state) => state.tasks)
export const useTaskActions = () => useTaskStore((state) => state.actions)

type EditTaskStore = {
	task: { title: string | undefined; description: string | undefined, dueDate: string | undefined }
	actions: {
		onChangeTitle: (title: string) => void
		onChangeDescription: (description: string) => void
		onChangeDueDate: (dueDate: string) => void
		saveTask: (id: Number) => void
		deleteTask: (id: Number) => void
		updateTask : (id: Number, title: string, description: string, dueDate: string) => void
	}
}

const useEditTaskStore = create<EditTaskStore>((set, get) => ({
	task: { title: undefined, description: undefined, dueDate: undefined },
	actions: {
		onChangeTitle: (title) => set((state) => ({ task: { ...state.task, title } })),
		onChangeDescription: (description) => set((state) => ({ task: { ...state.task, description } })),
		onChangeDueDate: (dueDate) => set((state) => ({ task: { ...state.task, dueDate } })),
		saveTask: (id) => {
			const { title, description, dueDate } = get().task
			if (!title && !description) return
			db.insert(tasks)
				.values({ id: Number(id), title, description, dueDate, createdAt: new Date().toLocaleString("en-US"), updatedAt: new Date().toLocaleString("en-US") })
				.onConflictDoUpdate({
					target: tasks.id,
					set: { title, description, dueDate, updatedAt: new Date().toLocaleString("en-US") },
				})
				.run()
			set({ task: { title: undefined, description: undefined, dueDate: undefined } })
			useTaskStore.getState().actions.refetch()
		},
		deleteTask: (id) => {
			db.delete(tasks)
				.where(eq(tasks.id, Number(id)))
				.run()
			useTaskStore.getState().actions.refetch()
		},
		updateTask: (id, title, description, dueDate) => {
			if (!title && !description && !dueDate) return
			db.update(tasks)
				 .set({ title: title, description: description, dueDate: dueDate })
				.where(eq(tasks.id, Number(id)))
				.run()
				set({ task: { title: undefined, description: undefined, dueDate: undefined } })
			useTaskStore.getState().actions.refetch()
		},
	},
}))

export const useEditTask = () => useEditTaskStore((state) => state.task)
export const useEditTaskActions = () => useEditTaskStore((state) => state.actions)