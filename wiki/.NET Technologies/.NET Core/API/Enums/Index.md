#### Enum to string parameter validation
When using the `[FromQuery]` parameter attribute on a get endpoint, enum types will automatically be converted and bound from string to the enum type defined. If you have a default enum set to the value of 0, this will be the chosen value if no query parameter is passed. 

Instead, to have the model binder throw an error back to the caller, set your enums starting with 1, that way when an invalid enum is passed; the binder responds with an error.