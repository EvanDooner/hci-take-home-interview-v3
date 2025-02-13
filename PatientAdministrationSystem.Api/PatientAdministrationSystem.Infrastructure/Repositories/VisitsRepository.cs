using Microsoft.EntityFrameworkCore;
using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Repositories.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Pagination;

namespace PatientAdministrationSystem.Infrastructure.Repositories;

public class VisitsRepository : IVisitsRepository
{
    private readonly HciDataContext _context;

    public VisitsRepository(HciDataContext context)
    {
        _context = context;
    }

    public PaginatedResults<VisitEntity> FindVisits(Guid hospitalId, string searchQuery, DateTime startDateInc, DateTime endDateInc, int pageNumber = 1, int pageSize = 10)
    {
        if (pageNumber < 1)
        {
            throw new ArgumentException($"pageNumber should be greater than or equal to 1. Was: {pageNumber}");
        }
        if (pageSize < 1)
        {
            throw new ArgumentException($"pageSize should be greater than or equal to 1. Was: {pageSize}");
        }
        if (startDateInc.CompareTo(endDateInc) >= 0)
        {
            throw new ArgumentException($"endDateInc should be greater than startDateInc. startDateInc: {startDateInc}, endDateInc: {endDateInc}");
        }

        var allResults = _context.Visits.Where(v =>
            v.PatientHospitals.Any(ph => ph.HospitalId == hospitalId &&
            (
                (ph.Patient.FirstName + ph.Patient.LastName).Replace(" ", "").Contains(searchQuery, StringComparison.CurrentCultureIgnoreCase) ||
                ph.Patient.Email.Replace(" ", "").Contains(searchQuery, StringComparison.CurrentCultureIgnoreCase)
            ))
        )
        .Include(v => v.PatientHospitals)
        .ThenInclude(ph => ph.Patient)
        .OrderByDescending(v => v.Date)
        .ThenBy(v => v.Id);

        var totalCount = allResults.Count();

        var pageOfResults = allResults
            .Skip(pageSize * (pageNumber - 1))
            .Take(pageSize);

        return new PaginatedResults<VisitEntity>(pageOfResults, pageNumber, pageSize, totalCount);
    }
}