import React, { Component  } from 'react';
import { render } from 'react-dom';
import { Gallery } from './Gallery';
import global from './global'
import { request } from './request/request'

const doAuth = async (token: string) => {
  const response = await request.request(global._BASE_URL + 'auth', 'post', token, { "apiKey": token });
  return response.token;
}

interface MainState {
  token : string
}

class App extends Component<{}, MainState>  {

  constructor(props: any) {
    super(props);
    this.state = {
     token: null
    };
  }

  async componentDidMount(){
    try {
      const token = await doAuth(global._API_KEY_);
      this.setState({ token: token });
    }
    catch(e) {
      console.log(e.message);
    }
  }

  render() {
    return (
        <div>
          { this.state.token && <Gallery token={this.state.token}/> }
        </div>
    );
  }
}

render(<App />, document.getElementById('root'));
