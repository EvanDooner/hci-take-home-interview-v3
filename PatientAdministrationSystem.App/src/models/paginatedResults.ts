export default class PaginatedResults<T> {
    readonly results: T[];
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly totalCount: number;

    constructor(results: T[], pageNumber: number, pageSize: number, totalCount: number) {
        this.results = results;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
    }
}