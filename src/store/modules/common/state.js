import Storage from '@/utils/tools/localstorage';

export default {
    token: Storage.get('token') || '',
    username: ''
};