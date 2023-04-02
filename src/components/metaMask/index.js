import React from "react";
import Web3 from "web3";
import Styles from './styles.module.scss'
import {useDispatch} from "react-redux";
import {login} from "../../store/main/action";

const MetaMask = (props) => {
    const {display, boxEvent} = props;
    // const [address, setAddress] = useState('');
    // const [balance, setBalance] = useState(null);

    // Button handler button for handling a
    // request event for metamask
    // const btnHandler = () => {
    //     loginWeb3()
    //
    //     // Asking if metamask is already present or not
    //     if (window.ethereum) {
    //
    //         // res[0] for fetching a first wallet
    //         window.ethereum
    //             .request({ method: "eth_requestAccounts" })
    //             .then((res) => accountChangeHandler(res[0]));
    //     } else {
    //         alert("install metamask extension!!");
    //     }
    // };
    //
    // // getbalance function for getting a balance in
    // // a right format with help of ethers
    // const getbalance = (address) => {
    //
    //     // Requesting balance method
    //     window.ethereum
    //         .request({
    //             method: "eth_getBalance",
    //             params: [address, "latest"]
    //         })
    //         .then((balance) => {
    //             // Setting balance
    //             setBalance(ethers.utils.formatEther(balance))
    //         });
    // };

    // // Function for getting handling all events
    // const accountChangeHandler = (account) => {
    //     // Setting an address data
    //     setAddress(account);
    //
    //     // Setting a balance
    //     getbalance(account);
    // };

    const dispatch = useDispatch();

    const loginWeb3 = async () =>{
        if (! window.ethereum) {
            alert('MetaMask not detected. Please try again from a MetaMask enabled browser.')
        }

        const web3 = new Web3(window.ethereum);

        const message = [
            "I have read and accept the terms and conditions (https://example.org/tos) of this app.",
            "Please sign me in!"
        ].join("\n")

        const address = (await web3.eth.requestAccounts())[0]
        const signature = await web3.eth.personal.sign(message, address)

        boxEvent(false);
        return dispatch(login({ message, address, signature }))
    }

    return display ?(
        <section className={`${Styles.container}`}>
            <div className={`${Styles.wrap}`}>
                {/*<div className={`${Styles.address}`}>Address: {address}</div>*/}
                {/*<div className={`${Styles.balance}`}>Balance: {balance}</div>*/}
                <div className={`${Styles.button}`} onClick={()=>{loginWeb3()}}>
                    Connect to wallet
                </div>
            </div>
        </section>
    ) : null;
};

export default MetaMask;



