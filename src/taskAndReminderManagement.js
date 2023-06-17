#!/usr/bin/env node

// This file contains the code for the task and reminder management system that manages tasks and reminders in a mental health care facility.
// The application allows the user to add, get, update, and delete tasks and reminders.
// The application also allows the user to get all tasks and reminders.
// Author: Joel Steven Ssekyewa

// Create a class called Task that has three properties: description, assignedTo, and dueDate.
class Task {
  constructor(description, assignedTo, dueDate) {
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
  }
}

// Create a class called TaskManager that has one property: tasks. The tasks property is an array of Task objects.
// The TaskManager class has four methods: createTask, getTask, getAllTasks, and deleteTask.
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  // The createTask method takes three parameters: description, assignedTo, and dueDate. The method creates a new Task object and adds it to the tasks array.
  createTask = (description, assignedTo, dueDate) => {
    const task = this.tasks.find((task) => task.description === description);
    if (task) {
      throw new Error("Task already exists");
    }
    const newTask = new Task(description, assignedTo, dueDate);
    this.tasks.push(newTask);
    console.log("The Task has been created successfully");
  };

  // The getTask method takes one parameter: description. The method finds the task with the specified description and logs the task's data to the console.
  printTasks() {
    console.log("Tasks:");
    this.tasks.forEach((task, index) => {
      console.log(`Task ${index + 1}:`);
      console.log(`Description: ${task.description}`);
      console.log(`Assigned To: ${task.assignedTo}`);
      console.log(`Due Date: ${task.dueDate}`);
      console.log("---------------------");
    });
  }

  //   The updateTask method takes three parameters: description, assignedTo, and dueDate. The method finds the task with the specified description and updates the task's data.
  updateTask(description, assignedTo, dueDate) {
    const task = this.tasks.find((task) => task.description === description);
    if (!task) {
      throw new Error("Task not found");
    }
    task.assignedTo = assignedTo;
    task.dueDate = dueDate;
    console.log("Task updated successfully");
  }

  //   The deleteTask method takes one parameter: description. The method finds the task with the specified description and removes it from the tasks array.
  deleteTask(description) {
    const task = this.tasks.find((task) => task.description === description);
    if (!task) {
      throw new Error("Task not found");
    }
    this.tasks = this.tasks.filter((task) => task.description !== description);
    console.log("Task deleted successfully");
  }
}

// Create an instance of the TaskManager class.
const taskManager = new TaskManager();

// Call the createTask method on the taskManager object to create a task and add it to the tasks array.
const description = "Treatment response";
const assignedTo = "Dr. Joel Steven";
const dueDate = new Date("2023-05-04");

taskManager.createTask(description, assignedTo, dueDate);

// Call the createTask method on the taskManager object to create a task and add it to the tasks array.
taskManager.createTask(
  "Follow up with patient",
  "Dr. Smith",
  new Date("2023-06-30")
);

// Call the createTask method on the taskManager object to create a task and add it to the tasks array.
taskManager.createTask(
  "Review test results",
  "Dr. Johnson",
  new Date("2023-07-05")
);

// Call the printTasks method on the taskManager object to print the tasks to the console.
taskManager.printTasks();

// Call the updateTask method on the taskManager object to update a task.
taskManager.updateTask(
  "Treatment response",
  "Dr. Johnson",
  new Date("2023-05-04")
);

// Call the printTasks method on the taskManager object to print the tasks to the console.
taskManager.printTasks();

// Call the deleteTask method on the taskManager object to delete a task.
taskManager.deleteTask("Review test results");

// Call the printTasks method on the taskManager object to print the tasks to the console.
taskManager.printTasks();

//  Feel free to test the code by creating more tasks and calling the other methods.

module.exports = { Task, TaskManager };
