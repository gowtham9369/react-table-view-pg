// Popup.js
import React from 'react';
import { connect } from 'react-redux';


const Popup = ({ handleClose, show, children, setSingleObject}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <button onClick={handleClose} className='btn-danger px-2 float-right rounded'>X</button>
        {children}
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                {/* Product Details */}
                {typeof setSingleObject === 'object' && setSingleObject !== null ? <div>
                <h2>{setSingleObject.name}</h2>
                <p className="text-muted">Tagline: {setSingleObject.tagline}</p>
                <p className="text-muted">Attenuation Level: {setSingleObject.attenuation_level}</p>
                <p className="text-muted">Description: {setSingleObject.description}</p>
                <p className="text-muted">Brewer Tips: {setSingleObject.brewers_tips}</p>
                <p className="text-muted">Contributed By: {setSingleObject.contributed_by}</p> </div>: null}
                </div>
            </div>
            </div>
      </section>
    </div>
  );
};



const mapStatetoProps = (state) => {
    return {
        setSingleObject: state.singleObject,
    };
};
  
  export default connect(mapStatetoProps)(Popup);