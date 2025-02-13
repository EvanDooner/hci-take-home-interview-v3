namespace Hci.Ah.Home.Api.Gateway.Models;

public class RichVisit(Guid id, DateTime date, Guid patientId, Guid hospitalId, Patient patient) : Visit(id, date, patientId, hospitalId)
{
    public Patient Patient { get; } = patient;
}