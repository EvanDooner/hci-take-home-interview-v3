using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Repositories.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Pagination;

namespace PatientAdministrationSystem.Infrastructure.Repositories;

public class PatientsRepository : IPatientsRepository
{
    private readonly HciDataContext _context;

    public PatientsRepository(HciDataContext context)
    {
        _context = context;
    }



    // Add logic here for your querying the data context
    public PaginatedResults<PatientEntity> FindPatients(Guid hospitalId, string searchQuery, int pageNumber = 1, int pageSize = 10)
    {
        if (pageNumber < 1)
        {
            throw new ArgumentException($"pageNumber should be greater than or equal to 1. Was: {pageNumber}");
        }
        if (pageSize < 1)
        {
            throw new ArgumentException($"pageSize should be greater than or equal to 1. Was: {pageSize}");
        }

        var allResults = _context.Patients.Where(p =>
            p.PatientHospitals.Any(ph => ph.HospitalId == hospitalId) &&
            (
                (p.FirstName + p.LastName).Replace(" ", "").Contains(searchQuery, StringComparison.CurrentCultureIgnoreCase) ||
                p.Email.Replace(" ", "").Contains(searchQuery, StringComparison.CurrentCultureIgnoreCase)
            )
        )
        .OrderBy(p => p.FirstName)
        .ThenBy(p => p.LastName)
        .ThenBy(p => p.Email)
        .ThenBy(p => p.Id);

        var totalCount = allResults.Count();

        var pageOfResults = allResults
            .Skip(pageSize * (pageNumber - 1))
            .Take(pageSize);

        return new PaginatedResults<PatientEntity>(pageOfResults, pageNumber, pageSize, totalCount);
    }

    public PatientEntity? GetPatient(Guid id, bool loadVisits)
    {
        var patient = _context.Patients.Find(id);

        if (patient != null && loadVisits)
        {
            _context.Entry(patient).Collection(p => p.PatientHospitals).Load();
            foreach (PatientHospitalRelation phr in patient.PatientHospitals)
            {
                _context.Entry(phr).Reference(phr => phr.Visit).Load();
            }
        }

        return patient;
    }
}