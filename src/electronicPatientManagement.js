#!/usr/bin/env node

// This file contains the code for the Electronic Patient Management System (EPMS) application that manages patients' data in a mental health care facility.
// The application allows the user to add, get, update, and delete patients' data.
// The application also allows the user to get all patients' data.
// Author: Joel Steven Ssekyewa

// Create a class called Patient that has two properties: patientId and patientData.
class Patient {
  constructor(patientId, patientData) {
    this.patientId = patientId;
    this.patientData = patientData;
  }
}

// Create a class called PatientManager that has one property: patients. The patients property is an array of Patient objects.
// The PatientManager class has five methods: addPatient, getPatient, getAllPatients, updatePatient, and deletePatient.
class PatientManager {
  constructor() {
    this.patients = [];
  }

  // The addPatient method takes two parameters: patientId and patientData. The method creates a new Patient object and adds it to the patients array.
  addPatient(patientId, patientData) {
    const existingPatient = this.patients.find(
      (patient) => patient.patientId === patientId
    );
    if (existingPatient) {
      throw new Error("Patient already exists");
    }
    const newPatient = new Patient(patientId, patientData);
    this.patients.push(newPatient);
    console.log("Patient has been added successfully");
  }

  // The getPatient method takes one parameter: patientId. The method finds the patient with the specified patientId and logs the patient's data to the console.
  getPatient(patientId) {
    try {
      const patient = this.patients.find(
        (patient) => patient.patientId == patientId
      );
      if (!patient) {
        throw new Error("Patient not found");
      }
      console.log("Patient found");
      console.log(`Patient ID: ${patient.patientId}`);
      console.log(`Patient Data: ${patient.patientData}`);
      console.log("---------------------");
    } catch (error) {
      console.log("Patient not found");
    }
  }

  // The updatePatient method takes two parameters: patientId and patientData. The method finds the patient with the specified patientId and updates the patient's data.
  updatePatient(patientId, patientData) {
    try {
      const patient = this.patients.find(
        (patient) => patient.patientId == patientId
      );
      patient.patientData = patientData;
      console.log("Patient has been updated successfully");
    } catch (error) {
      console.log("Patient not found");
    }
  }

  // The deletePatient method takes one parameter: patientId. The method finds the patient with the specified patientId and deletes the patient.
  deletePatient(patientId) {
    try {
      const patient = this.patients.find(
        (patient) => patient.patientId == patientId
      );
      if (!patient) {
        throw new Error("Patient not found");
      }
      const index = this.patients.indexOf(patient);
      this.patients.splice(index, 1);
      console.log("Patient has been deleted successfully");
    } catch (error) {
      console.log("Patient not found");
    }
  }

  // The getAllPatients method takes no parameters. The method logs all patients' data to the console.
  getAllPatients() {
    console.log("Patients:");
    this.patients.forEach((patient, index) => {
      console.log(`Patient ${index + 1}:`);
      console.log(`Patient ID: ${patient.patientId}`);
      console.log(`Patient Data: ${patient.patientData}`);
      console.log("---------------------");
    });
  }
}

// Testing the PatientManager class

// Create a new instance of the PatientManager class
const patientManager = new PatientManager();

// Add patients
patientManager.addPatient(1, "Patient 1");
patientManager.addPatient(2, "Patient 2");
patientManager.addPatient(3, "Patient 3");

// Get patients by ID
patientManager.getPatient(1);
patientManager.getPatient(2);
patientManager.getPatient(3);

// Update patients
patientManager.updatePatient(1, "Patient 1 Updated");
patientManager.updatePatient(2, "Patient 2 Updated");
patientManager.updatePatient(3, "Patient 3 Updated");

// Delete patient by ID
patientManager.deletePatient(1);
patientManager.deletePatient(2);

// Get patients by ID to test if they have been deleted
patientManager.getPatient(1);
patientManager.getPatient(2);

// Get all patients
patientManager.getAllPatients();

// Feel free to test out the code here by calling methods of patientManager and logging the results to the console.

module.exports = { Patient, PatientManager };
