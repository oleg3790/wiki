In an action method in MVC, a model/viewmodel parameter can be specified in order to be able to work with the client data sent to the server without having to manually parse the data type. This magic of converting the data to a model type is called Model Binding; and when using JSON data, this can be achieved by the process below.

Usually when posting data using a JQuery AJAX call, the default HTTP method will be GET; this can be overridden by specifying the "type" variable in the AJAX call. It is important to setup the ajax call as follows when posting JSON to the server for Model Binding to work correctly:

```
$.ajax({
        url: "/" + controller + "/" + action,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",        
        success: function (result) {
            // Some action
        }
});
```

The post method can then be setup as follows:
```
public async Task<JsonResult> Create([FromBody] ViewModel viewModel )
{
    return Json();                  
}
```

Notice that an additional attribute has been added ([FromBody]), this will expect that the data will be in the body of the request which helps Model Binding determine where to get the data context from

The controller method param that is getting bound expects the data to contain the properties that the param type contains. 

### Example
```
// Object class
public class RequestDataObj
{
    public string Value { get; set; }
}

// Controller method
[HttpPost]
public JsonResult Post([FromBody] RequestDataObj data)
{
    return new JsonResult(new { result = $"Success {data.Value}" });
}
```

The post body will need to be formatted as such:
```
{value: "some value"}
```