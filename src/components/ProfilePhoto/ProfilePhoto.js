import React from "react";
import Image from 'react-bootstrap/Image';
import AuthConext from '../../contexts/auth';

class ProfilePhoto extends React.Component  {
    static contextType = AuthConext;
    user = null;
    width = null;
    height = null;
    marginTop = null;
    inputFileRef = null;
    imgRef = null;
    constructor(props) {
      super(props);
      this.user = this.props.user;
      this.inputFileRef = React.createRef();
      this.imgRef = React.createRef();
      this.width = props.width;
      this.height = props.height;
      if (props.marginTop) {
          this.marginTop = props.marginTop;
      }
      else{
          this.marginTop = 0;
      }
    }
    
    render() {
      const clickImage = (e) => {
        this.inputFileRef.current.click();
      };

      return <>
            <input type="file" ref={this.inputFileRef} style={{display: 'none'}} 
              onChange={this.props.changeImage} />
            {this.user?.profilePhoto ? 
              <Image className="img1"
                key={(new Date()).getTime()}
                src={ this.user.profilePhoto } 
                onClick={clickImage}
                style={{ 
                  marginTop:this.marginTop, 
                  width: this.width, 
                  height: this.height, 
                  borderRadius: 100, 
                  overflow: "hidden" }}>
              </Image> : 
              <Image className="img1"
                onClick={clickImage}
                style={{ 
                    marginTop:this.marginTop, 
                    width: this.width, 
                    height: this.height, 
                    borderRadius: 100, 
                    overflow: "hidden"
                }} 
                src={(require('../ProfilePhoto/user.png'))}>
              </Image>}
            </>
    }
}

export default ProfilePhoto;