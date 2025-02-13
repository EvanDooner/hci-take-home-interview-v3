import PaginatedResults from "../models/paginatedResults";

export default function PaginatedResultsList<T>({results, formatItem} : {results: PaginatedResults<T>, formatItem: (item: T) => JSX.Element}) {
    const items = results.results.map(formatItem)

    const pageControls = <div className="page-controls">
        {results.pageNumber > 1 &&
            <button className="prev">Previous</button>
        }
        <div className="page-number">{results.pageNumber}</div>
        {results.results.length == results.pageSize && results.pageNumber * results.pageSize < results.totalCount &&
            <button className="next">Next</button>
        }
    </div>

    const firstResult = (results.pageSize * (results.pageNumber - 1)) + 1;
    const lastResult = firstResult + results.results.length - 1;

    let pageCounter;
    if (results.results.length === 0) {
        pageCounter = <div className="page-counter">0 results found.</div>
    } else {
        pageCounter = <div className="page-counter">Showing {firstResult} to {lastResult} of {results.totalCount} results.</div>;
    }

    return (
        <div className="search-results">
            <ol>
                {items}
            </ol>
            {results.totalCount > results.pageSize && // Show pagination if there's more than one
                pageControls
            }
            {pageCounter}
        </div>
    );
}