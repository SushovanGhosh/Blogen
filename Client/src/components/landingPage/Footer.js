import React from 'react'

const Footer = () => {
    return(
        <footer id="main-footer" className="bg-color">
            <div className="container">
                <div className="row">
                    <div className="col text-center py-4">
                        <h3>Bloggen</h3>
                        <p>Copyright &copy;
                            &nbsp;<span>{new Date().getFullYear()}</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer