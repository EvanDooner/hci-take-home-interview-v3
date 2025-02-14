# Health Care Informed Engineering - Take home assessment

<p align="center">
  <img src="patient-search-image.png">
</p>

The Brief:

“A Health Care Informed customer needs to be able to_ **_find patient visit information_** _at one of their hospitals. Create a simple web application using React, Typescript, C# that allows a customer to_ **_search_** _patient/hospital visit information and display results. The application should have a very simple styled UX, some simple API’s and leverages the data store and sample data provided”._

## Deployment Instructions

### Pre-requisites

* Docker installed locally

### Steps

1. Clone this repo to your local machine
2. In the terminal, navigate to the repo root directory (where this README lives)
3. Run `docker build -t com_evanjdooner_hci .` to build the docker image
4. Run `docker run -d -p 8080:80 com_evanjdooner_hci com_evanjdooner_hci_run` to start the server
5. In your browser, navigate to http://localhost:8080 to access the app

## Testing

### Frontend Testing

#### Pre-requisites

* node 20+ installed locally

#### Steps

1. Clone this repo to your local machine
2. In the terminal, navigate to the repo root directory (where this README lives)
3. Navigate to `./PatientAdministrationSystem.App`
4. Run `npm run test`

### Backend Integration Testing

#### Pre-requisites

* .NET SDK 8.0+ installed locally

#### Steps

1. Clone this repo to your local machine
2. In the terminal, navigate to the repo root directory (where this README lives)
3. Navigate to `./PatientAdministrationSystem.Api/PatientAdministrationSystem.Tests`
4. Run `dotnet test`