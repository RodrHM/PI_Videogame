import './PageNav.css'
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { pageChange } from "../../redux/actions"


const PageNav = (props)=>{

    const [state, setState] = useState(1)

    useEffect(()=> props.pageChange(state) ,[state, props])

    const pageChangeHandlerByArrow = (num)=>{
        try {
            const result = parseInt(state)+parseInt(num);
            const Length = Math.ceil(props.videogamesLength/15) 
            if(result<1 || result>Length) throw new Error('Nro de pagina invalido')
            // console.log(state+num) // ================== cONTROL DE PAGINADO=================
            setState(state+num)
        } catch (error) {
            // console.log({state}) // ================== cONTROL DE PAGINADO=================
            console.log(error.message)
        }
    }
    const pageChangeHandlerByNumber =  ({target})=>{
        try {
            const value = parseInt(target.value)
            const Length = Math.ceil(props.videogamesLength/15) 
            if(value<0 || value>Length) throw new Error('Nro de pagina invalido')
            // console.log(value) // ================== cONTROL DE PAGINADO=================
            setState(value)
        } catch (error) {
            // console.log({state}) // ================== cONTROL DE PAGINADO=================
            alert(error.message)
        }
    }
    // console.log(props) // ================== cONTROL DE PAGINADO=================

    return(
        <div id="pageNav">
            <input type='button' onClick={()=>pageChangeHandlerByArrow(-1)} value='Prev' className='searchArrow'/>
            <input type="button" onClick={pageChangeHandlerByNumber} value='1' className='searchNum'/>
            <input type="button" onClick={pageChangeHandlerByNumber} value='2' className='searchNum'/>
            <input type="button" onClick={pageChangeHandlerByNumber} value='3' className='searchNum'/>
            <input type="button" onClick={pageChangeHandlerByNumber} value='4' className='searchNum'/>
            <input type="button" onClick={pageChangeHandlerByNumber} value='5' className='searchNum'/>
            <input type="button" onClick={pageChangeHandlerByNumber} value='6' className='searchNum'/>
            <input type="button" onClick={pageChangeHandlerByNumber} value='7' className='searchNum'/>
            <input type='button' onClick={()=>pageChangeHandlerByArrow(1)} value='Next' className='searchArrow'/>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return{
        videogamesLength:state.videogames.length,
        pageState:state.pageState,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        pageChange:(num)=> dispatch(pageChange(num))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PageNav)
