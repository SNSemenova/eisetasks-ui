import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import translation from '../localization/translation';


const newStore = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

syncTranslationWithStore(newStore)
newStore.dispatch(loadTranslations(translation));
newStore.dispatch(setLocale('en'));

export default newStore;