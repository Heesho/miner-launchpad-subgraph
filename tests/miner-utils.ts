import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Miner__Mined,
  Miner__MinerFee,
  Miner__Minted,
  Miner__ProviderFee,
  Miner__TreasuryFee,
  Miner__TreasurySet,
  OwnershipTransferred
} from "../generated/Miner/Miner"

export function createMiner__MinedEvent(
  sender: Address,
  miner: Address,
  price: BigInt,
  uri: string
): Miner__Mined {
  let minerMinedEvent = changetype<Miner__Mined>(newMockEvent())

  minerMinedEvent.parameters = new Array()

  minerMinedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  minerMinedEvent.parameters.push(
    new ethereum.EventParam("miner", ethereum.Value.fromAddress(miner))
  )
  minerMinedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  minerMinedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return minerMinedEvent
}

export function createMiner__MinerFeeEvent(
  miner: Address,
  amount: BigInt
): Miner__MinerFee {
  let minerMinerFeeEvent = changetype<Miner__MinerFee>(newMockEvent())

  minerMinerFeeEvent.parameters = new Array()

  minerMinerFeeEvent.parameters.push(
    new ethereum.EventParam("miner", ethereum.Value.fromAddress(miner))
  )
  minerMinerFeeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return minerMinerFeeEvent
}

export function createMiner__MintedEvent(
  miner: Address,
  amount: BigInt
): Miner__Minted {
  let minerMintedEvent = changetype<Miner__Minted>(newMockEvent())

  minerMintedEvent.parameters = new Array()

  minerMintedEvent.parameters.push(
    new ethereum.EventParam("miner", ethereum.Value.fromAddress(miner))
  )
  minerMintedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return minerMintedEvent
}

export function createMiner__ProviderFeeEvent(
  provider: Address,
  amount: BigInt
): Miner__ProviderFee {
  let minerProviderFeeEvent = changetype<Miner__ProviderFee>(newMockEvent())

  minerProviderFeeEvent.parameters = new Array()

  minerProviderFeeEvent.parameters.push(
    new ethereum.EventParam("provider", ethereum.Value.fromAddress(provider))
  )
  minerProviderFeeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return minerProviderFeeEvent
}

export function createMiner__TreasuryFeeEvent(
  treasury: Address,
  amount: BigInt
): Miner__TreasuryFee {
  let minerTreasuryFeeEvent = changetype<Miner__TreasuryFee>(newMockEvent())

  minerTreasuryFeeEvent.parameters = new Array()

  minerTreasuryFeeEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )
  minerTreasuryFeeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return minerTreasuryFeeEvent
}

export function createMiner__TreasurySetEvent(
  treasury: Address
): Miner__TreasurySet {
  let minerTreasurySetEvent = changetype<Miner__TreasurySet>(newMockEvent())

  minerTreasurySetEvent.parameters = new Array()

  minerTreasurySetEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )

  return minerTreasurySetEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
