require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./models/Task');
const User = require('./models/User');
const Project = require('./models/Project');

const dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ethara_ai';
console.log('--- SEEDING DATABASE ---');
console.log('Target URI:', dbUri.replace(/:([^:@]+)@/, ':****@')); // Hide password in logs

mongoose.connect(dbUri)
  .then(async () => {
    console.log('Connected to DB. Seeding...');
    await Task.deleteMany({});
    await User.deleteMany({});
    await Project.deleteMany({});

    // 1. Create Users
    const sarah = await User.create({
      firstName: 'Sarah',
      lastName: 'Jenks',
      email: 'sarah@ethara.ai',
      password: 'password123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=transparent'
    });

    const mike = await User.create({
      firstName: 'Mike',
      lastName: 'Ross',
      email: 'mike@ethara.ai',
      password: 'password123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike&backgroundColor=transparent'
    });

    const alex = await User.create({
      firstName: 'Alex',
      lastName: 'Morgan',
      email: 'alex@ethara.ai',
      password: 'password123',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent'
    });

    // 2. Create Projects
    const p1 = await Project.create({
      title: 'Website Redesign',
      description: 'Overhaul the marketing website with the new brand guidelines.',
      progress: 75,
      dueDate: new Date('2026-06-15'),
      status: 'active',
      members: [alex._id, sarah._id]
    });

    const p2 = await Project.create({
      title: 'Mobile App V2.0',
      description: 'Develop the version 2 of our iOS and Android applications.',
      progress: 32,
      dueDate: new Date('2026-08-01'),
      status: 'active',
      members: [mike._id, alex._id]
    });

    // 3. Create Tasks
    await Task.create([
      {
        title: 'Design user onboarding flow',
        description: 'Create wireframes and high-fidelity mockups.',
        status: 'todo',
        priority: 'high',
        dueDate: new Date('2026-05-10'),
        assignee: sarah._id,
        project: p1._id
      },
      {
        title: 'Implement drag and drop',
        description: 'Build a custom drag and drop kanban board interface.',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date('2026-05-04'),
        assignee: mike._id,
        project: p2._id
      }
    ]);
    
    console.log('Database seeded successfully with Users, Projects, and Tasks!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
