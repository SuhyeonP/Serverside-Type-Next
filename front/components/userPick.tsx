import MenuTable from "./menuTable";
import React, {useCallback, useState} from "react";
import {menuPart} from "../pages/shop/[shopId]";

const PickMenu=({master})=>{
    const [basket, setBasket] = useState(false);
    const [userMenuBag, setBag] = useState<string[]>([]);
    const [userPriceBag, setPrice] = useState<number[]>([]);

    const EmptyBasket = useCallback(() => {
        document.getElementById('userBag').innerHTML = null;
        setBag([]);
        setPrice([]);
        setBasket(false);
    }, []);

    return(
        <>
            <div id="userBag" className="userBag" />
            {basket && <button onClick={EmptyBasket}>비우기</button>}
            {menuPart.map((ele) => {
                const hi = ele.part;
                return (
                    <>
                        <MenuTable setBasket={setBasket} setPrice={setPrice} setBag={setBag} ele={ele} hi={hi} master={master} userMenuBag={userMenuBag} userPriceBag={userPriceBag}/>
                    </>
                );
            })}
        </>
    )
}
export default PickMenu;
