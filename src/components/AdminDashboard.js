import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, Container, Row, Col, Table } from 'react-bootstrap';
import '../styles/AdminDashboard.css'; // Import CSS
import { fetchGoogleAnalyticsData } from '../api/googleAnalyticsApi'; // Impor fungsi API

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [buttonClicks, setButtonClicks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGoogleAnalyticsData();
        setData(data);
      } catch (error) {
        console.error('Error fetching Google Analytics data:', error);
      }
    };

    const fetchButtonClicks = async () => {
      try {
        const response = await fetch('http://localhost:555/api/metrics/button-clicks');
        const result = await response.json();
        setButtonClicks(result.clicks);
      } catch (error) {
        console.error('Error fetching button clicks:', error);
      }
    };

    fetchData();
    fetchButtonClicks();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Prepare data for the charts
  const prepareChartData = (label, dataKey, borderColor, backgroundColor) => ({
    labels: data.map(item => item.date),
    datasets: [
      {
        label,
        data: data.map(item => item[dataKey]),
        borderColor,
        backgroundColor,
        fill: true,
      },
    ],
  });

  const charts = [
    {
      title: 'Active Users',
      dataKey: 'activeUsers',
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    {
      title: 'Screen Page Views',
      dataKey: 'screenPageViews',
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
    },
    {
      title: 'Sessions',
      dataKey: 'sessions',
      borderColor: 'rgba(255, 159, 64, 1)',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
    },
    {
      title: 'Bounce Rate',
      dataKey: 'bounceRate',
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      title: 'Average Session Duration',
      dataKey: 'averageSessionDuration',
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
  ];

  return (
    <Container>
      <h1 className="text-center my-4">Google Analytics Data</h1>
      <Row>
        {charts.map((chart, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{chart.title}</Card.Title>
                <Line data={prepareChartData(chart.title, chart.dataKey, chart.borderColor, chart.backgroundColor)} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Button Clicks</Card.Title>
              <p>Total Button Clicks: {buttonClicks}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Detailed Data</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Browser</th>
                    <th>Operating System</th>
                    <th>Traffic Source</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Page Interactions</th>
                    <th>Conversion Rate</th>
                    <th>Device Type</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.country}</td>
                      <td>{item.city}</td>
                      <td>{item.browser}</td>
                      <td>{item.operatingSystem}</td>
                      <td>{item.trafficSource}</td>
                      <td>{item.age}</td>
                      <td>{item.gender}</td>
                      <td>{item.pageInteractions}</td>
                      <td>{item.conversionRate}</td>
                      <td>{item.deviceType}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;