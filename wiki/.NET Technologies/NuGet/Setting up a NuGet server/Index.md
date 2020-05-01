### Setup
 
Start a new empty web app project in Visual Studio
1. Go to Nuget Package Manager and download Nuget.server
2. Go into Web.Config and remove the duplicate `<compilation debug="true" targetFramework="4.6" />` element if one exists

Build and run the project to make sure it works
1. In the Web.config file, set the API key (used for package pushes: I usually use a hashed password, that way you can rehash the password when pushing a new package)
2. Go to Azure and then to the dashboard and add a new web app 
3. Go back to the nuget server project and publish to the Azure web app

#### Relevant Documentation
 
https://nicolaiarocci.com/how-to-build-and-deploy-a-private-nuget-server-on-iis-or-azure/