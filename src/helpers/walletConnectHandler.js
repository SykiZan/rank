import Web3 from "web3";
import { BscConnector } from '@binance-chain/bsc-connector'
import {login, setLoginStatus} from "../store/main/action";

function walletConnectHandler(type, dispatch, loginAction, boxAction){
    const metamaskHandler = async () =>{
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
        boxAction(false);
        dispatch(setLoginStatus({status: true, type: type, address: address}));
        return dispatch(login({data: {message, address, signature}, type: type}))
    }

    const binanceWalletHandler = async () =>{

        const bsc = new BscConnector({
            supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
        })

        await bsc.activate();
        await bsc.getAccount();
        await bsc.getChainId();

        const bsc_provider = await bsc.getProvider();
        let binanceConnectStatus = false;
        let binanceAddresses = false;
        let binanceAddress = false;

        await bsc_provider.isConnected().then(res=>{binanceConnectStatus = res});
        await bsc_provider.requestAddresses().then(res=>{binanceAddresses = res});

        if (binanceConnectStatus && binanceAddresses){
            binanceAddresses.forEach((item)=>{
                const startStr = item[0] + item[1];
                if (startStr === '0x'){
                    binanceAddress = item
                }
            })
        }
        if (binanceAddress){
            boxAction(false);
            dispatch(setLoginStatus({status: true, type: type, address: binanceAddress}));
        }
        // const web3 = new Web3(window.ethereum);
        // await web3.eth.requestAccounts(console.log);
        // await web3.eth.getAccounts(console.log);
    }
    const coinBaseWalletHandler = () =>{

    }
    const trustWalletHandler = () =>{

    }
    const walletConnectHandler = () =>{

    }
    const operaHandler = () =>{

    }
    switch (type){
        case 'metamask':
            metamaskHandler();
            break
        case 'binanceWallet':
            binanceWalletHandler();
            break
        case 'coinBaseWallet':
            coinBaseWalletHandler();
            break
        case 'trustWallet':
            trustWalletHandler();
            break
        case 'walletConnect':
            walletConnectHandler();
            break
        case 'opera':
            operaHandler();
            break
        default:
            return null
    }
}

export default walletConnectHandler;