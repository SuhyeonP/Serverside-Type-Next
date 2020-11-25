import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import AppLayout from '../components/Layout';
import { shopControl } from '../css/layout';

import { LOAD_MAIN_SHOPS_REQUEST } from '../reducers/shop';
import { LOAD_USER_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
const link = 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTAxMjRfMjM4%2FMDAxNTQ4MjU1Nzk3Mjc2.M446tdO5AvW5XVvmH9r9FBcEZ1e2Sze604_5pEiq8Uog.YTfFcx2hliEiIkIjg9-3jBPSm7yxEGqWsmD4l_sUzo0g.JPEG.seooooya%2FIMG_2203.JPG&type=sc960_832';
const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainShops, hasMoreShop } = useSelector((state) => state.shop);

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMoreShop) {
                    // dispatch({
                    //   type: LOAD_MAIN_SHOPS_REQUEST,
                    // });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreShop, mainShops.length]);

    return (
        <>
            {me && (
                <ul>
                    {mainShops.map((ele) => (
                        <>
                            <li className="home-list" key={ele.id}>
                                <img src={link} />
                                <table className="home-table">
                                    <tr>
                                        <th>가게이름:</th>
                                        <td>{ele.shopName}</td>
                                    </tr>
                                    <tr>
                                        <th>종류:</th>
                                        <td>{ele.part}</td>
                                    </tr>
                                    <tr>
                                        <th>가게주소:</th>
                                        <td>{ele.address}</td>
                                    </tr>
                                    <tr>
                                        <th>대표메뉴:</th>
                                        <td> menu1</td>
                                        <td>menu2</td>
                                    </tr>
                                </table>
                                {me.id === ele.master
                                    ? (
                                        <button type="button" css={shopControl} />
                                    )
                                    : (
                                        <Link href="/shop/1">
                                            <a className="goto-order">주문하러가기</a>
                                        </Link>
                                    )}
                            </li>
                        </>
                    ))}
                </ul>
            )}
            {!me&&<p>로그인 이후 이용이 가능합니다.</p>}
        </>
    );
};

export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_MAIN_SHOPS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Home;
