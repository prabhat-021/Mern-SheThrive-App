import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    // color: 'rgba(0,183,255, 1)',
    color: '#B0A9A1',
    fontSize: "7vmin",
  },
  image: {
    marginLeft: '15px',
  },
  // [theme.breakpoints.down("sm")]: {
  //   mainContainer: {
  //     flexDirection: "column-reverse"
  //   },
  // },
}));