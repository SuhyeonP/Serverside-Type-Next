import {shopControl} from "../css/layout";
import Link from "next/link";
import React, {useCallback} from "react";
import Router from "next/router";
import {useSelector} from "react-redux";

const JoinBtn=({shopInfo})=>{
    const {shopIsMe}=useSelector((state)=>state.user)
    const MyShopTest=useCallback((shopId:number)=>{
        Router.push(`/shop/${shopId}`);
    },[])
    return(
        <>
            {shopInfo === shopIsMe.master
                ? (
                    <button onClick={()=>MyShopTest(Number(shopInfo.master))} type="button" css={shopControl} />
                )
                : (
                    null
                )}
        </>
    )
};

export default JoinBtn;
