<script>

import { Request } from './utils/request';

function roundFloat(n) {
  console.log(n);
  const [, floatPart] = n.toString().split('.');
  console.log(floatPart);
  if (floatPart && floatPart.length < 4) return n;
  const shift = 10 ** Math.floor(2);
  return Math.floor(n * shift) / shift;
}

export default {
  beforeCreate() {
    Request.injectRequest();
    const { windowWidth } = wx.getSystemInfoSync();
    wx.$rpxRatio = roundFloat(windowWidth / 750);
    wx.$pxRatio = roundFloat(750 / windowWidth);
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
