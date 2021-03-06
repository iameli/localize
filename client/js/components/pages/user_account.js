import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actionCreators from '../../actions/sync.js';
import * as getActionCreators from '../../actions/get_request.js';
import UpdateUserDetails from '../user_account_components/modals/update_user_details';
import UpdateProfilePicture from '../user_account_components/modals/update_profile_picture';
import UserDetailsTable from '../user_account_components/user_details_table';
import UserMaps from '../user_account_components/user_maps';
import Header from '../partials/header';
import Footer from '../partials/footer';
import Tutorial from '../tutorial_modal/tutorial';

export class UserAccountPage extends React.Component {

  componentDidMount() {
    this.props.dispatch(getActionCreators.getSelectedUsers());
    this.props.dispatch(getActionCreators.getLocationsAndDescriptions());
  }

  render () {
    let { currentUser, updateUserDetailsModalOpen, updateProfilePictureModalOpen, tutorialModalOpen, relevantUsers } = this.props;
    if (relevantUsers) {
      return (
     <div>
          <Header />
          {tutorialModalOpen ? <Tutorial /> : null}
          {updateUserDetailsModalOpen ? <UpdateUserDetails /> : null}
          {updateProfilePictureModalOpen ? <UpdateProfilePicture /> : null}
          <div className="user-central-info">
            <UserDetailsTable
              updateProfilePicture={() => {this.props.dispatch(actionCreators.updateProfilePictureModal())}}
              image={currentUser.image}
              name={currentUser.first_name + " " + currentUser.last_name}
              username ={currentUser.username}
              email={currentUser.email}
              bio={currentUser.bio}
              openUpdateUserDetailsModal={() => {this.props.dispatch(actionCreators.updateUserDetailsModal())}} />
          </div>
          <Footer />
        </div>
      )
    } else {
      return ( <div></div> )
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  relevantUsers: state.relevantUsers,
  updateUserDetailsModalOpen: state.updateUserDetailsModalOpen,
  updateProfilePictureModalOpen: state.updateProfilePictureModalOpen,
  tutorialModalOpen: state.tutorialModalOpen,
  relevantUsers: state.relevantUsers
})

export default connect(mapStateToProps)(UserAccountPage);


    //<UserMaps id={currentUser.id} relevantUsers={relevantUsers} />


