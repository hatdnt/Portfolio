// client/src/components/AdminMetrics.js
import React, { useState, useEffect } from 'react';
import { getMetrics } from '../api/adminMetricsApi';
import '../styles/AdminMetrics.css';

const AdminMetrics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  if (!metrics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-metrics">
      <h2>Admin Metrics</h2>
      <p>Viewer Traffic: {metrics.viewerTraffic}</p>
      <p>Bandwidth Usage: {metrics.bandwidthUsage}</p>
      <p>CPU Usage: {metrics.otherMetrics.cpuUsage}</p>
      <p>Memory Usage: {metrics.otherMetrics.memoryUsage}</p>
    </div>
  );
};

export default AdminMetrics;