import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import './style.scss';

class EventsList extends PureComponent {
    renderOffer(offer, eventId, index) {
        return offer.status === 'available' ? (
            <Button
                key={`${eventId}_${index}_offer`}
                variant="contained"
                color="primary"
                href={offer.url}
            >
                {offer.type}
            </Button>
        ) : null;
    }

    renderEvent(event) {
        return (
            <Grid item xs={12} key={event.id}>
                <Typography component="p" align="left">
                    Date:
                    <b>
                        {event.datetime}
                    </b>
                </Typography>
                <Typography component="p" align="left">
                    Place:
                    <b>
                        {`${event.venue.name}, ${event.venue.city}, ${event.venue.country}`}
                    </b>
                </Typography>
                {event.description !== ''
                && (
                    <Typography component="p" align="left">
                        Description:
                        <b>
                            {event.description}
                        </b>
                    </Typography>
                )}
                {event.offers.length > 0
                && (
                    <div className="ticketButton">
                        {event.offers.map(
                            (offer, index) => this.renderOffer(offer, event.id, index),
                        )}
                    </div>
                )}
                <Divider />
            </Grid>
        );
    }

    render() {
        const { eventsList } = this.props;
        return (
            <Card>
                <CardHeader title="25 Upcoming events" />
                <CardContent>
                    <Grid container spacing={24}>
                        {eventsList.map(event => this.renderEvent(event))}
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

EventsList.propTypes = {
    eventsList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            datetime: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            lineup: PropTypes.arrayOf(PropTypes.string).isRequired,
            offers: PropTypes.arrayOf(PropTypes.shape({
                status: PropTypes.string,
                type: PropTypes.string,
                url: PropTypes.string,
            })).isRequired,
            venue: PropTypes.shape({
                city: PropTypes.string,
                country: PropTypes.string,
                name: PropTypes.string,
            }).isRequired,
        }),
    ).isRequired,
};

export default EventsList;
