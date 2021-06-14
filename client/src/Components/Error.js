import React from 'react';
import {NavLink} from 'react-router-dom';

const Errorpage=()=>{
    return(
        <>
            <div className="error">
                <div>
                    <h1 className="oops"> Oops ! <span style={{fontSize:"3rem"}}className=" text-primary">Page Not Found </span></h1>
                    
                    
                    <div className="text-center mt-4"><NavLink className="btn btn-primary py-3 text-light fs-4 px-4" to='/'>BACK TO HOME</NavLink>
                    </div>
                </div>

            </div>
        </>



    )
}

export default Errorpage;