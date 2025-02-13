import PatientWithVisits from "../models/patientWithVisits";

function formatDate(date: string) {
    const parsedDate = new Date(date);

    return `${parsedDate.toLocaleDateString()} at ${parsedDate.toLocaleTimeString()}`
}

export default function PatientView({patient, onBack}: {patient: PatientWithVisits, onBack: () => void}) {
    const visits = patient.visits.map(v => <li key={v.id}>{formatDate(v.date)}</li>)

    return (
        <div className="patient-view">
            <button className="back" onClick={onBack}>Back</button>
            <div data-patient-id={patient.id}>
                <div className="bio">
                    <div className="bio-item"><span className="label">First Name:</span>{patient.firstName}</div>
                    <div className="bio-item"><span className="label">Last Name:</span>{patient.lastName}</div>
                    <div className="bio-item"><span className="label">Email:</span>{patient.email}</div>
                </div>
                <div className="visits">
                    <div>Visits</div>
                    <ol>
                        {visits}
                    </ol>
                </div>
            </div>
        </div>
    );
}