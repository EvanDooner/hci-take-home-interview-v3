export default class Visit {
    readonly id: string;
    readonly date: string
    readonly patientId: string;
    readonly hospitalId: string;

    constructor(id: string, date: string, patientId: string, hospitalId: string) {
        this.id = id;
        this.date = date;
        this.patientId = patientId;
        this.hospitalId = hospitalId;
    }
}