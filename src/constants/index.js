export const CONTRACT_ADDRESS = '0x392A5989D93d611bCC9C630B383f15d776679ea7' // goerli
export const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_task",
          "type": "string"
        }
      ],
      "name": "addTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "taskId",
          "type": "uint256"
        }
      ],
      "name": "deleteTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTaskCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTasks",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "task",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isDeleted",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isCompleted",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isImportant",
              "type": "bool"
            }
          ],
          "internalType": "struct Tasks.Task[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_taskIndex",
          "type": "uint256"
        }
      ],
      "name": "markAsComplete",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_taskIndex",
          "type": "uint256"
        }
      ],
      "name": "toggleImportance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_taskIndex",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_task",
          "type": "string"
        }
      ],
      "name": "updateTask",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]