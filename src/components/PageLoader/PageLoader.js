import React from "react";
import Image from 'react-bootstrap/Image';
import './PageLoader.css';

class PageLoader extends React.Component {
    render() {
        return <>
                 <div className="pl-container" hidden={this.props.hidden}>
                    <Image className="img-loader" alt="null" src={require('../PageLoader/DoubleRing-2.4s-200px.gif')}></Image>
                </div>
            </>;
    }
}

export default PageLoader;