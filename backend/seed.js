require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./models/Task');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ethara_ai')
  .then(async () => {
    console.log('Connected to DB. Seeding...');
    await Task.deleteMany({});
    await User.deleteMany({});

    const user1 = await User.create({
      firstName: 'Sarah',
      lastName: 'Jenks',
      email: 'sarah@ethara.ai',
      password: 'password123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=transparent'
    });

    const user2 = await User.create({
      firstName: 'Mike',
      lastName: 'Ross',
      email: 'mike@ethara.ai',
      password: 'password123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=transparent'
    });

    await Task.create([
      {
        title: 'Design user onboarding flow',
        description: 'Create wireframes and high-fidelity mockups for the new user onboarding experience.',
        status: 'todo',
        priority: 'high',
        dueDate: new Date('2026-05-10'),
        assignee: user1._id
      },
      {
        title: 'Update privacy policy',
        description: 'Review and update the privacy policy to comply with the new regulations.',
        status: 'todo',
        priority: 'low',
        dueDate: new Date('2026-05-15'),
        assignee: user2._id
      },
      {
        title: 'Implement drag and drop',
        description: 'Build a custom drag and drop kanban board interface.',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date('2026-05-04'),
        assignee: user2._id
      }
    ]);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
