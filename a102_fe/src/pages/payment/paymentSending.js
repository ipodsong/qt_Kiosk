import React,{useState,useEffect} from 'react';
import heart from '../../assets/images/doubleheart.png'
// import heart from '../../assets/images/doubleheart.png'
// import like from '../../assets/images/like.png'
// import handheart from '../../assets/images/handheart.png'

const PaymentSending = (props) => {

    const [show, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
          }, 1500);
    },[show]);

    return (
        <div className={`loader-wrapper ${show ? '' : 'loderhide'}`}>
            <div className="typewriter">
                <h1>
                <img src={heart} alt="doubleheart"/>&nbsp;
                 따뜻한 마음 전송 중...&nbsp;
                <img src={heart} alt="doubleheart"/>
                </h1>
            </div>
        </div>
    );
}

export default PaymentSending;