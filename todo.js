// https://gist.github.com/harrisonmalone/bf5acdce12ac6ced98a76fcaa0a7a7ca

// Create some kind javascript terminal app. 

// I'm using a todo management system as an example. Feel free to implement your own todo system or create something else like a system for adding items to a restaurant menu or some kind of blogging system. For inspiration think back to what your colleagues presented in the ruby terminal apps.  

// Make sure you break your functionality up into different functions; for this example i'm going to keep all of my code in the one file. You can use the following as your main app's loop, but will need to implement the functions themselves.


const readlineSync = require('readline-sync');

// Classes -->

class ToDoList {
  constructor(tasks) {
    this.tasks = []
  }
  printTasks() {
    if (this.tasks.length > 0) {
      console.log('\nYour tasks: \n')
      this.tasks.forEach((task, index) => {
        if (task.isComplete == false) {
          console.log(`👎  ${index + 1}: ${task.timestamp}: ${task.name}`)
        } else {
          console.log(`👍  ${index + 1}: ${task.timestamp}: ${task.name}`)
        }
      })
    } else {
      console.log("You haven't created any tasks yet") 
      run()
    } 
  }
  findUncompletedTasks() {
    return this.tasks.filter(task => task.isComplete == false);
  }
}

class Task {
  constructor(name, timestamp = 'default') {
    this.name = name;
    this.isComplete = false;
    this.timestamp = timestamp;
  }

  setComplete() {
    this.isComplete = true;
  }

  setIncomplete() {
    this.isComplete = false;
  }
}

// Helper methods -->

const getName = () => {
  return readlineSync.question('New Task: ')
}

const getDay = () => {
  let answer = ""
  while (['1', '2', '3', '4', '5', '6', '7', 'q', '0'].includes(answer) == false) {
    answer = readlineSync.question(
    `What Day?
    1. Monday
    2. Tuesday
    3. Wednesday
    4. Thursday
    5. Friday
    6. Saturday
    7. Sunday

    0. Go-Back
    q. Quit
    => `)

    switch(answer) {
      case 'q':
        quit();
      case '0':
        run();
      case '1':
        return 'Monday';
      case '2':
        return 'Tuesday'
      case '3':
        return 'Wednesday'
      case '4':
        return 'Thursday'
      case '5':
        return 'Friday'
      case '6':
        return 'Saturday'
      case '7':
        return 'Sunday'
      default:
        "I didn't understand that command."
        getDay();
    }
  }
}

const welcomeMessage = () => {
  console.log('\nWelcome to ToDo List. What would you like to do?')
}

const isFinished = (list) => {
  answer = ""
  while (['1', '2', '3', 'q'].includes(answer) == false) {
    answer = readlineSync.question(`
    What would you like to do next?
    1. Go back to main menu
    2. View my tasks
    3. Create a new task
    q. quit
    `)
    switch(answer) {
      case '1':
        return false
      case '2':
      list.printTasks()
        isFinished(list)
        return false
      case '3':
        const taskName = getName();
        const taskDay = getDay();
        let newTask = new Task(taskName, taskDay);
        list.tasks.push(newTask);
        console.log(`Added a new task:\Task: ${newTask.name}\nDay: ${newTask.timestamp}`)
        return isFinished(list)
      case 'q':
        quit();
      default:
        console.log("\nI didn't understand that command. Try again: ")
        isFinished();
    }
  }
}

const showMainMenu = () => {
  let answer = readlineSync.question(`
  1. View Task List
  2. New Task
  q. Quit\n
  => `)
  return answer
}

const menu = (list) => {
  let answer = ""
  while (['1', '2', 'q'].includes(answer) == false) {

    answer = showMainMenu()

    switch(answer) {
      case '1':
        return taskListMenu(list)        
        // return isFinished(list)
      case '2':
        const taskName = getName();
        const taskDay = getDay();
        let newTask = new Task(taskName, taskDay);
        list.tasks.push(newTask);
        console.log(`Added a new task:\Task: ${newTask.name}\nDay: ${newTask.timestamp}`)
        return isFinished(list)
      case 'q':
        quit()
      default:
        console.log("\nI didn't understand that command. Try again: ")
    }
  }
  return answer
}

