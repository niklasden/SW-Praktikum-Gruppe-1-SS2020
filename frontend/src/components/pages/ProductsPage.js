import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextInputBar from '../layout/TextInputBar';
import IconButton from '../layout/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import ProductListEntry from '../layout/ProductListEntry';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    article: {
      padding: theme.spacing(0), 
    }
 });

/**
 * Example Category with Articles
 */
const FRUITS = [
  {
    id: 'art1',
    category: 'fruits', 
    name: 'apple'
  },
  {
    id: 'art2',
    category: 'fruits', 
    name: 'banana'
  },
  {
    id: 'art3',
    category: 'fruits', 
    name: 'peach'
  }, 
  {
    id: 'art4',
    category: 'fruits', 
    name: 'melon'
  }, 
  {
    id: 'art5',
    category: 'fruits', 
    name: 'ananas'
  }, 
  {
    id: 'art6',
    category: 'fruits', 
    name: 'raspberry'
  },
]
  const VEGETABLES = [
  {
    id: 'art1',
    category: 'vegetables', 
    name: 'tomato'
  }, 
  {
    id: 'art2',
    category: 'vegetables', 
    name: 'carrot'
  }, {
    id: 'art3',
    category: 'vegetables', 
    name: 'cucumber'
  },
]
const MEAT =[
  {
    id: "art1",
    category: "meat",
    name: "steak"
  }, 
  {
    id: "art2",
    category: "meat",
    name: "fish"
  }
]

const getProductsDummy = () => {
    let productsJSON = [];
    fetch("http://localhost:8081/api/shoppa/products")
    .then(res => res.json())
    .then(json => {
        productsJSON.push(json);
    })
    return productsJSON;
}

class ProductsPage extends Component {
  state = {
    searchValue: '',
    loadingInProgress: false, 
    loadingRetailersError: null, 
    addingRetailerError: null, 
    articles: [],
  }

  componentDidMount(){
    this.getProducts()
  }

  async getProducts(){
    this.setState({
      loadingInProgress: true, 
      loadingRetailersError: null 
    })

    setTimeout(() => {
      this.setState({
        loadingInProgress: false, 
        loadingRetailersError: null, 
        articles: this.state.articles.concat(MEAT,FRUITS,VEGETABLES)
      })
    }, 1000)
  }

  renderArticles(){
    let articles = this.state.articles;
    var categories = this.state.articles.reduce((itemsSoFar, {category, name, id, imgsrc}) => {
      if (!itemsSoFar[category]) itemsSoFar[category] = [];
      itemsSoFar[category].push({name, id, imgsrc});
      return itemsSoFar; 
    }, {});

    if(this.state.searchValue != ''){
      //Erst this.state.articles filtern und dann reducen?
      categories = this.state.articles.reduce((itemsSoFar, {category, name, id, imgsrc}) => {
        if (!itemsSoFar[category]) itemsSoFar[category] = [];
        if (name.toLowerCase().includes(this.state.searchValue.toLowerCase())) itemsSoFar[category].push({name, id, imgsrc});
        return itemsSoFar;
      }, {});
    }
  
   return Object.entries(categories).map(category => (
    <div>
    <h3>{category[0]} </h3>
    <Grid container
    direction ="row">
     {category[1].map(item => (
       <ProductListEntry
       id={item.id}
       category={item.category}
       name={item.name}
       imgsrc={item.imgsrc}
       style={{marginBottom:12}}
       />
     ))}
     </Grid>
  </div>
));
}

  render(){
    const classes = this.props.classes
    return(
      <Grid container 
        className={classes.root} xs={12}>

        <Grid container xs={12} spacing={2}>
        <Grid item xs={10}>
          <TextInputBar placeholder="search..." icon="search" onChange={(elem) => this.setState({ searchValue: elem.target.value})}/>
        </Grid>
        <Grid item xs={2}>
          <Link to="/create_article">
            <IconButton icon='add' />
          </Link>
        </Grid>

        </Grid> 
        <div style={{width: '100%'}}>
        
          {this.state.loadingInProgress ?
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress size={25} />
              </div>
            :  
              this.renderArticles()
            }
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(ProductsPage);

/**
 * Renders a list of ArticleEntry objects
 * 
 * @see ArticleEntry
 * 
 * @author [Pia Schmid](https://github.com/PiaSchmid)
 */

class ArticleList extends Component {
  state = {
    articles:[], 
    loadingInProgress: false, 
    loadingArticlesError: null,
    addingArticleError: null,  
  }

  componentDidMount(){
    this.getArticles()
  }

  /**Fetches ArticleBOs */
  async getArticles(){
    this.setState({
      loadingInProgress: true, 
      loadingArticlesError: null
    })

    // TODO: load from server (global API object)

  //   setTimeout(() => {
  //     this.setState({
  //       loadingInProgress: false, 
  //       loadingRetailersError: null, 
  //       fruits: FRUITS,
  //       vegetables: VEGETABLES
  //     })
  //   }, 10)
   }

  // renderArticles(){
  //   let articles = this.state.articles
  //   let searchValue = this.state.searchValue
  //   if(this.state.searchValue != ''){
  //     console.log(searchValue);
  //     articles = articles.filter((article) => article.name.toLowerCase().includes(this.state.searchValue.toLowerCase()))
  //   }

  //   return this.state.articles.map(article =>(
  //     <ProductListEntry
  //     id={article.id}
  //     category={article.category}
  //     name={article.name}
  //     style={{marginBottom:12}}
  //     />
  //   ))
  // }

//   render(){
//     return (
//       <div>
//         {this.state.loadingInProgress ?
//           <CircularProgress />
//         :
//           this.renderArticles()
//         }
//       </div>
//     )
//   }
 }
