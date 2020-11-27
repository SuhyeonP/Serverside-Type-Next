import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { shopControl } from '../css/layout';

const link = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTAxMjRfMjM4%2FMDAxNTQ4MjU1Nzk3Mjc2.M446tdO5AvW5XVvmH9r9FBcEZ1e2Sze604_5pEiq8Uog.YTfFcx2hliEiIkIjg9-3jBPSm7yxEGqWsmD4l_sUzo0g.JPEG.seooooya%2FIMG_2203.JPG&type=sc960_832';

const MainShops = ({ shopInfo }) => {
  const { me } = useSelector((state) => state.user);
  const { shopIsMe } = useSelector((state) => state.user);

  return (
    <li className="home-list" key={shopInfo.id}>
      <img src={link} />
      <table className="home-table">
        <tr>
          <th>가게이름:</th>
          <td>{shopInfo.shopName}</td>
        </tr>
        <tr>
          <th>종류:</th>
          <td>{shopInfo.part}</td>
        </tr>
        <tr>
          <th>가게주소:</th>
          <td>{shopInfo.address}</td>
        </tr>
        <tr>
          <th>대표메뉴:</th>
          <td> menu1</td>
          <td>menu2</td>
        </tr>
      </table>
      {me.shopMaster === 1 && shopInfo.master === me.id
        ? (
          <Link href={`/shop/${shopInfo.id}`}>
            <a css={shopControl}>take care</a>
          </Link>
        )
        : (
          <Link href={`/shop/${shopInfo.id}`}>
            <a className="goto-order">주문하러가기</a>
          </Link>
        )}
    </li>
  );
};

export default MainShops;
