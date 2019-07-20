import React, { Component } from 'react';
import Wraper from '@/components/layout'
import RouterView from '@/router'

class Coperation extends Component {
    render() {
        const {routes,history}=this.props;
        return (
            <Wraper>
                this is Coperation page
             <RouterView routes={routes} history={history}></RouterView>
        </Wraper>
        )
    }
}

export default Coperation;