import React, { Component } from 'react'
import ConcertCard from "../concertCard"
import {Grid} from '@material-ui/core'
import ReactDOM from 'react-dom'
import ReactHtmlParser from 'react-html-parser'
import {Switch, Route} from 'react-router-dom'
import Button from '@material-ui/core/Button';


export default class discoverConcerts extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount ()  {

      const cal_script = document.createElement("script");
      cal_script.src = "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/calendar/1.0.0/lib/main-widget.js";
      cal_script.async = true;
      document.body.appendChild(cal_script);

      const map_script = document.createElement("script");
      map_script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBlkztq0fu-pfoJtMRr1vutS0z_aDII4JM&libraries=visualization,places";
      map_script.async = true;
      document.body.appendChild(map_script);
      const map_script_2 = document.createElement("script");
      map_script_2.src = "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/map/1.0.0/lib/main-widget.js";
      map_script_2.async = true;
      document.body.appendChild(map_script_2);
  };

  render(){
    return(
      <div style = {{display: "flex", flexDirection: "row"}}>
      <div w-type="calendar" w-tmapikey="uk3m69XykICJuVSwH70L8kyG7DFHZV2x"
      w-googleapikey="YOUR_GOOGLE_API_KEY" w-keyword="" w-theme="calendar"
      w-colorscheme="light" w-width="600" w-height="600" w-size="25"
      w-border="1" w-borderradius="4" w-postalcode="" w-radius="25"
      w-countrycode="AU" w-city="" w-period="week" w-periodweek="week"
      w-layout="vertical" w-classificationid="" w-attractionid=""
      w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid=""
      w-proportion="standart" w-latlong="" w-postalcodeapi="2000">
      </div>


      <div w-type="map" w-tmapikey="uk3m69XykICJuVSwH70L8kyG7DFHZV2x"
      w-googleapikey="AIzaSyBlkztq0fu-pfoJtMRr1vutS0z_aDII4JM"
      w-keyword="" w-theme="simple" w-colorscheme="light" w-width="600"
      w-height="600" w-size="25" w-border="1" w-borderradius="4"
      w-postalcode="" w-radius="25" w-countrycode="AU" w-city=""
      w-period="week" w-layout="vertical" w-attractionid=""
      w-promoterid="" w-venueid="" w-affiliateid="" w-segmentid=""
      w-proportion="custom" w-geoposition="off" w-source=""
      w-latlong="">
      </div>


      </div>

    );
  }
}
