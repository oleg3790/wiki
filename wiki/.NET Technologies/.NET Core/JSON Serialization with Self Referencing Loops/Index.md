If you have an object thats being serialized that has a two way relathionship with a nested object, it will throw a network timeout error when trying to return that object in a request. To prevent this in .NET, add the following option to the configuration:

```
services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
```