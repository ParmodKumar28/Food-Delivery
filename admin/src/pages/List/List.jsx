import React, { useEffect } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

function List() {

    const url = 'http://localhost:4000';
    const [list, setList] = React.useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        console.log(response.data);
        if(response.data.success){
            setList(response.data.data);
        }else{
            toast.error("Error");
        }
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <p>Price</p>
                    <p>Action</p>
                </div>

                {list.map((item, index) => (
                    <div className="list-table-format" key={index}>
                        <img src={`${url}/images/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <p className='cursor'>X</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default List