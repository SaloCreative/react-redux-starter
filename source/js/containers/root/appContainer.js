import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// CORE APP
import App from '../../routes/app';

// ACTION CREATORS

// STATE MAP
function mapStateToProps(state) {
  return {
  };
}

// ACTION MAP
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign(
      {},
      null
    ), dispatch);
}

// CONNECT
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;