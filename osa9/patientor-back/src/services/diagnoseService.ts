import diagnoseData from '../../data/diagnoses.json';
import patientData from '../../data/patients';
import { DiagnoseEntry, Entry, NewEntry } from '../types';
import {v1 as uuid} from 'uuid';

const diagnoses: Array<DiagnoseEntry> = diagnoseData;

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = patientData.find(d => d.id === id);

  if (patient === undefined) {
    throw new Error("no such patient");
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };
  
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addEntry
};