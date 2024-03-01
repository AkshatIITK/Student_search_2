import { CssBaseline, ThemeProvider, createTheme, IconButton } from '@mui/material';
import React, { useState } from 'react';
import FilterData from './filter';
import SearchResult from './SearchResult';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './index.css'

const lightTheme = createTheme(); // Light theme

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [filterSearch, setFilterSearch] = useState({});
  const [darkMode, setDarkMode] = useState(false); // State to manage dark mode

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode); // Toggle dark mode
  };

  const theme = darkMode ? darkTheme : lightTheme; // Choose theme based on darkMode state

  const updateFilterSearch = (newFilterSearch) => {
    setFilterSearch(newFilterSearch);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }} className='main-text-heading'>Y23 Student Search</h1>
          {/* <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            component="a"
            href="https://github.com/AkshatIITK/student-search"
            target="_blank"
          >
            @Akshat23
          </Button> */}
          <IconButton onClick={toggleDarkMode} sx={{ zIndex: 999 }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </header>
        
        {/* <AlertComponent severity="info" message="Hall data is Not Updated so only Y23 data is correct! And Yeah Loading/Refreshing Data takes some time " duration={10000} /> */}
        <FilterData updateFilterSearch={updateFilterSearch} />
        <SearchResult filterSearch={filterSearch} />
      </ThemeProvider>
    </>
  );
}

export default App;
