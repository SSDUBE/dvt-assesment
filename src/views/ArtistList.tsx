import React from 'react';
import { Box, Theme, Grid, Typography } from '@mui/material';
import { SearchInput } from '../components/SearchInput';
import { makeStyles } from '@mui/styles';
import CircleIcon from '@mui/icons-material/Circle';
import { ArtistCard } from '../components/ArtistCard';
import { ArtistService } from '../services/ArtistService';
import { IAlbum, IArtist, IArtistMoreInfor } from '../utils/Interfaces';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { theme } from '../Theme';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  conatiner: {
    flex: 1,
  },
  searchContainer: {
    background: theme.palette.primary.main,
  },
  searchInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(100),
    },
  },
  circle: {
    color: theme.palette.common.white,
    fontSize: theme.spacing(5),
    marginRight: theme.spacing(1),
  },
  gridContainer: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(15),
  },
}));

interface IArtistAllDetails {
  data: [IAlbum, IArtist, IArtistMoreInfor];
  next: string;
  total: number;
}

const ArtistList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [artist, setArtist] = React.useState<IArtistAllDetails | null>(null);
  const [loading, setIsLoading] = React.useState(false);

  function handlePress(albumId: number, imageUri: string) {
    return navigate('/artist-more-information', {
      state: { albumId, imageUri },
    });
  }

  async function handleSearch(val: string) {
    try {
      setIsLoading(true);
      const service = new ArtistService();
      const res = await service.searchArtistByName(val);

      if (res.data) {
        setIsLoading(false);
        setArtist(res);
      }
    } catch (e) {
      alert('Oops!!! Failed to get artist');
      console.log('error ', e);
      setIsLoading(false);
    }
  }

  return (
    <Box className={classes.conatiner}>
      <Box className={classes.searchContainer}>
        <Box className={classes.searchInputWrapper}>
          <CircleIcon className={classes.circle} fontSize='large' />
          <SearchInput handleSearch={handleSearch} />
        </Box>
      </Box>

      {!loading ? (
        <Box className={classes.gridContainer}>
          <Grid container spacing={2}>
            {artist &&
              artist?.data.map((item, idx) => {
                return (
                  <Grid item xs={12} sm={4} md={4} lg={2} key={idx}>
                    <ArtistCard
                      // @ts-ignore
                      header={item.artist.name}
                      // @ts-ignore
                      imageUrl={item.artist.picture_xl}
                      // @ts-ignore
                      handlePress={() => handlePress(item.album.id, item.artist.picture_xl)}
                      // album={item.album}
                      subHeader1={`${artist.total}  Followers`}
                      subHeader2={`${artist?.data.length} Albums`}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      ) : (
        <Box className={classes.loaderContainer}>
          <ScaleLoader color={theme.palette.primary.main} loading={true} />
          <Typography variant='body2' color='text.secondary'>
            Searching artist
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ArtistList;
