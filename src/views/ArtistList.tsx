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
  content: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
}));

interface IArtistDetails {
  album: IAlbum;
  artist: IArtist;
}
interface IArtistAllDetails {
  data: IArtistDetails[];
  next: string;
  total: number;
}

const ArtistList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [artist, setArtist] = React.useState<IArtistAllDetails | null>(null);
  const [loading, setIsLoading] = React.useState(false);
  const [art, setArt] = React.useState<any>(null);

  function handlePress(albumId: number, imageUri: string) {
    return navigate('/artist-more-information', {
      state: { albumId, imageUri },
    });
  }

  async function handleSearch(val: string) {
    try {
      setIsLoading(true);
      const service = new ArtistService();
      const promise: any = [];
      const res = await service.searchArtistByName(val);

      res.data.forEach((art: IArtist) => {
        promise.push(service.findArtist(art.id.toString()));
      });

      const artRes = await Promise.all(promise);
      if (res.data) {
        setIsLoading(false);
        setArtist(res);
        setArt(artRes);
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

      {!loading && !artist && (
        <Typography variant='h4' className={classes.content}>
          No artist found!!!
        </Typography>
      )}
      {!loading ? (
        <Box className={classes.gridContainer}>
          <Grid container spacing={2}>
            {artist &&
              artist?.data.map((item, idx) => {
                return (
                  <Grid item xs={12} sm={4} md={4} lg={2} key={idx}>
                    <ArtistCard
                      header={item.artist.name}
                      imageUrl={item.artist.picture_xl}
                      handlePress={() =>
                        handlePress(item.album.id, item.artist.picture_xl)
                      }
                      subHeader1={`${art[idx].nb_fan || 'N/A'}  Followers`}
                      subHeader2={`${art[idx].nb_album || 'N/A'} Albums`}
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
