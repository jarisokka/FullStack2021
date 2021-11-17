import patientData from '../../data/patients';
import { NewPatientEntry, PatientEntry, Patient } from '../types';
import {v1 as uuid} from 'uuid';

const getEntries = (): PatientEntry [] => {
  return patientData.map(( { id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patientData.find(d => d.id === id);
  return entry;
};

const addEntry = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addEntry,
  findById
};