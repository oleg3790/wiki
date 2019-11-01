### Overview
Log4Net is a .NET logging provider that was developed by Apache. 

Full documentation can be found here: https://logging.apache.org/log4net/

### Configuration
1. Install the `log4net` NuGet package
2. Add a `log4net.config` file with the below contents to the project root (this will dump the log file to the APPDATA environment variable path - feel free to change the location where logs are stored)
```
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <log4net>
    <root>
      <level value="ALL" />
      <appender-ref ref="console" />
      <appender-ref ref="file" />
    </root>
    <appender name="file" type="log4net.Appender.RollingFileAppender">
      <file type="log4net.Util.PatternString" value="%env{APPDATA}\App\logs\app.log"/>
      <appendToFile value="true" />
      <rollingStyle value="Size" />
      <maxSizeRollBackups value="5" />
      <maximumFileSize value="10MB" />
      <staticLogFileName value="true" />
      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %level %logger - %message%newline" />
      </layout>
    </appender>
  </log4net>
</configuration>
```

3. If your project is a .NET Core app, add the below config to `Program.cs` as the first code to execute
```
var logRepo = LogManager.GetRepository(Assembly.GetEntryAssembly());
XmlConfigurator.Configure(logRepo, new FileInfo("log4net.config"));
```

4. Start logging by adding the following member to a class and calling the log methods like so:
```
private static readonly ILog _log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
...
...
_log.Error("Error Message");
```