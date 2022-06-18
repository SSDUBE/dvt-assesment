import React, { FunctionComponent } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface ISearchInput {
  handleSearch: (val: string) => void;
}

export const SearchInput: FunctionComponent<ISearchInput> = ({
  handleSearch,
}) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon style={{ color: '#fff' }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </Search>
  );
};
