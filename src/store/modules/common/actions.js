/**
 * 1、通过dispatch触发action
 * 2、action通过commit来触发mutation
 * 3、action可用于处理异步；mutation只能处理处理同步
 * 4、action 结合 dispatch以及 async或者promise等来处理异步回调
 */
import * as Type from './consts';

export default {
    [Type.CLEAN_TOKEN] ({commit}) {
        commit(Type.CLEAN_TOKEN);
    },
    [Type.UPDATE_TOKEN] ({commit}, token) {
        commit(Type.UPDATE_TOKEN, token);
    },
    [Type.UPDATE_USERNAME] ({commit}, username) {
        commit(Type.UPDATE_USERNAME, username);
    }
};