import PaginatedResults from "../models/paginatedResults";
import RichVisit from "../models/richVisit";
import PaginatedResultsList from "./PaginatedResultsList";

function formatDate(date: string) {
    const parsedDate = new Date(date);

    return `${parsedDate.toLocaleDateString()} at ${parsedDate.toLocaleTimeString()}`
}

export default function VisitSearchResults({visits, onSelect} : {visits: PaginatedResults<RichVisit>, onSelect: (patientId: string) => void}) {

    return (
        <PaginatedResultsList 
                results={visits} 
                formatItem={(v) => 
                    <li key={v.id} onClick={() => onSelect(v.patientId)}>
                        {`${formatDate(v.date)} - ${v.patient.firstName} ${v.patient.lastName}`}
                    </li>
                }
            />
    );
}