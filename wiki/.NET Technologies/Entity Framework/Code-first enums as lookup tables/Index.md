Many applications need static data that act as identifiers for other sets of data. When using EF, we can utilize enums as the context of the statuses and create lookup classes that derive from a base class used to auto-seed data from the enum for us when creating the database.

First, we need to setup the lookup base class that will contain the ID and value/name of the static data record, along with a generic method that can be used to seed the database with all values from code:

```
public class LookupBase
{
    [Key]
    public int Id { get; set; }

    [MinLength(2), MaxLength(100)]
    public string Name { get; set; }

    protected static T[] Seed<T, TEnum>() where T : LookupBase, new()
    {
        List<T> data = new List<T>();
        foreach (var x in Enum.GetValues(typeof(TEnum)))
        {
            data.Add(new T() { Id = (int)x, Name = x.ToString() });
        }
        return data.ToArray();
    }
}
```

Next, we can create out enum along with a lookup class that will derive from the base class and add a method that calls the base seed method while declaring the types:
**ENUMS NEED TO START WITH 1

```
public enum TicketScopesLookup
{
    Application = 1, 
    Database = 2
}

public class TicketScopes : LookupBase
{
    public static TicketScopes[] Seed() => Seed<TicketScopes, TicketScopesLookup>();
}
```

Add a DbSet Property of the lookup type:

```
public DbSet<TicketScopes> TicketScopes {get; set;}
```

Lastly, add this to the OnModelCreating method in your DbContext derived class:

```
builder.Entity<TicketScopes>().HasData(TicketScopes.Seed());
```

##### Adding lookup relationship to another class
Add 2 properties to the class, one for the id and the other for the class reference:

```
public int TicketScopeId { get; set; } 
public TicketScopes TicketScope { get; set; }
```

If the name of the property is something different then the class name, add a `[ForeignKey(string name)]` decorator on top of the id member