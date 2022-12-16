const taskDOM = document.querySelector('.task-list-container')
const loadingDOM = document.querySelector('.task-list-loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

const showTasks = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
        const {
            data: { tasks }
        } = await axios.get('/api/v1/tasks')

        console.log(tasks.length)

        if(tasks.length < 1) {
            taskDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
            loadingDOM.style.visibility = 'hidden'
            return
        } 
        const allTasks = tasks
            .map((task) => {
                const {completed, _id: taskId, name} = task
                return `
                <div class="single-task">
                    <h5 class="single-task-name ${completed && 'task-completed'}">${name}</h5>
                    <div class="single-task-links">
                        <a class="btn-edit" href="task.html?id=${taskId}">Edit</a>
                        <button class="btn-delete" data-id=${taskId}>Delete</button>
                    </div>
                </div>`
            })
            .join('')
        taskDOM.innerHTML = allTasks
    } catch(e) {
        taskDOM.innnerHTML = '<h5 class="empty-list">There was an error, please try later.</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
}

showTasks()

// form

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOM.value

    try {
        await axios.post('/api/v1/tasks', {name})
        showTasks()
        taskInputDOM.value = ''
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = 'success, task added'
        formAlertDOM.classList.add('text-success')
    }
      catch (e) {
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `Error, please try again`
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
    }, 3000)
})

// delete task

taskDOM.addEventListener('click', async (e) => {
    const el = e.target
    if(el.classList.contains('btn-delete')) {
        loadingDOM.style.visibility = 'visible'
        const id = el.dataset.id

        try {
            await axios.delete(`/api/v1/tasks/${id}`)
            showTasks()
        } catch (e) {
            console.log(e)
        }
        loadingDOM.style.visibility = 'hidden'
    }
})