const taskListMenu = (list) => {
  list.printTasks();
  
  let answer = ""
  while (['1', '2', '0', 'q'].includes(answer) == false) {
    answer = readlineSync.question(`\nWhat would you like to do?: 
    1. View a task 
    2. Delete all tasks 

    0. Go back to main menu
    q. quit
    `)

    switch(answer) {
      case '1':
        return taskMenu(list);
        // return isFinished()
      case '2':
        let answer = ""
        while (['y', 'n'].includes(answer) == false) {
          answer = readlineSync.question(`Are you sure? y/n`);
          if (answer == 'y') {
            list.tasks.length = 0; 
            console.log('\n All tasks deleted!')
          } else if (answer == 'n') {
            taskListMenu(list);
          }
        }
        return isFinished()
      case '0':
        return false
      case 'q':
        quit();
      default:
        console.log("\nI didn't understand that command. Try again: ")
    }
  }
}

const taskMenu = (task) => {
  viewTask(task);

  let answer = ""
  while (['0', '1', '2', '3', '4', '5', 'q'].includes(answer) == false) {
    answer = readlineSync.question(`\nWhat would you like to do?
      1. Mark task as complete
      2. Mark task as incomplete
      3. Edit task 
      4. Edit task due date
      
      5. Delete task
      9. Return to Task List
      0. Return to Main Menu
      q. Quit
    `)

    switch('answer') {
      case '0':
        return false
      case '1':
        setComplete(task)
        return isFinished();
      case '2':
        setIncomplete(task)
        return isFinished();
      case '3':
        editTask(task);
        return isFinished();
      case 'q':
        quit()
      default:
      console.log("\nI didn't understand that command. Try again: ")
    }



  }

//   ...input task number (eg: type '1' for task #1)
//   To delete a task:
//     ...input 'd task number' (eg: type 'd 1' to delete task #1)
  
//   To mark a task as complete:
//     ...input 'c task number (eg: type 'c 1' to mark task #1 as complete)
//   To mark a task as incomplete:
//   ...input 'i task number (eg: type 'i 1' to mark task #1 as incomplete)
}

const quit = () => {
  console.log('See you next time!')
  process.exit()
}

// RUN APP -->

const run = () => {
  let newList = new ToDoList(); 
  let newTask = new Task('go to the bank', 'Monday')
  newList.tasks.push(newTask);

  let finished = false;
  while (finished == false) {
    console.clear()
    welcomeMessage()
    console.log(`You have ${newList.findUncompletedTasks().length} tasks remaining.`)
    finished = menu(newList)
  }  
}

run()





// Remember that you will need to initialize your project with npm to be able to install the readline-sync package. Look back at the npm docs on joli if you're unsure how to do this.

// You will notice there is a global todos array which is currently empty. Populate this array with objects in the following format { title: 'a title for the todo', isComplete: false }.

// Implement the following functions:

// add

// ask the user to type in a title for the todo
// create a todo object with the isComplete set to false
// insert new todo into the array of todos

// printAll

// iterate over the array of todos and print out a message to the console in the following format.

// [x] Learn Python
// [ ] Learn Javascript

// complete

// iterate over the todos and print them out to the console
// ask the user to select the todo to complete
// set the isComplete field of that todo to true

// Optional

// Implement moment JS to display how long ago a todo was created. Look into moment's fromNow() function to help with this logic.
// Implement an updateTodo function that allows the user to change the title of a todo
// Implement a printTodo function that prints one specific todo
// Implement a removeTodo function that removes a todo from the array
// Think about the repeated functionality of these three functions and move any repeated logic into its own function
// Move todo list logic into reusable module (separate file)
// Write todos to a file (CSV or JSON)
// Read todos from file when program starts