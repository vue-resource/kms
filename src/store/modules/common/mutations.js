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
    [Type.CLEAR_PROJECT] (state) {
        state.nodeId = '';
        state.nodeName = '';
        state.projectName = '';
        localStorage.del('nodeId')
        localStorage.del('projectName')
    },
    [Type.UPDATE_PROJECTNAME] (state, name) {
        state.projectName = name;
        localStorage.set('projectName',name)
    },
    [Type.UPDATE_NODEID] (state, node) {
        const {nodeId, nodeName} = node;
        state.nodeId = nodeId;
        state.nodeName = nodeName;
        localStorage.set('nodeId',nodeId)
    }
};