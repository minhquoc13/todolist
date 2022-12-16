const taskIdDOM = document.querySelector('.edit-taskId')
const taskNameDOM = document.querySelector('.edit-task-name')
const taskCompletedDOM = document.querySelector('.edit-task-completed')
const editFormDOM = document.querySelector('.edit-form')
const editButtonDOM = document.querySelector('.edit-button')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
    try {  
        const {
            data: {task},
        } = await axios.get(`/api/v1/tasks/${id}`)
        const { _id: taskId, completed, name} = task
        console.log(task)
        taskIdDOM.textContent = taskId
        taskNameDOM.value = name
        tempName = name
        if(completed) {
            taskCompletedDOM.checked = true
        }
    }
    catch (error) {
        console.log(error)
    }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
    editButtonDOM.textContent = 'Loading...'
    e.preventDefault()
    try {
        const taskName = taskNameDOM.value
        const taskCompleted = taskCompletedDOM.checked
        
        const {
            data: {task},
        } = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        })

        const {_id: taskId, completed, name} = task

        taskIdDOM.textContent = taskId
        taskNameDOM.value = name
        tempName = name

        if(completed) {
            taskCompletedDOM.checked = true
        }
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, edited task`
        formAlertDOM.classList.add('text-success')
        
    } catch (e) {
        console.log(e)
        taskNameDOM.value = tempName
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `error, please try again`
    }

    editButtonDOM.textContent = 'Edit'
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, time = 3000)
})