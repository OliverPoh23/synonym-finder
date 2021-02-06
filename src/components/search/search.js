import React from 'react';
import PropTypes from 'prop-types';
import Field from './field';
import { useStyles } from '../../styles/layout.styles';

const Search = ({
  searchText,
  onSearchTextChange,
  loading,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.input}>
      <Field
        loading={loading}
        query={searchText}
        label="Search a Term"
        placeHolder="Search"
        helperText="any word..."
        onChange={(value) => onSearchTextChange(value)}
      />
    </div>
  );
};

Search.propTypes = {
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Search;
