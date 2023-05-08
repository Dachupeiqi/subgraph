# 项目介绍：足球竞猜 DApp

该项目是一款基于区块链技术的足球竞猜 DApp，旨在为用户提供一个安全、公正、透明的竞猜平台，让用户在享受足球比赛的同时，也能够获得相应的收益。

该 DApp 包含三个 GitHub 仓库，分别是:
- [合约 Hardhat 仓库](https://github.com/Dachupeiqi/worldCup_contracts)
- [React前端](https://github.com/Dachupeiqi/worldCup_frontend)
- [Thegrapha事件处理](https://github.com/Dachupeiqi/worldCup_subgraph)

## 合约 hardhat 仓库

合约 hardhat 仓库是该 DApp 的核心代码仓库，主要包含智能合约的编写、部署和测试代码。该仓库基于 hardhat 搭建，使用 Solidity 编写智能合约，部署在polygon mumbai测试网。

该仓库包含以下几个主要的智能合约：

- WorldCup.sol：足球竞猜主合约，实现用户注册、登录、竞猜、结算等功能；
- WorldCupToken.sol：足球竞猜代币合约，实现代币的发行、转移、销毁等功能；
该仓库还包含了一些辅助性的合约，如 SafeMath.sol、TransferHelper.sol 等，用于增强合约的安全性和可维护性。

## 前端仓库

前端仓库是该 DApp 的用户界面代码仓库，主要包含用户界面的设计、开发和测试代码。该仓库基于 React 框架，使用 Wagmi.js 库与智能合约进行交互，实现用户在 DApp 上的操作。

该仓库包含以下几个要点：

- 使用React+Antd；
- 使用Wagmi合约交互框架,其丰富的React Hook 极大简化开发；
- 历史数据通过在线查询Thegraph；



## Subgraph 仓库

Subgraph 仓库是该 DApp 的数据查询代码仓库，主要包含 subgraph 的编写、部署和测试代码。该仓库基于 The Graph 搭建，链下监听合约事件，使用 GraphQL 查询语言，对 DApp 的数据进行查询和分析。

该仓库包含以下两个WorldCup，WorldCupDistriButor合约时间监听处理：

- 统计足球竞猜数据，实现足球比赛、用户、竞猜等数据的查询和分析；
- 统计足球竞猜用户参与，实现代币的发行查询和分析。

## 总结

该项目是一款基于区块链技术的足球竞猜 DApp，通过使用智能合约实现了安全、公正、透明的竞猜平台，为用户提供了一个新的足球观赛方式。同时，该项目使用 React 框架和 wagmi.js 库实现了良好的用户界面和交互体验，使用 The Graph 和 GraphQL 查询语言实现了数据查询和分析功能，是一款完整、可靠、易用的 DApp。三个仓库相互协作，构成了一个完整的 DApp 生态系统，为用户带来了全新的足球竞猜体验。



