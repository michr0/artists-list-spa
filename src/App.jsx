import React, { Component } from 'react';
import localStorage from 'store/storages/localStorage';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import SearchBox from './components/SearchBox/SearchBox';
import ArtistCard from './components/ArtistCard/ArtistCard';
import EventsList from './components/EventsList/EventsList';

import { ARTIST_STORAGE_KEY, EVENTS_STORAGE_KEY } from './config';
import service from './service';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: JSON.parse(localStorage.read(ARTIST_STORAGE_KEY)),
            eventsList: JSON.parse(localStorage.read(EVENTS_STORAGE_KEY)),
        };

        this.onSuccessfulSearch = this.onSuccessfulSearch.bind(this);
    }

    onSuccessfulSearch(artist) {
        this.setState({ artist });
        localStorage.write(ARTIST_STORAGE_KEY, JSON.stringify(artist));

        if (artist.upcoming_event_count > 0) {
            service.requestHelper.getArtistEvents(artist.name)
                .then(
                    ({ data }) => {
                        if (data !== '') {
                            this.setState({ eventsList: data });
                            localStorage.write(EVENTS_STORAGE_KEY, JSON.stringify(data));
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
                        <Fade in>
                            <Grid item xs={12}>
                                <ArtistCard artist={artist} />
                            </Grid>
                        </Fade>
                    )
                }
                {
                    (eventsList !== null && eventsList.length > 0)
                    && (
                        <Fade in>
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
