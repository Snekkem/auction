import React from 'react';
import {ToastContainer} from "react-toastify";
import setAuthToken from "./utils/setAuthToken";
import jwtDecode from 'jwt-decode'
import store from "./redux/redux-store";
import {logout, setCurrentUserAC} from "./redux/dispatches/authDispatch";
import {useRoutes} from "./routes";
import {connect} from 'react-redux'
import AdminContainer from "./components/admin/AdminContainer";
import NavbarContainer from "./components/User/navbar/navbarContainer";

if (localStorage.Token) {
    const {Token} = localStorage
    setAuthToken(Token)
    const decoded = jwtDecode(Token)
    store.dispatch(setCurrentUserAC(decoded, decoded.role === 'Admin'))
    const currentTime = Date.now() / 1000

    if (decoded.exp < currentTime) {
        store.dispatch(logout())
        window.location.href = '/login';
    }
}

const App = (props) => {
    const routers = useRoutes(props.isAuthenticated, props.isAdmin)
    return (
        <div>
            {props.isAuthenticated && !props.isAdmin && <NavbarContainer />}
            {props.isAuthenticated && props.isAdmin && <AdminContainer/>}
            {routers}
            <ToastContainer/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        isAdmin: state.authReducer.isAdmin
    }
}

export default connect(mapStateToProps, {})(App);
