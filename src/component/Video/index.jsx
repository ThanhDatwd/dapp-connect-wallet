import { Box, Typography,Button } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
import React from 'react'

const Video = () => {
  return (
    <Box sx={{width:'100vw',height:'100vh',position:'relative',top:'0',zIndex:'1',backgroundImage: 'linear-gradient(to right, rgb(0, 0, 18) 0%, rgb(1, 26, 59) 50%, rgb(0, 0, 18) 100%)'}}>
        <Box sx={{position:'absolute',right:'10%',bottom:'10%',zIndex:'2'}}>
            <Typography  fontSize={38} color={"#fff"} fontWeight={300} fontStyle={'italic'} variant="body1" >
                 NFTs Are The Key To Accessing
            </Typography>
            <Typography fontSize={38} color={"#fff"} fontWeight={300} fontStyle={'italic'} variant="body1" >
                Unique And Exclusive NFT Collections
            </Typography>
            <Box sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                gap:'20px',
                mt:2
            }}>
                <Button variant='outlined' size='large'>Create</Button>
                <Button variant='outlined' size='large'>Explore</Button>
            </Box>
        </Box>
        <video className='video' loop autoPlay src="https://res.cloudinary.com/dwd5vxi4e/video/upload/v1675164144/meta-asset/VIDEO_introduce2_oekr2l.mp4"></video>
    </Box>
  )
}

export default Video