import Patient from "../models/patient";
import PaginatedResults from "../models/paginatedResults";
import PatientWithVisits from "../models/patientWithVisits";
import { AxiosInstance } from "axios";

export default class PatientSearchService {
    private readonly _apiClient: AxiosInstance

    constructor(apiClient: AxiosInstance) {
        this._apiClient = apiClient;
    }

    findPatients(searchQuery: string, callback: (patients: PaginatedResults<Patient>) => void) {
        this._apiClient.get<PaginatedResults<Patient>>(`api/patients?searchQuery=${searchQuery}`)
            .then(res => {
                callback(res.data);
            })
            // Show the user something useful here
            .catch((err) => console.log(err));
            // .finally(() => end "loading" state)
    }

    getPatient(patientId: string, callback: (patients: PatientWithVisits) => void) {
        this._apiClient.get<PatientWithVisits>(`api/patients/${patientId}`)
            .then(res => {
                callback(res.data);
            })
            // Show the user something useful here
            .catch((err) => console.log(err));
            // .finally(() => end "loading" state)
    }
}