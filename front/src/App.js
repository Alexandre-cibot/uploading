import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import ProcessingDialog from './components/processingDialog'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      file: null,
      isUploading: false
    }
    this.inputFile = React.createRef()
  }
  onFileSelected = (e) => {
    console.log(e.target.value);
    this.setState({ file: e.target.files[0] })
  };
  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.file) {
      this.setState({ isUploading: true })
      console.log('Submit the file', this.state.file)
    }
  }
  reset = () => {
    this.setState({
      file: null,
      isUploading: false
    });
    this.inputFile.current.value = ''
  }
  render() {
    const { isUploading, file } = this.state
    return (
      <div className="App">
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <input type="file" ref={this.inputFile} id="file" name="file" onChange={this.onFileSelected} />
          </Form.Field>
          <Form.Field>
            <Button type="submit" color='green' disabled={!file} >Upload file</Button>
          </Form.Field>
        </Form>
        <ProcessingDialog
          file={file}
          open={isUploading}
          onClose={this.reset}
        />
      </div>
    );
  }
}

export default App;
