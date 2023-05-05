import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Claimed, DistributeReward } from "../generated/Contract/Contract"

export function createClaimedEvent(
  pool: Address,
  user: Address,
  amount: BigInt
): Claimed {
  let claimedEvent = changetype<Claimed>(newMockEvent())

  claimedEvent.parameters = new Array()

  claimedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimedEvent
}

export function createDistributeRewardEvent(
  merkleRoot: Bytes,
  index: BigInt,
  amount: BigInt,
  settleBlockNumber: BigInt
): DistributeReward {
  let distributeRewardEvent = changetype<DistributeReward>(newMockEvent())

  distributeRewardEvent.parameters = new Array()

  distributeRewardEvent.parameters.push(
    new ethereum.EventParam(
      "merkleRoot",
      ethereum.Value.fromFixedBytes(merkleRoot)
    )
  )
  distributeRewardEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  distributeRewardEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  distributeRewardEvent.parameters.push(
    new ethereum.EventParam(
      "settleBlockNumber",
      ethereum.Value.fromUnsignedBigInt(settleBlockNumber)
    )
  )

  return distributeRewardEvent
}
