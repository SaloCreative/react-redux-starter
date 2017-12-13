import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// CORE APP
import App from '../../routes/app';

// ACTION CREATORS
import * as testActions from '../../actions/test';
import * as usersActions from '../../actions/users';
import * as alertActions from '../../actions/alerts';

// STATE MAP
function mapStateToProps(state) {
  return {
    test: state.test,
    users: state.users,
    systemAlerts: state.systemAlerts
  };
}

// ACTION MAP
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(
      {},
      testActions,
      usersActions,
      alertActions
    ), dispatch);
}

// CONNECT
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;