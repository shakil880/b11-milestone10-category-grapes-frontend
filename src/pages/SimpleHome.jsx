const SimpleHome = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🚀 TaskMarket - Freelance Marketplace</h1>
      <p>Welcome to our freelance task marketplace!</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>✨ Features</h2>
        <ul style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
          <li>🔐 User Authentication</li>
          <li>📋 Browse and Post Tasks</li>
          <li>💼 Freelancer Marketplace</li>
          <li>📱 Responsive Design</li>
          <li>🎯 Task Management</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>🔥 Popular Categories</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
          <span style={{ background: '#3498db', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px' }}>
            Web Development
          </span>
          <span style={{ background: '#e74c3c', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px' }}>
            Design
          </span>
          <span style={{ background: '#2ecc71', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px' }}>
            Writing
          </span>
          <span style={{ background: '#f39c12', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px' }}>
            Marketing
          </span>
        </div>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', background: '#f8f9fa', borderRadius: '12px' }}>
        <h2>📊 Platform Stats</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <h3 style={{ color: '#3498db', fontSize: '2rem', margin: '0' }}>10K+</h3>
            <p style={{ margin: '0.5rem 0 0 0' }}>Active Users</p>
          </div>
          <div>
            <h3 style={{ color: '#e74c3c', fontSize: '2rem', margin: '0' }}>5K+</h3>
            <p style={{ margin: '0.5rem 0 0 0' }}>Completed Tasks</p>
          </div>
          <div>
            <h3 style={{ color: '#2ecc71', fontSize: '2rem', margin: '0' }}>2.5K+</h3>
            <p style={{ margin: '0.5rem 0 0 0' }}>Happy Clients</p>
          </div>
          <div>
            <h3 style={{ color: '#f39c12', fontSize: '2rem', margin: '0' }}>99%</h3>
            <p style={{ margin: '0.5rem 0 0 0' }}>Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHome;