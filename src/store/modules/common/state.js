import Cookie from '@/utils/tools/cookie';

export default {
    token: Cookie.get('t_rms') || '',
    username: ''
};