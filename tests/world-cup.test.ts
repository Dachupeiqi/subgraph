import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ClaimReward } from "../generated/schema"
import { ClaimReward as ClaimRewardEvent } from "../generated/WorldCup/WorldCup"
import { handleClaimReward } from "../src/world-cup"
import { createClaimRewardEvent } from "./world-cup-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _claimer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _amt = BigInt.fromI32(234)
    let newClaimRewardEvent = createClaimRewardEvent(_claimer, _amt)
    handleClaimReward(newClaimRewardEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ClaimReward created and stored", () => {
    assert.entityCount("ClaimReward", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ClaimReward",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_claimer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ClaimReward",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_amt",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
