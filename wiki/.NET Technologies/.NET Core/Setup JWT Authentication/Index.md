If you want to setup an authentication schema to be able to prevent access to certain data, one of the most common ways to do it is with JWT Bearer tokens. 

## Setup 
Add a static class with the highlighted to your project, and call `services.AddJwtAuthentication(Configuration)` from Startup.cs

```c#
public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
{
    var key = Encoding.ASCII.GetBytes(configuration.GetValue<string>("authSecret"));

    services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

    return services;
}
```

Add `app.UseAuthentication();` (like below) to the Config method in Startup.cs

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
You will need to add a key "authSecret" with a value that will act as the authentication key to your config file (usually kept in a secrets config file, not checked into source control - [setup found here](http://wiki.olegkrysko.com/#/additional-config-files))

Add the attribute `[Authorize]` to the controller class you would like to activate authentication for. 

For methods that you would like to access without having to authenticate, use the attribute `[AllowAnonymous]`