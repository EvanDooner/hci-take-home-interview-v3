using Hci.Ah.Home.Api.Gateway.Models;
using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Pagination;

namespace Hci.Ah.Home.Api.Gateway.Controllers.Patients;

[Route("api/patients")]
[ApiExplorerSettings(GroupName = "Patients")]
[ApiController]
public class PatientsController : ControllerBase
{
    private readonly IPatientsService _patientsService;

    public PatientsController(IPatientsService patientsService)
    {
        _patientsService = patientsService;
    }

    // Define your API contracts here
    [HttpGet]
    public ActionResult<PaginatedResults<Patient>> FindPatients([FromQuery] string searchQuery = "", [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        if (pageNumber < 1)
        {
            return BadRequest($"pageNumber should be greater than or equal to 1. Was: {pageNumber}");
        }
        if (pageSize < 1)
        {
            return BadRequest($"pageSize should be greater than or equal to 1. Was: {pageSize}");
        }
        
        var results = _patientsService.FindPatients(new Guid("ff0c022e-1aff-4ad8-2231-08db0378ac98"), searchQuery, pageNumber, pageSize);

        return new PaginatedResults<Patient>(results.Results.Select(ToPatient), results.PageNumber, results.PageSize, results.TotalCount);
    }

    [HttpGet("{id}")]
    public ActionResult<PatientWithVisits> GetPatient(Guid id)
    {
        var result = _patientsService.GetPatient(id);
        if  (result == null)
        {
            return NotFound();
        }

        return ToPatientWithVisits(result);
    }

    private static Patient ToPatient(PatientEntity patientEntity)
    {
        return new Patient(patientEntity.Id, patientEntity.FirstName, patientEntity.LastName, patientEntity.Email);
    }

    private static PatientWithVisits ToPatientWithVisits(PatientEntity patientEntity)
    {
        var visits = (patientEntity.PatientHospitals ?? []).Select(ToVisit);

        return new PatientWithVisits(patientEntity.Id, patientEntity.FirstName, patientEntity.LastName, patientEntity.Email, visits);
    }

    private static Visit ToVisit(PatientHospitalRelation patientHospitalRelation)
    {
        return new Visit(
            patientHospitalRelation.VisitId,
            patientHospitalRelation.Visit.Date,
            patientHospitalRelation.PatientId,
            patientHospitalRelation.HospitalId
        );
    }
}