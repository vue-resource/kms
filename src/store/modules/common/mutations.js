import * as Type from './consts';
import Cookie from '@/utils/tools/cookie';
import localStorage from '@/utils/tools/localstorage';


export default {
    [Type.CLEAN_TOKEN] (state) {
        state.token = '';
        Cookie.del('t_rms');
    },
    [Type.UPDATE_TOKEN] (state, token) {
        state.token = token;
        Cookie.set('t_rms', token);
    },
    [Type.UPDATE_USERNAME] (state, username) {
        state.username = username;
        localStorage.set('username',username)
    },
    [Type.UPDATE_NODEID] (state, nodeId) {
        state.nodeId = nodeId;
    }
};