<p>At times you will need to add additional config files (i.e. such as when you need to store app secrets that are not checked into source control).</p>

<p>To do this, add the following configuration into `Program.cs`</p>

```c#
public class Program
{
    public static void Main(string[] args)
    {
        CreateWebHostBuilder(args).Build().Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration((hostingContext, config) =>
            {
                config.SetBasePath(Directory.GetCurrentDirectory());
                config.AddJsonFile("secrets.json", optional: true);
            })
            .UseStartup<Startup>();
}
```
