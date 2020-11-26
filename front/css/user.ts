import { css } from '@emotion/react';

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

const userOrShop = css`
    display:block;
    margin:3vh auto;
    
    &:hover{
        color:green;
    }
    @media (min-width:678px){
        width:30vh;
    }
    @media (max-width: 677px){
        width:60vw;
        border:1px solid grey;
        background:#0000ff1c;
        border-radius:3px;
    }
`;

export { signup, userOrShop };
