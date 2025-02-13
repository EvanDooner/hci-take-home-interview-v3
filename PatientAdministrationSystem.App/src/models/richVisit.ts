import Patient from "./patient";
import Visit from "./visit";

export default class RichVisit extends Visit {
    readonly patient: Patient

    constructor(id: string, date: string, patientId: string, hospitalId: string, patient: Patient) {
        super(id, date, patientId, hospitalId);
        this.patient = patient;
    }
}