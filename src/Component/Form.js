import React from 'react';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
// import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
  name: '',
  size: '',
  topping1: false,
  topping2: false,
  topping3: false,
  topping4: false,
  special: ''
}

// const Pizzas = (props) => {
//  console.log(props)
//  const {pizzas} = props

//  return (
//    <>
//       {pizzas.map(pizza => (
//        <div>
//             <h3>
//              {pizza.name}
//             </h3>
//             <p>
//              {`${pizza.name} pizza is a size ${pizza.size} with ${pizza.topping1} and ${pizza.topping2}. Your food is on the way`}
//             </p>
//        </div>
//       ))}
//    </>
//  )
//}


function Sam() {
 // const {newPizza} = props
 // const {ev} = useParams()
 // const history = useHistory()
 // const [pizzas, setPizzas] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues);
  const [unite, setUnite] = useState(true)
  const [error,setError] = useState({
    name: '',
    size: '',
    topping1: '',
    topping2: '',
    topping3: '',
    topping4: '',
    special: ''
  })

  const validateChange = (name, value) => {
    yup.reach(formSchema, name)
    .validate(value)
    .then(() =>{
      setError({...error, [name]: ""})
    })
    .catch((err)=>{
      setError({...error, [name]: err.errors[0]})
    })
  }

  const formSchema = yup.object().shape({
    name: yup.string().required('user is required').min(2,'name must be at least 2 characters'),
    size: yup.string(),
    tooping1: yup.boolean(),
    topping2: yup.boolean(),
    topping3: yup.boolean(),
    topping4: yup.boolean(),
    special: yup.string()
  })

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setUnite(!valid)) 
  }, [formValues])



  const onSubmit = (e) => {
    e.preventDefault();
  
   axios.post("https://reqres.in/api/orders", formValues)
     .then(res => {
      console.log(res)
      


      // newPizza(res.data)
    //  setFormValues()
    //  history.push("/pizza")
      
    })
  }
  function handleChange(name, value) {
    setFormValues({ ...formValues, [name]: value });
    
   // setPizzas({...pizzas, [name]: value});
    validateChange(name, value);
    
  };


  return (
    <div>
      <h1>Build your own pizza</h1>
      <form id='pizza-form' onSubmit={onSubmit}>
        <label id="n-input">Name:<span>{`${error.name}`}</span> 
          <input
            maxLength="15"
            placeholder="name"
            value={formValues.name}
            id="name-input"
            name="name"
            type="text"
            onChange={(e) => handleChange("name", e.target.value )}
          />
        </label>
        <label id='s-drop'>Choice of Size:<span>{`${error.size}`}</span>
          <select type='dropdown' id='size-dropdown' name='size' value={formValues.size} onChange={(e) => handleChange("size", e.target.value )} >
            <option value='6'>6</option>
            <option value='10'>10</option>
            <option value='12'>12</option>
            <option value='16'>16</option>
          </select>
        </label>
        <label>Add your Toppings</label>
        <div>
          <input type='checkbox' name="topping1" checked={formValues.topping1} onChange={(e)=> handleChange( 'topping1',e.target.checked )}/>
          <label for="topping1">Olives  <span>{`${error.topping1}`}</span></label>
        </div>
        <div>
          <input type='checkbox' name="topping2" checked={formValues.topping2}  onChange={(e)=> handleChange("topping2", e.target.checked )}/>
          <label for="topping2">Chicken <span>{`${error.topping2}`}</span></label>
        </div>
        <div>
          <input type='checkbox' name ="topping3" checked={formValues.topping3}  onChange={(e)=> handleChange("topping3", e.target.checked )} />
          <label for="topping3">Mushrooms</label>
        </div>
        <div>
        <input type='checkbox' name ="topping4" checked={formValues.topping4}  onChange={(e)=> handleChange("topping4", e.target.checked )}/>
          <label for="topping4">Beef </label>
        </div>  
        <label>Special Instructions:<span>{`${error.special}`}</span>
          <input
            type="text"
            placeholder="Special instructions"
            id="special-text"
            name="special"
            value={formValues.special}   
            onChange={(e) => handleChange("special", e.target.value )}      />
        </label>
        <button disabled={unite} type='Add to Order' id="order-button" > Add to Cart </button>
      </form>
    </div >
  )
}

export default Sam;