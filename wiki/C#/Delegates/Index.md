Delegates are reference types to methods. They are an excellent way to implement callbacks. 

## Example with Parameter
 
```
public class ExampleOne 
{
    private object _exampleOneObj;

    public ExampleOne()
    {
        var example = new ExampleTwo(CallbackMethod);
    }

    private void CallbackMethod(object obj)
    {
        _exampleOneObj = obj;
    }
}

public class ExampleTwo
{
    public delegate void XCallback(object obj);
    public event XCallback CallbackEvent;
    private object _context;

    public ExampleTwo(XCallback callback)
    {
        CallbackEvent = callback;
    }

    public void Run()
    {
        CallbackEvent(_context);
    }
}
```

In the above example, ExampleOne's constructor instantiates an object of ExampleTwo, passing in the method reference for its own CallbackMethod method. When the Run method executes in ExampleTwo, the callback will be made to the CallbackMethod in ExampleOne, passing in the object _context to the scope of CallbackMethod. 