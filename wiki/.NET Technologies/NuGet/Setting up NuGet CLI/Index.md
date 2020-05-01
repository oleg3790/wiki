NuGet CLI will allow you to do various operations on your NuGet packages including things such as: pushing packages to your server, updating packages on the server, deleting packages, etc.

### Setup Process
1. Navigate to https://www.nuget.org/downloads and download the latest version of the nuget.exe file
2. Place the file in a directory on your machine (a NuGet folder under the root windows drive works)
3. Add an environment variable (full directory name where you placed the nuget.exe file)
4. Open command prompt and try to run the command "nuget", if all of the steps were successfully done, the system will return the NuGet version along with various usage information. If done incorrectly, the system will show that the command is not recognized