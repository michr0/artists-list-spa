import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './style.scss';

class ArtistCard extends PureComponent {
    render() {
        const { artist } = this.props;
        return (
            <Card className="card">
                <CardMedia
                    className="card__cover"
                    image={artist.thumb_url}
                    title={artist.name}
                />
                <div>
                    <CardContent>
                        <Typography variant="headline" component="h2" align="left">
                            {artist.name}
                        </Typography>
                        <Typography component="p" align="left">
                            Upcomming event number:
                            <b>
                                {artist.upcoming_event_count}
                            </b>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            className="ticketButton"
                            variant="contained"
                            color="primary"
                            href={artist.facebook_page_url}
                        >
                            {`${artist.name} Facebook`}
                        </Button>
                    </CardActions>
                </div>
            </Card>
        );
    }
}

ArtistCard.propTypes = {
    artist: PropTypes.shape({
        facebook_page_url: PropTypes.string.isRequired,
        upcoming_event_count: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        thumb_url: PropTypes.string.isRequired,

    }).isRequired,
};

export default ArtistCard;
