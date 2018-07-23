import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArtistCard extends Component {
    render() {
        return (
            <div>
                {this.props.artist !== null && <span>{this.props.artist.name}</span>}
            </div>
        );
    }
}

ArtistCard.propTypes = {
    artist: PropTypes.shape({
        facebook_page_url: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        thumb_url: PropTypes.string.isRequired,

    }).isRequired,
};

export default ArtistCard;
