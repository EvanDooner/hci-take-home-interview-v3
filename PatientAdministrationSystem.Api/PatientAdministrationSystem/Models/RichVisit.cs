namespace Hci.Ah.Home.Api.Gateway.Models;

public class RichVisit(Guid id, DateTime date, Guid patientId, Guid hospitalId, string patientFirstName, string patientLastName) : Visit(id, date, patientId, hospitalId)
{
    public string PatientFirstName { get; } = patientFirstName;
    public string PatientLastName { get; } = patientLastName;
}