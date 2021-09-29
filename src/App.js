import logo from "./logo.svg";
import { useEffect, useState } from "react";
import Web3 from "web3";

import "./App.css";
import { couldStartTrivia } from "typescript";

function App() {
  const contractAddress = "0xD2ea3Bf2257DdEeF744C3e8F99DeDA8C7F478DB1";
  const ABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "getRandomNumber",
      outputs: [
        {
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "randomResult",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "randomness",
          type: "uint256",
        },
      ],
      name: "rawFulfillRandomness",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const NODE_URL = "node url";
  const provider = new Web3.providers.HttpProvider(NODE_URL);
  const web3 = new Web3(provider);
  const PUBLIC_KEY = "key";
  const PRIVATE_KEY = "privatekey";

  const randomContract = new web3.eth.Contract(ABI, contractAddress);

  async function getnum() {
    //const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); // get latest nonce
    const gasEstimate = await randomContract.methods
      .getRandomNumber()
      .estimateGas(); // estimate gas

    // Create the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      //nonce: nonce,
      gas: gasEstimate,
      data: randomContract.methods.getRandomNumber().encodeABI(),
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log("The hash of your transaction is: ", hash);
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              );
            }
          }
        );
      })
      .catch((err) => {
        console.log("Promise failed:", err);
      });
  }

  async function shownum() {
    await getnum();
    const num = await randomContract.methods.randomResult().call();
    console.log(num);

    return num;
  }

  const rn = shownum();

  //console.log(rn);
  // pweb3.eth.accounts
  //   .signTransaction(
  //     {
  //       from: "0x8860f775285ab95cce8dec10aaee9dedef4aa756",
  //       to: "0xD2ea3Bf2257DdEeF744C3e8F99DeDA8C7F478DB1",
  //       gas: 2000000,
  //       data: random.methods.getRandomNumber().send().encodeABI,
  //     },
  //     "0xbe85e29627141273f6e7ef70979d983a1fed8d8cf1feb7c9dc1013ea340a800d"
  //   )
  //   .then(console.log);

  // let web3 = new Web3(window.ethereum);
  // let accounts;
  // async function loadWeb3() {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //     accounts = await web3.eth.getAccounts();
  //     console.log(accounts[0]);
  //   }
  // }

  // async function load() {
  //   await loadWeb3();
  //   window.contract = await loadContract();
  // }

  // load();

  // async function loadContract() {
  //   return await new window.web3.eth.Contract(ABI, contractAddress);
  // }

  // async function rnum() {
  //   //updateStatus('fetching Cool Number.....');
  //   await window.contract.methods.getRandomNumber().send({ from: accounts[0] });
  //   const num = await window.contract.methods.randomResult().call();
  //   console.log(num);
  // }

  //   const [imgdata, setdata] = useState([]);

  //   const getData = async () => {
  //     //const options = { method: "GET" };

  //     const options = { method: "GET" };

  //     fetch(
  //       "https://api.opensea.io/api/v1/assets?&order_by=sale_count&order_direction=desc&offset=5&limit=50",
  //       options
  //     )
  //       .then((response) => response.json())
  //       .then((response) => {
  //         //console.log(response.assets[0].permalink);

  //         var data = response.assets.map((item) => {
  //           return {
  //             img: item.image_preview_url,
  //             link: item.permalink,
  //           };
  //         });
  //         setdata(data);

  //         //console.log(imgdata);

  //         // const imglinks = g.map((item) => {
  //         //   imgurls.push(item.image_url);
  //         // });

  //         //console.log(imgurls);

  //         //console.log(response.collections[100].stats['one_day_volume']);
  //       })

  //       .catch((err) => console.error(err));
  //   };
  //  var showd;
  //   useEffect(() => {
  //   getData();

  //   }, []);

  //   useEffect(() => {
  //   //console.log(imgdata);
  //   showd =imgdata;
  //   console.log(showd[0]);
  //   }, [imgdata]);
  // //console.log(imgdata);

  return (
    <div className="App">
      NFT Gallery
      <button onClick={shownum}>get num</button>
      {/*       
            <div className ="gallery">
               {
                 imgdata.map((item,index) =>{
                   return(
                     <div className="pics" key={index}>
                      <a href = {item.link}>
                      <img src = {item.img} />
                      </a>
                     </div>
                   )
                 })
               } 
            </div> */}
    </div>
  );
}

export default App;
