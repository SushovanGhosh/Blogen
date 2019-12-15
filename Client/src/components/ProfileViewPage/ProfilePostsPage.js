import React from 'react'

class ProfilePostsPage extends React.Component{

    componentDidMount(){
        window.$('.port-item').click(function (){
            window.$('.collapse').collapse('hide')
        })
    }

    render(){
        return (
            <div id="posts" className="collapse">
                <div className="card card-body bg-success text-white py-5">
                    <h2>Welcome To My Page</h2>
                    <p className="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam dolore beatae excepturi dolores nesciunt</p>
                </div>
            </div>
        )
    }
}

export default ProfilePostsPage