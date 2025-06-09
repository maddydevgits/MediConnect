let web3;
let contract;
let accounts;

const contractAddress = '0x6121b2fFAD223D2F9328614Ec8301f08f11Fbe93'; // Will be updated after deployment
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "doctorAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "specialization",
          "type": "string"
        }
      ],
      "name": "DoctorRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "patientAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "medicalHistory",
          "type": "string"
        }
      ],
      "name": "MedicalRecordUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "patientAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "email",
          "type": "string"
        }
      ],
      "name": "PatientRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "doctors",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "specialization",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "licenseNumber",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isDoctor",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "isPatient",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "patients",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "phoneNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "dateOfBirth",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "medicalHistory",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_phoneNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_dateOfBirth",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_medicalHistory",
          "type": "string"
        }
      ],
      "name": "registerPatient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_specialization",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_licenseNumber",
          "type": "string"
        }
      ],
      "name": "registerDoctor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_patientAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_newMedicalHistory",
          "type": "string"
        }
      ],
      "name": "updateMedicalHistory",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_patientAddress",
          "type": "address"
        }
      ],
      "name": "getPatientInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "phoneNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "dateOfBirth",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "medicalHistory",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_doctorAddress",
          "type": "address"
        }
      ],
      "name": "getDoctorInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "specialization",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "licenseNumber",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]
async function initWeb3() {
    if (window.ethereum) {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            
            // Get the contract instance
            contract = new web3.eth.Contract(contractABI, contractAddress);
            
            // Get user accounts
            accounts = await web3.eth.getAccounts();
            
            return true;
        } catch (error) {
            console.error("User denied account access");
            return false;
        }
    } else {
        console.error("Please install MetaMask!");
        return false;
    }
}

async function registerPatient(name, email, phoneNumber, dateOfBirth, location,medicalHistory) {
    try {
        await contract.methods.registerPatient(
            name,
            email,
            phoneNumber,
            dateOfBirth,
            location,
            medicalHistory
        ).send({ from: accounts[0] });
        return true;
    } catch (error) {
        console.error("Error registering patient:", error);
        return false;
    }
}

async function registerDoctor(name, email, specialization, licenseNumber) {
    try {
        await contract.methods.registerDoctor(
            name,
            email,
            specialization,
            licenseNumber
        ).send({ from: accounts[0] });
        return true;
    } catch (error) {
        console.error("Error registering doctor:", error);
        return false;
    }
}

async function getPatientInfo(patientAddress) {
    try {
        console.log('Contract address:', contractAddress);
        console.log('Contract instance:', contract);
        
        if (!contract) {
            throw new Error('Contract not initialized. Please refresh the page and try again.');
        }
        
        // First check if the patient is registered
        const isRegistered = await contract.methods.isPatient(patientAddress).call();
        if (!isRegistered) {
            throw new Error('Patient not registered');
        }
        
        // Get patient info
        const info = await contract.methods.getPatientInfo(patientAddress).call();
        console.log('Raw patient info from contract:', info);
        
        // Return as array to match contract structure
        return [
            info.name,
            info.email,
            info.phoneNumber,
            info.dateOfBirth,
            info.location,
            info.medicalHistory
        ];
    } catch (error) {
        console.error("Error getting patient info:", error);
        if (error.message.includes('Patient not registered')) {
            throw error;
        }
        if (error.message.includes('Contract not initialized')) {
            throw error;
        }
        throw new Error('Failed to get patient info. Please check your connection and try again.');
    }
}

async function getDoctorInfo(doctorAddress) {
    try {
        const info = await contract.methods.getDoctorInfo(doctorAddress).call();
        return {
            name: info[0],
            email: info[1],
            specialization: info[2],
            licenseNumber: info[3]
        };
    } catch (error) {
        console.error("Error getting doctor info:", error);
        return null;
    }
}

async function updateMedicalHistory(patientAddress, newMedicalHistory) {
    try {
        await contract.methods.updateMedicalHistory(
            patientAddress,
            newMedicalHistory
        ).send({ from: accounts[0] });
        return true;
    } catch (error) {
        console.error("Error updating medical history:", error);
        return false;
    }
}

// Export functions for use in other files
window.web3Functions = {
    initWeb3,
    registerPatient,
    registerDoctor,
    getPatientInfo,
    getDoctorInfo,
    updateMedicalHistory,
    // Add helper function to check contract status
    async checkContractStatus() {
        try {
            if (!contract) {
                return { initialized: false, error: 'Contract not initialized' };
            }
            const owner = await contract.methods.owner().call();
            return { initialized: true, owner };
        } catch (error) {
            return { initialized: false, error: error.message };
        }
    },
    async isPatient(address) {
        try {
            if (!contract) {
                throw new Error('Contract not initialized');
            }
            console.log('Checking if address is patient:', address);
            const result = await contract.methods.isPatient(address).call();
            console.log('Is patient result:', result);
            return result;
        } catch (error) {
            console.error('Error checking patient status:', error);
            throw error;
        }
    }
}; 