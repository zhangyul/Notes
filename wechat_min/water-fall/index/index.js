const app = getApp()

Page({
  data: {

  },
  onLoad() {
    this.setData({
      loadWaterFall: this.loadWaterFall.bind(this)
    })
    // this.loadWaterFall()
  },
  getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  },
  loadWaterFall(data) {
    let pageIndex = data.pageIndex;
    return new Promise((resolve, reject) => {
      let data = {};
      let list = [];
      for (let i = 0; i < 10; i++) {
        let color = this.getRandomColor();
        list.push({
          id: (pageIndex - 1) * 10 + i,
          width: Math.floor(Math.random() * 100) + 300,
          height: Math.floor(Math.random() * 300) + 200,
          color: color
        })
      }
      data.list = list;
      data.hasMore = pageIndex <= 15;
      resolve(data);
    })
  }
})