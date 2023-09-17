
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
import '../components/styles.css';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
    let data = useCart();

    let navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const priceRef = useRef();
    // const [btnEnable, setBtnEnable] = useState(false);
    // let totval = 0
    // let price = Object.values(options).map((value) => {
    //   return parseInt(value, 10);
    // });
    let options = props.options;
    let priceOptions = Object.keys(options);
    let foodItem = props.item;
    const dispatch = useDispatchCart();
    const handleClick = () => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
    }

    const handleQty = (e) => {
        setQty(e.target.value);
    }
    const handleOptions = (e) => {
        setSize(e.target.value);
    };

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === foodItem._id) {
                food = item;

                break;
            }
        }

        console.log(food)
        console.log(new Date())
        if (food !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
        console.log(data)


    };
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    // useEffect(()=>{
    // checkBtn();
    //   },[data])

    let finalPrice = qty * parseInt(options[size]);   //This is where Price is changing
    // totval += finalPrice;
    // console.log(totval)

    const cardStyle = {
        width: "14rem",
        maxHeight: "360px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Align items vertically
    };

    // Custom CSS styles for dropdown selects and buttons
    const selectStyle = {
        width: "50px",
        height: "30px",
        backgroundColor: "#f1f1f1",
        color: "black",
        borderRadius: "5px",
    };

    const selectStyle1 = {
        width: "30px",
        height: "30px",
        backgroundColor: "#f1f1f1",
        color: "black",
        borderRadius: "5px",
    };

    const buttonStyle = {
        fontSize: "12px",
        alignSelf: "flex-end",
        marginTop: "8px",
        color: "black",
        backgroundColor: "#f1f1f1" // Add margin to separate from total price
    };

    const totalPriceStyle = {
        fontSize: "16px",
        fontWeight: "bold",
        color: "black",
        marginTop: "10px", // Add margin to separate from button
    };


    return (
        <div>

            <div className="card mt-3 gradient-bg text-dark" style={cardStyle}>
                <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodName}</h5>
                    {/* <p className="card-text">This is some random text. This is description.</p> */}
                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                        <select className="text-black rounded" style={selectStyle1} onClick={handleClick} onChange={handleQty}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>)
                            })}
                        </select>
                        <select className="text-black rounded" style={selectStyle} ref={priceRef} onChange={handleOptions}>
                            {priceOptions.map((i) => {
                                return <option key={i} value={i}>{i}</option>;
                            })}
                        </select>

                        <div className=' d-inline ms-2 h-100 w-20 fs-5' style={totalPriceStyle} >
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className={`btn btn-success justify-center ms-2 `} style={buttonStyle} onClick={handleAddToCart}>Add to Cart</button>
                    {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
                </div>
            </div>
        </div>
    )
}
//