import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";


const Product = ({post}) => {

  const {cart} = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () =>{
    dispatch(add(post))
    toast.success("Item added to cart");
  }
  const removeFromCart = () => {
    dispatch(remove(post.id))
    toast.error("Item remove from cart")
  }

  return (
    <div  className="flex flex-col items-center justify-between
	 hover:scale-105 transition duration-300 ease-in gap-3 p-4 mt-9 ml-5 rounded-xl border-[2px]">

        <div className="text-gray-700 text-lg font-semibold text-left truncate
        w-70 mt-1">
            <p>{post.title}</p>
        </div>

        <div>
		<p className=" w-60 text-gray-500 font-normal text-left text-[13px]">{post.description.split(" ").slice(0,16).join(" ") + "."}</p>
        </div>

        <div className="h-[200px]">
            <img src={post.thumbnail} alt='images'className="h-full w-full"></img>
        </div>

		<div >
			<p>{`Min At ${post.discountPercentage} %`}</p>	
        </div>
        <div className="flex justify-between gap-12 items-center w-full mt-5">
            <div className="flex items-start place-content-start justify-start">
              <p className="text-blue-900">${post.price}</p>
            </div>



            <div>
              {
                cart.some( (p) => p.id === post.id) ?
                (<button className="text-gray-700 border-2 border-gray-700 rounded-md font-semibold
                text-[12px] p-1 px-3 uppercase
                hover:bg-gray-700 hover:text-white transition duration-300 ease-in" onClick={removeFromCart}>
                  Remove Item
                </button>):
                (<button className="text-gray-700 border-2 border-gray-700 rounded-md font-semibold
                text-[12px] p-1 px-3 uppercase hover:bg-gray-700
                hover:text-white transition duration-300 ease-in"  onClick={addToCart}>
                  Add to Cart
                </button>)
              }
            </div>
        </div>
    </div>
  )
}

export default Product



