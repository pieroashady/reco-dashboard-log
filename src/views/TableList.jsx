/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, Table } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import { thArray, tdArray } from 'variables/Variables.jsx';

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reco: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  baseUrl(route) {
    return `http://52.77.8.120:4000/api/v1/${route}`;
  }

  getData() {
    return axios.get(this.baseUrl('data')).then((response) => {
      console.log(response.data);
      this.setState({ reco: response.data });
    });
  }
  render() {
    const { reco } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="People Who Use Face Recognition"
                category="Here is the data"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>NO</th>
                        <th>NAME</th>
                        <th>NIP</th>
                        <th>START</th>
                        <th>END</th>
                        <th>TIME LAPSE</th>
                        <th>DISTANCE</th>
                        <th>PERCENTAGE</th>
                        <th>NOTES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reco.map((prop, key) => (
                        <tr key={key}>
                          <td key={key}>{key + 1}</td>
                          <td key={key}>{prop.recoName}</td>
                          <td key={key}>{prop.recoNip}</td>
                          <td key={key}>{prop.recoStart}</td>
                          <td key={key}>{prop.recoEnd}</td>
                          <td key={key}>{prop.recoTimeLapse}</td>
                          <td key={key}>{prop.recoDistance.toFixed(2)}</td>
                          <td key={key}>{prop.recoPercentage}</td>
                          <td key={key}>{prop.recoNotes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
