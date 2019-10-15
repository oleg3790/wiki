We can setup Electron to work with ASP.NET Core using the ElectronNET.API nuget package

### Setup
1. Start a new ASP.NET Core web application, select one of the SPA templates (Angular, React, MVC)
2. Add ElectronNET.API package via nuget
3. Open `Program.cs` and add `.UseElectron()` to activate Electron:
```
public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
    WebHost.CreateDefaultBuilder(args)
        .UseElectron(args)
        .UseStartup<Startup>();
```
4. Open `Startup.cs` and add the below to `Configure` to launch an Electron window:
```
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
    }

    app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.UseSpaStaticFiles();

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller}/{action=Index}/{id?}");
    });

    app.UseSpa(spa =>
    {
        spa.Options.SourcePath = "Client";
    });

    Task.Run(async () => await Electron.WindowManager.CreateWindowAsync());
}
```
5. Open the project root in `cmd` and run `dotnet tool install ElectronNET.CLI -g`
6. In `cmd` run `electronize init`
7. In `cmd` run `electronize start` (this will launch your NET Core app inside of an Electron window)