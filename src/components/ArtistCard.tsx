import React, { FunctionComponent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IAlbum, IArtist } from '../utils/Interfaces';

interface IArtitsCard {
  header: string;
  subHeader1: string | number;
  subHeader2: string | number;
  imageUrl: string;
  handlePress?: () => void;
}

export const ArtistCard: FunctionComponent<IArtitsCard> = ({
  header,
  subHeader1,
  subHeader2,
  imageUrl,
  handlePress,
}) => {
  return (
    <Card onClick={handlePress}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='270'
          image={imageUrl}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {header}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {subHeader1}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {subHeader2}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
