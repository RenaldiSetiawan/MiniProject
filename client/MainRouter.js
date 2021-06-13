import React from 'react'
import { Switch, Route } from "react-router-dom";
import MainLayout from './views/MainLayout'

import Landing from './views/Landing';
import Profile from './views/Profile'
import Detail from './views/Detail';
import Cart from './views/Cart';
import Login from './views/Login';
import Register from './views/users/Register';
import Tours from './views/tours/Tours'
import Tours_Images from './views/tours_images/Tours_Images';
import AddEditTourImage from './views/tours_images/AddEditTourImage'



const MainRouter = () => {
  return (<>
    <Switch>
      <Route exact path="/tourtravel/login" component={Login} />
      <Route exact path="/tourtravel/register/" component={Register} />
      <Route exact path="/tourtravel/landing" component={Landing} />
      <Route exact path="/tourtravel/profile" component={Profile} />
      <Route exact path="/tourtravel/detail/:id" component={Detail} />
      <Route exact path="/tourtravel/cart/:id" component={Cart} />

      <MainLayout >
        <Route exact path="/tourtravel/tours/" component={Tours} />
        <Route exact path="/tourtravel/toursimages/" component={Tours_Images} />
        <Route exact path="/tourtravel/toursimages/add" component={AddEditTourImage} />

      </MainLayout>
    </Switch>


  </>)
}

export default MainRouter
