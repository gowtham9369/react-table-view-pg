import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setSingleObject } from './store/actions';
import Popup from './popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


const TableView = ({ setSingleObject }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [showPopup, setShowPopup] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [brewed, setBrewed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const item = brewed ? 'brewed_after=11-2012' : 'brewed_before=11-2012';
      try {
        const response = await axios.get(`https://api.punkapi.com/v2/beers?${item}`);
        setData(response.data); // Assuming the API response is an array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [brewed]);

  const handleToggle = () => {
    setIsActive(!isActive);
    setBrewed(!brewed);
  };
  
  const setObjectData = async (data) => {
    setShowPopup(!showPopup);
    if(data ?? false){
      try {
        const response = await axios.get(`https://api.punkapi.com/v2/beers/${data}`);
        setSingleObject(...response.data); // Assuming the API response is an array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  // Calculate indexes for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8'><h1>Data Table</h1></div>
        <div className='col-md-4 text-right'>
        <button className={`toggle-button rounded ${isActive ? 'active' : ''}`} onClick={handleToggle}>
        <FontAwesomeIcon icon={faArrowLeft} className="before-icon" />
        &nbsp;&nbsp; Brewed Before
        </button>
        <button className={`toggle-button rounded ${!isActive ? 'active' : ''}`} onClick={handleToggle}>
          Brewed After &nbsp;&nbsp;
         <FontAwesomeIcon icon={faArrowRight} className="after-icon" />
        </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Img</th>
            <th>Name</th>
            <th>Tagline</th>
            <th>Description</th>
            <th>Contribution</th>
            <th>Tips</th>
            <th>Brewed</th>
            <th>Actions</th>
            {/* Add more headers based on your API response */}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item,index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td><img src={item.image_url}  alt={item.image_url}/></td>
              <td>{item.name}</td>
              <td>{item.tagline}</td>
              <td>{item.description}</td>
              <td>{item.contributed_by}</td>
              <td>{item.brewers_tips}</td>
              <td>{item.first_brewed}</td>
              <td><button className="btn btn-warning" onClick={()=>setObjectData(item.id)}>View</button></td>
              {/* Add more cells based on your API response */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div>
        {data.length > recordsPerPage && (
          <ul className="pagination" style={{justifyContent:'end'}}>
            {Array.from({ length: Math.ceil(data.length / recordsPerPage) }).map((_, index) => (
              <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
              
            ))}
          </ul>
        )}
      </div>
      <Popup show={showPopup} handleClose={()=>setObjectData(null)}>
      </Popup>
    </div>
  );
};

// export default TableView;

const mapDispatchToProps = {
  setSingleObject,
};

export default connect(null, mapDispatchToProps)(TableView);