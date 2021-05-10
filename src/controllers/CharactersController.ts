import { Request, Response } from 'express';
import axios from 'axios';

class CharactersController {
  async index (request: Request, response: Response) {
    const { page: reqPage = 1, limit: reqLimit = 5 } = request.query;

    const page = Number(reqPage);
    const limit = Number(reqLimit);

    const apiResponse = await axios
      .get(`https://rickandmortyapi.com/api/character`);

    const characters: any[] = apiResponse.data.results;

    const count  = characters.length;

    const pages = Math.ceil(count / limit);
  
    const charactersArray = characters.slice( limit * (page - 1) , limit * page);
    
    return response.json({ info: { count, pages }, results: charactersArray });
  }

  async show(request: Request, response: Response) {
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

      const character = apiResponse.data;

      return response.json(character);
    } catch(err) {
      return response.status(404).json({
        message: 'error',
        description: 'Character not found!',
      });
    }
  }
}

export { CharactersController };