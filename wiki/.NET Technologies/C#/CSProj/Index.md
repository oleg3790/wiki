The CSProj file contains references to projects, assemblies, and store project specific elements such as the .NET version, project version, etc. 

The CSProj format prior to VS 2017 contained much more information, however the new format is leaner and easier to read. The below provides a basic template format that can be used to convert an old CSProj file to the new format.

### .NET Framework Class Libraries 

```
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net461</TargetFramework>
    <version>1.0.0.0</version>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <PackageRequireLicenseAcceptance>false</PackageRequireLicenseAcceptance>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|AnyCPU'">
    <OutputPath>..\..\..\build\Debug\</OutputPath>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|AnyCPU'">
    <OutputPath>..\..\..\build\Release\</OutputPath>
  </PropertyGroup>
  <ItemGroup>
    <Reference Include="Microsoft.CSharp" />
  </ItemGroup>
</Project>
```

### WPF Library

```
<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <LanguageTargets>$(MSBuildExtensionsPath)\$(VisualStudioVersion)\Bin\Microsoft.CSharp.targets</LanguageTargets>
    <TargetFramework>net461</TargetFramework>
  </PropertyGroup>
   <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|AnyCPU'">
    <OutputPath>..\..\..\build\Debug\</OutputPath>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|AnyCPU'">
    <OutputPath>..\..\..\build\Release\</OutputPath>
  </PropertyGroup>
  <ItemGroup>
    <EmbeddedResource Update="Properties\Resources.resx" Generator="ResXFileCodeGenerator" LastGenOutput="Resources.Designer.cs" />
    <Compile Update="Properties\Resources.Designer.cs" DesignTime="True" AutoGen="True" DependentUpon="Resources.resx" />
    <Compile Update="Properties\Settings.Designer.cs">
      <DesignTime>True</DesignTime>
      <AutoGen>True</AutoGen>
      <DependentUpon>Settings.settings</DependentUpon>
    </Compile>
    <Page Include="**\*.xaml" SubType="Designer" Generator="MSBuild:Compile" />
    <Compile Update="**\*.xaml.cs" SubType="Designer" DependentUpon="%(Filename)" />
    <Resource Include="assets\*.*" />
  </ItemGroup>
  <ItemGroup>
    <Reference Include="PresentationCore" />
    <Reference Include="PresentationFramework" />
    <Reference Include="PresentationFramework.Aero" />
    <Reference Include="System.Windows.Forms" />
    <Reference Include="System.Xaml" />
    <Reference Include="WindowsBase" />
  </ItemGroup>
  <ItemGroup>
    <None Update="Properties\Settings.settings">
      <Generator>SettingsSingleFileGenerator</Generator>
      <LastGenOutput>Settings.Designer.cs</LastGenOutput>
    </None>
  </ItemGroup>
</Project>
```

### WPF App

```
<?xml version="1.0" encoding="utf-8"?>
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>winexe</OutputType>
    <TargetFramework>net461</TargetFramework>
    <ApplicationIcon />
    <OutputTypeEx>winexe</OutputTypeEx>
    <StartupObject />
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|AnyCPU'">
    <OutputPath>..\..\..\build\Debug\</OutputPath>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|AnyCPU'">
    <OutputPath>..\..\..\build\Release\</OutputPath>
  </PropertyGroup>
  <ItemGroup>
    <EmbeddedResource Update="Resources\*.resx" Generator="ResXFileCodeGenerator" LastGenOutput="*.Designer.cs" />
    <Compile Update="Resources\*.Designer.cs" DesignTime="True" AutoGen="True" DependentUpon="*.resx" />
    <Page Include="**\*.xaml" SubType="Designer" Generator="MSBuild:Compile" Exclude="App.xaml" />
    <Compile Update="**\*.xaml.cs" SubType="Designer" DependentUpon="%(Filename)" />
    <ApplicationDefinition Include="App.xaml">
      <Generator>MsBuild:Compile</Generator>
      <SubType>Designer</SubType>
    </ApplicationDefinition>
  </ItemGroup>
  <ItemGroup>
    <Reference Include="PresentationCore" />
    <Reference Include="PresentationFramework" />
    <Reference Include="System.Data.DataSetExtensions" />
    <Reference Include="System.Net.Http" />
    <Reference Include="System.Web.Extensions" />
    <Reference Include="System.Xaml" />
    <Reference Include="WindowsBase" />
  </ItemGroup>
  <Import Project="$(MSBuildSDKExtrasTargets)" Condition="Exists('$(MSBuildSDKExtrasTargets)')" />
</Project>
```