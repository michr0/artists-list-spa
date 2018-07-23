import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SearchBox from './components/SearchBox/SearchBox';
import ArtistCard from './components/ArtistCard/ArtistCard';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: null,
            eventsList: null,
        };

        this.changeArtist = this.changeArtist.bind(this);
        this.changeEventsList = this.changeEventsList.bind(this);
    }

    changeArtist(artist) {
        this.setState({ artist });
    }

    changeEventsList(eventsList) {
        this.setState({ eventsList });
    }

    render() {
        const { artist } = this.state;
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <SearchBox changeArtist={this.changeArtist} />
                </Grid>
                <Grid item xs={12}>
                    <ArtistCard artist={artist} />
                </Grid>
            </Grid>
        );
    }
}

export default App;
