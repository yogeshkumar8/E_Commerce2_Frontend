import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../component/CartItem";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";


const Cart = () => {

  const {cart} = useSelector((state) => state)
  console.log("Printing Cart");
  console.log(cart)

  const[totalAmaont,setTotalAmount] = useState(0);  

  useEffect( () =>{
    setTotalAmount(cart.reduce( (acc ,curr) => acc + curr.price,0));
  },[cart])
  return (

    <div>

    <div className="">
		<Navbar/>
      {
        cart.length > 0 ?
        (<div className="flex max-w-6xl p-4 mx-auto space-x-5 space-y-10 min-h-[80vh] ">

          <div>
            {
              cart.map( (item ,index) => {
                return <CartItem key={item.id} item ={item} itemIndex={index}/>
              })
            }
          </div>

          <div className="flex flex-col gap-[330px] w-[400px]">
              <div>

                <div className="text-gray-800 font-bold uppercase">Your Cart</div>
                <div className="text-gray-800 text-[30px] font-bold uppercase">Summary</div>

                <p className="text-gray-700 font-bold mt-3"><span>Total Items : {cart.length}</span></p>
              </div>

              <div>
                  <p className="text-gray-700 font-bold">
                    Total Amount : <span className="text-black font-bold">${totalAmaont}</span>
                  </p>
                  <button className="bg-yellow-700 rounded-md p-2 w-full font-bold mt-4 text-white">CheckOut Now</button>
              </div>
            </div>

        </div>):
        (<div className="flex flex-col h-screen justify-center items-center w-full">
          <h1 className="text-gray-700 font-bold">Your cart empty!</h1>
          <Link to={"/home"}>
            <button className="bg-green-700 text-white p-2 mt-4 rounded-md w-[120px] uppercase text-sm font-bold">
              Shop Now
            </button>
          </Link>
        </div>)
      }
    </div>

    </div>
  );
};

export default Cart;
