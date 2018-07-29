import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import SearchBox from './components/SearchBox/SearchBox';
import ArtistCard from './components/ArtistCard/ArtistCard';
import EventsList from './components/EventsList/EventsList';

import service from './service';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: null,
            eventsList: null,
        };

        this.onSuccessfulSearch = this.onSuccessfulSearch.bind(this);
    }

    onSuccessfulSearch(artist) {
        this.setState({ artist });

        if (artist.upcoming_event_count > 0) {
            service.requestHelper.getArtistEvents(artist.name)
                .then(
                    ({ data }) => {
                        if (data !== '') {
                            this.setState({ eventsList: data });
                        } else {
                            this.setState({ eventsList: null });
                        }
                    },
                );
        } else {
            this.setState({ eventsList: null });
        }
    }

    render() {
        const { artist, eventsList } = this.state;
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <SearchBox onSuccess={this.onSuccessfulSearch} />
                </Grid>
                {
                    artist !== null
                    && (
                        <Fade in={artist !== null}>
                            <Grid item xs={12}>
                                <ArtistCard artist={artist} />
                            </Grid>
                        </Fade>
                    )
                }
                {
                    eventsList !== null
                    && (
                        <Fade in={eventsList !== null}>
                            <Grid item xs={12}>
                                <EventsList eventsList={eventsList} />
                            </Grid>
                        </Fade>
                    )
                }
            </Grid>
        );
    }
}

export default App;
