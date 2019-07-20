import React, { Component } from 'react';
import Wraper from '@/components/layout'
import RouterView from '@/router'
import Button from '../../components/base/Button'

class Order extends Component {
    state={
        superRef:React.createRef()
    }
    render() {
        const { routes, history } = this.props;
        return (
            <Wraper>
                this is order page
                <Button ref={this.state.superRef} ></Button>
     <RouterView routes={routes} history={history}></RouterView>
            </Wraper>
        )
    }
    componentDidMount(){
        console.log(this.state.superRef)
    }
}

export default Order;