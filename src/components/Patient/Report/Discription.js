import React from 'react'
import {
  Container,
  styled,
  Box,
  Typography,
  Button,
  InputAdornment,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow, Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  myDiscription: {
    // Styles for the button when printing
    // Example: hide the button when printing
    '@media print': {
      // Styles for Material-UI components when printing
      // Example: hide the button and change font size of typography
      '& .score-box': {
        width:"80px",
        color:"red"
      },
      '& .myTypography': {
          marginTop:"100px"
      },
  }
}
}));
const DesContainer = styled(Box)({
  width: "70%",
  
  display: "flex",
  
  borderRadius: "12px",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "auto"
});
const Traingle = styled(Box)({
  width: "30%",
  height: "200px",
  borderLeft: "323px solid transparent"
});
const Circle = styled(Box)({
  width: "150px",
  height: "150px",
  margin:"auto 0px",
  borderRadius:"160px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  color:"#2279F5",
  border:"2px solid #2279F5",
  background:"linear-gradient(360deg, #CEE1FD 0%, #CCF6FF 100%)"
});
const Traingle1 = styled(Box)({
  width: "200px",
  height: "100px",
  borderBottom: "100px solid red",
  borderLeft: "200px solid transparent"
});
const Rectangle = styled(Box)({
  width: "200px",
  height: "100px",
  background: "blue",
  position: "relative",
  transformOrigin: "top left",
  transform: "skew(-45deg)"
});
const Text = styled(Typography)({

  height: "57px",
  fontWeight: 700,
  fontSize: "45px",
  fontFamily: "Inter",
  lineHeight: "150%",
  color: "#00D2FE",

})
const Text1 = styled(Typography)({

  height: "215px",
  fontWeight: 400,
  fontSize: "25px",
  fontFamily: "Inter",
  lineHeight: "180%",
  color: "#2B323B",


})
const Text2 = styled(Typography)({

  height: "37px",
  fontWeight: 400,
  fontSize: "25px",
  fontFamily: "Inter",
  lineHeight: "150%",
  color: "#2B323B",
  
})
const Text3 = styled(Typography)({

  fontStyle:"normal",
  fontWeight: 400,
  fontSize: "18px",
  fontFamily: "Inter",
  lineHeight: "50%",
  color: "#2B323B",
  textAlign:"center"
})
const Text4 = styled(Typography)({

  fontStyle:"normal",
  fontWeight: 400,
  fontSize: "16px",
  fontFamily: "Inter",
  lineHeight: "100%",
  color: "#2B323B",
  textAlign:"center",
  
})
const Text5 = styled(Typography)({

  fontStyle:"normal",
  fontWeight: 600,
  fontSize: "16.4px",
  fontFamily: "Inter",
  lineHeight: "170%",
  color: "var(--neutral-50, #6C7C93)"
  
  
})

