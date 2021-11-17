import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Container, Icon, Card, Button } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import AddPatientModal from "../AddEntryModal";
import { HospitalFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const result = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        patients[result.data.id] = result.data;
        dispatch({ type: "SET_PATIENT_LIST", payload: Object.values(patients) });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch, id]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: HospitalFormValues) => {
    try {
      const { data: newHospitalEntry } = await axios.post<Patient>(
       `${apiBaseUrl}/patients/${id}/entries`,
       values
       );
     dispatch({ type: "ADD_ENTRY", payload: newHospitalEntry });
     closeModal();
    } catch (e: any) {
     console.error(e.response?.data || 'Unknown Error');
     setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const iconSymbol = () => {
    if(patient.gender === "male") {
      return "mars";
    } else if(patient.gender === "female") {
      return "venus";
    } else {
      return "genderless";
    }
  };

  const heartColor = (value: any) => {
    if (value === 0) {
      return "green";
    } else if (value === 1) {
      return "orange";
    } else if (value === 2) {
      return "yellow";
    } else {
      return "red";
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails = ({ entry }: { entry: Entry}) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <div>
            <Card>
              <Card.Content> 
                <Card.Header>
                  {entry.date}
                  {<Icon name='home' size="big"/>}
                </Card.Header>
                <Card.Description>
                  <i>{entry.description}</i>
                  <p>dischaged:</p>
                  <p>{entry.discharge.date} {entry.discharge.criteria}</p>
                </Card.Description>
                <Card.Description>
                  <ul>{entry.diagnosisCodes?.map(p => <li key={p}> {p}</li>)}</ul>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            <Card>
              <Card.Content> 
                <Card.Header>
                  {entry.date}
                  {<Icon name='factory' size="big"/>}
                </Card.Header>
                <Card.Description>
                  <p>employer: {entry.employerName}</p>
                  <i>{entry.description}</i>
                </Card.Description>
                <Card.Description>
                  <ul>{entry.diagnosisCodes?.map(p => <li key={p}> {p}</li>)}</ul>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        );
      case "HealthCheck":
        return (
          <div>
            <Card>
              <Card.Content> 
                <Card.Header>
                  {entry.date}
                  {<Icon name='hospital' size="big"/>}
                </Card.Header>
                <Card.Description>
                  <i>{entry.description}</i>
                </Card.Description>
                <Card.Description>
                  <ul>{entry.diagnosisCodes?.map(p => <li key={p}> {p}</li>)}</ul>
                  <Icon name="heart" color={heartColor(entry.healthCheckRating)} />
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        );
      default:
        return assertNever(entry);
       }
    };

  return(
    <div className="App">
    <Container>
      <h2>{patient.name} <Icon name={iconSymbol()}/></h2>
      <p>snn: {patient.ssn}</p>
      <p>occuptaion: {patient.occupation}</p>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add Hospital Entry</Button>
      <h3>entries</h3>
      { !patient.entries 
        ? <p>no entries</p>
        : patient.entries.map(p => <EntryDetails entry={p} key={p.id}/>)
      }
    </Container>
    </div>
  );  
};

export default PatientPage;