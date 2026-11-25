(() => {
  'use strict';
  // Port of fonksiyonlar.py economics. No account file or model is included.
  const createPlayer = () => ({
    money: 0,
    rebirth: 0,
    prestige: 0,
    power: 10,
    rebirthMultiplier: 1,
    prestigeMultiplier: 1,
    powerPrice: 100,
    rebirthPrice: 5000,
    prestigePrice: 50000,
    powerStock: 10,
    rebirthStock: 25,
  });
  const click = (state) => ({
    ...state,
    money: Math.trunc(
      state.money +
        state.power * state.rebirthMultiplier * state.prestigeMultiplier,
    ),
  });
  function buyPower(state) {
    if (state.powerStock === 0)
      return { state, message: 'Bu esyanin stogu bitti!' };
    if (state.money < state.powerPrice)
      return { state, message: 'Para yetersiz!' };
    const next = {
      ...state,
      money: state.money - state.powerPrice,
      power: state.power + 10,
      powerPrice: Math.trunc(state.powerPrice * 1.5),
      powerStock: state.powerStock - 1,
    };
    return { state: next, message: `artis ${next.power} ye yukseldi!` };
  }
  function buyRebirth(state) {
    if (state.powerStock > 0)
      return { state, message: 'Güc fullenmeden Rebirth satın alamazsın!' };
    if (state.money < state.rebirthPrice)
      return { state, message: 'Para yetersiz!' };
    if (state.rebirthStock === 0)
      return {
        state,
        message: 'Daha fazla Rebirth satın alamazsın! Prestige satın al!',
      };
    const next = {
      ...state,
      money: 0,
      rebirth: state.rebirth + 1,
      power: 10,
      rebirthMultiplier: Math.round((state.rebirthMultiplier + 0.1) * 10) / 10,
      powerPrice: 100,
      rebirthPrice: state.rebirthPrice * 2,
      powerStock: 10,
      rebirthStock: state.rebirthStock - 1,
    };
    return { state: next, message: `Rebirth ${next.rebirth} ye yukseldi!` };
  }
  function buyPrestige(state) {
    if (state.rebirthStock > 0 || state.powerStock > 0)
      return {
        state,
        message: 'Rebirth fullenmeden Prestige satın alamazsın!',
      };
    if (state.money < state.prestigePrice)
      return { state, message: 'Para yetersiz!' };
    const next = {
      ...state,
      money: 0,
      rebirth: 0,
      prestige: state.prestige + 1,
      power: 10,
      rebirthMultiplier: 1,
      prestigeMultiplier: state.prestigeMultiplier * 2,
      powerPrice: 100,
      rebirthPrice: 5000,
      prestigePrice: Math.trunc(state.prestigePrice * 5),
      powerStock: 10,
      rebirthStock: 25,
    };
    return { state: next, message: `Prestige ${next.prestige} ye yukseldi!` };
  }
  globalThis.IdleRules = Object.freeze({
    createPlayer,
    click,
    buyPower,
    buyRebirth,
    buyPrestige,
  });
})();
