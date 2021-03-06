import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getActionCreators from '../../actions/get_request.js';
import * as syncActionCreators from '../../actions/sync.js';
import Map from '../visitor_components/map_view/map';
import SidebarContainer from '../visitor_components/map_view_sidebar/sidebar_container';
import Header from '../partials/header';
import Footer from '../partials/footer';
import SignUpForm from '../auth/signup';
import SignInForm from '../auth/signin';
import Tutorial from '../tutorial_modal/tutorial';
import FollowUpModal from '../auth/signup_followup';

class MapDisplay extends React.Component {

  componentDidMount() {
    this.props.getActionCreators.getSelectedUsers();
    this.props.getActionCreators.getLocationsAndDescriptions();
  }

  render() {

    return (
      <div>
        <Header />
        {this.props.signUpModalOpen ? <SignUpForm /> : <SignInForm />}
        {this.props.tutorialModalOpen ? <Tutorial /> : null}
        <Map />
        <SidebarContainer locals={true} oneLocal={false}/>
        <Footer openTutorial={() => {this.props.syncActionCreators.tutorialModal()}}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signUpModalOpen: state.signUpModalOpen,
    signInModalOpen: state.signInModalOpen, 
    tutorialModalOpen: state.tutorialModalOpen,
    followUpModalOpen: state.followUpModalOpen
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getActionCreators: bindActionCreators(getActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay);
