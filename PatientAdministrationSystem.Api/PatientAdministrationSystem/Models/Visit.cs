namespace Hci.Ah.Home.Api.Gateway.Models;

/// <summary>
/// The API model for a Visit.
/// </summary>
/// <param name="id">The ID of the Visit</param>
/// <param name="date">The date on which the Visit takes place</param>
/// <param name="patientId">The ID of the Patient associated with the Visit</param>
/// <param name="hospitalId">The ID of the Hospital associated with the Visit.</param>
public class Visit(Guid id, DateTime date, Guid patientId, Guid hospitalId)
{
    public Guid Id { get; } = id;
    public DateTime Date { get; } = date;
    public Guid PatientId { get; } = patientId;
    public Guid HospitalId { get; } = hospitalId;
}