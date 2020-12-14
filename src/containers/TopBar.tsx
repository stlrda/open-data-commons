import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// icons
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub'
import SettingsIcon from '@material-ui/icons/Settings'
import InputIcon from '@material-ui/icons/Input'

interface Props {

}

const useStyles = makeStyles({
  topBar: {
    background: "#fff",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 90,
    minHeight: 60,
    height: 82,
    zIndex: 1000,
    paddingLeft: 10,
    paddingRight: 15,
    filter: "drop-shadow(0px 3px 3px rgba(39, 44, 54, 0.06))",
  },
  topBarLeft: {
    paddingTop: 15,
    paddingBottom: 15,
    flex: 1,
    '& h1': { display: 'inline-block', marginBottom: 0, marginTop: 0 },
    paddingLeft: 25,
    paddingRight: 30,
  },
  topBarRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  topBarIconButton: {
    marginRight: 10
  },
  topBarIcon: {
    fontSize: 24,
    color: "#272C36",
  },
  topBarTitle: {
    fontSize: 32,
    fontWeight: 500
  },
  topBarDetails: {
    fontSize: 16,
    color: "#272C36",
    opacity: 0.83,
    fontWeight: 400,
    marginLeft: 15
  },
})

const TopBar: React.FC<Props> = (props) => {
  const classes = useStyles();

  const handleIconClick = () => console.log('icon clicked')

  return (
    <div className={`${classes.topBar}`}>
      <div className={classes.topBarLeft}>
        <h1 className={classes.topBarTitle}>
          Open Referral
          <span className={classes.topBarDetails}>API Documentation - v3.3.0</span>
        </h1>
      </div>
      <div className={classes.topBarRight}>
        <TextField
          id="search-docs"
          placeholder="Search..."
          margin="normal"
          style={{marginRight: 15}}

        />
        <IconButton href="https://github.com/stlrda" target="_blank" rel="noopener" className={classes.topBarIconButton} onClick={handleIconClick}>
          <GitHubIcon className={classes.topBarIcon} />
        </IconButton>
        <IconButton className={classes.topBarIconButton} onClick={handleIconClick}>
          <InputIcon className={classes.topBarIcon} />
        </IconButton>
        <IconButton className={classes.topBarIconButton} style={{marginRight: 0}} onClick={handleIconClick}>
          <SettingsIcon className={classes.topBarIcon} />
        </IconButton>
      </div>
    </div>
  )
}

export default TopBar;
