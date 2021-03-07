import React from 'react'
import ConcertCard from "../discoverComponents/discoverCards/concertCard"
import {Grid} from '@material-ui/core'

function discoverConcerts() {
    const cardStyles = {
        marginBottom : "3%"
    }
    
    return (
        <div style = {{display: "flex", flexDirection: "column"}}> 
            <Grid style = {cardStyles}>
                <ConcertCard title = "Tame Impala" venue = "Qudos Bank Arena, NSW" date = "20 March, 2021" img = "https://www.beat.com.au/wp-content/uploads/2019/06/1901_Matt-Sav_Kevin-Parker_1-1-e1561004405218.jpg"/>
            </Grid>
            <Grid style = {cardStyles}>
                <ConcertCard title = "Ed Sheeran" venue = "ANZ Stadium, NSW" date = "20 March, 2017" img = "https://media.karousell.com/media/photos/products/2018/02/28/ed_sheerans_perth_divide_concert_ticket_2_1519831859_592436d7.jpg"/>
            </Grid>
        </div>
    )
}

export default discoverConcerts