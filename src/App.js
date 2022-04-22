import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append('name', event.target.name.value);
    bodyFormData.append('image', event.target.image.files[0]);
    this.uploadImg(bodyFormData);
  }

  uploadImg = async (img) => {
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      baseURL: `http://localhost:3002/`,
      method: "post",
      data: img
    }
    const res = await axios(config, img);
    console.log(res.data);

  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input type="text" name="name" placeholder='name of file' />
          <input type="file" name="image" placeholder='Upload image here' />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
