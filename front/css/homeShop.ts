import { css } from '@emotion/react';

const mainHomeShops = css`
    text-align:center;
    .home-list{
        display:inline-flex;
        position:relative;
        box-shadow: 2px 3px 8px #44444459;
        position:relative;
        justify-content:space-between;
        background:no-repeat;
    }
    .goto-order{
        display:inline-block;
        position:absolute;
        font-size:0;
        border-radius:50%;
        border:1px solid blue;
    }
    .take-client{
        background-image: url(https://s.pstatic.net/static/www/img/uit/2020/sp_my_5fd9c4.png);
        background-size: 316px 278px;
        background-position: -8px -332px;
        width:20px;
        height:20px;
    }
    .take-shop{
        background-image: url(https://s.pstatic.net/static/www/img/uit/2020/sp_my_5fd9c4.png);
        background-size: 316px 278px;
        background-position: -279px -347px;
        width:16px;
        height:16px;
    }
    @media (min-width: 1024px){
        .home-list{
            width:54vw;
            padding:7px 0 0 32px;
            margin:30px 0;
            background:#fffff3;
            img{
                width:70px;
                height:70px;
                border-radius:50%;
                display:inline-block;
                margin-right:26px;
                &:hover{
                    transform:scale(1.3);
                }
            }
            .take-client,.take-shop{
                top:40%;
                left:99%;
            }
        }
    }
    @media (max-width: 1023px) and (min-width:678px){
        
    }
    @media (max-width: 677px){
        .home-list{
            width:75vw;
            padding:7px;
            background-image:url("https://mblogthumb-phinf.pstatic.net/MjAxODExMTlfMTgg/MDAxNTQyNTg5MjI1NTYz.3sUBfnwWvTKYe9AZXADttafmWkYCQv0sGfjGr47kyAwg.4mDnQfOZxDL4k0u7kFeOHdXOhGusYWk4jvyvAvAqGwIg.PNG.guehae95/5-2.png?type=w800");
            margin:25px 0;
            .mobile-img{
                width:70px;
                height:70px;
                border-radius:50%;
                display:inline-block;
                margin-right:26px;
            }
            .take-client,.take-shop{
                top:40%;
                left:96%;
            }
        }
        .other-img{
            display:none;
        }
    }
`;

export { mainHomeShops };
