import React, {useEffect, useState, Fragment} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/postMessage';
import { Grid, Paper, withStyles, List, ListItem, ListItemText, Typography, Divider, Button } from '@material-ui/core';
import PostMessageForm from './PostMessageForm'; 
import ButterToast, { Cinnamon } from 'butter-toast';
import { DeleteSweep } from '@material-ui/icons';

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
    },
    smMargin:{
        margin: theme.spacing(1)
    },
    actionDiv:{
        textAlign: "center"
    }
})

const PostMessages = ({classes , ...props}) => {
    
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostMessages();
    }, []) // DidMount

    const onDelete = id => {
        const onSuccess = () => { 
            ButterToast.raise({
                content: <Cinnamon.Crisp title="DELETED"
                content= "Deleted Successfully"
                scheme= {Cinnamon.Crisp.SCHEME_PURPLE}
                icon = {<DeleteSweep />}
                />
            }) 
        }
        if(window.confirm('Are you sure to delete this record?'))
            props.deletePostMessage(id, onSuccess)
    }

    return (
        <Grid container>
            <Grid item xs={5}>
                <Paper className={classes.paper}>
                    <PostMessageForm {...{currentId, setCurrentId}} />
                </Paper>
            </Grid>
            <Grid item xs={7}>
                <Paper className={classes.paper}>
                    <List>
                        {
                            props.postMessageList.map((record, index) => {
                                return(
                                    <Fragment key={index}>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography variant="h5">
                                                   <b>TITLE</b> {record.title}
                                                </Typography>
                                                <div>
                                                    <b>MESSAGE:</b> {record.message}
                                                </div>
                                                <div className={classes.actionDiv}>
                                                    <Button 
                                                    className={classes.smMargin} 
                                                    variant="contained" 
                                                    color="primary" 
                                                    size="small"
                                                    onClick={() => setCurrentId(record._id)}
                                                    >Edit</Button>
                                                    <Button 
                                                    className={classes.smMargin} 
                                                    variant="contained" 
                                                    color="secondary" 
                                                    size="small"
                                                    onClick={() => onDelete(record._id)}
                                                    >Remove</Button>
                                                </div>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li" />
                                    </Fragment>
                                )
                            })
                        }
                    </List>
                </Paper>
            </Grid>
        </Grid>
        );
}

const mapStateToProps = state => ({
    postMessageList: state.postMessage.list
})

const mapActionToProps = {
    fetchAllPostMessages: actions.fetchAll,
    deletePostMessage: actions.Delete,
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles) (PostMessages));