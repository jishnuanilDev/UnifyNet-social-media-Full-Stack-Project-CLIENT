import * as React from 'react';
import dynamic from 'next/dynamic';
const Button = dynamic(() => import('@mui/material/Button'));
const Dialog = dynamic(() => import('@mui/material/Dialog'));
const DialogActions = dynamic(() => import('@mui/material/DialogActions'));
const DialogContent = dynamic(() => import('@mui/material/DialogContent'));
const DialogContentText = dynamic(() => import('@mui/material/DialogContentText'));
const DialogTitle = dynamic(() => import('@mui/material/DialogTitle'));
import "@/styles/globals.css";

interface IAlertProps{
open:boolean;
setOpen:React.Dispatch<React.SetStateAction<boolean>>
setKycOpen:React.Dispatch<React.SetStateAction<boolean>>
}
 const AlertDialog:React.FC<IAlertProps> = ({open,setOpen,setKycOpen})=> {
//   const [open, setOpen] = React.useState(false);

  const handleCardOpen = () => {
    setKycOpen(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
      
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#0d0b0d',
            color: 'white',
            borderRadius: '15px',
            '@media (max-width: 767px)': { // Media query for mobile view
              height: '100px', // Set height to 300px for mobile
              width: '300px', // Set width to 200px for mobile (optional)
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" className='font-extrabold md:text-base text-[12px]' style={{color:'#e0b73d'}}>
         Activate Your Premium Account 
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description" className='font-semibold' style={{color:'#4692f0'}}>
            
          Get Verified! Activate Premium for Your Blue Tick Now!
          </DialogContentText>
        </DialogContent>
        <DialogActions className='flex gap-4'>
          <Button  onClick={handleClose} style={{backgroundColor:"red",color:'white',fontSize:'12px',borderRadius:'40px'}}>Cancel</Button>
          <Button onClick={handleCardOpen} autoFocus style={{backgroundColor:'#911bf2',color:'white',fontSize:'12px',borderRadius:'40px'}}>
          Continue
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default AlertDialog;