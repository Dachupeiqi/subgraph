import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Claimed as ClaimedEvent } from "../generated/WorldCupDistributor/WorldCupDistributor"
import { handleClaimed } from "../src/world-cup"
import { createClaimedEvent ,createDistributeRewardEvent} from "./world-cup-distributor-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    // let pool = Address.fromString("0x0000000000000000000000000000000000000001")
    // let user = Address.fromString("0x0000000000000000000000000000000000000001")
    // let amount = BigInt.fromI32(234)
    // let newClaimedEvent = createClaimedEvent(pool, user, amount)

    let merkerRoot=Bytes.fromHexString("0xc26b9625510558a10dd1a095994ee8abd0d986de4e39e8c376223bc6abc4af50")
    let amount = BigInt.fromString("")
    createDistributeRewardEvent()


    handleClaimed(newClaimedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Claimed created and stored", () => {
    assert.entityCount("Claimed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Claimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pool",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Claimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Claimed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
