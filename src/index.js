const express = require('express');
const cluster = require('cluster');
const cors = require('cors');
const totalCpus = require('os').cpus().length;
require('dotenv').config();
const todosRoutes = require('./routes/todos.routes');
const userRoutes = require('./routes/users.routes');
const connectDatabase = require('./database/db');

if(cluster.isMaster) {
    console.log(`Number of CPU's are ${totalCpus}`);
    console.log(`Master ${process.pid} is running`);

    // Create Worker Threads
    for(i=0; i<totalCpus; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worked ${worker.process.pid} died`);
        console.log(`Let fork another worker`);
        cluster.fork();
    })
}
else {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/rest/todos', todosRoutes);
    app.use('/rest/users', userRoutes);

    app.use('/', (req, res) => {
        res.status(200).send('<h1>Hello World!</h1>')
    })

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        connectDatabase();
        console.log(`Server running on port ${port} 🔥`);
    });
}

