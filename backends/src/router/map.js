import React, { Component } from 'react';
import {Router,Route,Switch} from 'dva/router'

class RouterMap extends Component {
    render() {
         const {history,routes}=this.props;
        return <Router history={history}>
           <Switch>
             {
               routes.map((item,index)=>{
                 const children=item.children===undefined?[]:item.children;
                 const Comp=item.component;
                 return <Route key={index} path={item.path} component={()=>{
                     return <Comp routes={children} history={history}></Comp>
                 }}></Route>
               })   
             }
           </Switch>
        </Router>
    }
}

export default RouterMap;