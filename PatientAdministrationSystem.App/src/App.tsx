import { useState } from 'react'
import './App.css'
import PatientSearch from './views/PatientSearch';
import PatientSearchService from './services/patientSearchService';
import apiClient from './api/apiClient';
import Patient from './models/patient';
import PaginatedResults from './models/paginatedResults';
import PatientView from './views/PatientView';
import PatientWithVisits from './models/patientWithVisits';
import VisitSearch from './views/VisitSearch';
import RichVisit from './models/richVisit';
import VisitSearchService from './services/visitSearchService';
import { Page } from './Constants';

const patientSearchService = new PatientSearchService(apiClient);
const visitSearchService = new VisitSearchService(apiClient);

function App() {
  const [currentPage, setCurrentPage] = useState(Page.PatientSearch);
  const [previousPage, setPreviousPage] = useState<Page | undefined>(undefined);
  const [currentPatient, setCurrentPatient] = useState<PatientWithVisits | undefined>(undefined);
  const [patients, setPatients] = useState<PaginatedResults<Patient> | undefined>(undefined);
  const [visits, setVisits] = useState<PaginatedResults<RichVisit> | undefined>(undefined);

  const page =  selectPage();

  function onSelect(patientId: string) {
    patientSearchService.getPatient(patientId, (patient) => {
      setPreviousPage(currentPage);
      setCurrentPatient(patient);
      setCurrentPage(Page.PatientView);
    });
  }

  function selectPage() {
    switch(currentPage) {
      case Page.PatientSearch:
        return <PatientSearch patients={patients} onSearch={(searchQuery) => patientSearchService.findPatients(searchQuery, setPatients)} onSelect={onSelect} onTabSelect={setCurrentPage}/>
      case Page.PatientView:
        if (currentPatient === undefined) {
          throw new Error("Cannot display patient view - no patient selected");
        }
        return <PatientView patient={currentPatient} onBack={() => {
          setCurrentPage(previousPage || Page.PatientSearch);
          setPreviousPage(undefined);
        }}/>
      case Page.VisitSearch:
        return <VisitSearch visits={visits} onSearch={(searchQuery) => visitSearchService.findVisits(searchQuery, setVisits)} onSelect={onSelect} onTabSelect={setCurrentPage}/>
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
