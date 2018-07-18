import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SearchBox from './components/SearchBox/SearchBox';

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
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <SearchBox changeArtist={this.changeArtist} />
                </Grid>
            </Grid>
        );
    }
}

export default App;
