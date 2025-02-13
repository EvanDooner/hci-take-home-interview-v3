import Patient from "./patient";
import Visit from "./visit";

export default class PatientWithVisits extends Patient {
    readonly visits: Visit[];

    constructor(id: string, firstName: string, lastName: string, email: string, visits: Visit[]) {
        super(id, firstName, lastName, email);
        this.visits = visits;
    }
}