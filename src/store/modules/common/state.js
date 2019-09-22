import Cookie from '@/utils/tools/cookie';
import localStorage from '@/utils/tools/localstorage';

export default {
    token: Cookie.get('t_rms') || '',
    username: localStorage.get('username')|| '',
    nodeId: localStorage.get('nodeId') || '',
    nodeName: '',
    projectName: ''
};