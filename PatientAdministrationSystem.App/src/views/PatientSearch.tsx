import { useState } from "react";
import Patient from "../models/patient";
import PaginatedResults from "../models/paginatedResults";
import PatientSearchResults from "../components/PatientSearchResults";
import { Page } from "../Constants";
import SearchTabs from "../components/SearchTabs";

type PatientSearchArguments = {
    patients: PaginatedResults<Patient> | undefined,
    onSearch: (searchQuery: string) => void,
    onSelect: (patientId: string) => void,
    onTabSelect: (page: Page) => void,
};

export default function PatientSearch({patients, onSearch, onSelect, onTabSelect}: PatientSearchArguments) {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="patient search">
            <SearchTabs currentPage={Page.PatientSearch} onSelect={onTabSelect} />
            <div className="patient search-form">
                <input 
                        placeholder="Enter patient name or email" 
                        type="text" 
                        name="searchQuery" 
                        value={searchQuery} 
                        onChange={e => setSearchQuery(e.target.value)} 
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                onSearch(searchQuery)
                            }
                        }}
                    />
                <button onClick={() => onSearch(searchQuery)}>Search</button>
            </div>
            {patients &&
                <PatientSearchResults patients={patients} onSelect={onSelect} />
            }
        </div>
    );
}