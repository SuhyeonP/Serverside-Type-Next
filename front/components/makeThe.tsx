import useInput from "../exporthing/useInput";
import {useCallback, useRef} from "react";
import {Form, Input, InputNumber} from "antd";
import {dummyFactory} from "../css/layout";
import {generateDummyUser} from "../exporthing/dummy";

const MakeTheData=()=>{
    const [howMany,onChangeMany]=useInput(0);
    const inputEl=useRef(null)
    const makeRealData=useCallback(()=>{
        if(typeof howMany !== "number"){
            console.log(document.getElementById('howMuch').value)
            document.getElementById('howMuch').value='';
            inputEl.current.focus()
        }else{

        }
    },[howMany])
    return(
        <>
            <Form css={dummyFactory} onFinish={makeRealData}>
                <p className="explain-making">실제 Data는 user정보와, shop을 동시에 만들어야합니당
                    사진은 제가 좋아하는 무한도전 짤로 대신 넣을게요 :)
                </p>
                <label className="dummy-label" htmlFor="howMuch">만들 Data 개수&nbsp;:&nbsp;</label>
                <div>
                    <input min={0} max={10} defaultValue={2} ref={inputEl} placeholder="최대 10개!" id="howMuch" name="howMuch" value={howMany} onChange={onChangeMany}/>
                    <button type="submit">Make!</button>
                </div>
            </Form>
        </>
    )
}
export default MakeTheData;
