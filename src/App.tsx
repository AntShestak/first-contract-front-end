import { useState } from 'react'
import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useMainContract } from './hooks/useMainContract'

function App() {
  const {
    contract_address,
    contract_balance,
    counter_value,
    recent_sender,
    owner_address,
  } = useMainContract();

  return (
    <div className='App'>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Contract Address</b>
          <div className='Hint'>{contract_address?.slice(0,30) + "..."}</div>
          <b>Contract Balance</b>
          <div className='Hint'>{contract_balance}</div>
        </div>
        
        <div className='Card'>
          <b>Counter Value</b>
          <div className='Hint'>{counter_value ?? "Loading..."}</div>
          {/* <b>Recent Sender</b>
          <div className='Hint'>{recent_sender?.toString()}</div>
          <b>Owner Address</b>
          <div className='Hint'>{owner_address?.toString()} */}
        </div>

      </div>
    </div>
    
  )
}

export default App
