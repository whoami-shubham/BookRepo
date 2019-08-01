import React, { Component } from 'react'

export default class Ratings extends Component {
    render() {
         let full_rating = Math.floor(this.props.average_rating);
         let fractional_rating = Math.ceil(this.props.average_rating)-full_rating;
         let f_ratings = [],fra_ratings = [];
         for(let i = 0;i<full_rating;i++){
            f_ratings.push(<span className="fa fa-star checked"></span>)
         }
         if(fractional_rating>0){
             fra_ratings.push(<i className="fa fa-star-half-o"></i>)
         }
         while(f_ratings.length+fra_ratings.length<5){
             fra_ratings.push(<span className="fa fa-star-o"></span>)
         }
        return (
            <div>
               {f_ratings}
                {fra_ratings}
            </div>
        )
    }
}
