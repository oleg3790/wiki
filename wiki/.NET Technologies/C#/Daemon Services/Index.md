You can configure a daemon service in .NET by using the HostBuilder from assembly Microsoft.Extensions.Hosting. 

A simple configuration of the HostBuilder would look like:

```
using var host = new HostBuilder()
    .ConfigureServices((context, services) =>
    {
        services.AddHostedService<MyService>;
    })
    .RunAsService(true)
    .Build();

await host.RunAsync();
```

MyService is the class that would implement IHostedService, where it would contain 2 primary functions:

```
Task StartAsync(CancellationToken cancellationToken);
Task StopAsync(CancellationToken cancellationToken);
```

The `StartAsync` method would be the one where you would add you work