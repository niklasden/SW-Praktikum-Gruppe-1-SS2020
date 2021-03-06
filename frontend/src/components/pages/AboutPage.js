import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 200,
  },
  card: {
    maxWidth: 450,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));
/* Array with information about the developers of this project */
const devs = [
  {name: "Kevin Eberhardt", matrikelnr: 37152, init: "KE",github_url:"https://github.com/kevin-eberhardt", image_url: "https://avatars0.githubusercontent.com/u/47750689?v=4",},
  {name: "Niklas Denneler", matrikelnr: 0, init: "ND",github_url: "https://github.com/niklasden", image_url: "https://avatars0.githubusercontent.com/u/43001868?s=460&u=7108a00a3d9e8bd273ab9bf039e4be72c943bc68&v=4"},
  {name: "Pascal Illg", matrikelnr: 0, init: "PI",github_url: "https://github.com/pasillg", image_url: "https://avatars3.githubusercontent.com/u/60141744?s=460&v=4"},
  {name: "Christopher Böhm", matrikelnr: 0, init: "CB",github_url: "https://github.com/christopherboehm1", image_url: "https://avatars1.githubusercontent.com/u/59896385?s=460&v=4"},
  {name: "Julius Jacobitz", matrikelnr: 37042, init: "JJ",github_url: "https://github.com/JuliusJacobitz", image_url: "https://avatars0.githubusercontent.com/u/47418007?s=460&u=190ad7155139683b7ed2656b9ad3be8c16b9c81c&v=4"},
  {name: "Pia Schmid", matrikelnr: 0, init: "PS",github_url: "https://github.com/PiaSchmid", image_url: "https://avatars1.githubusercontent.com/u/60093069?s=460&u=db2c8079b5ff6ce8e0986d0dfac7d168635e3f88&v=4"},
]
  
function AboutPage() {
  const classes = useStyles();
  /* Renders the component */
  return (
    <Grid container className={classes.root}>
          <h2>About</h2>
        <GridList cols={1} cellHeight={350} cellWidth={450}>
          {
              devs.map(dev => (
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={dev.image_url}
                      title={dev.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {dev.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Matrikel-Nr: {dev.matrikelnr}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => {window.open(dev.github_url) }}>
                      See GitHub Profile
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              ))
            }
          </GridList>
    </Grid>
  )
}
export default AboutPage;