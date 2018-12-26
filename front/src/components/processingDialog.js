import React from 'react';
import { Header, Message, Modal, Progress, Icon, Button } from 'semantic-ui-react';
import axios from 'axios'

class ProcessingDialog extends React.Component {

  _source = undefined;

  constructor(props) {
    super(props)
    this.state = {
      percent: 0,
      errorMessage: ''
    }
    console.log(this.source)
  }

  uploadFile = () => {
    let data = new FormData()
    this._source = axios.CancelToken.source();
    data.append('file', this.props.file)

    const config = {
      cancelToken: this._source.token,
      onUploadProgress: (progressEvent) => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (this.props.open) {
          this.setState({ percent: percentCompleted })
        }
      }
    };

    axios.post('http://localhost:4000/upload', data, config)
      .catch(err => {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message)
        } else if (this.props.open) {
          this.setState({ errorMessage: err.message })
        }
      })
  }

  clear = () => {
    if (this.state.percent < 100) {
      this._source.cancel('Operation canceled by the user.');
    }
    this.setState({
      errorMessage: null,
      percent: 0
    }, this.props.onClose)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.uploadFile()
    }
  }

  render() {
    const { className, open } = this.props;
    const { percent, errorMessage } = this.state
    return (
      <Modal open={open} className={className}>
        <Modal.Header>
          <Header as="h3">
            Uploading 1 file ...
          </Header>
        </Modal.Header>
        <Modal.Content>
          <Information state={this.state} />
          {percent < 100 && !errorMessage &&
            <Progress percent={percent} indicating progress />
          }
        </Modal.Content>
        <Modal.Actions style={{ 'textAlign': 'left' }}>
          <Button negative
            content='Cancel'
            onClick={this.clear}
            icon='close'
            labelPosition='left'
          />
        </Modal.Actions>
      </Modal>

    );

  }
}


const Information = ({ state }) => {
  const { percent, errorMessage } = state
  console.log('state', state)
  if (errorMessage) {
    return (
      <Message color="red">
        <Message.Header>
          <Icon name="attention" />
          {errorMessage}
        </Message.Header>
        <p>Something went wrong during the transfer process.</p>

      </Message>
    )
  } else if (percent < 100) {
    return (
      <Message color="orange">
        <Icon name="attention" />Keep this page open during the transfer process.
    </Message>
    )
  } else {
    return (
      <Message color="green">
        <Icon name="check" />Tranfer done.
      </Message>
    )
  }
}


export default ProcessingDialog;