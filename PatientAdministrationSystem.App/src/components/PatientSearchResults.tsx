import PaginatedResults from "../models/paginatedResults";
import Patient from "../models/patient";
import PaginatedResultsList from "./PaginatedResultsList";

export default function PatientSearchResults({patients, onSelect} : {patients: PaginatedResults<Patient>, onSelect: (patientId: string) => void}) {

    return (
        <PaginatedResultsList 
                results={patients} 
                formatItem={(p) => 
                    <li key={p.id} onClick={() => onSelect(p.id)}>
                        {`${p.firstName} ${p.lastName}`} <span className="patient-email">({p.email})</span>
                    </li>
                }
            />
    );
}