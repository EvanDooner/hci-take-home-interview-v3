namespace Hci.Ah.Home.Api.Gateway.Models;

public class PatientWithVisits(Guid id, string firstName, string lastName, string email, IEnumerable<Visit> visits) : Patient(id, firstName, lastName, email)
{
    public IEnumerable<Visit> Visits { get; } = visits;
}