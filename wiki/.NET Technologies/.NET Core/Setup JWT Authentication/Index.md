If you want to setup an authentication schema to be able to prevent access to certain data, one of the most common ways to do it is with JWT Bearer tokens. 

## Setup 
Add the highlighted to your Startup.cs

```c#
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc()
        .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
        .AddJsonOptions(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
    services.AddCors();


    // Auth setup
    var key = Encoding.ASCII.GetBytes(Configuration.GetValue<string>("authSecret"));
    services.AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

    services.AddSpaStaticFiles(configuration =>
    {
        configuration.RootPath = "Client/operations-launch-tracker/build";
    });
}
```

```c#
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

    // global cors policy
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());

    app.UseAuthentication();
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
        spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment())
        {
            spa.UseReactDevelopmentServer(npmScript: "start");
        }
    });
}
```

## Usage
You will need to add a key "authSecret" with a value that will act as the authentication key to your config file (usually kept in a secrets config file, not checked into source control)

Add the attribute `[Authorize]` to the controller class you would like to activate authentication for. 

For methods that you would like to access without having to authenticate, use the attribute `[AllowAnonymous]`