import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cityName: '',
      displayImg: false,
      cityData: {},
      message: false,
      weatherData: '',
    }
  }
  updateCityState = (event) => {
    this.setState({
      cityName: event.target.value,

    });
  };

  getData = async (event) => {
    event.preventDefault();
    try {
      const axiosResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.dbbabf7a550415333e7fb0e19d34c057&city=${this.state.cityName}&format=json`);
      console.log(axiosResponse);

      const myApiRes = await axios.get(`${process.env.REACT_APP_URL}/weather-data`);

      this.setState({
        cityData: axiosResponse.data[0],
        displayImg: true,
        weatherData: myApiRes.data.data,

      });
    } catch {
      this.setState({
        displayImg: false,
        message: true,
      });

    };
  };
  render() {
    return (
      <div>
        <h1>City Explorer</h1>



        {/* <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City name</Form.Label>
            <Form.Control onChange={this.updateCityState} type="text" placeholder="Enter City Name" />
          </Form.Group>{{
          <Button onSubmit={this.getData}  type="submit" >
            submit
          </Button>
</Form >
     */}


        <form onSubmit={this.getData}>
          <label>
            cityName
          </label>
          <input onChange={this.updateCityState} type='text' />
          <input type="submit" />
        </form>
        <p>{this.state.cityData.display_name}</p>
        {this.state.displayImg &&

          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.dbbabf7a550415333e7fb0e19d34c057&center=${this.state.cityData.lat},${this.state.cityData.lon}`}
            alt={this.state.cityData.display_name}
          />
        }


        {this.state.errorMessage &&
          <p>Data Error</p>
        }

        {
          this.state.weatherData.map(value => {
            return (
              <p>
                {value.data.description}
              </p>
            )
          })
        }

      </div>
    )
  };

}

export default App;