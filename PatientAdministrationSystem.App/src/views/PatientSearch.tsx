import { useState } from "react";
import Patient from "../models/patient";
import PaginatedResults from "../models/paginatedResults";
import PatientSearchResults from "../components/PatientSearchResults";

export default function PatientSearch({patients, onSearch, onSelect}: {patients: PaginatedResults<Patient> | undefined, onSearch: (searchQuery: string) => void, onSelect: (patientId: string) => void}) {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="patient-search">
            <div className="patient-search-form">
                <input placeholder="Enter patient name or email" type="text" name="searchQuery" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <button onClick={() => onSearch(searchQuery)}>Search</button>
            </div>
            {patients &&
                <PatientSearchResults patients={patients} onSelect={onSelect} />
            }
        </div>
    );
}