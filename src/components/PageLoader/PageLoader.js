import React from "react";
import './PageLoader.css';

class PageLoader extends React.Component {
    render() {
        return <>
                 <div className="pl-container" hidden={this.props.hidden}>
                    <img className="img-loader" alt="null" src="../PageLoader/Double Ring-2.4s-200px.gif"></img>
                </div>
            </>;
    }
}

export default PageLoader;