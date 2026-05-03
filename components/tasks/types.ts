export type Comment = {
  userName: string
  userAvatar: string
  content: string
  createdAt: string
}

export type Task = {
  id: string
  _id?: string // MongoDB ID
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
  assignee: {
    name: string
    avatar: string
  }
  comments?: Comment[]
}
