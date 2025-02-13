import PaginatedResults from "../models/paginatedResults";
import Patient from "../models/patient";

export default function PatientSearchResults({patients, onSelect} : {patients: PaginatedResults<Patient>, onSelect: (patientId: string) => void}) {
    const results = patients.results.map(p => <li key={p.id} onClick={() => onSelect(p.id)}>{`${p.firstName} ${p.lastName}`} <span className="patient-email">({p.email})</span></li>)

    return (
        <div className="patient-search-results">
            <ol>
                        {results}
            </ol>
        </div>
    );
}