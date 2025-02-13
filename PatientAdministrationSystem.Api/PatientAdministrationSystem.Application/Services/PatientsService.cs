using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Pagination;

namespace PatientAdministrationSystem.Application.Services;

public class PatientsService : IPatientsService
{
    private readonly IPatientsRepository _repository;

    public PatientsService(IPatientsRepository repository)
    {
        _repository = repository;
    }

    // Define your patient search logic here based on the interface method definition
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

        return _repository.FindPatients(hospitalId, searchQuery, pageNumber, pageSize);
    }

    public PatientEntity? GetPatient(Guid id)
    {
        return _repository.GetPatient(id, true);
    }

}