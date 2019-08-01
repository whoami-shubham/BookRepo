import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button} from 'react-materialize';
import { addToCart,sortBooks,searchBooks } from './actions/cartActions'
import Ratings from './Ratings';

const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
}

 class Home extends Component{
      
    handleClick = (id)=>{
        
        this.props.addToCart(id); 
        
    }
    // componentWillMount(){
    //     fetch('http://starlord.hackerearth.com/books')
    //      .then(res => res.json())
    //      .then(res => {this.props.addToBooks(res); console.log(res)})
    //      .catch(err => console.log(err))
    // }
    sortbyRating = () => {
        
        this.props.sortByrating();
       
    }
    searchItems = (event) =>{
           const keyword = event.target.value;
           this.props.searchBook(keyword);
           console.log(keyword);
    }

    render(){
        let itemList = this.props.items.map(item=>{
            return(
                <div className="card" key={item.bookID}>
                        <div className="card-content">
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.bookID)}}><i className="material-icons">add</i></span>
                            <p>{item.title}</p>
                            <p>{item.authors}</p>
                            <Ratings average_rating={item.average_rating} key = {item.bookID}/>
                            <p><b>Price: {item.price}$</b></p>
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
                <h3 className="center">Available Books</h3>
                <Button onClick = {()=>{this.sortbyRating()}}>sort by rating</Button>
                <input type="text" name="search" placeholder="Search" onChange = {(event)=>{this.searchItems(event)}} />
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        sortByrating: ()=>{dispatch(sortBooks())},
        searchBook: (keyword) =>{dispatch(searchBooks(keyword))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)