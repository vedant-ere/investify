import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [totalInvestment, setTotalInvestment] = useState(null);

  useEffect(() => {
    async function getTotalInvestment() {
      try {
        let response = await axios.get('http://localhost:5000/api/user/totalInvestments');
        setTotalInvestment(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getTotalInvestment();
  }, []);

  return (
    <div style={{height: 'fit-content',padding: '20px',display: 'flex',justifyContent: 'center',}}>
      <div style={{width: '100%',maxWidth: '960px',boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',borderRadius: '8px',padding: '24px',}}>
        <h1 style={{fontSize: '24px',fontWeight: '600',color: '#D1D5DB',marginBottom: '24px',}}>Dashboard</h1>
        <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',}}>
          <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'flex-start',alignItems: 'flex-start',padding: '16px',borderRadius: '8px',}}>
            <span style={{fontSize: '18px',fontWeight: '500',color: '#F3F4F6',}}>Total Corpus Value</span>
            <span style={{fontSize: '36px',fontWeight: '600',color: '#E5E7EB',}}>{totalInvestment}</span>
          </div>
          <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'flex-end',alignItems: 'flex-start',padding: '16px',borderRadius: '8px',}}>
            <span style={{fontSize: '18px',fontWeight: '500',color: '#F3F4F6',}}>Current Investment Value</span>
            <span style={{   fontSize: '36px',   fontWeight: '600',   color: '#E5E7EB', }}>{totalInvestment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
