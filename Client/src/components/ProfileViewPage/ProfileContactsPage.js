import React from 'react'

class ProfileContactPage extends React.Component{

    componentDidMount(){
        window.$('.port-item').click(function (){
            window.$('.collapse').collapse('hide')
        })
    }

    render(){
        return (
            <div id="contact" className="collapse">
                <div className="card card-body bg-danger text-white py-5">
                    <h2>Contact</h2>
                    <p className="lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam dolore beatae excepturi dolores nesciunt</p>
                </div>
            </div>
        )
    }
}

export default ProfileContactPage