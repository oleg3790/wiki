## Setup
Install i18next and react-i18next

```
yarn add i18next react-i18next
```

Create a resources file that will house your translation map (example below):

```
export const localeResourceMap = {
  en: {
    translation: {
      "header": "Confirm your email and mobile phone number"
    }
  },
  fr: {
    translation: {
      "header": "Confirmez votre e-mail et votre numéro de téléphone mobile"
    }
  }
};
```

Add a `i18n.ts` (or `.js`) file with the following contents

```
import i18n from 'i18next';
import { localeResourceMap } from './LocaleResourceMap';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: localeResourceMap,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

Import the i18n file in your app/index:

```
import './i18n'
```

## Use via Translation component
Add a `Translation` component that can get the `t` (translate function) and `i18n` (used to change the language) instance to your component

```
import React from 'react';
import { Translation } from 'react-i18next';

export function MyComponent() {
  return (
    <Translation>
      {
        (t, { i18n }) => <p>{t('my translated text')}</p>
      }
    </Translation>
  )
}
```

To change language call:

```
i18n.changeLanguage('fr');
```

### Use via HOC (Higher order component)
import the function `withTranslation`:

```
import { withTranslation } from 'react-i18next';
```

Wrap it around your component:

```
export default withTranslation()(YourComponent);
```

Both `t` and `i18n` will be passed from by props, so now this can be used by accessing it via props:

```
this.props.t('key')

...
this.props.i18n.changeLanguage('fr')
```