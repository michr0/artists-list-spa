import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        display: 'flex',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        height: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
};

class ArtistCard extends PureComponent {
    render() {
        const { artist, classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={artist.thumb_url}
                    title={artist.name}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
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
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArtistCard);
