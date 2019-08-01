import React, { Component } from 'react';
import { Badge} from 'react-materialize';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
 class Navbar extends Component {
    render(){
             
            return(
                <nav className="nav-wrapper">
                    <div className="container">
                        <Link to="/home" className="brand-logo">Book Repo</Link>
                        
                        <ul className="right">
                            <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                            <li><Link to="/cart"><Badge className="white" items>{this.props.total}</Badge></Link></li>
                        </ul>
                    </div>
                </nav>
       
            
        )
    }
}

const mapStateToProps = (state)=>{
    return {
      total: state.addedItems.length
    }
  }

export default connect(mapStateToProps)(Navbar);