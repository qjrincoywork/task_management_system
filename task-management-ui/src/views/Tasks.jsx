import {createRef, useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../tasks.scss';

// Add all solid icons to the library
library.add(fas);

export default function Tasks() {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [taskTitle, setTitle] = useState('');
  const [btnTitle, setBtnTitle] = useState('');
  const [idValue, setIdValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const handleClose = () => {
    setShow(false)
    setIsDelete(false)
  };
  const {setNotification} = useStateContext()
  const [errors, setErrors] = useState(null)
  const idRef = createRef()
  const titleRef = createRef()
  const contentRef = createRef()
  const statusRef = createRef()

  useEffect(() => {
    getBacklogTasks();
    getInProgressTasks();
    getDoneTasks();
  }, [])

  const getTasks = () => {
    getBacklogTasks()
    getInProgressTasks()
    getDoneTasks()
  }

  const getBacklogTasks = () => {
    setLoading(true)
    axiosClient.get('/task?status=1')
      .then(({ data }) => {
        setBacklogTasks(data.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const getInProgressTasks = () => {
    setLoading(true)
    axiosClient.get('/task?status=2')
      .then(({ data }) => {
        setInProgressTasks(data.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const getDoneTasks = () => {
    setLoading(true)
    axiosClient.get('/task?status=3')
      .then(({ data }) => {
        setDoneTasks(data.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const editTask = task => {
    setTitle('Edit Task');
    setBtnTitle('Update');
    setIdValue(task.id);
    setTitleValue(task.title);
    setContentValue(task.content);
    setStatusValue(task.status);
    setShow(true);
  }

  const addTask = () => {
    setTitle('Add Task');
    setBtnTitle('Save');
    setTitleValue('');
    setIdValue('');
    setContentValue('');
    setStatusValue('');
    setShow(true);
  }
  const deleteTask = task => {
    setTitle('Delete Task');
    setBtnTitle('Delete');
    setIdValue(task.id);
    setIsDelete(true);
    setShow(true);
  }

  const submitTask = ev => {
    ev.preventDefault()
    if (!isDelete) {
      switch (statusRef.current.value) {
        case 'Backlog':
          var status = 1;
          break;
        case 'In Progress':
          var status = 2;
          break;
        case 'Done':
          var status = 3;
          break;
        default:
          var status = 0;
          break;
      }
      var payload = {
        title: titleRef.current.value,
        content: contentRef.current.value,
        status: status,
      }
    }
    var url = '/task';
    if (idValue) {
      var url = url + '/' + idValue;
      if (isDelete) {
        axiosClient.delete(url, {data: {id: idValue}})
        .then(response => {
          setNotification(response.data.message)
          getTasks()
          setShow(false);
          setErrors(null)
          setIsDelete(false)
        })
      } else {
        var payload = {...payload, id: idValue};
        axiosClient.put(url, payload)
          .then(response => {
            setNotification(response.data.message)
            getTasks()
            setShow(false);
            setErrors(null)
          })
          .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors)
            }
          })
      }
    } else {
      axiosClient.post(url, payload)
        .then(response => {
          setNotification(response.data.message)
          getTasks()
          setShow(false);
          setErrors(null)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <div className="project">
      <div className="project-add-heading">
        <h2 className='project-add-heading--title'>Add Task</h2>
        <i className="project-add-heading--add-icon" onClick={addTask} title="Create a new task" ><FontAwesomeIcon icon="fa-solid fa-circle-plus" /></i>
      </div>
      <div className="project-tasks">
        <div className='project-column-backlog'>
          <div className='project-column-heading'>
            <h2 className='project-column-heading__title'>Backlog</h2>
          </div>
          {loading &&
            <div className="project-column-heading__title">
              Loading...
            </div>
          }
          {!loading && backlogTasks?.map(task => (
            <div className='task' key={task.id}>
              <div className='task__tags'>
                <span className='task__tag task__tag--title'>{task.title}</span>
                <button className='task__options'>
                  <i className='task__options-icon' onClick={ev => editTask(task)} title="Edit"><FontAwesomeIcon icon="fa-solid fa-pen-to-square fa-fw" /></i>
                  <i className='task__options-icon' onClick={ev => deleteTask(task)} title="Delete"><FontAwesomeIcon icon="fa-solid fa-trash" /></i>
                </button>
              </div>
              <p>{task?.content}</p>
              <div className='task__stats'>
                <span>
                  {task?.created_at}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className='project-column-inprogress'>
          <div className='project-column-heading'>
            <h2 className='project-column-heading__title'>In Progress</h2>
          </div>
          {loading &&
            <div className="project-column-heading__title">
              Loading...
            </div>
          }
          {!loading && inProgressTasks?.map(task => (
            <div className='task' key={task.id}>
              <div className='task__tags'>
                <span className='task__tag task__tag--title'>{task.title}</span>
                <button className='task__options'>
                  <i className='task__options-icon' onClick={ev => editTask(task)} title="Edit"><FontAwesomeIcon icon="fa-solid fa-pen-to-square fa-fw" /></i>
                  <i className='task__options-icon' onClick={ev => deleteTask(task)} title="Delete"><FontAwesomeIcon icon="fa-solid fa-trash" /></i>
                </button>
              </div>
              <p>{task?.content}</p>
              <div className='task__stats'>
                <span>
                  {task?.created_at}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className='project-column-done'>
          <div className='project-column-heading'>
            <h2 className='project-column-heading__title'>Done</h2>
          </div>
          {loading &&
            <div className="project-column-heading__title">
              Loading...
            </div>
          }
          {!loading && doneTasks?.map(task => (
            <div className='task' key={task.id}>
              <div className='task__tags'>
                <span className='task__tag task__tag--title'>{task.title}</span>
                <button className='task__options'>
                  <i className='task__options-icon' onClick={ev => editTask(task)} title="Edit"><FontAwesomeIcon icon="fa-solid fa-pen-to-square fa-fw" /></i>
                  <i className='task__options-icon' onClick={ev => deleteTask(task)} title="Delete"><FontAwesomeIcon icon="fa-solid fa-trash" /></i>
                </button>
              </div>
              <p>{task?.content}</p>
              <div className='task__stats'>
                <span>
                  {task?.created_at}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>{taskTitle}</Modal.Title>
          <button className='modal-header-close-icon' onClick={handleClose} title="Close"><FontAwesomeIcon icon="fa-solid fa-x" /></button>
        </Modal.Header>
        <Modal.Body>
        <div className="form">
          <form>
            {errors &&
              <div className="alert">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            }
            {idValue &&
              <input ref={idRef} defaultValue={idValue} type="hidden" />
            }
            {!isDelete && <input ref={titleRef} defaultValue={titleValue} type="text" placeholder="Title"/>}
            {!isDelete && <input ref={contentRef} defaultValue={contentValue} type="text" placeholder="Content"/>}
            {!isDelete && <select defaultValue={statusValue} ref={statusRef}>
              <option value="">Select status</option>
              <option value="Backlog">Backlog</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>}
            {isDelete && <div>Are you sure you want to delete this task? </div>}
          </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitTask}>{btnTitle}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
