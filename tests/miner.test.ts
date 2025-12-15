import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Miner__Mined } from "../generated/schema"
import { Miner__Mined as Miner__MinedEvent } from "../generated/Miner/Miner"
import { handleMiner__Mined } from "../src/miner"
import { createMiner__MinedEvent } from "./miner-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let miner = Address.fromString("0x0000000000000000000000000000000000000001")
    let price = BigInt.fromI32(234)
    let uri = "Example string value"
    let newMiner__MinedEvent = createMiner__MinedEvent(
      sender,
      miner,
      price,
      uri
    )
    handleMiner__Mined(newMiner__MinedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("Miner__Mined created and stored", () => {
    assert.entityCount("Miner__Mined", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Miner__Mined",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Miner__Mined",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "miner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Miner__Mined",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )
    assert.fieldEquals(
      "Miner__Mined",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "uri",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
