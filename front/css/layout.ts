import { css } from '@emotion/react';

const post = ['pink', 'yellow', 'mint', 'brown'];
const headerList = css`
    display:block;
    width:80vw;
    margin:20px auto;
    padding:2vh 0;
    list-style:none;
    text-align:center;
    li{
        display:inline-block;
        padding:6px;
        margin:2vh 1vw;
        background-color:#b7b7b7;
        border:1px solid black;
        border-radius:6px;
        cursor:pointer;
       }
       
   
   .shop{
    color:white;
    font-weight:900;
   }
`;
const attend = css`
    display:block;
    text-align:center;
    font-size:14px;
`;
const mainSection = css`
      display:block;
      width:80vw;
      margin:2vh auto 4vh;
      
      ul{
        list-style:none;
        padding:0;
        text-align:center;
        position:relative;
      }
      .home-list{
        width:40vh;
        height:40vh;
        display:inline-block;
        padding:2vh 0;
        background-image:url("https://mblogthumb-phinf.pstatic.net/MjAxODExMTlfMTgg/MDAxNTQyNTg5MjI1NTYz.3sUBfnwWvTKYe9AZXADttafmWkYCQv0sGfjGr47kyAwg.4mDnQfOZxDL4k0u7kFeOHdXOhGusYWk4jvyvAvAqGwIg.PNG.guehae95/5-2.png?type=w800");
        position:relative;
        box-shadow: 2px 3px 8px #44444459;
      }
      a{
        display:inline-block;
        text-decoration:none;
      }
      img{
            width:90%;
            margin-bottom:1vh;
      }
      .home-table{
        display:block;
        width:90%;
        text-align:left;
      }
      .goto-order{
        font-size:0;
        display:inline-block;
        width:20px;
        height:20px;
        background-color:inherit;
        border:0;
        background-image: url(https://s.pstatic.net/static/www/img/uit/2020/sp_my_5fd9c4.png);
        background-size: 316px 278px;
        background-position: -8px -332px;
        position: absolute;
        right: 1vh;
        bottom: 1vh;
        border-radius: 50%;
        &:hover{
            transform:scale(1.3)
        }
      }
      .dummy-youwant{
        display:block;
        text-align:center;
      }
      .dummyButton{
        display:flex;
        justify-content:center;
        button{
        display:inline-block;
        margin: 0 15px;
        text-align:center;
        }
      }
      @media (min-width: 1024px){
        th{
            width:12vh;
          }  
        .home-list{
            margin:4vh 2vh;
            box-shadow: 2px 3px 8px #44444459;
            padding-top:17px;
            padding-bottom:0;
        }
        table{
            margin:1vh auto;
        }
        td{
            line-height:26px;
            font-size:19px;
          }
      }
      @media (max-width: 1023px) and (min-width:678px){
        td{
            line-height:22px;
          }
          
          th{
            width:12vh;
          }  
      }
      @media (max-width: 677px){
        .home-list{
            margin:2vh 0;
        }
        td{
            line-height:18px;
          }
        img{
            margin-bottom:0;
        }
        .home-table{
            margin:1vh;
        }
      }
      @media (min-height:800px) and (max-height:850px){
        .home-list{
        width:30vh;
        height:30vh;
        }
      }
`;
const shopControl = css`
        display:inline-block;
        width:15px;
        height:15px;
        background-color:inherit;
        border:0;
        font-size:0;
        background-image: url(https://s.pstatic.net/static/www/img/uit/2020/sp_my_5fd9c4.png);
        background-size: 316px 278px;
        background-position: -280px -348px;
        position:absolute;
        right:1vh;
        bottom:1vh;
        
`;
const logout = css`
    display:block;
    z-index:1;
    margin-top:3vh;
    text-align:center;
    cursor:pointer;
`;
const gotoHome = css`
    position:absolute;
    cursor:pointer;
    z-index:4;
    p{
        font-size:0;
    }
    @media (min-width:1024px){
        top:4vh;
        left:19vw;
        font-size:40px;
        color:brown;
    }
    @media (max-width: 1023px) and (min-width:678px){}
    @media (max-width:677px){
        top:3vh;
        left:7vw;
        font-size:22px;
        color:brown;
    }
`;

const makeFactory=css`
    position:absolute;
    cursor:pointer;
    .small-make{
        font-size:12px;
        margin:0;
    }
    @media (min-width:1024px){
        top:4vh;
        right:19vw;
        font-size:40px;
        color:brown;
    }
    @media (max-width: 1023px) and (min-width:678px){}
    @media (max-width:677px){
        top:3vh;
        right:7vw;
        font-size:22px;
        color:brown;
        .small-make{
        margin-top:2px;
        }
    }
`

const dummyFactory=css`
    .explain-making{
        display:block;
        text-align:center;
    }
    .ant-input-number{
        display:inline-block;
    }
    .dummy-label{
        padding:12px 0;
        display:block;
        text-align:center;
    }
    .ant-input-number-handler-wrap{
        display:none;
    }
    @media (min-width: 1024px){
    
    }
    @media (max-width: 1023px) and (min-width:678px){
    
    }
    @media (max-width:677px){
        .explain-making{
            margin:0 -15px;
        }
    }
`

const user = ['user1', 'user2', 'user3'];
const shop = ['shop1', 'shop2', 'shop3', 'shop4', 'shop5', 'shop6'];
export { makeFactory, headerList, user, shop, attend, mainSection, shopControl, logout, gotoHome, dummyFactory };
