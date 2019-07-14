In Solution Explorer, right-click the project, select Rename, and enter a new name.
In Solution Explorer, right-click the project and select Properties. On the Application tab, change the "Assembly name" and "Default namespace".
In the main cs file (or any other code files), rename the namespace declaration to use the new name. For this right-click the namespace and select Refactor > Rename enter a new name. For example: namespace WindowsFormsApplication1
Change the AssemblyTitle and AssemblyProduct in Properties/AssemblyInfo.cs.
Delete bin and obj directories physically.
Rename the project physical folder directory.
Open the SLN file (within notepad or any editor) and change the path to the project.
Clean and Rebuild the project.