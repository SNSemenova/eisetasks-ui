import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';

import appCompReducerInbox from '../pages/inboxTasks/reducer';
import appCompReducerPostponed from '../pages/postponedTasks/reducer';
import appCompReducerDone from '../pages/doneTasks/reducer';
import checkTaskReducer from '../components/task/reducer';
import criteriaReducer from '../components/criteria/filter/reducer';
import todoReducer from  '../pages/toDo/reducer';
import appCompReducerTodoPageQuandrant from  '../components/bottomButton/reducer';
import markingReducer from '../components/criteria/reducer';
import tokenReducer from '../pages/signIn/reducer';
import openModalReducer from  '../components/modalWindow/onlyTextModal/reducer';
import confirmationOfRegistration from '../pages/confirm/reducer';
import modalWindowReducer from '../components/modalWindow/action/reducer';

const appReducer = combineReducers({
  i18n: i18nReducer,
  appCompReducerInbox,
  appCompReducerPostponed,
  appCompReducerDone,
  checkTaskReducer,
  criteriaReducer,
  todoReducer,
  markingReducer,
  appCompReducerTodoPageQuandrant,
  tokenReducer,
  openModalReducer,
  confirmationOfRegistration,
  modalWindowReducer
});

export default (state = {}, action) => {
  return appReducer(state, action);
}