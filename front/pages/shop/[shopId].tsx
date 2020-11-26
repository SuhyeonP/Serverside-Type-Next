import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ControlOutlined, EditOutlined } from '@ant-design/icons';
import { singleShop } from '../../css/shop';
import wrapper from "../../store/configureStore";
import {LOAD_USER_REQUEST} from "../../reducers/user";
import {LOAD_SHOP_REQUEST} from "../../reducers/shop";
import {END} from "@redux-saga/core";
import axios from 'axios';
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {GetServerSideProps} from 'next';
import PickMenu from "../../components/userPick";

export const menuPart = [{ part: 'main' }, { part: 'sub' }, { part: 'drink' }];// menu수정할수있게 todo

const Shop = () => {
  const router = useRouter();
  const { shopId } = router.query;
  const {single1Shop }=useSelector((state)=>state.shop);
  const { me } = useSelector((state)=>state.user);

  const [master, setMaster] = useState(false);
  const [seeN, setSeeN] = useState('123');



  useEffect(()=>{
    if(me.master&&me.master===shopId){
      setMaster(true);
    }
  },[me])

  const changeName = useCallback((part) => {
    const modiName = prompt('바꿀이름을 적어주세요');
    const checking:boolean = confirm(`${modiName}이 맞습니까?`);
    if (checking) {
      console.log(modiName);
      // todo dispatch로 요청보내고 성공하면, 새로고침
    } else {
      alert('취소되었습니다.');
    }
  }, []);


  const openTable = useCallback((part) => {
    document.getElementById(`rmt-${seeN}`).style.display = 'none';
    setSeeN(part.toString());
    document.getElementById(`rmt-${part}`).style.display = 'block';
  }, [seeN]);




  return (
    <>
      <div css={singleShop}>
        <h3>
          {single1Shop.shopName}&nbsp;
          {master && <ControlOutlined />}
          <br/>
          :{single1Shop.address}
        </h3>
        <input hidden id="rmt-123" />
        <div>
          <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20150410_215%2Fhakdiary_1428652773295KSpdV_JPEG%2F%25B9%25AB%25C7%25D1%25B5%25B5%25C0%25FC_%25C2%25A9_%25C1%25A4%25C7%25F6%25B5%25B7_%252815%2529.jpg&type=sc960_832" id="img-shop" />
          <ul>
            {menuPart.map((x) => (
              <li onClick={() => openTable(x.part)} key={x.part}>
                {x.part}
                &nbsp;
                {master && <EditOutlined onClick={() => changeName(x.part)} />}
              </li>
            ))}
          </ul>
          <PickMenu master={master}/>
        </div>
      </div>
    </>
  );
};
// todo menu table 페이징


export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(context);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_SHOP_REQUEST,
    data: context.params.shopId,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Shop;
