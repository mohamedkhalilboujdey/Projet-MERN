import React from 'react';

function Header({ title, subtitle }) {
    return (
        <header style={{ 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            padding: '30px 20px', 
            textAlign: 'center', 
            marginBottom: '30px',
            borderRadius: '0 0 8px 8px'
        }}>
            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{title}</h1>
            {subtitle && <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>{subtitle}</p>}
        </header>
    );
}
export default Header;