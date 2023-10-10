import React, { useState } from "react";
import { Form, Button, Container,Table } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';


function PackageForm() {
  const navigate = useNavigate();
  const [returnAddress, setReturnAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [packageId, setPackageId] = useState("");

  const handleCreatePackage = () => {
    const packageData = {
      returnAddress: returnAddress,
      destinationAddress: destinationAddress,
      packageId: packageId,
    };

    // Make a POST request using fetch
    fetch("http://127.0.0.1:8000/package", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(packageData),
    })
      .then((response) =>response.json())
      .then((data) => {
        console.log("Package created successfully:", data);
        if(data){
          NotificationManager.success("Package created Successfully","",3000)
          setTimeout(()=>{
            navigate("/getData")
          },5000)

        }
      })
      .catch((error) => {
        console.error("Error creating package:", error);
      });
  };

  return (
    <div className="justify-space-between">
      <Header />
      <Container className="p-5"  >
        <h2>Create Package</h2>
        <Form style={{margin: "0px 350px 0px 350px"}}>
          <hr/>
          <br/>
          <Form.Group controlId="packageId" className="mb-3">
            <Form.Label style={{float: "left"}}>Package ID:</Form.Label>
            <Form.Control
              type="number"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="returnAddress" className="mb-3">
            <Form.Label style={{float: "left"}}>Return Address:</Form.Label>
            <Form.Control
              type="text"
              value={returnAddress}
              onChange={(e) => setReturnAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="destinationAddress" className="mb-3">
            <Form.Label style={{float: "left"}}>Destination Address:</Form.Label>
            <Form.Control
              type="text"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
            />
          </Form.Group>
         
          <Button variant="primary" onClick={handleCreatePackage}>
            Create Package
          </Button>
        </Form>

        <Table>

        </Table>
      </Container>
      <Footer />
      <NotificationContainer/>
    </div>
  );
}

export default PackageForm;
