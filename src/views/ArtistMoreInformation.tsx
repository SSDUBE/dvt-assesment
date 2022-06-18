import React, { FunctionComponent } from 'react';
import { Box, Theme, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArtistService } from '../services/ArtistService';
import { ArtistCard } from '../components/ArtistCard';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { theme } from '../Theme';

const useStyles = makeStyles((theme: Theme) => ({
  conatiner: {
    flex: 1,
  },
  headerContainer: {
    background: theme.palette.primary.main,
  },
  headerContainerWrapper: {
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
    cursor: 'pointer',
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
  fans: {
    padding: theme.spacing(3),
  },
}));

const ArtistMoreInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const [artistAlbum, setArtistAlbum] = React.useState<any>(null);
  const [loading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        const service = new ArtistService();
        // @ts-ignore
        const res = await service.searchAlbumById(location.state.albumId);
        setIsLoading(false);
        setArtistAlbum(res);
      } catch (err) {
        console.log('Oops!!! Something went wrong');
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Box className={classes.conatiner}>
      <Box className={classes.headerContainer}>
        <Box className={classes.headerContainerWrapper}>
          <ArrowBackIcon
            className={classes.circle}
            fontSize='large'
            onClick={() => navigate('/artist-list')}
          />
        </Box>
      </Box>

      {artistAlbum && (
        <Typography
          variant='h4'
          className={classes.fans}
        >{`Total Fans: ${artistAlbum.fans}`}</Typography>
      )}

      {loading ? (
        <Box className={classes.loaderContainer}>
          <ScaleLoader color={theme.palette.primary.main} loading={true} />
          <Typography variant='body2' color='text.secondary'>
            Loading...
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant='h4' className={classes.fans}>
            Top 5 Albums
          </Typography>
          <Box className={classes.gridContainer}>
            <Grid container spacing={2}>
              {artistAlbum &&
                [...Array(5)].map((_, idx: any) => {
                  const item = artistAlbum.tracks.data[idx];

                  if (!item) {
                    return;
                  }

                  const minutes = (Math.round((item.duration / 60) * 100) / 100)
                    .toString()
                    .split('.');

                  return (
                    <Grid item xs={12} sm={4} md={4} lg={2} key={idx}>
                      <ArtistCard
                        header={item.artist.name}
                        imageUrl={artistAlbum.cover_xl}
                        subHeader1={`title: ${item.album.title}`}
                        subHeader2={`duration: 0${minutes[0]}:${minutes[1]}`}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ArtistMoreInformation;
