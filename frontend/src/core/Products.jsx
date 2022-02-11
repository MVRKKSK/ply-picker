import React , {useState , useEffect} from 'react'

import { getProducts } from './apiCore'

const Products = () => {

    const [productByList, setProductByList] = useState([])
    const [error, setError] = useState(false)

    const loadProductsBySell = () => {
        getProducts("Sold").then(data => {
            if(data.error){
                setError(true)
                console.log(data.error)
            }
            else{
                setProductByList(data)
            }
        })
    }

    useEffect(()=>{
       loadProductsBySell()
    },[])

  return (
    <div>
        {productByList.map((product)=>(
            <>
            {product.Product_Name}
            </>
        ))}
    </div>
  )
}

export default Products