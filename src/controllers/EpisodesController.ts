import { Request, Response } from 'express';
import axios from 'axios';

interface IResponse {
  episode: string[];
}

class EpisodesController {
  async indexByCharacter(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        message: 'error',
        description: 'Character id is required!',
      });
    }

    try {
      const apiResponse = await axios
      .get(`https://rickandmortyapi.com/api/character/${id}`);

      const character: IResponse = apiResponse.data;

      const episodesArray = character.episode.map(episode => episode.split('https://rickandmortyapi.com/api/episode/')[1]);

      const episodesList = episodesArray.toString();

      const { data } = await axios
      .get(`https://rickandmortyapi.com/api/episode/${episodesList}`);

      return response.json(data);
    } catch(err) {
      return response.status(404).json({
        message: 'error',
        description: 'Character not found!',
      });
    }
  }
}

export { EpisodesController }