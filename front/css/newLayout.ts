import { css } from '@emotion/react';

const commonCss = css`
    *{
        margin:0;
        padding:0;
    }
    a{
        text-decoration:none;
    }
    ul,li{
        list-style:none;
    }
    margin:0;
    padding:0;
`;

const headerList = css`
    position:relative;
    .dummy-login{
        z-index:1;
        text-align:center;
        p{
            display:inline-block;
            cursor:pointer;
        }
    }
    .goto-home{
        position:absolute;
        z-index:22;
        font-size:22px;
        color:grey;
        p{
            font-size:0;
        }
    }
    .logout-button{
        display:block;
        text-align:center;
        z-index:1;
        padding-top:2vh;
        height:5vh;
        cursor:pointer;
        p{
            display:inline-block;
            padding:0 15px;
        }
    }
    .anticon-bell{
        position:absolute;
        z-index:22;
        font-size:25px;
        color:#ffc600;
    }
    .main-title{
        display:block;
        text-align:center;
    }
    .order-receipt{
       position:fixed;
       z-index:99;
       display:inline-block;
       background-color:#ffffffdb;
       box-shadow: 3px 3px 8px #0000009e;
       padding:13px;
       div{
            display:block;
            text-align:center;    
            overflow-y: scroll;
            height: 94%;
            .order-one{
                margin:10px 0;
                width:95%;
                height:40px;
                overflow:hidden;
                p{
                    display:inline-block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
       }
    }
    @media (min-width: 1024px){
        .dummy-login{
            p{
                width:73px;
                padding:10px 0;
                text-align:center;
            }
        }
        .logout-button{
            font-size:20px;
            text-decoration:underline;
        }
        .anticon-bell{
           left: 73vw;
           top: 81px; 
           font-size:30px;
        }
        .goto-home{
           left: 23vw;
           top: 78px; 
           font-size:30px;
        }
        .main-title{
            padding:25px 0;
            font-size:28px;
        }
        .order-receipt{
            width: 30vw;
            height: 20vh;
            top: 15vh;
            left: 61vw;
        }
    }
    @media (max-width: 1023px) and (min-width:678px){
        .dummy-login{
            li{
                
            }
        }
    }
    @media (max-width: 677px){
        .dummy-login{
            width:70vw;
            margin:0 auto;
            p{
                padding:10px 0;
                text-align:center;
            }
        }
        .goto-home{
           left: 23px;
           top: 8px; 
        }
        .anticon-bell{
           left: 84vw;
           top: 13px; 
        }
        .main-title{
            padding:10px 0;
            font-size:16px;
        }
        .order-receipt{
            width: 80vw;
            height: 60vh;
            top: 41px;
            left: 31px;
        }
    }
`;

const signup = css`
    display:block;
    margin: 2vh 0;
    div{
        padding:2vh;
        display:flex;
        justify-content:space-between;
        text-align:center;
        input{
            height:20px;
        }
    }
    .joinBtn{
        margin:2vh auto;
        display:block;
    }
   @media (min-width:678px){
        div{
            padding:2vh 27vw;
        }
        .joinBtn{
            width:90px;
        }
        
    }
    @media (max-width:677px){
        div{
        
        }
        .joinBtn{
            width:80px;
        }
    }
    
`;


export { commonCss, signup, headerList };
