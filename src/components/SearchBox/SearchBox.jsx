import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { requestHelper } from '../../service';

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch= this.handleSearch.bind(this);
    }

    handleInputChange(e) {
        this.setState({ query: e.target.value });
    }

    handleSearch() {
        const { query } = this.state;
        const { changeArtist } = this.props;

        requestHelper.getArtistInformation(query)
            .then(
                ({ data }) => {
                    if (data !== '') {
                        changeArtist(data);
                    }
                },
            );
    };

    render() {
        const { query } = this.state;
        return (
            <div>
                <TextField
                    id="searchValue"
                    label="Artist"
                    margin="normal"
                    value={query}
                    onChange={this.handleInputChange}
                    fullWidth
                />
                <Button variant="contained" size="large" color="primary" onClick={this.handleSearch}>
                    Search
                </Button>
            </div>
        );
    }
}

SearchBox.propTypes = {
    changeArtist: PropTypes.func.isRequired,
};

export default SearchBox;
