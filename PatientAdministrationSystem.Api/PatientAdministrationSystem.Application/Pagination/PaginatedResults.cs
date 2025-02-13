namespace PatientAdministrationSystem.Application.Repositories.Pagination;

/// <summary>
/// A page of results from a larger result set.
/// </summary>
/// <typeparam name="T">The type of the result set.</typeparam>
public class PaginatedResults<T>
{
    /// <summary>
    /// Creates a page of results.
    /// </summary>
    /// <param name="results">the results for this page</param>
    /// <param name="pageNumber">the current page number. 1-indexed. Minimum 1.</param>
    /// <param name="pageSize">the maximum number of results per page. Minimum 1.</param>
    /// <param name="totalCount">the total number of results across all pages. Must be greater than or equal to the number of results on this page.</param>
    /// <exception cref="ArgumentException">If pageNumber or pageSize are less than 1, or if totalCount is less than results.Count().</exception>
    public PaginatedResults(IEnumerable<T> results, int pageNumber, int pageSize, int totalCount) 
    {
        if (pageNumber < 1)
        {
            throw new ArgumentException($"pageNumber should be greater than or equal to 1. Was: {pageNumber}");
        }
        if (pageSize < 1)
        {
            throw new ArgumentException($"pageSize should be greater than or equal to 1. Was: {pageSize}");
        }
        if (totalCount < results.Count())
        {
            throw new ArgumentException($"totalCount should be greater than or equal to the number of results. Results count: {results.Count()}, totalCount: {totalCount}");
        }

        Results = results;
        PageNumber = pageNumber;
        PageSize = pageSize;
        TotalCount = totalCount;
    }

    /// <summary>
    /// The results on this page.
    /// </summary>
    public IEnumerable<T> Results { get; }

    /// <summary>
    /// The current page number.
    /// </summary>
    /// <remarks>
    /// 1-indexed. Minimum 1.
    /// </remarks>
    public int PageNumber { get; }

    /// <summary>
    /// The maximum number of results per page.
    /// </summary>
    /// <remarks>
    /// Minimum 1.
    /// </remarks>
    public int PageSize { get; }

    /// <summary>
    /// The total number of results across all pages.
    /// </summary>
    public int TotalCount { get; }
}
