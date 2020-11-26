import {CheckSquareOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import React, {useCallback, useState} from "react";
import useInput from "../exporthing/useInput";

const MenuTable = ({setBag,setPrice,hi, master,userPriceBag,userMenuBag,ele,setBasket}) => {
    const [modifyMode, setModify] = useState(false);
    const [cp, onChangeCp] = useInput('');
    const [menuName, onChangeName] = useInput('');
    const changeMenu = useCallback((mn, mp) => {
        setModify(true);
        console.log(mn, mp, 'change');
    }, []);
    const deleteMenu = useCallback((mn, mp) => {
        console.log(mn, mp, 'delete');
    }, []);
    const pushMyBag = useCallback((mn: string, mp: number) => {
        setBag((prev) => {
            prev.push(mn);
            const put = document.createElement('p');
            put.textContent = mn;
            document.getElementById('userBag').append(put);
            return prev;
        });
        setPrice((prev) => {
            prev.push(mp);
            return prev;
        });
        setBasket(true);
    }, [userMenuBag, userPriceBag]);
    const gotoOrder = useCallback(() => {
        if (userPriceBag.length === 0) {
            alert('아무것도 선택하지 않으셨습니다.');
            return;
        }
        const menu = userMenuBag.join(',');
        const price: number = userPriceBag.reduce((sum, value) => sum + value);
        console.log(`${menu},${price}원 입니다.`);
        const lastCheck = confirm(`${menu},${price}원 입니다.`);
        if (lastCheck) {
            console.log('send to info');
            setBag([]);
            setPrice([]);
        } else {
            alert('취소되었습니다.');
            setBag([]);
            setPrice([]);
            setBasket(false);
            document.getElementById('userBag').innerHTML = null;
        }
    }, [userMenuBag, userPriceBag]);

    const changeTheMenu = useCallback(() => {
        console.log(`${menuName},${cp} right?`);
        setModify(false);
    }, [menuName, cp]);
    return (
        <div className="part-table" id={`rmt-${hi}`}>
            <h4>
                {!master && <p onClick={gotoOrder}>주문하기</p>}
                {hi}
            </h4>
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>price</th>
                    {master
                        ? <th>수정</th>
                        : <th>담기</th>}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {modifyMode
                        ? (
                            <>
                                <td><input value={menuName} onChange={onChangeName}/></td>
                                <td><input value={cp} onChange={onChangeCp} type="number"/></td>
                                <td onClick={changeTheMenu}>go</td>
                            </>
                        )
                        : (
                            <>
                                <td>name</td>
                                <td>price</td>
                            </>
                        )}
                    {master
                        ? (
                            <td>
                                <DeleteOutlined onClick={() => deleteMenu(ele.part, ele)}/>
                                <EditOutlined onClick={() => changeMenu(ele.part, ele)}/>
                            </td>
                        )
                        : <td><CheckSquareOutlined
                            onClick={() => pushMyBag(ele.part.toString(), Number(ele.part.length))}/></td>}
                </tr>
                </tbody>
            </table>
        </div>
    )
}
export default MenuTable;
