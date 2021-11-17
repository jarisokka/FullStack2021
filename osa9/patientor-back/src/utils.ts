import { NewPatientEntry, Gender, NewEntry, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown): string => {
  if (!value || !isString(value)) {
      throw new Error('Incorrect or missing value: ' + value)
  }
  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation)
  };
  return newEntry;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
}

const parseRating = (value: unknown): HealthCheckRating => {
  if(!value || !isHealthCheckRating(value)) {
    throw new Error('Incorrect or missing rating value: ' + value)
  }
  return value;
}

const parseDischarge = (values: any): {date: string, criteria: string} => {
  return {
    date: parseDate(values.date),
    criteria: parseString(values.criteria)
  }
}
const toNewEntry = (object: any): NewEntry => {
  if (!object.type) {
    throw new Error('Incorrect or missing type')
  }

  switch(object.type) {
    case "HealthCheck":
      return {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: object.diagnosisCodes,
        healthCheckRating: parseRating(object.healthCheckRating),
        type: "HealthCheck",
      };
    case "OccupationalHealthcare":
      return {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: object.diagnosisCodes,
        employerName: parseString(object.employerName),
        sickLeave: object.sickLeave,
        type: "OccupationalHealthcare",
      };
    case "Hospital":
      return {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: object.diagnosisCodes,
        discharge: parseDischarge(object.discharge),
        type: "Hospital",
      };
    default:
      throw new Error('Invalid type')
  }
};

export {
  toNewPatientEntry,
  toNewEntry
}; 