import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Chip, CardActions, IconButton } from '@mui/material';
import { PlayCircleOutline, FavoriteBorder } from '@mui/icons-material';

const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    // Make sure seconds is two digits
    if (seconds < 10) {
        return `${minutes}:0${seconds}`;
    }

    // If no hours, don't show hours
    if (hours === 0) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
};

const SongCard = ({ track, index }) => {
  return (
    <Grid item xs={12} sm={6} md={3} key={index}>
      <Card sx={{ maxWidth: 345, backgroundColor: '#fafafa', borderRadius: '12px' }}>
        <CardMedia
          component="img"
          height="180"
          image={track.album.images[0].url}
          alt={track.name}
          sx={{ borderRadius: '12px 12px 0 0' }}
        />
        <CardContent>
          <Typography variant="subtitle1" noWrap>
            {track.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {track.artists.map(artist => artist.name).join(', ')}
          </Typography>
          <Chip
            label={formatTime(track.duration_ms)}
            size="small"
            sx={{ mr: 1, backgroundColor: '#e0e0e0' }}
          />
          <Chip
            label={track.album.release_date}
            size="small"
            sx={{ backgroundColor: '#e0e0e0' }}
          />
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="play" color="primary">
            <PlayCircleOutline />
          </IconButton>
          <IconButton aria-label="add to favorites">
            <FavoriteBorder />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default SongCard;
