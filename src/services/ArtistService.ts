import { Config } from '../utils/Config';
import { SecureService } from './SecureService';

export class ArtistService extends SecureService {
  public searchArtistByName = async (artistName: string) => {
    try {
      const response = await fetch(
        Config.services.artist.search.replace(':searchParam', artistName),
        {
          method: 'GET',
          headers: {
            ...this.defaultHeaders,
          },
        }
      );

      return response.json();
    } catch (err: any) {
      throw new Error(err);
    }
  };

  public searchAlbumById = async (albumId: string) => {
    try {
      const response = await fetch(
        Config.services.artist.searchAlbum.replace(':albumId', albumId),
        {
          method: 'GET',
          headers: {
            ...this.defaultHeaders,
          },
        }
      );

      return response.json();
    } catch (err: any) {
      throw new Error(err);
    }
  };
}
