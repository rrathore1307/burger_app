import reducer from './auth';
import * as actionType from '../actions/actionTypes';

describe('auth reducer',()=>{
    it('should return the initial state',()=>{
        expect(reducer(undefined, {}))
        .toEqual({
            loading: false,
            error: null,
            userId: null,
            token: null,
            redirectPath: '/'
        })
    })
    it('should return the initial state',()=>{
        expect(reducer({
            loading: false,
            error: null,
            userId: null,
            token: null,
            redirectPath: '/'
        },{
            type: actionType.AUTH_SUCCESS,
            userId: 'user-id',
            token: 'token-id',
        }))
        .toEqual({
            loading: false,
            error: null,
            userId: 'user-id',
            token: 'token-id',
            redirectPath: '/'
        })
    })
})