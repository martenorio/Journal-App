import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView, NoteView } from '../views'

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/*<Typography component='h1'>JournalPage</Typography>*/}
      <NothingSelectedView></NothingSelectedView>
      {/* <NoteView /> */}
      <IconButton
        size='large'
        sx={{
          color:'white',
          backgroundColor:'error.main',
          ':hover':{backgroundColor:'error.main', opacity: 0.9},
          position:'fixed',
          right:50,
          bottom:50
        }}
      >
        <AddOutlined sx={{ fontSize:30 }} />
      </IconButton>
    </JournalLayout>
  )
}