## Preface
When adding NuGet references to your projects, the reference to the NuGet Package (and version) will usually be added to the `.csproj` as a `<PackageReference>` item. In addition, if you are using the old `.csproj` format, there will be a `packages.config` file that resides in the project that also points to the NuGet packages and versions.

If you have multiple projects in your solution; and ones that hold references to the same NuGet Package, it becomes difficult to maintain. If you needed to bump the version package, you would need to update the version in all projects that reference that package.

[MS Documentation](https://docs.microsoft.com/en-us/visualstudio/msbuild/customize-your-build?view=vs-2019)

### Search Scope
See [SearchScope](https://docs.microsoft.com/en-us/visualstudio/msbuild/customize-your-build?view=vs-2019#search-scope)

### Converting
To convert a project from holding version references in it's `.csproj` file (or `packages.config`), start by creating a `Directory.Build.target` file such as the one below

```
<Project>
    <ItemGroup>
        ...
    </ItemGroup>
</Project>
```

Open your `.csproj` or `packages.config` and look for NuGet package references such as the examples below

**New CsProj**
```
<PackageReference Include="CommonServiceLocator" Version="2.0.3" />
```

**package.config (usually used with old CsProj format)**
```
<packages>
  <package id="CommonServiceLocator" version="2.0.3" targetFramework="net461" />
</packages>
```

For each package reference on one of the file above, add an entry into `Directory.Build.targets` such as

```
...
    <ItemGroup>
        <PackageReference Update="CommonServiceLocator" Version="2.0.3" />
    </ItemGroup>
...
```

Then remove the reference to the version in the `.csproj` and/or `packages.config`

Once you are finished, delete the `.vs` folder (usually at the solution level) as this caches certain things which might cause build errors

Launch your solution/project and run a `Rebuild`

All packages should now be restored and you are ready to maintain versions in 1 location: `Directory.Build.targets`!
