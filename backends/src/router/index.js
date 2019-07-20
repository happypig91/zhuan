import Routes from '@/router/routes'
import RouterMap from '@/router/map'
import React from 'react';

function RouterView(props) {
  //  console.log(props)
   const routes=props.routes?props.routes:Routes;
  return <RouterMap routes={routes} {...props}></RouterMap>
    
}

export default RouterView;
