// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Creating a contract
contract Tasks {

    uint taskCount = 1;

    // Defining a structure to store a task
    struct Task {
        uint id;
        string task;
        bool isDeleted;
        bool isCompleted;
        bool isImportant;
    }

    mapping(address => mapping (uint => Task)) private users;
    mapping(address => uint[]) taskIds;

    // In this function we are just returning the array
    function getTasks() public view returns (Task[] memory) {

        address userAddress = msg.sender;

        Task[] memory taskList = new Task[](taskIds[userAddress].length);
        uint[] memory userTaskIds = taskIds[userAddress];

        uint index = 0;
        for(uint i = 0; i < userTaskIds.length; i++) {
            Task memory task = users[userAddress][userTaskIds[i]];
            if(!task.isDeleted) {
                taskList[index] = task;
                index++;
            }
        }

        return taskList;

    }

    // Add a task
    function addTask(string memory _task) external {

        Task memory newTask = Task({
            id: taskCount,
            task: _task, 
            isDeleted: false, 
            isCompleted: false, 
            isImportant: false
        });
        users[msg.sender][taskCount] = newTask;
        taskIds[msg.sender].push(taskCount);

        // increment taskCount
        taskCount++;
    }

    // Mark Task as complete
    function markAsComplete(uint256 _taskIndex) external {
        users[msg.sender][_taskIndex].isCompleted = !users[msg.sender][_taskIndex].isCompleted;
    }

    // Toggle importance status
    function toggleImportance(uint256 _taskIndex) external {
        users[msg.sender][_taskIndex].isImportant = !users[msg.sender][_taskIndex].isImportant;
    }

    // Update task status
    function updateTask(uint256 _taskIndex, string memory _task) external {
        users[msg.sender][_taskIndex].task = _task;
    }

    // Delete a task
    function deleteTask(uint taskId) public {
        address userAddress = msg.sender;

        users[userAddress][taskId].isDeleted = true;

        // remove task ID from taskIds mapping
        uint[] storage userTaskIds = taskIds[userAddress];
        for (uint i = 0; i < userTaskIds.length; i++) {
            if (userTaskIds[i] == taskId) {
                // shift remaining IDs in the array to fill the gap
                for (uint j = i; j < userTaskIds.length - 1; j++) {
                    userTaskIds[j] = userTaskIds[j+1];
                }
                userTaskIds.pop();
                break;
            }
        }
    }

    // Get task count.
    function getTaskCount() external view returns (uint256) {
        uint[] memory userTaskIds = taskIds[msg.sender];
        uint count = 0;
        for (uint i = 0; i < userTaskIds.length; i++) {
            if (!users[msg.sender][userTaskIds[i]].isDeleted) {
                count++;
            }
        }
        return count;
    }
}