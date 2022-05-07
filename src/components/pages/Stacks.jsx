import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

import Home from './Feed';
import Lists from './Lists';
import ListDetail from './ListDetail';
import Settings from './Settings';
import Apresentation from './Apresentation';

const Stacks = () => {
  return (
    <IonRouterOutlet>
      <Route path="/tabs/feed" component={Home} exact={true} />
      <Route path="/tabs/lists" component={Lists} exact={true} />
      <Route path="/tabs/lists/:listId" component={ListDetail} exact={true} />
      <Route path="/tabs/settings" component={Settings} exact={true} />
      <Route path="/" render={() => <Apresentation />} exact={true} />
    </IonRouterOutlet>
  );
};

export default Stacks;
