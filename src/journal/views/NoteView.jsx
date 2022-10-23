import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Alert, Button, Grid, IconButton, Snackbar, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setActiveNote, startSaveNote,startDeletingNote, startUploadingFiles } from "../../store/journal";
import { ImageGalery } from "../components/ImageGalery"
import { useForm } from "./../../hooks/useForm";

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { body, title, date, onInputChange, formState } = useForm(note);
    const dateString = useMemo( () => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    },[ date ]);

    useEffect( () => {
        dispatch( setActiveNote(formState) );
    },[ formState ]);

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const fileInputRef = useRef();
    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;
        console.log('subiendo archivos');
        dispatch( startUploadingFiles( target.files ) );
    }

    useEffect(() => {
      if(messageSaved.length > 0) setOpen(true);
    }, [messageSaved])
    
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        setOpen(false);
        if (reason === 'clickaway') return;
    };

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb:1}}
        className="animate__animated animate__fadeIn animate__faster">
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
            </Grid>
            <Grid item>
                <input
                    ref={ fileInputRef }
                    type="file" 
                    multiple
                    onChange={ onFileInputChange }
                    style={{ display:'none' }}
                />
                <IconButton
                color='primary'
                disabled={ isSaving } 
                onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>
                <Button disabled={ isSaving } onClick={ onSaveNote } color="primary" sx={{padding:2}}>
                    <SaveOutlined sx={{fontSize:30,mr:1}} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{border:'none',mb:1}}
                name="title"
                value={ title }
                onChange={ onInputChange }
                />
            </Grid>
            <Grid container>
                <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió el día de hoy?"
                label="Descripción"
                minRows={5}
                name="body"
                value={ body }
                onChange={ onInputChange }
                />
            </Grid>
            <Grid container justifyContent='end'>
                <Button 
                    onClick={ onDelete }
                    sx={{ mt:2 }}
                    color='error'
                    >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            <ImageGalery images={ note.imageUrls } />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {messageSaved}
                </Alert>
            </Snackbar>
        </Grid>
    )
}
