import axios from 'axios';

import { APP_ID, BASE_URL} from '../config';


function getArtistInformation(name = null) {
    return axios.get(`${BASE_URL}/artists/${name}?app_id=${APP_ID}`);
};

export default {
    getArtistInformation,
};
