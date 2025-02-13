using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Pagination;

namespace PatientAdministrationSystem.Application.Services;

public class VisitsService : IVisitsService
{
    private readonly IVisitsRepository _repository;

    public VisitsService(IVisitsRepository repository)
    {
        _repository = repository;
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

        return _repository.FindVisits(hospitalId, searchQuery, startDateInc, endDateInc, pageNumber, pageSize);
    }
}