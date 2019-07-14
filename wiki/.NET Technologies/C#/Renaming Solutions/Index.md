1. In Solution Explorer, right-click the project, select Rename, and enter a new name.

2. In Solution Explorer, right-click the project and select Properties. 

3. On the Application tab, change the "Assembly name" and "Default namespace".


4. In the main cs file (or any other code files), rename the namespace declaration to use the new name. For this right-click the namespace and select Refactor > Rename enter a new name. For example: namespace WindowsFormsApplication1


5. Change the AssemblyTitle and AssemblyProduct in Properties/AssemblyInfo.cs.

6. Delete bin and obj directories physically.

7. Rename the project physical folder directory.

8. Open the SLN file (within notepad or any editor) and change the path to the project.

9. Clean and Rebuild the project.