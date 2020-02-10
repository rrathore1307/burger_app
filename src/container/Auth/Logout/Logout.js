import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actionType from '../../../store/actions/index'
const Logout =(props)=>{
    useEffect(()=>{
        props.onAuthLogout();
    });
    return (
        <Redirect to='/auth' />
    )
}

const mapDispatchToProps=dispatch=>{
    return {
        onAuthLogout: ()=>dispatch(actionType.authLogout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);