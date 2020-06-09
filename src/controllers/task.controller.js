const taskController = [];

const pool = require('../database');

taskController.createTask = (req, res) => {
    const { title, description } = req.body;
    const newTask = {
        title,
        description,
        user_id: req.user.id
    }
    console.log(newTask);

    pool.query('INSERT INTO tasks set ? ', [newTask], (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.send('error');
        }
    });
    return res.redirect('/tasks')

}

taskController.editTaskget = async (req, res) => {
    const { id } = req.params;
    const tasks = await pool.query('SELECT * FROM tasks WHERE id = ? ', [id] )
    res.render('edit', {task: tasks[0]});
}

taskController.editTaskpost = async (req, res) => {
    const {id} = req.params;
    const { title, description } = req.body;
    const newTask = {
        title,
        description
    }
    await pool.query('UPDATE tasks set ? WHERE id = ?', [newTask, id]);
    req.flash('succes', 'Task update successfully');
    res.redirect('/tasks');
}

taskController.deleteTask =async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    req.flash('success', 'Task deleted successfully');
    res.redirect('/tasks');
}

taskController.getTasks = async (req, res) => {
    const task = await pool.query('SELECT * FROM tasks WHERE user_id = ? ', [req.user.id]);
    return res.render('tasks', {task});
}

module.exports = taskController;