const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('./tasks', taskRoutes);

app.listen(PORT, () => {
	console.log(`✅ Serveur back dèmarrè sur http://localhost:${PORT}`)
});