import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box, Button, Typography } from '@mui/material';

const Home = () => {
    return (

        <>
            <Header />
            <Box
                sx={{
                    height: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)',
                    color: '#fff',
                    textAlign: 'center',
                    px: 3,
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Welcome to Moak 🚀
                </Typography>

                <Typography variant="h6" sx={{ maxWidth: 600, mb: 4 }}>
                    Streamline student management with comprehensive tracking, performance analytics, and intelligent insights. Add students, monitor progress, and identify improvement opportunities—all in one unified platform.
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#fff',
                        color: '#2196f3',
                        fontWeight: 'bold',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        '&:hover': { backgroundColor: '#e3f2fd' },
                    }}
                >
                    Get Started
                </Button>
            </Box>
            <Footer />
        </>
    )
}
export default Home;