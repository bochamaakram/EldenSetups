import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Accessor = () => {
  return (
    <div className="container mt-4" >
            <div className='d-flex justify-content-around '>
                <h5 className='text-center'>processeur</h5>
                <div>
                    <span>Add</span>
                    <i className="bi bi-plus-circle text-primary"></i>
                </div>
            </div>

            <div className='d-flex justify-content-around '>
                <h5 className='text-center'>Mother board</h5>
                <div>
                    <span>Add</span>
                    <i className="bi bi-plus-circle text-primary"></i>
                </div>
            </div>

            <div className='d-flex justify-content-around '>
                <h5 className='text-center'>graphique card</h5>
                <div>
                    <span>Add</span>
                    <i className="bi bi-plus-circle text-primary"></i>
                </div>
            </div>

            <div className='d-flex justify-content-around '>
                <h5 className='text-center'>power supply</h5>
                <div>
                    <span>Add</span>
                    <i className="bi bi-plus-circle text-primary"></i>
                </div>
            </div>

            <div className='d-flex justify-content-around '>
                <h5 className='text-center'>cooling</h5>
                <div>
                    <span>Add</span>
                    <i className="bi bi-plus-circle text-primary"></i>
                </div>
            </div>

            <div className='d-flex justify-content-around '>
                <h5 className='text-center'>storage</h5>
                <div>
                    <span>Add</span>
                    <i className="bi bi-plus-circle text-primary"></i>
                </div>
            </div>

            <div className='d-flex justify-content-around ' style={{backgroundColor:'gray'}}>
                <h5 className='text-center'>ram</h5>
                <div>
                    <span>Add</span>
                    <i className="bi bi-plus-circle text-primary"></i>
                </div>
            </div>

            <div className='d-flex justify-content-around '>
                <h5 className='text-center'>case</h5>
                <div>
                    <span>Add</span>
                    <i className="bi bi-plus-circle text-primary"></i>
                </div>
            </div>
    </div>
  );
};

export default Accessor;