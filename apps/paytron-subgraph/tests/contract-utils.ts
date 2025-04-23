import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  Paused,
  TokensTransferred,
  TokensWithdrawn,
  Unpaused
} from "../generated/Contract/Contract"

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

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createTokensTransferredEvent(
  from: Address,
  to: Address,
  token: i32,
  amount: BigInt
): TokensTransferred {
  let tokensTransferredEvent = changetype<TokensTransferred>(newMockEvent())

  tokensTransferredEvent.parameters = new Array()

  tokensTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  tokensTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  tokensTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "token",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(token))
    )
  )
  tokensTransferredEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokensTransferredEvent
}

export function createTokensWithdrawnEvent(
  recipient: Address,
  token: i32,
  amount: BigInt
): TokensWithdrawn {
  let tokensWithdrawnEvent = changetype<TokensWithdrawn>(newMockEvent())

  tokensWithdrawnEvent.parameters = new Array()

  tokensWithdrawnEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  tokensWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "token",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(token))
    )
  )
  tokensWithdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokensWithdrawnEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
