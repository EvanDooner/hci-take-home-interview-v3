using Hci.Ah.Home.Api.Gateway.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using PatientAdministrationSystem.Application.Repositories.Pagination;
using Xunit;

namespace PatientAdministrationSystem.Tests;

public class PatientsTests 
    : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public PatientsTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Theory]
    [InlineData("/api/patients")]
    [InlineData("/api/patients?searchQuery=j")]
    [InlineData("/api/patients?searchQuery=John Sweeney")]
    [InlineData("/api/patients?searchQuery=JohnSwEEney")]
    [InlineData("/api/patients?searchQuery=sweeney@hci")]
    public async Task Get_ValidSearchsReturnExpectedData(string url)
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync(url);

        var body = response.Content;

        var data = await body.ReadFromJsonAsync<PaginatedResults<Patient>>();

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.Equal("application/json; charset=utf-8", 
            response.Content.Headers.ContentType.ToString());

        Assert.Single(data.Results);
        Assert.Equal(1, data.PageNumber);
        Assert.Equal(10, data.PageSize);
        Assert.Equal(1, data.TotalCount);
    }

    [Theory]
    [InlineData("/api/patients?searchQuery=v")]
    [InlineData("/api/patients?searchQuery=Vinny")]
    [InlineData("/api/patients?searchQuery=Evan")]
    public async Task Get_InvalidSearchsReturnEmptyResults(string url)
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync(url);

        var body = response.Content;

        var data = await body.ReadFromJsonAsync<PaginatedResults<Patient>>();

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.Equal("application/json; charset=utf-8", 
            response.Content.Headers.ContentType.ToString());

        Assert.Empty(data.Results);
        Assert.Equal(1, data.PageNumber);
        Assert.Equal(10, data.PageSize);
        Assert.Equal(0, data.TotalCount);
    }
}