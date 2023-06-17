const {
  Patient,
  PatientManager,
} = require("../src/electronicPatientManagement");

describe("PatientManager", () => {
  let patientManager;

  beforeEach(() => {
    patientManager = new PatientManager();
  });

  describe("addPatient", () => {
    test("should add a new patient to the patients array", () => {
      patientManager.addPatient(1, "John Doe");

      expect(patientManager.patients.length).toBe(1);
      expect(patientManager.patients[0]).toBeInstanceOf(Patient);
      expect(patientManager.patients[0].patientId).toBe(1);
      expect(patientManager.patients[0].patientData).toBe("John Doe");
    });

    test("should throw an error if patient with the same ID already exists", () => {
      patientManager.addPatient(1, "John Doe");

      expect(() => {
        patientManager.addPatient(1, "Jane Smith");
      }).toThrowError("Patient already exists");
    });
  });

  describe("getPatient", () => {
    beforeEach(() => {
      patientManager.addPatient(1, "John Doe");
      patientManager.addPatient(2, "Jane Smith");
    });

    test("should log patient data if patient with the specified ID exists", () => {
      const spy = jest.spyOn(console, "log");

      patientManager.getPatient(1);

      expect(spy).toHaveBeenCalledWith("Patient found");
      expect(spy).toHaveBeenCalledWith("Patient ID: 1");
      expect(spy).toHaveBeenCalledWith("Patient Data: John Doe");
      expect(spy).toHaveBeenCalledWith("---------------------");

      spy.mockRestore();
    });

    test('should log "Patient not found" if patient with the specified ID does not exist', () => {
      const spy = jest.spyOn(console, "log");

      patientManager.getPatient(3);

      expect(spy).toHaveBeenCalledWith("Patient not found");

      spy.mockRestore();
    });
  });

  describe("updatePatient", () => {
    beforeEach(() => {
      patientManager.addPatient(1, "John Doe");
    });

    test("should update the patient data if patient with the specified ID exists", () => {
      patientManager.updatePatient(1, "Jane Smith");

      expect(patientManager.patients[0].patientData).toBe("Jane Smith");
    });

    test('should log "Patient not found" if patient with the specified ID does not exist', () => {
      const spy = jest.spyOn(console, "log");

      patientManager.updatePatient(2, "Jane Smith");

      expect(spy).toHaveBeenCalledWith("Patient not found");

      spy.mockRestore();
    });
  });

  describe("deletePatient", () => {
    beforeEach(() => {
      patientManager.addPatient(1, "John Doe");
      patientManager.addPatient(2, "Jane Smith");
    });

    test("should delete the patient with the specified ID", () => {
      patientManager.deletePatient(1);

      expect(patientManager.patients.length).toBe(1);
      expect(patientManager.patients[0].patientId).toBe(2);
    });

    test('should log "Patient not found" if patient with the specified ID does not exist', () => {
      const spy = jest.spyOn(console, "log");

      patientManager.deletePatient(3);

      expect(spy).toHaveBeenCalledWith("Patient not found");

      spy.mockRestore();
    });
  });

  describe("getAllPatients", () => {
    beforeEach(() => {
      patientManager.addPatient(1, "John Doe");
      patientManager.addPatient(2, "Jane Smith");
    });

    test("should log all patients data to the console", () => {
      const spy = jest.spyOn(console, "log");

      patientManager.getAllPatients();

      expect(spy).toHaveBeenCalledWith("Patients:");
      expect(spy).toHaveBeenCalledWith("Patient 1:");
      expect(spy).toHaveBeenCalledWith("Patient ID: 1");
      expect(spy).toHaveBeenCalledWith("Patient Data: John Doe");
      expect(spy).toHaveBeenCalledWith("---------------------");
      expect(spy).toHaveBeenCalledWith("Patient 2:");
      expect(spy).toHaveBeenCalledWith("Patient ID: 2");
      expect(spy).toHaveBeenCalledWith("Patient Data: Jane Smith");
      expect(spy).toHaveBeenCalledWith("---------------------");

      spy.mockRestore();
    });
  });
});
