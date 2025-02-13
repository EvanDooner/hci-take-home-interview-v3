import { useState } from 'react'
import './App.css'
import PatientSearch from './views/PatientSearch';
import {findPatients, getPatient} from './services/patientSearchService';
import Patient from './models/patient';
import PaginatedResults from './models/paginatedResults';
import PatientView from './views/PatientView';
import PatientWithVisits from './models/patientWithVisits';

enum Page {
  PatientSearch,
  PatientView
}

function App() {
  const [currentPage, setCurrentPage] = useState(Page.PatientSearch);
  const [currentPatient, setCurrentPatient] = useState<PatientWithVisits | undefined>(undefined);
  const [patients, setPatients] = useState<PaginatedResults<Patient> | undefined>(undefined);

  const page =  selectPage();

  function onSelect(patientId: string) {
    getPatient(patientId, (patient) => {
      setCurrentPatient(patient);
      setCurrentPage(Page.PatientView);
    });
  }

  function selectPage() {
    switch(currentPage) {
      case Page.PatientSearch:
        return <PatientSearch patients={patients} onSearch={(searchQuery) => findPatients(searchQuery, setPatients)} onSelect={onSelect}/>
      case Page.PatientView:
        if (currentPatient === undefined) {
          throw new Error("Cannot display patient view - no patient selected");
        }
        return <PatientView patient={currentPatient} onBack={() => setCurrentPage(Page.PatientSearch)}/>
      default:
        return <div>Default</div>
    }
  }

  return (
    <div id="app">
      {page}
    </div>
  )
}

export default App
