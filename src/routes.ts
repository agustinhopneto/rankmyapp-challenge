import { Router } from 'express';

import { CharactersController } from './controllers/CharactersController';
import { EpisodesController } from './controllers/EpisodesController';

const routes = Router();

const charactersController = new CharactersController();
const episodesController = new EpisodesController();

routes.get('/characters', charactersController.index);
routes.get('/characters/:id', charactersController.show);
routes.get('/episodes/:id', episodesController.indexByCharacter);

export { routes };