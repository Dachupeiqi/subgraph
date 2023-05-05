import {
  ClaimReward as ClaimRewardEvent,
  Finialize as FinializeEvent,
  Play as PlayEvent
} from "../generated/WorldCup/WorldCup"

import {DistributeReward as DistributeRewardEvent ,Claimed as ClaimedEvent} from "../generated/WorldCupDistributor/WorldCupDistributor"


import {PlayRecord, NeedToHandle, PlayerDistribution, MerkleDistributor, FinializeHistory, RewardHistory,WCTClaimHistory } from "../generated/schema"

import { Address, BigInt, Bytes, TypedMap, ethereum, log } from "@graphprotocol/graph-ts";

// palyer claim the eth he win
export function handleClaimReward(event: ClaimRewardEvent): void {
}

// distributor
export function handleClaimed(event: ClaimedEvent): void {
    let id= event.params.pool.toHex()+"#"+event.params.user.toHex()+"#"+event.params.amount.toHex()
    let user=event.params.user
    let amount=event.params.amount
    let index=event.params.index

   let entity= new WCTClaimHistory(id)
   entity.id=id
   entity.index=index
   entity.totalAmt=amount
   entity.player=user
   entity.save()
}

export function handleFinialize(event: FinializeEvent): void {
  let id = event.params._currRound.toString();
  let entity = new FinializeHistory(id);

  entity.result = event.params._country;
  entity.save();
}



//let NO_HANDLE_ID = "noHandleId"
export function handlePlay(event: PlayEvent): void {

   // 统计所有的play事件，存储起来
  // 1. get id 
  let id = event.params._player.toHex() + "#" + event.params._currRound.toString() + "#" + event.block.timestamp.toHex();

    // 2. create entity
    let entity = new PlayRecord(id);

    // 3. set data
    entity.index = BigInt.fromI32(event.params._currRound);
    entity.player = event.params._player;
    entity.selectCountry = BigInt.fromI32(event.params._country);
    entity.time = event.block.timestamp;
    entity.block = event.block.number;

    // 4. save
    entity.save()

    // // 5. save nohandle play record
    // //load方法是从已有实体加载,加载完用同一id保存，可以覆盖之前的数据
    // let noHandle = NeedToHandle.load(NO_HANDLE_ID);
    // if (!noHandle) {
    //   noHandle = new NeedToHandle(NO_HANDLE_ID);
    //   noHandle.list = [];
    // }

    // // noHandle.list.push(id)
    // let list = noHandle.list;
    // list.push(id);
    // noHandle.list = list;
    // noHandle.save()

}


export function handleDistributeReward(event: DistributeRewardEvent): void {
  // parse parameters first
  let id = event.params.index.toString();
  let rewardAmt = event.params.amount;
  let index = event.params.index;
  let settleBlockNumber = event.params.settleBlockNumber;

  // 找到当前发奖周期，查看哪个国家是winner
  let winCountry = FinializeHistory.load(id)
  if (!winCountry) {
    return;
  }

  // save for double check
  let merkleEntity = new MerkleDistributor(id);

  merkleEntity.index = index;
  merkleEntity.totalAmt = rewardAmt;
  merkleEntity.settleBlockNumber = settleBlockNumber;
  merkleEntity.save();



  // let startBlock = BigInt.fromI32(0);
  // let endBlock = settleBlockNumber;

  // //如果当前竞彩轮数大于0
  // if (index > BigInt.fromI32(0)) {
  //   let prevId = index.minus(BigInt.fromI32(1)).toString()
  //   //拿到上一次开奖的开始区块数
  //   let prev = MerkleDistributor.load(prevId) as MerkleDistributor;
  //   startBlock = prev.settleBlockNumber;
  // }


  // let totalWeight = BigInt.fromI32(0) //总权重
  // let rewardActuallyAmt = BigInt.fromI32(0) // might be a little less than the given reward amt caused by the precise lossing of division
  // let rewardHistoryList: string[] = []; // for history check usage


  


  // let noHandle = NeedToHandle.load(NO_HANDLE_ID);
  // if (noHandle) {
  //   let group = new TypedMap<Bytes, BigInt>();  //映射关系  领奖人==>领奖权重
  //   let currentList = noHandle.list; // current record
  //   let newList: string[] = []; // record won't be used this time
  //   log.warning("current list: ", currentList)

  //   for (let i = 0; i < currentList.length; i++) {
  //     let playerWeight = BigInt.fromI32(1)
  //     let record = PlayRecord.load(currentList[i]) as PlayRecord;
  //     log.warning("currentList[i]:", [currentList[i]])
  //     log.warning("record.block:", [record.block.toString()])
  //     log.warning("startBlock:", [startBlock.toString()])
  //     log.warning("endBlock:", [endBlock.toString()])
      
  //     if (record.block > startBlock && record.block <= endBlock) {
  //       if (winCountry.result == record.selectCountry) {
  //         // good guess, will get double rewards
  //         playerWeight = playerWeight.times(BigInt.fromI32(2))
  //       }

  //       let prevWeight = group.get(record.player)
  //       if (!prevWeight) {
  //         prevWeight = BigInt.fromI32(0)
  //       }

  //       // update weight of player
  //       group.set(record.player, prevWeight.plus(playerWeight));

  //       // update total weight
  //       totalWeight = totalWeight.plus(playerWeight);
  //       log.warning("hello world totalWeight: ", [totalWeight.toString()])
  //     } else {
  //       // 遍历所有的record，累加到player之上, block区间之外的，会添加到newList中
  //       newList.push(currentList[i]);
  //     }
  //   }





  //   // 便利所有的group，为每个人分配奖励数量，然后存储在UserDistribution中(供最终调用)
  //   for (let j = 0; j < group.entries.length; j++) {
  //     let player = group.entries[j].key;
  //     let weight = group.entries[j].value;

  //     let id = player.toString() + "#" + index.toString()

  //     log.warning("totalWeight: ", [totalWeight.toString()])
  //     let reward = rewardAmt.times(weight).div(totalWeight);

  //     let playerDistribution = new PlayerDistribution(id);
  //     playerDistribution.index = index;
  //     playerDistribution.player = player;
  //     playerDistribution.rewardAmt = reward;
  //     playerDistribution.weight = weight;
  //     playerDistribution.isClaimed = false;
  //     playerDistribution.save();

  //     rewardHistoryList.push(id);
  //     rewardActuallyAmt = rewardActuallyAmt.plus(reward);
  //   }

  //   noHandle.list = newList;
  //   noHandle.save();
  // }

  // // 存储本期奖励详情，供后续查看历史
  // let rewardHistory = new RewardHistory(id);
  // rewardHistory.index = index;
  // rewardHistory.rewardAmt = rewardAmt;
  // rewardHistory.settleBlockNumber = settleBlockNumber;
  // rewardHistory.totalWeight = totalWeight;
  // rewardHistory.list = rewardHistoryList;
  // rewardHistory.save()
}