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
                    Create professional PowerPoint presentations instantly using AI.
                    Just upload your data or enter a topic — and get beautiful slides in seconds!
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