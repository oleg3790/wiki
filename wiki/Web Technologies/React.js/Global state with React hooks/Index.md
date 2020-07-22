### Overview
Starting in React 16.8, you can use hooks; which allow you to setup global state without the need for additional dependencies such as Redux.

#### Setup
When setting up global state, I usually setup my project with a state folder with the following structure (example is for TypeScript project):

```
state/
    |--- Reducers.ts
    |--- Store.ts
    |--- Types.ts
```

In Types:
```
export interface IAppState {
  isBusy: boolean;
}

export enum ActionType {
  ToggleIsBusy = 'TOGGLE_IS_BUSY',
}

export interface IAction {
  type: ActionType,
  data?: any
}
```

In Reducers:
```
import { ActionType, IAppState, IAction } from "./Types";

const Reducer = (state: IAppState, action: IAction): IAppState => {
  switch (action.type) {
    case ActionType.ToggleIsBusy:
      return {
        ...state,
        isBusy: !state.isBusy
      };
    ...
    ...
    default:
      return state;
  }
}

export default Reducer;
```

In Store:
```
import * as React from 'react';
import Reducer from './Reducers';
import { IAppState, IAction } from './Types';

interface IContext {
  state: IAppState,
  dispatch: React.Dispatch<IAction>
}

const initialAppState: IAppState = {
  isBusy: false,
};

const Store = ({children}) => {
  const [state, dispatch] = React.useReducer(Reducer, initialAppState);

  return (
    <Context.Provider value={{state, dispatch}}>
      {children}
    </Context.Provider>
  );
}

export const Context = React.createContext({state: initialAppState, dispatch: null} as IContext);
export default Store;
```

Now we need to wrap our app with the store:

```
....In your index/App.tsx:

...
<Store>
  <App/>
</Store>
...
```

All done! Now we declare the context and can start using dispatch to change state:

```
const {state, dispatch} = React.useContext(Context);
...
const handleBusyToggle = () => dispatch({ type: ActionType.ToggleIsBusy })
```