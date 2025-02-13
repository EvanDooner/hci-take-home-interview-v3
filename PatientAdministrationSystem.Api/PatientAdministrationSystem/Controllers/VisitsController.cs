using Hci.Ah.Home.Api.Gateway.Models;
using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Pagination;

namespace Hci.Ah.Home.Api.Gateway.Controllers.Patients;

[Route("api/visits")]
[ApiExplorerSettings(GroupName = "Visits")]
[ApiController]
public class VisitsController : ControllerBase
{
    private readonly IVisitsService _visitsService;

    public VisitsController(IVisitsService visitsService)
    {
        _visitsService = visitsService;
    }

    // Define your API contracts here
    [HttpGet]
    public ActionResult<PaginatedResults<RichVisit>> FindVisits(
        [FromQuery] DateTime startDateInc,
        [FromQuery] DateTime endDateInc,
        [FromQuery] string searchQuery = "",
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        if (pageNumber < 1)
        {
            return BadRequest($"pageNumber should be greater than or equal to 1. Was: {pageNumber}");
        }
        if (pageSize < 1)
        {
            return BadRequest($"pageSize should be greater than or equal to 1. Was: {pageSize}");
        }
        if (startDateInc.CompareTo(endDateInc) >= 0)
        {
            return BadRequest($"endDateInc should be greater than startDateInc. startDateInc: {startDateInc}, endDateInc: {endDateInc}");
        }
        
        var results = _visitsService.FindVisits(new Guid("ff0c022e-1aff-4ad8-2231-08db0378ac98"), searchQuery, startDateInc, endDateInc, pageNumber, pageSize);

        return new PaginatedResults<RichVisit>(results.Results.Select(ToRichVisit), results.PageNumber, results.PageSize, results.TotalCount);
    }

    private RichVisit ToRichVisit(VisitEntity visitEntity)
    {
        var relationship = visitEntity.PatientHospitals.First();

        return new RichVisit(visitEntity.Id, visitEntity.Date, relationship.PatientId, relationship.HospitalId, ToPatient(relationship.Patient));
    }

    private Patient ToPatient(PatientEntity patientEntity)
    {
        return new Patient(patientEntity.Id, patientEntity.FirstName, patientEntity.LastName, patientEntity.Email);
    }
}