import React from "react";
import { Link, Route } from 'react-router-dom';
import Form from './Component/Form'

// function Navigate() {
  //let history = useHistory();

//  function navClick() {
//    history.push("/");
//  }

//  return (
 //   <nav>
 //     < to="/pizza" onClick={navClick}>
 //       Navigate!
//             </>
//</nav>
//  );
//}







const App = () => {
  

  return (
    <div className="Sam">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pizza" id="order-pizza">Pizza</Link>
      </nav>
          <Route exact path= "/pizza">
            <Form 

         //   newPizza= {newPizza} pizzas={pizzas}
            />
          </Route>
    </div>

  )
}

export default App;
