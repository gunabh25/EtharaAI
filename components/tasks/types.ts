export type Task = {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  assignee: {
    name: string
    avatar: string
  }
}
