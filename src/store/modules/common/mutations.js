import * as Type from './consts';
import Storage from '@/utils/tools/localstorage';

export default {
    [Type.CLEAN_TOKEN] (state) {
        state.token = '';
        Storage.del('token');
    },
    [Type.UPDATE_TOKEN] (state, token) {
        state.token = token;
        Storage.set('token', token);
    }
};