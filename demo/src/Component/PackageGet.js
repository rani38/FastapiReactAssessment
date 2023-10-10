import React, { useState, useEffect } from "react";
import { Container, Table, Form } from "react-bootstrap";
import Header from "./Header";

function PackageGet() {
  const [data, setData] = useState([]);
  const [destinationAddress, setDestinationAddress] = useState("USA");
  const [id, setId] = useState("");
  const [returnAddress, setReturnAddress] = useState("");

  useEffect(() => {
    // Build the API request URL based on the provided query parameters
    let apiUrl = `http://localhost:8000/data?`;
    if (destinationAddress) apiUrl += `destination_address=${destinationAddress}&`;
    if (id) apiUrl += `id=${id}&`;
    if (returnAddress) apiUrl += `returnAddress=${returnAddress}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => console.error(error));
  }, [destinationAddress, id, returnAddress]);

  const handleDestinationChange = (event) => {
    setDestinationAddress(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleReturnAddressChange = (event) => {
    setReturnAddress(event.target.value);
  };

  return (
    <div>
      <Header />
      <Container>
        <div style={{margin :"0px 200px 0px 200px"}}>
          <br />
          <br />
          <br />
          <label htmlFor="destinationAddress">Destination Address: </label>
          <Form.Control
            type="text"
            id="destinationAddress"
            value={destinationAddress}
            onChange={handleDestinationChange}
          />
          <br />
          <label htmlFor="id">ID: </label>
          <Form.Control
            type="text"
            id="id"
            value={id}
            onChange={handleIdChange}
          />
          <br />
          <label htmlFor="returnAddress">Return Address: </label>
          <Form.Control
            type="text"
            id="returnAddress"
            value={returnAddress}
            onChange={handleReturnAddressChange}
          />
        
        <br />
        <Table striped bordered hover variant="light" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Return Address</th>
              <th>Destination Address</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.returnAddress}</td>
                  <td>{item.destinationAddress}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>{data.id}</td>
                <td>{data.returnAddress}</td>
                <td>{data.destinationAddress}</td>
              </tr>
            )}
          </tbody>
        </Table>
        </div>
      </Container>
    </div>
  );
}

export default PackageGet;
