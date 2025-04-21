const express = require('express');
const fs = require('fs');
const router = express.Router();

const filePath = './data/tasks.json';

// Helper pour lire les tâches
const getTasks = () => {
	try{
		const data = fs.readFileSync(filePath);
		return JSON.parse(data);
	} catch(error) {
		console.error('Erreur lecture/parsing JSON 🔴: ', error.message);
		return [];
	}
	
};

// Helper pour ècrire les tâches
const saveTasks = (tasks) => {
	fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// GET toutes les tâches
router.get('/',(req,res) => {
	const tasks = getTasks();
	res.json(tasks);
});

// POST nouvelle tâches
router.post('/',(req, res) => {
	const tasks = getTasks();
	const newTask = {
		id: Date.now(),
		text: req.body.text,
		category: req.body.category,
		completed: false
	};
	tasks.push(newTask);
	saveTasks(tasks);
	res.json(newTask)
});

// PUT modifier une tâche
router.put('/:id', (req, res) => {
	const tasks = getTasks();
	const taskIndex = tasks.findIndex(task => task.id == req.params.id);

	if(taskIndex === -1) {
		return res.status(404).json({message: 'Tâche non trouvèe'})
	}

	tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
	saveTasks(tasks);
	res.json(tasks[taskIndex]);
});

// DELETE une tâche
router.delete('/:id', (req, res) => {
	let tasks = getTasks();
	tasks = tasks.filter(task => task.id != req.params.id);
	saveTasks(tasks);
	res.json({ message: 'Tâche supprimèe'});
});

module.exports = router;
