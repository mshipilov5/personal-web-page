import React, { useEffect } from 'react';
import { Content } from '../components/content/Content';
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DisplacementSphere from '../components/background/DisplacementSphere';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { FooterText } from '../components/footer/FooterText';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',  // Изменили на 'row' для горизонтального расположения
    minHeight: '100vh',
    alignItems: 'center',  // Выравнивание по центру по вертикали
    padding: '20px',
  },
  image: {
    width: '400px',  // Размер изображения
    height: 'auto',
    marginRight: '20px',
    marginLeft: '50px',
  },
  contentContainer: {
    flexGrow: 1,  // Контент займет оставшееся пространство
  }
}));

export const Home = () => {
  const classes = useStyles();

  useEffect(() => {
    // Вставка Google Tag Manager скрипта
    const script = document.createElement('script');
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TMCNM7QV');`;
    document.head.appendChild(script);

    // Вставка Google Tag Manager (noscript)
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TMCNM7QV"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noscript, document.body.firstChild);
  }, []);

  return (
      <>
        <div className={classes.root}>
          <img className={classes.image} src="/IMG_9495.jpg" alt="My Photo" />
          <div className={classes.contentContainer}>
            <DisplacementSphere />
            <Content />
            <ThemeToggle />
            <Hidden smDown>
              <SocialIcons />
            </Hidden>
            <Hidden mdUp>
              <SpeedDials />
            </Hidden>
          </div>
        </div>
      </>
  );
};