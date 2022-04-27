import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { Button } from '@mui/material';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';



class EditDev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.userDev?.name,
      bio: this.props.userDev?.bio,
      github: this.props.userDev?.github,
      linkedIn: this.props.userDev?.linkedIn,
      imageURL: this.props.userDev?.imageURL,
    };
  }
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleBioChange = (e) => this.setState({ bio: e.target.value });
  handleGithubChange = (e) => this.setState({ github: e.target.value });
  handlelinkedInChange = (e) => this.setState({ linkedIn: e.target.value });
  handleimageUrlChange = (e) => this.setState({ imageUrl: e.target.file });
  handleUpdateUser = async () => {
    const id = this.props.userDev._id;
    const newProfileData = {
      name: this.state.name,
      bio: this.state.bio,
      github: this.state.github,
      linkedIn: this.state.linkedIn,
      imageURL: this.state.imageURL,
    };

    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: 'put',
        baseURL: `${process.env.REACT_APP_HEROKU_URL}/dev/${id}`,
        data: newProfileData,
      };
      const rest = await axios(config);
      this.setState({ userDev: rest.data[0] });
    }
  };
  render() {
    return (
      <>
        <Modal className="mintingNftModal" show={this.props.modalDev}>
          <Form
            className="nftForm"
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
          >
            <Form.Label>Name:</Form.Label>
            <Form.Control
              name="name"
              onChange={this.handleNameChange}
              id="input"
              type="text"
              value={this.state.name}
              className="name"
            />
            <Form.Label>Bio:</Form.Label>
            <Form.Control
              id="input"
              onChange={this.handleBioChange}
              type="text"
              as="textarea"
              value={this.state.bio}
              name="Bio"
            />
            <Form.Label>linkedIn:</Form.Label>
            <Form.Control
              id="input"
              onChange={this.handlelinkedInChange}
              type="text"
              value={this.state.linkedIn}
              name="linkedIn"
            />
            <Form.Label>Github:</Form.Label>
            <Form.Control
              onChange={this.handleGithubChange}
              id="input"
              type="text"
              value={this.state.github}
              name="github"
            />
            <Form.Label>
              <BsFillCloudUploadFill />
              &nbsp; Upload Image:
            </Form.Label>
            <Form.Control
              id="input"
              onChange={this.handleimageUrlChange}
              type="file"
              name="image"
            />
            <Button
              style={{ marginTop: '10px' }}
              id="editDevClose"
              variant="contained"
              type="submit"
              onClick={() => {
                this.handleUpdateUser();
                this.props.hideModal();
              }}
            >
              Update Information
            </Button> 
          </Form>
        </Modal>
      </>
    );
  }
}
export default withAuth0(EditDev);
