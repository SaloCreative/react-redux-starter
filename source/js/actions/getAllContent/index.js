import { authToken } from '@lushdigital/api-token-middleware';
import { fetchContentList } from '../content';
import { fetchChannelList } from '../channels';
import { fetchCategoriesList } from '../categories';
import { fetchCreativeShowcaseCategories } from '../creativeShowcaseCategories';
import { fetchTags } from '../tags';
import { fetchHomepage } from '../homepage';
import { fetchBusinessUnitList } from '../businessUnits';

export function getAllContent(language = 'en', token = authToken && authToken.token) {
  return dispatch => {
    dispatch(fetchContentList(language, token));
    dispatch(fetchChannelList(language));
    dispatch(fetchCategoriesList(language));
    dispatch(fetchBusinessUnitList(language));
    dispatch(fetchHomepage(language));
    dispatch(fetchTags(language));
    dispatch(fetchCreativeShowcaseCategories(language));
  };
}