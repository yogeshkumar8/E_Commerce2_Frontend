import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import toast from "react-hot-toast";


const CartItem = ({item, itemIndex}) => {

  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id))
    toast.error("Item Removed")
  }

  return (
    <div className="flex- flex-col">
        <div className="flex gap-16 ml-8 mb-7 mt-8 ">
          <div className="">
            <img src={item.thumbnail} className="h-[200px] w-[280px]" alt="thumbnail"/>
          </div>

          <div className="w-[450px]">
                <div className="flex flex-col ">
                  <h1 className="text-gray-700  font-bold text-[22px] mb-5">{item.title}</h1>
                  <h1 className=" text-gray-700  font-normal mb-5 text-left text-[15px]">{item.description.split(" ").slice(0,22).join(" ") + ".."}</h1>
                </div>

                <div className="flex justify-between">
                    <div>
                      <p className="text-green-700 font-bold">${item.price}</p>
                    </div>
                    <div className="cursor-pointer "
                    onClick={removeFromCart}>
                      <MdDeleteOutline className="w-[30px] h-[30px] p-2 rounded-md bg-slate-200" />
                    </div>   
                </div>
               
          </div>


        </div>
        <div className="h-[1px] w-full  bg-black "></div>
    </div>
);
};

export default CartItem;
