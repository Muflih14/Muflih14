// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Creating a contract
contract Tasks {
    // Defining a structure to store a task
    struct Task {
        string task;
		bool isDeleted;
        bool isDone;
    }
 
    mapping(address => Task[]) private Users;

    // Add a task
    function addTask(string calldata _task) external {
        Users[msg.sender].push(Task({task: _task, isDeleted: false, isDone: false}));
    }

    // Update task status
    function updateStatus(uint256 _taskIndex, bool _status) external {
        Users[msg.sender][_taskIndex].isDone = _status;
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
