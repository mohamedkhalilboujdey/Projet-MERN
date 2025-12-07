import React from 'react';

function Footer({ author, year }) {
    return (
        <footer style={{ 
            textAlign: 'center', 
            padding: '20px', 
            marginTop: '40px', 
            borderTop: '2px solid #ddd', 
            color: '#666' 
        }}>
            <p> &copy; {year} {author} - Tous droits réservés</p>
        </footer>
    );
}
export default Footer;