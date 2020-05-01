## Overview
When adding styling to an existing site that might conflict with existing styling (class names similar or adding global element changes), namespacing will wrap the styling and allow you to confine the styling to a specific DOM section.

### Setup with Bootstrap (in a project managed with npm/yarn)
Create a `*.scss` file with the following contents

```
.bootstrap-ns {
    @import 'bootstrap';

    // Add overrides here
}
```

Import the *.scss file into your project