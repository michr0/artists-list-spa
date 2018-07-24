import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { requestHelper } from '../../service';

const styles = {
    searchBox: {
        textAlign: 'center',
    },
};

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
        const { onSuccess } = this.props;

        this.setState({
            loading: true,
            error: false,
        });

        requestHelper.getArtistInformation(query)
            .then(
                ({ data }) => {
                    if (data !== '') {
                        onSuccess(data);
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
        const { classes } = this.props;
        return (
            <div className={classes.searchBox}>
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
    onSuccess: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBox);
