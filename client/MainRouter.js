import React from 'react'
import { Switch, Route } from "react-router-dom";
import MainLayout from './views/MainLayout'

import Landing from './views/Landing';
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
      <Route exact path="/tr" component={Login} />
      <Route exact path="/tr/register/" component={Register} />
      <Route exact path="/tr/landing" component={Landing} />
      <Route exact path="/tr/detail/:id" component={Detail} />
      <Route exact path="/tr/cart/:id" component={Cart} />

      <MainLayout >
        <Route exact path="/tr/tours/" component={Tours} />
        <Route exact path="/tr/toursimages/" component={Tours_Images} />
        <Route exact path="/tr/toursimages/add" component={AddEditTourImage} />

      </MainLayout>
    </Switch>


  </>)
}

export default MainRouter
