import { connect } from 'react-redux';

// CORE APP
import App from '../../routes/app';

// STATE MAP
function mapStateToProps(state) {
  return {
    systemAlerts: state.systemAlerts // make sure alerts are available throughout project
  };
}

// CONNECT
const AppContainer = connect(mapStateToProps, null)(App);

export default AppContainer;