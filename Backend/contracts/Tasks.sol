// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Creating a contract
contract Tasks {
    string[] public tasks;

    // Defining a structure to store a task
    struct Task {
        string task;
        bool isDeleted;
        bool isCompleted;
        bool isImportant;
    }

    mapping(address => Task[]) private Users;

    function setTasks(string memory _task) public {
        tasks.push(_task);
    }

    // In this function we are just returning the array
    function getTasks() public view returns (string[] memory) {
        return tasks;
    }

    // Here we are returning the length of the tasks array
    function getTasksLength() public view returns (uint) {
        uint tasksLength = tasks.length;
        return tasksLength;
    }

    // Add a task
    function addTask(string calldata _task) external {
        Users[msg.sender].push(
            Task({task: _task, isDeleted: false, isCompleted: false, isImportant: false})
        );
    }

    // Update task status
    function updateStatus(uint256 _taskIndex, bool _status) external {
        Users[msg.sender][_taskIndex].isCompleted = _status;
    }

    // Delete a task
    function deleteTask(uint256 _taskIndex) external {
        delete Users[msg.sender][_taskIndex];
    }

    // Get task count.
    function getTaskCount() external view returns (uint256) {
        return Users[msg.sender].length;
    }
}