const Discription = () => {
  const classes = useStyles();
  return (
    <DesContainer >
      <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }} className={classes.myDiscription}>
        <Text>
          How Genesys ‘Miracle’ works
        </Text>
        <Text1 >
          Our Advanced AI and proprietary machine learning algorithm can identify very complex and intricate features of embryo which indicates its quality, viability and likelihood of leading to a successful pregnancy. The AI assesses various complex patterns and morphological features which are very difficult for the human eye to see. These various factors are combined together to give an overall quality assessment with implantation potential score.
        </Text1>
        <Text sx={{marginTop:"32px",marginBottom:"8px"}}>
          What does report tells about your Embryos?
        </Text>
        <Text2>
          Genesys ‘Miracle’ gives an embryo quality confidence score from 0 to 100.
        </Text2>
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: "32px" }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "33.33%", height: "50px", borderTopLeftRadius: "25px", borderBottomLeftRadius: "25px", background: "#B6D3FC" }}></Box>
            <Box sx={{ width: "33.33%", height: "50px", background: "#85B5F9", margin: "0 4px" }}></Box>
            <Box sx={{ width: "33.33%", height: "50px", borderRadius: "0 25px 25px 0", background: "#B6D3FC" }}></Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>0</h3>
            <h3>Poor</h3>
            <Box sx={{ width: "30px", marginLeft: "30px" }}><h3 >50</h3></Box>
            <h3>Fair</h3>
            <Box sx={{ width: "30px", marginLeft: "50px" }}><h3 >70</h3></Box>
            <h3>Good</h3>
            <h3>100</h3>
          </Box>
        </Box>
        <Box sx={{ width: "100%", display: "flex" }}>
          {/* <Rectangle></Rectangle>
                <Traingle1/> */}
          {/* <Traingle/>
                <Traingle/>
                <Traingle/> */}
          <Box >
            <Box sx={{ width: "100%", height: "200px", background: "white" }}></Box>
            <Traingle sx={{ borderBottom: "100px solid #B6D3FC" }} />

          </Box>

          <Box sx={{ margin: "0 3px" }}>
            <Box sx={{ width: "100%", height: "100px", background: "white" }}></Box>
            <Traingle sx={{ borderBottom: "100px solid #85B5F9" }} />
            <Box sx={{ width: "100%", height: "100px", background: "#85B5F9" }}></Box>
          </Box>
          <Box >

            <Traingle sx={{ borderBottom: "100px solid #468FF7" }} />
            <Box sx={{ width: "100%", height: "200px", background: "#468FF7" }}></Box>
          </Box>
        </Box>
        <Box sx={{width:"94%", display: "flex", justifyContent: "space-between" }}>
          <h3>0</h3>

          <h3 >50</h3>

          <h3 >70</h3>

          <h3>100</h3>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-around", }}>
          <div ><p style={{ margin: 0, padding: 0 }} className="pre-txt">Less confident that embryo</p>
            <p className='pre-txt' style={{ textAlign: "center" }}>might result in pregnancy</p></div>
          <div><p style={{ margin: 0, padding: 0 }} className="pre-txt">Less confident that embryo</p>
            <p className='pre-txt' style={{ textAlign: "center" }}>might result in pregnancy</p></div>
          <div><p style={{ margin: 0, padding: 0 }} className="pre-txt">Less confident that embryo</p>
            <p className='pre-txt' style={{ textAlign: "center" }}>might result in pregnancy</p></div>
        </Box>
        <Box><Text>Genesys Miraclè’s evaluation of your embryos</Text></Box>
        <Box sx={{width:"100%",display:"flex",}}>
          <Box sx={{width:"20%",display:"flex",flexDirection:"column",alignItems:"center",margin:"24px 0px "}}>
                <Text3>You Have</Text3>

                
                  <Circle><h2>10</h2></Circle>
                
                <Text4>mature embryos</Text4> <Text4>(blastocysts) from this</Text4> <Text4>cycle that were evaluated.</Text4>
                
          </Box>
          
          <Box sx={{width:"80%", borderLeft:"5px solid #CEE1FD",display:"flex" ,flexDirection:"column",margin:"24px auto"}}>
            <Text3>This is how many embryos you have in each bracket.</Text3>
            <Box style={{display:"flex",justifyContent:"center", marginTop:"24px",gap:15,}}>
              <Box style={{display:"flex",flexDirection:"column",gap:4}} >
                <Box style={{width:"230px",height:"200px",borderRadius:"10px",background:"#CEE1FD",textAlign:"center"}} className="score-box">
                <Box style={{width:"100%",height:"100%",margin:"50px 0 115px 0",color:"#FFFFFF"}}>
                    <h2>3</h2>
                    <h2>Poor</h2>
                  </Box>
                </Box>
                <Box style={{display:"flex",justifyContent:"space-between"}}><Text3>0</Text3>
              <Text3>50</Text3>
              </Box>
              </Box>
              <Box style={{display:"flex",flexDirection:"column",gap:4}}>
                <Box style={{width:"230px",height:"200px",borderRadius:"10px",background:"#85B5F9",textAlign:"center"}}>
                <Box style={{width:"100%",height:"100%",margin:"50px 0 115px 0",color:"#FFFFFF"}}>
                    <h2>4</h2>
                    <h2>Fair</h2>
                  </Box>
                </Box>
                <Box style={{display:"flex",justifyContent:"space-between"}}><Text3>51</Text3>
              <Text3>75</Text3>
              </Box>
              </Box>
              <Box style={{display:"flex",flexDirection:"column",gap:4}}>
                <Box style={{width:"230px",height:"200px", borderRadius:"10px",background:"#468FF7",dispaly:"flex",justifyContent:"center",textAlign:"center"}}>
                  <Box style={{width:"100%",height:"100%",margin:"50px 0 115px 0",color:"#FFFFFF"}}>
                    <h2>3</h2>
                    <h2>Good</h2>
                  </Box>
                  

                </Box>
                <Box style={{display:"flex",justifyContent:"space-between"}}><Text3>76</Text3>
              <Text3>100</Text3>
              </Box>
              </Box>
            </Box>
            
            <Box style={{display:"flex",justifyContent:"center",gap:15,margin:"28px auto"}}>
              <Box style={{width:"230px",height:"10px",borderRadius:"10px",background:"#CEE1FD"}}></Box>
              <Box style={{width:"230px",height:"10px",borderRadius:"10px",background:"#85B5F9"}}></Box>
              <Box style={{width:"230px",height:"10px",borderRadius:"10px",background:"#468FF7"}}></Box>
            </Box>
          </Box>
        </Box>
        <Text5 variant='body1'>
        Disclaimer: The confidence score reflects the confidence of the AI model that the embryo may or may not result in clinical pregnancy. It 
        does not provide any information on the probability of a live birth. The accuracy of Genesys ‘Miraclè’ prediction does not take into 
        account any patient-specific factors that may influence pregnancy outcome.
        </Text5>

      </Box>


    </DesContainer>
  )
}

export default Discription