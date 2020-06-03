Many applications need static data that act as identifiers for other sets of data. When using EF, we can utilize enums as the context of the statuses and create lookup classes that derive from a base class used to auto-seed data from the enum for us when creating the database.

First, we need to setup the lookup base class that will contain the ID and value/name of the static data record, along with a generic method that can be used to seed the database with all values from code:

```
public abstract class LookupBase<TConcrete, TEnumLookup> where TConcrete : LookupBase<TConcrete, TEnumLookup>, new() where TEnumLookup : Enum
{
    public int Id { get; set; }

    public string Name { get; set; }

    public static IEnumerable<TConcrete> Seed()
    {
        foreach (var x in Enum.GetValues(typeof(TEnumLookup)))
        {
            yield return new TConcrete { Id = (int)x, Name = x.ToString() };
        }
    }
}
```

Next, we can create an enum along with a lookup class that will inherit from the LookupBase class:
**ENUMS NEED TO START WITH 1

```
public enum TicketScopeLookup
{
    Application = 1, 
    Database = 2
}

public class TicketScope : LookupBase<TicketScope, TicketScopeLookup>
{ }
```

In the EF DbContext class, add a DbSet property of the lookup class type:

```
public DbSet<TicketScope> TicketScopes {get; set;}
```

Lastly, add this to the OnModelCreating method in your DbContext derived class:

```
builder.Entity<TicketScope>().HasData(TicketScope.Seed());
```

##### Adding lookup relationship to another class
Add 2 properties to the class, one for the id and the other for the class reference:

```
public int TicketScopeId { get; set; } 
public TicketScope TicketScope { get; set; }
```

If the name of the property is something different then the class name, add a `[ForeignKey(string name)]` decorator on top of the id member