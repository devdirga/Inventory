import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './saga';
import rootReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

// Redux: Store
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);

// Exports
export { store };
