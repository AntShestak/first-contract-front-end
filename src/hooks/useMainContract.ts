import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";

export function useMainContract() {
    const client = useTonClient();

    const [contractData, setContractData] = useState<null | {
        counter_value: number;
        recent_sender: Address;
        owner_address: Address;
    }>();

    const [balance, setBalance] = useState<null | number>(0);

    const mainContract = useAsyncInitialize(async() => {
        if (!client) {
            return;
        }
        const contract = new MainContract(
            Address.parse("EQBEFSQ6z3Sx9AfIRz-3BiAAW3J5_VxoHnNx5ClLbjOYPMEM")
        );
        return client.open(contract) as OpenedContract<MainContract>;
    }, [client]);

    useEffect(() => {
        async function getValue() {
            if (!mainContract) {
                console.log("MainContract is not initialized");
                return;
            } else {
                console.log("MainContract is initialized:", mainContract);
            }

            console.log("MainContract address:", mainContract.address);
            // console.log("MainContract provider:", mainContract.provider);
            console.log("MainContract methods:", Object.keys(mainContract));

            setContractData(null);


    
            try {
                console.log("Client:", client);
                console.log("Fetching data from contract...");
    
                // Debug contract method execution
                const val = await mainContract.getData();
                console.log("Contract data:", val);
    
                const { balance } = await mainContract.getBalance();
                console.log("Contract balance:", balance);
    
                setContractData({
                    counter_value: val.number,
                    recent_sender: val.recent_sender,
                    owner_address: val.owner_address,
                });
                setBalance(balance);
            } catch (error) {
                console.error("Error in getValue function:", error);
            }
        }
        getValue();
    }, [mainContract]);

    return { 
        contract_address: mainContract?.address.toString(),
        contract_balance: balance,
        ...contractData,
     };

}