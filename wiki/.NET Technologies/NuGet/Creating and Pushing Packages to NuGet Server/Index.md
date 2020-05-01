To be able to push your projects as packages to your NuGet server, you will need to follow the below steps

1. Open your project in Visual Studio, go to project properties and select the Application tab
2. Make sure the Assembly name is not blank, then click Assembly Information
3. Fill out the information on the Assembly Information screen as this will be the data displayed when NuGet references the packages
4. Set the Build Configuration to Release and build your project (This should generate a dll in the bin/Release folder of your project)
5. Open Command Prompt and navigate to your project folder
6. Run `nuget spec {yourProject.csproj}` (This will generate a .nuspec file in your project folder, open it up with a text editor and make sure the xml nodes point to tokens, remove the unused nodes)
7. Run `nuget pack {yourProject.csproj} -Prop Configuration=Release` (This will create a NuGet package file that will be pushed to the server)
8. Run `nuget push {package file} {apikey} -Source {nuget server URL}` 

Your package is now available on your NuGet server

### Adding Packages from your NuGet server to projects
1. In Visual Studio, go to Tools > NuGet Package Manager > Manage NuGet Packages for Solution
2. Select the gear icon to the right of Package Sources
3. Select the + button and add the Name of your source and the URL of your NuGet server, hit ok
4. Go into the NuGet Package Manager > Browse, and search for your package

**To prevent external access to your NuGet server, you will have to setup web app configuration on the server to authenticate users**