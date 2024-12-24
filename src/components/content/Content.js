import React from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "./TextDecrypt";
import Resume from "../../settings/resume.json";
import { FirstName, LastName, Otchestvo } from "../../utils/getName";
import  Registration  from "./Registration";
//import { LoginButton } from './LoginButton';
import {VKLoginButton} from './vkLoginButton';

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "auto",
        marginBottom: "auto",
        "@media (max-width: 1300px)": {
            marginLeft: theme.spacing(4),
        },
    },
}));

export const Content = () => {
    const classes = useStyles();

    return (
        <Container component="main" className={`${classes.main}`} maxWidth="sm">
            <Typography variant="h3" component="h2" gutterBottom>
                <TextDecrypt text={`${Resume.basics.x_title} ${LastName} ${FirstName} ${Otchestvo}`}/>
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                <TextDecrypt text={`${Resume.basics.job}`}/>
                <TextDecrypt text={`${Resume.basics.description}`}/>
                <TextDecrypt text={`Проживаю в ${Resume.basics.location.city}, ${Resume.basics.location.country}`}/>
            </Typography>

            <div style={{marginTop: '20px'}}>
                <VKLoginButton />
            </div>
        </Container>
    );
};
