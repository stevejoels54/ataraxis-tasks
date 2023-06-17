const { Task, TaskManager } = require("../src/taskAndReminderManagement");

describe("TaskManager", () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  describe("createTask", () => {
    test("should add a new task to the tasks array", () => {
      taskManager.createTask("Task 1", "John Doe", "2023-06-30");

      expect(taskManager.tasks.length).toBe(1);
      expect(taskManager.tasks[0]).toBeInstanceOf(Task);
      expect(taskManager.tasks[0].description).toBe("Task 1");
      expect(taskManager.tasks[0].assignedTo).toBe("John Doe");
      expect(taskManager.tasks[0].dueDate).toBe("2023-06-30");
    });

    test("should throw an error if task with the same description already exists", () => {
      taskManager.createTask("Task 1", "John Doe", "2023-06-30");

      expect(() => {
        taskManager.createTask("Task 1", "Jane Smith", "2023-07-01");
      }).toThrowError("Task already exists");
    });
  });

  describe("printTasks", () => {
    test("should log all tasks' data to the console", () => {
      taskManager.createTask("Task 1", "John Doe", "2023-06-30");
      taskManager.createTask("Task 2", "Jane Smith", "2023-07-01");

      // Mock console.log to capture the logged output
      const consoleLogMock = jest.spyOn(console, "log");
      consoleLogMock.mockImplementation(() => {});

      taskManager.printTasks();

      expect(consoleLogMock).toHaveBeenCalledTimes(11);
      expect(consoleLogMock).toHaveBeenCalledWith("Tasks:");
      expect(consoleLogMock).toHaveBeenCalledWith("Task 1:");
      expect(consoleLogMock).toHaveBeenCalledWith("Description: Task 1");
      expect(consoleLogMock).toHaveBeenCalledWith("Assigned To: John Doe");
      expect(consoleLogMock).toHaveBeenCalledWith("Due Date: 2023-06-30");
      expect(consoleLogMock).toHaveBeenCalledWith("---------------------");
      expect(consoleLogMock).toHaveBeenCalledWith("Task 2:");
      expect(consoleLogMock).toHaveBeenCalledWith("Description: Task 2");
      expect(consoleLogMock).toHaveBeenCalledWith("Assigned To: Jane Smith");
      expect(consoleLogMock).toHaveBeenCalledWith("Due Date: 2023-07-01");
      expect(consoleLogMock).toHaveBeenCalledWith("---------------------");

      consoleLogMock.mockRestore();
    });
  });

  describe("updateTask", () => {
    test("should update the task with the specified description", () => {
      taskManager.createTask("Task 1", "John Doe", "2023-06-30");
      taskManager.createTask("Task 2", "Jane Smith", "2023-07-01");

      taskManager.updateTask("Task 1", "Updated Assignee", "2023-07-02");

      expect(taskManager.tasks[0].assignedTo).toBe("Updated Assignee");
      expect(taskManager.tasks[0].dueDate).toBe("2023-07-02");
    });

    test("should throw an error if task with the specified description is not found", () => {
      expect(() => {
        taskManager.updateTask(
          "Non-existent Task",
          "Updated Assignee",
          "2023-07-02"
        );
      }).toThrowError("Task not found");
    });
  });

  describe("deleteTask", () => {
    test("should delete the task with the specified description", () => {
      taskManager.createTask("Task 1", "John Doe", "2023-06-30");
      taskManager.createTask("Task 2", "Jane Smith", "2023-07-01");

      taskManager.deleteTask("Task 1");

      expect(taskManager.tasks.length).toBe(1);
      expect(taskManager.tasks[0].description).toBe("Task 2");
    });

    test("should throw an error if task with the specified description is not found", () => {
      expect(() => {
        taskManager.deleteTask("Non-existent Task");
      }).toThrowError("Task not found");
    });
  });
});
