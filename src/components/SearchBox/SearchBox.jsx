import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { requestHelper } from '../../service';

import './style.css';

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            error: false,
            loading: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInputChange(e) {
        this.setState({ query: e.target.value });
    }

    handleSearch() {
        const { query } = this.state;
        const { changeArtist } = this.props;

        this.setState({
            loading: true,
            error: false,
        });

        requestHelper.getArtistInformation(query)
            .then(
                ({ data }) => {
                    if (data !== '') {
                        changeArtist(data);
                    } else {
                        this.setState({ error: true });
                    }
                },
                (() => {
                    this.setState({ error: true });
                }),
            )
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        const { query, error, loading } = this.state;
        return (
            <div className="searchBox">
                <FormControl error={error} fullWidth margin="normal">
                    <InputLabel htmlFor="searchValue">
                        Artist
                    </InputLabel>
                    <Input id="searchValue" value={query} onChange={this.handleInputChange} />
                    {
                        error
                        && (
                            <FormHelperText id="searchValueHelperText">
                                Could not find anything...Please try again
                            </FormHelperText>
                        )
                    }
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSearch}
                    disabled={loading}
                    size="large"
                >
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
