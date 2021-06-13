import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cityName: '',
      displayImg: false,
      cityData: {}
    }
  }
  updateCityState = (event) => {
    this.setState({
      cityName: event.target.value,

    });
  };

  getData = async (event) => {
    event.preventDefault();
    const axiosResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.dbbabf7a550415333e7fb0e19d34c057&city=${this.state.cityName}&format=json`);
    console.log(axiosResponse);

    this.setState({
      cityData: axiosResponse.data[0],
      displayImg: true,

    })
    
  };
 
  render() {
    return (
      <div>
        <h1>City Explorer</h1>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City name</Form.Label>
            <Form.Control onChange={this.updateCityState} type="text" placeholder="Enter City Name" />
          </Form.Group>
          <input onSubmit={this.getData} variant="primary" type="submit" />
      
        
        </Form>

        {this.state.displayData &&
          <div>
            <p>
              {this.state.cityData.display_name}
            </p>

            <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.dbbabf7a550415333e7fb0e19d34c057&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt='mapImg' />


          </div>
        }
      </div>



    )
  };
};


export default App;