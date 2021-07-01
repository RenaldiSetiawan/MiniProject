import React from 'react'
import { Switch, Route } from "react-router-dom";
import MainLayout from './views/MainLayout'
import { Helmet } from 'react-helmet';
import Landing from './views/Landing';
import Profile from './views/Profile'
import Detail from './views/Detail';
import Cart from './views/Cart';
import Login from './views/Login';
import Register from './views/users/Register';
import Tours from './views/tours/Tours'
import Tours_Images from './views/tours_images/Tours_Images';
import AddEditTourImage from './views/tours_images/AddEditTourImage'
import PrivateRoute from './views/users/PrivateRoute';
import Order from './views/Order';
import BayarOrder from './views/BayarOrder';
import logo from './assets/images/logo.jpg'

const MainRouter = () => {
  return (<>
  <Helmet><link rel="shortcut icon" href={logo} /></Helmet>
    <Switch>
      <Route exact path="/tourtravel/login" component={Login} />
      <Route exact path="/tourtravel/register/" component={Register} />
      <Route exact path="/tourtravel/landing" component={Landing} />
      <PrivateRoute exact path="/tourtravel/profile" component={Profile} />
      <Route exact path="/tourtravel/detail/:id" component={Detail} />
      <PrivateRoute exact path="/tourtravel/cart" component={Cart} />
      <Route exact path="/tourtravel/order" component={Order} />
      <Route exact path="/tourtravel/bayarorder" component={BayarOrder} />

      <MainLayout >
        <PrivateRoute exact path="/tourtravel/tours/" component={Tours} />
        <PrivateRoute exact path="/tourtravel/toursimages/" component={Tours_Images} />
        <PrivateRoute exact path="/tourtravel/toursimages/add" component={AddEditTourImage} />

      </MainLayout>
    </Switch>


  </>)
}

export default MainRouter
