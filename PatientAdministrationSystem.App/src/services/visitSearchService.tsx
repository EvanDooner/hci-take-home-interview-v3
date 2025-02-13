import PaginatedResults from "../models/paginatedResults";
import { AxiosInstance } from "axios";
import RichVisit from "../models/richVisit";

export default class VisitSearchService {
    private readonly _apiClient: AxiosInstance

    constructor(apiClient: AxiosInstance) {
        this._apiClient = apiClient;
    }

    findVisits(searchQuery: string, startDateInc: Date, endDateInc: Date, callback: (vists: PaginatedResults<RichVisit>) => void) {
        this._apiClient.get<PaginatedResults<RichVisit>>(`api/visits?searchQuery=${searchQuery}&startDateInc=${startDateInc.toISOString()}&endDateInc=${endDateInc.toISOString()}`)
            .then(res => {
                callback(res.data);
            })
            // Show the user something useful here
            .catch((err) => console.log(err));
            // .finally(() => end "loading" state)
    }
}