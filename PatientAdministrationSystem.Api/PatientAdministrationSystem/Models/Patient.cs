namespace Hci.Ah.Home.Api.Gateway.Models;

/// <summary>
/// The API model for a Patient.
/// </summary>
/// <param name="id">The Patient's ID</param>
/// <param name="firstName">The Patient's First Name</param>
/// <param name="lastName">The Patient's Last Name</param>
/// <param name="email">The Patient's Email</param>
public class Patient(Guid id, string firstName, string lastName, string email)
{
    public Guid Id { get; } = id;
    public string FirstName { get; } = firstName;
    public string LastName { get; } = lastName;
    public string Email { get; } = email;
}