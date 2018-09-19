import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class ImageUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  render() {
    return (
      <div>
        <TextField
          label="Image URL"
          id="image-url"
          onChange={this.handleChange}
          type="file"
        />
        <img src={this.state.file} />
      </div>
    )
  }
}

export default ImageUploader
