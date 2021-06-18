import React, { Component } from 'react';
import axios from 'axios';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      moviesData: [],
      lat: '',
      lon: '',
      weatherData: [],
      displayData: false,
      displayMoviesData: false,
    }
  };
  updateCityNameState = (event) => {

    this.setState({
      cityName: event.target.value
    });

  }
  getCityData = async (event) => {
    event.preventDefault();
    await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MY_API}&city=${this.state.cityName}&format=json`).then(locationResponse => {
      console.log(locationResponse);
      this.setState({
        cityData: locationResponse.data[0],
        lat: locationResponse.data[0].lat,
        lon: locationResponse.data[0].lon,
      });

      console.log(this.state.cityData);
      axios.get(`${process.env.REACT_APP_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}`).then(weatherResponse => {
        this.setState({
          moviesData: weatherResponse.data,
          displayData: true
        })
      });
    });

  }


  getMoviesData =  (event) => {
    event.preventDefault();

     axios.get(`${process.env.REACT_APP_URL}/movies?key=${process.env.REACT_MOVIES_MY_API}&city=${this.state.cityName}`).then(moviesResponse => {
      this.setState({
        moviesData: moviesResponse.data,
        displayMoviesData: true
      });
    })
  }


  render() {
    return (
      <div>
        <h1>City Explorer</h1>
        <form onSubmit={this.getCityData}>
          <label>
            City Name:
          </label>
          <input onChange={this.updateCityNameState} type="text" />
          <br></br>
          <br></br>
          <input type="submit" value="Get City" />
        </form>

        {this.state.displayData &&
          <div>

            <p>
              {this.state.cityData.display_name}
            </p>

            <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.dbbabf7a550415333e7fb0e19d34c057&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt='' />

            {
              this.state.weatherData.map(weatherObj => {
                return (
                  <>
                    <p>
                      {weatherObj.description}
                    </p>
                    <p>
                      {weatherObj.date}
                    </p>
                  </>
                )
              })
            }

          </div>
        }
      </div>
    )
  }
}

export default App;