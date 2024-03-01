import * as React from 'react';
import { useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { InputLabel, MenuItem, FormControl, Select, TextField } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: 250,
}));

function FilterData({ updateFilterSearch }) {
  const [filterSearch, setFilterSearch] = useState({});

  const handleInputChange = (event, property) => {
    const { value } = event.target;
    setFilterSearch((prevFilterSearch) => {
      const updatedFilterSearch = {
        ...prevFilterSearch,
        [property]: value,
      };
      updateFilterSearch(updatedFilterSearch); 
      return updatedFilterSearch;
    });
  };
  
  const handleSelectChange = (event, property) => {
    const { value } = event.target;
    setFilterSearch((prevFilterSearch) => {
      const updatedFilterSearch = {
        ...prevFilterSearch,
        [property]: value,
      };
      updateFilterSearch(updatedFilterSearch); // Call updateFilterSearch with the latest state
      return updatedFilterSearch;
    });
  };

  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        
        <Item sx={{ mr: 7 ,mb:3, }}>
          <FormControl fullWidth>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              id="department-select"
              value={filterSearch.d || ''}
              label="Branch"
              onChange={(e) => handleSelectChange(e, 'd')}
            >
              <MenuItem value="Materials Science and Engineering">Materials Science and Engineering</MenuItem>
              <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
              <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
            </Select>
          </FormControl>
        </Item>
        <Item sx={{ mr: 7 ,mb:3, }}>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender-select"
              value={filterSearch.g || ''}
              label="Gender"
              onChange={(e) => handleSelectChange(e, 'g')}
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </Select>
          </FormControl>
        </Item>


        <Item sx={{ mr: 7 ,mb:3, }}>
          <FormControl fullWidth>
            <InputLabel id="hall-label">HALL</InputLabel>
            <Select
              labelId="hall-label"
              id="hall-select"
              value={filterSearch.h || ''}
              label="Program"
              onChange={(e) => handleSelectChange(e, 'h')}
            >
              <MenuItem value="HALL13">HALL13</MenuItem>
              <MenuItem value="HALL12">HALL12</MenuItem>
              <MenuItem value="HALL3">HALL3</MenuItem>
              <MenuItem value="HALL5">HALL5</MenuItem>
              <MenuItem value="HALL4">HALL4</MenuItem>

            </Select>
          </FormControl>
        </Item>
        

        <Item sx={{ mr: 7 ,mb:3, }}>
          <FormControl fullWidth>
            <InputLabel id="program-label">Program</InputLabel>
            <Select
              labelId="program-label"
              id="program-select"
              value={filterSearch.p || ''}
              label="Program"
              onChange={(e) => handleSelectChange(e, 'p')}
            >
              <MenuItem value="BTech">BTech</MenuItem>
              <MenuItem value="BS">BS</MenuItem>
            </Select>
          </FormControl>
        </Item>
        <Item sx={{ mr: 7 ,mb:3, }}>
          <FormControl fullWidth>
            <InputLabel id="blood-group-label">Blood Group</InputLabel>
            <Select
              labelId="blood-group-label"
              id="blood-group-select"
              value={filterSearch.b || ''}
              label="Blood Group"
              onChange={(e) => handleSelectChange(e, 'b')}
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </Select>
          </FormControl>
        </Item>
        <Item sx={{ mr: 7,mb:3, width:500 }}>
          <TextField sx={{width: .95}}
            id="Name-basic"
            label="Name/RollNo/UserName"
            variant="filled"
            onChange={(e) => handleInputChange(e, 'n')}
          />
        </Item>

      </Box>
    </Box>
  );
}

export default FilterData;
