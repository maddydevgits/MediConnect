// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MediConnect is Ownable, ReentrancyGuard {
    constructor() Ownable(msg.sender) {}

    struct Patient {
        string name;
        string email;
        string phoneNumber;
        string dateOfBirth;
        string medicalHistory;
        bool isRegistered;
        address walletAddress;
    }

    struct Doctor {
        string name;
        string email;
        string specialization;
        string licenseNumber;
        bool isRegistered;
        address walletAddress;
    }

    mapping(address => Patient) public patients;
    mapping(address => Doctor) public doctors;
    mapping(address => bool) public isPatient;
    mapping(address => bool) public isDoctor;

    event PatientRegistered(address indexed patientAddress, string name, string email);
    event DoctorRegistered(address indexed doctorAddress, string name, string specialization);
    event MedicalRecordUpdated(address indexed patientAddress, string medicalHistory);

    modifier onlyPatient() {
        require(isPatient[msg.sender], "Only registered patients can perform this action");
        _;
    }

    modifier onlyDoctor() {
        require(isDoctor[msg.sender], "Only registered doctors can perform this action");
        _;
    }

    function registerPatient(
        string memory _name,
        string memory _email,
        string memory _phoneNumber,
        string memory _dateOfBirth,
        string memory _medicalHistory
    ) external nonReentrant {
        require(!isPatient[msg.sender], "Patient already registered");
        require(!isDoctor[msg.sender], "Address is registered as a doctor");

        patients[msg.sender] = Patient({
            name: _name,
            email: _email,
            phoneNumber: _phoneNumber,
            dateOfBirth: _dateOfBirth,
            medicalHistory: _medicalHistory,
            isRegistered: true,
            walletAddress: msg.sender
        });

        isPatient[msg.sender] = true;
        emit PatientRegistered(msg.sender, _name, _email);
    }

    function registerDoctor(
        string memory _name,
        string memory _email,
        string memory _specialization,
        string memory _licenseNumber
    ) external nonReentrant {
        require(!isDoctor[msg.sender], "Doctor already registered");
        require(!isPatient[msg.sender], "Address is registered as a patient");

        doctors[msg.sender] = Doctor({
            name: _name,
            email: _email,
            specialization: _specialization,
            licenseNumber: _licenseNumber,
            isRegistered: true,
            walletAddress: msg.sender
        });

        isDoctor[msg.sender] = true;
        emit DoctorRegistered(msg.sender, _name, _specialization);
    }

    function updateMedicalHistory(
        address _patientAddress,
        string memory _newMedicalHistory
    ) external onlyDoctor {
        require(isPatient[_patientAddress], "Patient not registered");
        
        patients[_patientAddress].medicalHistory = _newMedicalHistory;
        emit MedicalRecordUpdated(_patientAddress, _newMedicalHistory);
    }

    function getPatientInfo(address _patientAddress) external view returns (
        string memory name,
        string memory email,
        string memory phoneNumber,
        string memory dateOfBirth,
        string memory medicalHistory
    ) {
        require(isPatient[_patientAddress], "Patient not registered");
        Patient memory patient = patients[_patientAddress];
        return (
            patient.name,
            patient.email,
            patient.phoneNumber,
            patient.dateOfBirth,
            patient.medicalHistory
        );
    }

    function getDoctorInfo(address _doctorAddress) external view returns (
        string memory name,
        string memory email,
        string memory specialization,
        string memory licenseNumber
    ) {
        require(isDoctor[_doctorAddress], "Doctor not registered");
        Doctor memory doctor = doctors[_doctorAddress];
        return (
            doctor.name,
            doctor.email,
            doctor.specialization,
            doctor.licenseNumber
        );
    }
} 