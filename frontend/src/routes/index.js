import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import ListDeliveries from '../pages/Delivery/List';
import EditDelivery from '../pages/Delivery/Edit';
import NewDelivery from '../pages/Delivery/New';

import ListDeliveryMans from '../pages/DeliveryMan/List';
import EditDeliveryMans from '../pages/DeliveryMan/Edit';
import NewDeliveryMans from '../pages/DeliveryMan/New';

import ListRecipients from '../pages/Recipient/List';
import NewRecipient from '../pages/Recipient/New';
import EditRecipient from '../pages/Recipient/Edit';

import ListProblems from '../pages/Problema/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={ListDeliveries} isPrivate />
      <Route path="/deliveries/new" component={NewDelivery} isPrivate />
      <Route path="/deliveries/:id" exact component={EditDelivery} isPrivate />

      <Route path="/delivery-mans" exact component={ListDeliveryMans} isPrivate />
      <Route path="/delivery-mans/new" component={NewDeliveryMans} isPrivate />
      <Route path="/delivery-mans/:id" component={EditDeliveryMans} isPrivate />

      <Route path="/recipients" exact component={ListRecipients} isPrivate />
      <Route path="/recipients/new" component={NewRecipient} isPrivate />
      <Route path="/recipients/:id" component={EditRecipient} isPrivate />

      <Route path="/problems" exact component={ListProblems} isPrivate />
    </Switch>
  );
}
