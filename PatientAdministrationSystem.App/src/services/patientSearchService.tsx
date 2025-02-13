import Patient from "../models/patient";
import apiClient from "../api/apiClient";
import PaginatedResults from "../models/paginatedResults";
import PatientWithVisits from "../models/patientWithVisits";

export function findPatients(searchQuery: string, callback: (patients: PaginatedResults<Patient>) => void) {
    apiClient.get<PaginatedResults<Patient>>(`api/patients?searchQuery=${searchQuery}`)
        .then(res => {
            callback(res.data);
        })
        .catch((err) => console.log(err));
}

export function getPatient(patientId: string, callback: (patients: PatientWithVisits) => void) {
    apiClient.get<PatientWithVisits>(`api/patients/${patientId}`)
        .then(res => {
            callback(res.data);
        })
        .catch((err) => console.log(err));
}