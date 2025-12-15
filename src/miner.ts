import { BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import {
  Miner__Mined as Miner__MinedEvent,
  Miner__MinerFee as Miner__MinerFeeEvent,
  Miner__Minted as Miner__MintedEvent,
  Miner__ProviderFee as Miner__ProviderFeeEvent,
  Miner__TreasuryFee as Miner__TreasuryFeeEvent,
  Miner__TreasurySet as Miner__TreasurySetEvent,
} from "../generated/Miner/Miner";
import { Miner, Account, Shop, Glaze } from "../generated/schema";
import {
  ZERO_BD,
  ZERO_BI,
  ONE_BI,
  ADDRESS_ZERO,
  MIN_INIT_PRICE,
} from "./constants";
import { convertTokenToDecimal } from "./helpers";

export function handleMiner__Mined(event: Miner__MinedEvent): void {
  let miner = Miner.load(event.address.toHexString());
  if (miner == null) {
    miner = new Miner(event.address.toHexString());
    miner.epochId = ZERO_BI;
    miner.revenue = ZERO_BD;
    miner.minted = ZERO_BD;
  }
  miner.epochId = miner.epochId.plus(ONE_BI);
  miner.save();

  let account = Account.load(event.params.miner.toHexString());
  if (account == null) {
    account = new Account(event.params.miner.toHexString());
    account.mined = ZERO_BD;
    account.earned = ZERO_BD;
    account.spent = ZERO_BD;
  }
  account.spent = account.spent.plus(
    convertTokenToDecimal(event.params.price, BigInt.fromI32(18))
  );
  account.save();

  let glaze = Glaze.load(miner.epochId.toString());
  if (glaze == null) {
    glaze = new Glaze(miner.epochId.toString());
    glaze.account = ADDRESS_ZERO;
    glaze.shop = ADDRESS_ZERO;
    glaze.uri = "";
    glaze.startTime = ZERO_BI;
    glaze.initPrice = MIN_INIT_PRICE;
    glaze.mined = ZERO_BD;
    glaze.spent = ZERO_BD;
    glaze.earned = ZERO_BD;
  }
  let price = convertTokenToDecimal(event.params.price, BigInt.fromI32(18));
  let doubledPrice = price.times(BigDecimal.fromString("2"));

  glaze.account = event.params.miner.toHexString();
  glaze.uri = event.params.uri;
  glaze.startTime = event.block.timestamp;
  glaze.initPrice = doubledPrice.lt(MIN_INIT_PRICE)
    ? MIN_INIT_PRICE
    : doubledPrice;
  glaze.spent = price;
  glaze.save();
}

export function handleMiner__MinerFee(event: Miner__MinerFeeEvent): void {
  let miner = Miner.load(event.address.toHexString());
  if (miner == null) {
    miner = new Miner(event.address.toHexString());
    miner.epochId = ZERO_BI;
    miner.revenue = ZERO_BD;
    miner.minted = ZERO_BD;
  }
  miner.save();

  let account = Account.load(event.params.miner.toHexString());
  if (account == null) {
    account = new Account(event.params.miner.toHexString());
    account.mined = ZERO_BD;
    account.earned = ZERO_BD;
    account.spent = ZERO_BD;
  }
  account.earned = account.earned.plus(
    convertTokenToDecimal(event.params.amount, BigInt.fromI32(18))
  );
  account.save();

  let glaze = Glaze.load(miner.epochId.toString());
  if (glaze == null) {
    glaze = new Glaze(miner.epochId.toString());
    glaze.account = ADDRESS_ZERO;
    glaze.shop = ADDRESS_ZERO;
    glaze.uri = "";
    glaze.startTime = ZERO_BI;
    glaze.initPrice = MIN_INIT_PRICE;
    glaze.mined = ZERO_BD;
    glaze.spent = ZERO_BD;
    glaze.earned = ZERO_BD;
  }
  glaze.account = event.params.miner.toHexString();
  glaze.earned = glaze.earned.plus(
    convertTokenToDecimal(event.params.amount, BigInt.fromI32(18))
  );
  glaze.save();
}

export function handleMiner__Minted(event: Miner__MintedEvent): void {
  let miner = Miner.load(event.address.toHexString());
  if (miner == null) {
    miner = new Miner(event.address.toHexString());
    miner.epochId = ZERO_BI;
    miner.revenue = ZERO_BD;
    miner.minted = ZERO_BD;
  }
  miner.minted = miner.minted.plus(
    convertTokenToDecimal(event.params.amount, BigInt.fromI32(18))
  );
  miner.save();

  let account = Account.load(event.params.miner.toHexString());
  if (account == null) {
    account = new Account(event.params.miner.toHexString());
    account.mined = ZERO_BD;
    account.earned = ZERO_BD;
    account.spent = ZERO_BD;
  }
  account.mined = account.mined.plus(
    convertTokenToDecimal(event.params.amount, BigInt.fromI32(18))
  );
  account.save();

  let glaze = Glaze.load(miner.epochId.toString());
  if (glaze == null) {
    glaze = new Glaze(miner.epochId.toString());
    glaze.account = ADDRESS_ZERO;
    glaze.shop = ADDRESS_ZERO;
    glaze.uri = "";
    glaze.startTime = ZERO_BI;
    glaze.initPrice = MIN_INIT_PRICE;
    glaze.mined = ZERO_BD;
    glaze.spent = ZERO_BD;
    glaze.earned = ZERO_BD;
  }
  glaze.account = event.params.miner.toHexString();
  glaze.mined = glaze.mined.plus(
    convertTokenToDecimal(event.params.amount, BigInt.fromI32(18))
  );
  glaze.save();
}

export function handleMiner__ProviderFee(event: Miner__ProviderFeeEvent): void {
  let miner = Miner.load(event.address.toHexString());
  if (miner == null) {
    miner = new Miner(event.address.toHexString());
    miner.epochId = ZERO_BI;
    miner.revenue = ZERO_BD;
    miner.minted = ZERO_BD;
  }
  miner.save();

  let shop = Shop.load(event.params.provider.toHexString());
  if (shop == null) {
    shop = new Shop(event.params.provider.toHexString());
    shop.earned = ZERO_BD;
  }
  shop.earned = shop.earned.plus(
    convertTokenToDecimal(event.params.amount, BigInt.fromI32(18))
  );
  shop.save();

  let glaze = Glaze.load(miner.epochId.toString());
  if (glaze == null) {
    glaze = new Glaze(miner.epochId.toString());
    glaze.account = ADDRESS_ZERO;
    glaze.shop = ADDRESS_ZERO;
    glaze.uri = "";
    glaze.startTime = ZERO_BI;
    glaze.initPrice = MIN_INIT_PRICE;
    glaze.mined = ZERO_BD;
    glaze.spent = ZERO_BD;
    glaze.earned = ZERO_BD;
  }
  glaze.shop = event.params.provider.toHexString();
  glaze.save();
}

export function handleMiner__TreasuryFee(event: Miner__TreasuryFeeEvent): void {
  let miner = Miner.load(event.address.toHexString());
  if (miner == null) {
    miner = new Miner(event.address.toHexString());
    miner.epochId = ZERO_BI;
    miner.revenue = ZERO_BD;
    miner.minted = ZERO_BD;
  }
  miner.revenue = miner.revenue.plus(
    convertTokenToDecimal(event.params.amount, BigInt.fromI32(18))
  );
  miner.save();
}

export function handleMiner__TreasurySet(
  event: Miner__TreasurySetEvent
): void {}
