import React from 'react';
import DiscoverBar from "./components/discoverBar"
import Grid from "@material-ui/core/Grid"

function App() {
  return (
    <div>
      <h1 style = {{backgroundColor : 'orange',color : 'grey' ,textAlign: 'center', padding: "10px"}}> Placeholder Nav Bar </h1>
      <Grid container justify = "space-between" alignItems = "stretch">        
        <DiscoverBar/>
      </Grid>

    </div>

  );
}

export default App;
