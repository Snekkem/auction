import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import CardContainer from "./components/card/CardContainer";
import AdminContainer from "./components/admin/AdminContainer";
import AdminUsersContainer from "./components/admin/users/AdminUsersContainer";
import AdminCardsContainer from "./components/admin/cards/AdminCardsContainer";
import AdminSetsContainer from "./components/admin/sets/AdminSetsContainer";
import AdminStatisticsContainer from "./components/admin/statistics/AdminStatisticsContainer";
import AdminEpisodesContainer from "./components/admin/episodes/AdminEpisodesContainer";
import AdminLocationsContainer from "./components/admin/locations/AdminLocationsContainer";
import FaqContainer from "./components/User/faq/faqContainer";
import Chat from "./components/User/chat/chat";
import AuctionContainer from "./common/auction/auctionContainer";
import PossessionsContainer from "./components/User/possessions/possessionsContainer";
import SetsContainer from "./components/User/sets/setsContainer";
import UserProfileContainer from "./components/User/userProfileContainer";

export const useRoutes = (isAuthenticated, isAdmin) => {
    if (isAuthenticated) {
        if (isAdmin) {
            return (
                <Switch>
                    <Route exact path={'/admin'}>
                        <AdminContainer/>
                    </Route>
                    <Route exact path={'/admin/users'}>
                        <AdminUsersContainer/>
                    </Route>
                    <Route exact path={'/admin/cards'}>
                        <AdminCardsContainer/>
                    </Route>
                    <Route path={'/admin/locations'}>
                        <AdminLocationsContainer/>
                    </Route>
                    <Route exact path={'/admin/episodes'}>
                        <AdminEpisodesContainer/>
                    </Route>
                    <Route exact path={'/admin/sets'}>
                        <AdminSetsContainer/>
                    </Route>
                    <Route exact path={'/admin/statistics'}>
                        <AdminStatisticsContainer/>
                    </Route>
                    <Route exact path={'/admin/auction'}>
                        <AuctionContainer/>
                    </Route>
                    <Route exact path={'/auctions'}>
                        <CardContainer/>
                    </Route>
                    <Redirect to={"/admin/cards"}/>
                </Switch>
            )
        }
        return (
            <Switch>
                <Route exact path={'/profile'}>
                    <UserProfileContainer/>
                </Route>
                <Route exact path={'/possessions'}>
                    <PossessionsContainer/>
                </Route>
                <Route exact path={'/auctions'}>
                    <AuctionContainer/>
                </Route>
                <Route exact path={'/chat'}>
                    <Chat/>
                </Route>
                <Route exact path={'/sets'}>
                    <SetsContainer />
                </Route>
                <Route exact path={'/faq'}>
                    <FaqContainer />
                </Route>
                <Redirect to={"/auctions"}/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path={'/login'}>
                <Login/>
            </Route>
            <Route path={'/register'}>
                <Register/>
            </Route>
            <Redirect to={'/login'}/>
        </Switch>
    )
}

