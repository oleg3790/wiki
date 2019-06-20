To enable non-restricted Cross-Origin Resource Sharing (CORS) for your .NET Core WebAPI project, add the highlighted line below to your startup config:

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
		app.UseHsts();
	}
	app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials());
	app.UseHttpsRedirection();
	app.UseMvc();
}
```

<b>Caution<b/> - This will allow requests from ANY origin to connect to the API. Specific hosts can also be added using the WithOrigins() method