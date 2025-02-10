<h1 align="center">ShortUrlService</h1>

Сервис для сокращения ссылок, взаимодействию с ними и подсчетом переходов.

![{458D3A21-FAD5-4E35-BFFE-5B04E7FF61E5}](https://github.com/user-attachments/assets/d0301c88-f133-4176-9acf-c8148e885cae) 
![{A273B5C2-DA0A-4236-8A6D-F6811B5B0E13}](https://github.com/user-attachments/assets/1747bb7d-901f-43ca-aed1-190961fc5e81)
![{A0272FC7-B049-48C1-84BD-6DF472B22015}](https://github.com/user-attachments/assets/5768a418-2844-4273-ab28-4cefac270dd3)

# Technical tools 
* ASP NET Core 8 
* MariaDB 10.3
* EF Core 8
* React app (typescript template)     

# Architecture
* Clean Architecture

# Features
*  Автоматические миграции
*  Первоначальное создание БД
*  Проверки на случаи некорректного ввода данных

# Prerequisites
* Install Visual Studio
    * During installation, ensure that the following are selected:
        * ASP.NET and web development.
        * Node.js development.
        * .NET desktop development.
* Install .NET 8 SDK
* Install Maria DB 10.3 https://mariadb.org/mariadb-10-3-10-now-available/
    * Create Database in MySQL Client(MariaDB 10.3) -> CREATE DATABASE ShortUrlDb;
    * Add DefaultConnection to appsettings.json in ShortUrlService.API
* Install IIS Server

# Running the solution
* ShortUrlSolution.sln -> ShortUrlService.API -> dotnet run - backend
* ShortUrlSolution.sln -> shorturlservice.frontend -> npm i -> npm start - frontend
