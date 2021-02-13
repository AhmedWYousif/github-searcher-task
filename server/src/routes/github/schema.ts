import Joi from 'joi';
import SearchArea from '../../shared/models/github/SearchAraea';

export default {
  searchBody: Joi.object().keys({
    searchArea: Joi.string().valid(SearchArea.USERS, SearchArea.REPOSITORIES).required(),
    searchText: Joi.string().required().min(3),
  }),
};
