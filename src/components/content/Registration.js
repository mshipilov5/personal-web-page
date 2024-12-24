import React, { Component } from 'react';
import VkAuth from 'react-vk-auth';

class Registration extends Component {

    handleVkResponse = (data) => {
        console.warn(data)
    }

    render() {
        return(
            <VkAuth apiId="52878284" callback={this.handleVkResponse} />
        )
    }
}

export default Registration;