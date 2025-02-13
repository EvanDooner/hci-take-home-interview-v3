FROM node:20.15.1 AS npm_build

WORKDIR /app

COPY PatientAdministrationSystem.App .

RUN npm install
RUN npm run build


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet_build

WORKDIR /app

COPY PatientAdministrationSystem.Api .

RUN mkdir /app/wwwroot
COPY --from=npm_build /app/dist /app/wwwroot

RUN dotnet restore
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=dotnet_build /app/out .

RUN mkdir /app/wwwroot
COPY --from=npm_build /app/dist /app/wwwroot
# Expose port 80 for the application
EXPOSE 80
# Set the application to listen on IPv4 only
ENV ASPNETCORE_URLS=http://0.0.0.0:80
# Run the application
ENTRYPOINT ["dotnet", "PatientAdministrationSystem.API.dll"]