import express from 'express';
import patientService from '../services/patientService';
import diagnoseService from '../services/diagnoseService';
import { toNewPatientEntry, toNewEntry } from '../utils'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry); 
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  const id = req.params.id;

  if (patient) {
    try {
      const content = toNewEntry(req.body);
      const newEntry = diagnoseService.addEntry(id, content);
      res.json(newEntry);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.'
      if(error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  } else {
    res.sendStatus(404);
  }
});

export default router;