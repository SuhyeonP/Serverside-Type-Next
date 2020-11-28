import { css } from '@emotion/react';

const singleShopCss = css`
    h3,.address{
        display:block;
        text-align:center;
    }
    .address{
        margin:15px 0;
    }
    position:relative;
    .order-togo{
        position:absolute;
        border-radius:50%;
        font-size:22px;
        p{
            font-size:0;
        }
    }
    .shop-image{
        display:block;
        text-align:center;
        img{
            display:inline-block;
        }
    }
    .userBag{
        div{
            width:82%;
            margin:0 auto;
            p{
                display:inline-block;
                padding:4px;
            }
        }
        .empty-mybag{
            display:block;
            text-align:center;
            p{
                display:inline-block;
                text-decoration:underline;
            }
        }
    }
    .pagination{
        display:block;
        text-align:center;
        margin-top:20px;
        div{
            display:inline-flex;
            width:20vw;
            justify-content:space-between;
        }
    }
    @media (min-width: 1024px){
        .shop-image{
            img{
                width:26vw;
            }
        }
        .userBag{
            width:80vw;
            margin:10px auto;
            min-height:65px;
            background-color:#0000ff0f;
        }
        table{
            width: 80vw;
            margin: 10px auto;
            td{
                text-align:center;
                padding:14px 4px;
            }
        }
        .order-togo{
            left:86%;
            top:45%;
            width:40px;
            height:40px;
        }
    }
    @media (max-width: 1023px) and (min-width:678px){
        
    }
    @media (max-width: 677px){
        .shop-image{
            img{
                width:70vw;
            }
        }
        .userBag{
            width:80vw;
            margin:10px auto;
            min-height:32px;
            background-color:#0000ff0f;
        }
        table{
            width: 80vw;
            margin: 10px auto;
            tr{
                padding:10px 0;
            }
            td{
                text-align:center;
                padding:30px 0;
            }
        }
        .order-togo{
            left:86%;
            top:45%;
            width:40px;
            height:40px;
        }
    }
`;

export { singleShopCss };
