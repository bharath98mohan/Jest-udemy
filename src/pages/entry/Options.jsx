import axios from 'axios'
import { useEffect, useState } from 'react'
import ScoopOptions from './ScoopOption'
import Row from 'react-bootstrap/Row'

export default function Options({optionType}) {
    const [items, setItems] = useState([])

    //option type is 'scoops' or 'toppings'
    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
        .then(response => setItems(response.data))
        .catch((error) => {
            //Todo:
        })
    }, [optionType])

    const ItemComponent = optionType === 'scoops' ? ScoopOptions : null

    const optionItems = items.map(item => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
        ))
        
    return <Row>{optionItems}</Row>
}