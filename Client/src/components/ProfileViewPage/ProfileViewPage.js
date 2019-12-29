import React from 'react'
import Header from '../Header'

import '../../css/profilePage.css'
import profileImage from '../../images/blank-profile-picture.webp'
import ProfileHomePage from './ProfileHomePage'
import ProfilePostsPage from './ProfilePostsPage'
import ProfileContactPage from './ProfileContactsPage'
class ProfileViewPage extends React.Component{

    state = {item:"#home"}

    stopToggle = (itemId) =>{
        if(this.state.item!==itemId){
            this.setState({item: itemId})
        }
    }

    render(){

        return (
            <div className="profile-page-body">
                <Header />
                <div className="container mt-5">
                    <header id="profile-header">
                        <div className="row no-gutters">
                        <div className="avatar col-lg-4 col-md-5" data-content="Change profile Picture">
                            <img src={profileImage} alt="profile-pic"/>
                            <div class="btn">
                            <input type="file" name="myAvatar" />
                            </div>       
                        </div>
                            {/* <div className="avatar col-lg-4 col-md-5" data-content="Change profile Picture"> 
                                <img src={profileImage} alt="profile-pic"/>
                                
                                <input type="file" name="myAvatar" />
                            </div> */}
                            
                            <div className="col-lg-8 col-md-7">
                                <div className="d-flex flex-column">
                                    <div className="p-5 bg-dark text-white">
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h1 className="display-4">John Doe</h1>
                                            <div className="d-none d-md-block">
                                                <a href="http://twitter.com/" className="text-white">
                                                    <i className="fab fa-twitter"></i>
                                                </a>
                                            </div>
                                            <div className="d-none d-md-block">
                                                <a href="http://facebook.com/" className="text-white">
                                                    <i className="fab fa-facebook"></i>
                                                </a>
                                            </div>
                                            <div className="d-none d-md-block">
                                                <a href="http://instagram.com/" className="text-white">
                                                    <i className="fab fa-instagram"></i>
                                                </a>
                                            </div>
                                            <div className="d-none d-md-block">
                                                <a href="http://github.com/" className="text-white">
                                                    <i className="fab fa-github"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-black">
                                        Experienced Full Stack Developer
                                    </div>
                                    <div>
                                        <div className="d-flex flex-row text-white align-items-stretch text-center">
                                            <div className="port-item one p-4 bg-primary" style={this.state.item==="#home" ? {pointerEvents:"none"}:{pointerEvents:"auto"}} onClick={() => this.stopToggle("#home")} data-target="#home" data-toggle="collapse">
                                                <i className="fas fa-home fa-2x d-block"></i>
                                                <span className="d-none d-sm-block">Home</span>
                                            </div>
                                            <div className="port-item two p-4 bg-success" style={this.state.item==="#posts" ? {pointerEvents:"none",backgroundColor:"red"}:{pointerEvents:"auto"}} onClick={() => this.stopToggle("#posts")} data-toggle="collapse" data-target="#posts">
                                                <i className="fas fa-pencil-square-o fa-2x d-block"></i>
                                                <span className="d-none d-sm-block">Posts</span>
                                            </div>
                                            <div className="port-item p-4 bg-warning" style={this.state.item==="#followers" ? {pointerEvents:"none",backgroundColor:"red"}:{pointerEvents:"auto"}} onClick={() => this.stopToggle("#followers")} data-toggle="collapse" data-target="#followers">
                                                <i className="fas fa-users fa-2x d-block"></i>
                                                <span className="d-none d-sm-block">Followers</span>
                                            </div>
                                            <div className="port-item p-4 bg-danger" style={this.state.item==="#contact" ? {pointerEvents:"none",backgroundColor:"red"}:{pointerEvents:"auto"}} onClick={() => this.stopToggle("#contact")} data-toggle="collapse" data-target="#contact">
                                                <i className="fas fa-envelope fa-2x d-block"></i>
                                                <span className="d-none d-sm-block">Contact</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <ProfileHomePage />
                    <ProfilePostsPage />
                    <ProfileContactPage />
                </div>
            </div>
        )
    }
}

export default ProfileViewPage