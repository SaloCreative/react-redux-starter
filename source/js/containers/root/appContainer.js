import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// CORE APP
import App from '../../routes/app';

// ACTION CREATORS
import * as testActions from '../../actions/test';

// STATE MAP
function mapStateToProps(state) {
  return {
    test: state.test
  };
}

// ACTION MAP
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(
      {},
      testActions
    ), dispatch);
}

// CONNECT
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;