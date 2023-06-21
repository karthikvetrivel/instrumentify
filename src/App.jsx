import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cors from 'cors';

import SongCard from './SongCard'
import { Container, InputGroup, FormControl } from 'react-bootstrap';
import { Box, Grid, Button, CardActions } from '@mui/material';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import 'bootstrap/dist/css/bootstrap.min.css' 

const CLIENT_ID = "3e669a8ace9f465a9031cbb2c4e66633"
const CLIENT_SECRET = "03db473a05cb4cca83a37f2c07dc5fa8"

function App() {
  const [ searchInput, setSearchInput ] = useState(''); 
  const [ accessToken, setAccessToken ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);

  useEffect(() => {
    var authParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
      .then(response => response.json())
      .then(data => {
        setAccessToken(data.access_token)
      })
    }, [])

  useEffect(() => {
    search(); // Trigger search when searchInput changes
  }, [searchInput]);

  

  // Search
  async function search() {
    console.log("Search for " + searchInput) // Taylor Swift 

    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
          params: {
              q: searchInput,
              type: 'track',
              limit: 8
          },
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      });

      const uniqueSongs = [];
      const songNames = new Set();

      for (let item of response.data.tracks.items) {
          if (!songNames.has(item.name)) {
              songNames.add(item.name);
              uniqueSongs.push(item);
          }
      }
      setSearchResults(uniqueSongs);
    } catch (error) {
        console.error(error);
    }

  }

  return (
    <div>
      <Box mt={4} display="flex" justifyContent="center"> {/* Add margin at the top */}
          <Container>
                  <Grid item xs={12} sm={6}>
                      <TextField
                          fullWidth
                          label="Search For Artist"
                          variant="outlined"
                          InputProps={{
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <SearchIcon />
                                  </InputAdornment>
                              )
                          }}
                          onKeyUp={(event) => {
                              if (event.key === 'Enter') {
                                  search();
                              }
                          }}
                          onChange={(e) => {
                              setSearchInput(e.target.value);
                          }}
                      />
                  </Grid>  
          </Container>
      </Box>

      <Box sx={{ p: 3, width: '70%', margin: 'auto'}}>
        <Grid container spacing={3}>
          {searchResults.map((track, index) => (
            <SongCard id={track.id} track={track} index={index} />
          ))}
        </Grid>
      </Box>

      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: '#4caf50', color: 'white', borderRadius: '8px', padding: '15px', margin: 'auto' }}
        >
          Extract Band Instrumentals
        </Button>
      </CardActions>

    </div>
  )
}

export default App
