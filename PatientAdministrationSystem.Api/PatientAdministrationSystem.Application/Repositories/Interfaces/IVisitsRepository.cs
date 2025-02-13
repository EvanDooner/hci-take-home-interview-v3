using PatientAdministrationSystem.Application.Repositories.Pagination;
using PatientAdministrationSystem.Application.Entities;

namespace PatientAdministrationSystem.Application.Repositories.Interfaces;

public interface IVisitsRepository
{

    /// <summary>
    /// Returns the VisitEntities associated with the specified HospitalEntity ID that match the searchQuery.
    /// </summary>
    /// <remarks>
    /// <para>
    /// Results are ordered by Date descending.
    /// </para>
    /// <para>
    /// All search query comparisons are done on lowercased values with spaces (' ') removed.
    /// </para>
    ///
    /// A VisitEntity is considered to match the search query if any of the following are true:
    ///
    /// <list type="bullet">
    ///     <item>
    ///         <description>The combined FirstName and LastName of the associated PatientEntity contains the search query</description>
    ///     </item>
    ///     <item>
    ///         <description>The Email of the associated PatientEntity contains the search query</description>
    ///     </item>
    /// </list>
    /// </remarks>
    /// <param name="hospitalId">The ID of an HospitalEntity. All matching VisitEntities must be associated with the HospitalEntity</param>
    /// <param name="searchQuery">The freetext string to match.</param>
    /// <param name="startDateInc">The start of the date range to match, inclusive.</param>
    /// <param name="endDateInc">The end of the date range to match, inclusive. Must be after startDateInc</param>
    /// <param name="pageNumber">The 1-indexed page to return from the full result set. Default 1. Minimum 1.</param>
    /// <param name="pageSize">The maximum number of results to return. Default 10. Minimum 1.</param>
    /// <returns>VisitEntities that match the search criteria</returns>
    PaginatedResults<VisitEntity> FindVisits(Guid hospitalId, string searchQuery, DateTime startDateInc, DateTime endDateInc, int pageNumber = 1, int pageSize = 10);
}