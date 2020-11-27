import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const link = 'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/121290742_1052217431880517_4691232855035176256_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=RolpqzL8yAIAX9u1loJ&tp=1&oh=13ed1c79d64ca87c01f1a003b9541276&oe=5FE9238C 640w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/121290742_1052217431880517_4691232855035176256_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=RolpqzL8yAIAX9u1loJ&tp=1&oh=13ed1c79d64ca87c01f1a003b9541276&oe=5FE9238C 750w,https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/121290742_1052217431880517_4691232855035176256_n.jpg?_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=RolpqzL8yAIAX9u1loJ&tp=1&oh=13ed1c79d64ca87c01f1a003b9541276&oe=5FE9238C';

const MainShops = ({ shopInfo }) => {
  const { me } = useSelector((state:any) => state.user);
  const { shopIsMe } = useSelector((state:any) => state.user);

  return (
    <li className="home-list" key={shopInfo.id}>
      <div>
        <table className="home-table">
          <tr>
            <th>가게이름:</th>
            <td>{shopInfo.shopName}</td>
          </tr>
          <tr>
            <th>가게주소:</th>
            <td>{shopInfo.address}</td>
          </tr>
          <tr>
            <th>대표메뉴:</th>
            <td> menu1</td>
          </tr>
        </table>
      </div>
      <div>
        <img src={link} className="mobile-img" />
        <img src={link} className="other-img" />
        <img src={link} className="other-img" />
      </div>
      {me.shopMaster === 1 && shopInfo.master === me.id
        ? (
          <Link href={`/shop/${shopInfo.id}`}>
            <a className="goto-order take-shop">take care</a>
          </Link>
        )
        : (
          <Link href={`/shop/${shopInfo.id}`}>
            <a className="goto-order take-client">주문하러가기</a>
          </Link>
        )}
    </li>
  );
};

export default MainShops;
