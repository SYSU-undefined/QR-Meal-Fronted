<script>

import { Request } from './utils/request';

function roundFloat(n) {
  const [, floatPart] = n.toString().split('.');
  if (floatPart && floatPart.length < 4) return n;
  const shift = 10 ** Math.floor(2);
  return Math.floor(n * shift) / shift;
}

function wxPromisify(func) {
  return async function(param) {
    return new Promise((res, rej) => {
      param.success = res;
      param.fail = rej;
      func.call(this, param);
    });
  }
}

function patchWx() {
  Request.injectRequest();
  const { windowWidth } = wx.getSystemInfoSync();
  wx.$rpxRatio = roundFloat(windowWidth / 750);
  wx.$pxRatio = roundFloat(750 / windowWidth);

  wx.getUserInfoAsync = wxPromisify(wx.getUserInfo);
}

export default {
  beforeCreate() {
    patchWx();
  },
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    console.log('app created and cache logs by setStorageSync');
  },
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

page {
  height: 100%;
}
</style>
