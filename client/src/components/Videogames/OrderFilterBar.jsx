import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterCreate, orderByAlfabetOrRating } from "../../redux/actions";
import './OrderFilterBar.css'

const OrderFilterBar = ()=>{

    
    
    const [orderFilter, setOrderFilter] = useState({
        validateCreate:'All',
        orderAlphabet:"a-z",
        orderRating:"Rating"
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(filterCreate(orderFilter.validateCreate))
    },[orderFilter.validateCreate])

    // useEffect(()=>{
    //     dispatch(orderByAlfabetOrRating(orderFilter.orderAlphabet))
    // },[orderFilter.orderAlphabet])
    // useEffect(()=>{
    //     dispatch(orderByAlfabetOrRating(orderFilter.orderRating))
    // },[orderFilter.orderRating])
    
    const createInputHancler = ()=>{
        if(orderFilter.validateCreate === 'All') setOrderFilter({...orderFilter, validateCreate:'created'})
        if(orderFilter.validateCreate === 'created') setOrderFilter({...orderFilter, validateCreate:'notCreated'})
        if(orderFilter.validateCreate === 'notCreated') setOrderFilter({...orderFilter, validateCreate:'All'})
        console.log(orderFilter.validateCreate)
    }
    const alphabetInputHancler = ()=>{
        if(orderFilter.orderAlphabet === "a-z") {
            setOrderFilter({...orderFilter, orderAlphabet:'a-z ↓', orderRating:"Rating"})
            dispatch(orderByAlfabetOrRating('a-z ↓'))
        }
        if(orderFilter.orderAlphabet === 'a-z ↓') {
            setOrderFilter({...orderFilter, orderAlphabet:'a-z ↑', orderRating:"Rating"})
            dispatch(orderByAlfabetOrRating('a-z ↑'))
        }
        if(orderFilter.orderAlphabet === 'a-z ↑') {
            setOrderFilter({...orderFilter, orderAlphabet:"a-z", orderRating:"Rating"})
            dispatch(orderByAlfabetOrRating('a-z'))
        }
        console.log(orderFilter.orderAlphabet)
    }
    const ratingInputHancler = ()=>{
        if(orderFilter.orderRating === "Rating") {
            setOrderFilter({...orderFilter, orderRating:'Rating ↓', orderAlphabet:"a-z"})
            dispatch(orderByAlfabetOrRating('Rating ↓'))
        }
        if(orderFilter.orderRating === 'Rating ↓') {
            setOrderFilter({...orderFilter, orderRating:'Rating ↑', orderAlphabet:"a-z"})
            dispatch(orderByAlfabetOrRating('Rating ↑'))
        }
        if(orderFilter.orderRating === 'Rating ↑') {
            setOrderFilter({...orderFilter, orderRating:"Rating", orderAlphabet:"a-z"})
            dispatch(orderByAlfabetOrRating("Rating"))
        }
        console.log(orderFilter.orderRating)
    }


            // ↓ ↑ ↆ ⨻ ☆ ⁂ ⁎⁑
    return(
        <div id="orderFilterBar">
            <input 
            type="button" 
            value={orderFilter.validateCreate} 
            onClick={createInputHancler} 
            className={orderFilter.validateCreate !== "All"?'select':null}/>
            <input 
            type="button" 
            value={orderFilter.orderAlphabet} 
            onClick={alphabetInputHancler}
            className={orderFilter.orderAlphabet !== "a-z"?'select':null}/>
            <input 
            type="button" 
            value={orderFilter.orderRating} 
            onClick={ratingInputHancler}
            className={orderFilter.orderRating !== "Rating"?'select':null}/>
        </div>
    )
}


export default OrderFilterBar;