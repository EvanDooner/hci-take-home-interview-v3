using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Repositories.Pagination;

namespace PatientAdministrationSystem.Application.Repositories.Interfaces;

public interface IPatientsRepository
{
    // Add interfaces here for your repository methods

    /// <summary>
    /// Gets a PatientEntity by ID, if one exists.
    /// </summary>
    /// <param name="id">The ID of the PatientEntity to return</param>
    /// <param name="loadVisits">true if the returned PatientEntity should eagerly load related Visits; false otherwise</param>
    /// <returns>the PatientEntity with the specified ID, if one exists</returns>
    PatientEntity? GetPatient(Guid id, bool loadVisits);

    /// <summary>
    /// Returns the PatientEntities associated with the specified HospitalEntity ID that match the searchQuery.
    /// </summary>
    /// <remarks>
    /// <para>
    /// Results are ordered by FirstName, LastName, Email, Id ascending.
    /// </para>
    /// <para>
    /// All search query comparisons are done on lowercased values with spaces (' ') removed.
    /// </para>
    ///
    /// A PatientEntity is considered to match the search query if any of the following are true:
    ///
    /// <list type="bullet">
    ///     <item>
    ///         <description>The combined FirstName and LastName contains the search query</description>
    ///     </item>
    ///     <item>
    ///         <description>The Email contains the search query</description>
    ///     </item>
    /// </list>
    /// </remarks>
    /// <param name="hospitalId">The ID of an HospitalEntity. All matching PatientEntities must have a Visit associated with the HospitalIdentity</param>
    /// <param name="searchQuery">The freetext string to match.</param>
    /// <param name="pageNumber">The 1-indexed page to return from the full result set. Default 1. Minimum 1.</param>
    /// <param name="pageSize">The maximum number of results to return. Default 10. Minimum 1.</param>
    /// <returns>PatientEntities that match the search criteria</returns>
    PaginatedResults<PatientEntity> FindPatients(Guid hospitalId, string searchQuery, int pageNumber = 1, int pageSize = 10);
}