import PatientWithVisits from "../models/patientWithVisits";

export default function PatientView({patient, onBack}: {patient: PatientWithVisits, onBack: () => void}) {
    console.log(patient);
    const visits = patient.visits.map(v => <li key={v.id}>{v.date}</li>)

    return (
        <div>
            <button onClick={onBack}>Back</button>
            <div data-patient-id={patient.id}>
                <div>{patient.firstName}</div>
                <div>{patient.lastName}</div>
                <div>{patient.email}</div>
                <ol>
                    {visits}
                </ol>
            </div>
        </div>
    );
}