import React, { useState, useEffect, memo } from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { Container } from './styles';

function SearchInput({ onSearch, placeholder, loading }) {
  const [text, setText] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        onSearch(text);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [loading, onSearch, text]);

  return (
    <Container>
      <FaSearch size={20} />
      <input disabled={loading} onChange={e => setText(e.target.value)} type="text" placeholder={placeholder} />
    </Container>
  );
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default memo(SearchInput);
