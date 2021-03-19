/**
 * 瀑布流组件
 */
const cardWidth = 343;
Component({
  properties: {
    // 瀑布流列数
    fallNum: {
      type: Number,
      value: 2
    },
    // 当前页数
    pageIndex: {
      type: Number,
      value: 1
    },
    // 预加载页数
    pretensionPage: {
      type: Number,
      value: 2
    },
    // 分页数
    pageSize: {
      type: Number,
      value: 10
    },
    // 整体宽度，单位rpx
    containerWidth: {
      type: Number,
      value: 750
    },
    // 流间距
    gapWidth: {
      type: Number,
      value: 10
    },
    // 是否滚动
    ableScroll: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) {
        if (newVal != oldVal) {
          this.setData({
            ableScroll: newVal
          })
        }
      },
    },
    loadWaterFall: {
      type: Function,
      value: null,
      observer: function (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.loadList()
        }
      },
    },
    // 重新渲染瀑布流
    reloadWaterFull: {
      type: Boolean,
      observer: function (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          this.setData({
            allList: null,
            curList: null,
            pageIndex: 1
          }, this.loadList)
        }
      }
    }
  },
  data: {
    // 全部数据
    allList: null,
    // 展示在页面上的数据
    curList: null,
    // 左右侧列表高度
    heightArr: [],
    // 列表最大高度
    // 列表每页底部位置
    listPageBootomPosition: [],
    listMaxHeight: 0,
    reload: false,
    hasMore: true,
    showLoading: false,
  },
  lifetimes: {
    attached: async function attached() {
      let query = wx.createSelectorQuery().in(this);
      query.select('#wrapper').boundingClientRect(rect => {
        this.setData({
          wrapperHeight: wx.getSystemInfoSync().windowHeight - rect.top
        })
      }).exec();
    }
  },
  methods: {
    // 加载读取图片信息
    loadImage: function loadImage(cover) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: cover,
          success: (res) => {
            resolve(res)
          },
          fail: () => {
            resolve({
              width: 750,
              height: 750
            })
          }
        })
      })
    },
    loadList: function loadList() {
      let {
        heightArr,
        fallNum,
        pageIndex,
        pageSize,
        listMaxHeight,
        listPageBootomPosition,
        pretensionPage,
        ...data
      } = this.data;
      this.setData({
        reload: false,
        showLoading: true
      }, () => {
        this.data.loadWaterFall && this.data.loadWaterFall({
          pageIndex: pageIndex,
          pageSize: pageSize
        }).then(async r => {
          let {
            list,
            hasMore
          } = r;
          let allList = data.allList || [];
          let curList = data.curList || [];
          if (pageIndex - 1 > pretensionPage) {
            curList = curList.slice(pageSize * pretensionPage - curList.length);
          }
          // 初始化商品列表信息
          for (let i in list) {
            let info = list[i];
            if (info) {
              // 读取图片宽高信息
              if (!info.width) info = await this.loadImage(cdnUrl + list[i].coverImageObject + "?x-oss-process=image/resize,m_lfit,w_400");
              list[i].height = cardWidth / info.width * info.height;
              list[i].width = cardWidth;
              // 处理图片，尺寸裁剪
              if (info.width >= 4 / 3 * info.height) {
                list[i].height = cardWidth * 3 / 4;
              }
              if (info.height >= 3 / 2 * info.width) {
                list[i].height = cardWidth * 3 / 2;
              }
              if (pageIndex == 1 && i < fallNum) {
                list[i].top = 0;
                // 第一排元素定位
                list[i].left = (i % 2) * (343 + 16);
                // 需要加上文字高度     
                heightArr[i] = list[i].height + 16;
              } else {
                // 读取最小高度
                let minHeight = Math.min.apply(null, heightArr);
                // 最小高度索引
                let minHeightIndex = heightArr.indexOf(minHeight);
                // 为元素定位
                list[i].top = heightArr[minHeightIndex];
                list[i].left = (minHeightIndex % 2) * (343 + 16);
                heightArr[minHeightIndex] += list[i].height + 16;
              }
              allList.push(list[i]);
              curList.push(list[i])
              listMaxHeight = Math.max.apply(null, heightArr); // 列表最大高度
              await this.setData({
                curList: curList,
                listMaxHeight: listMaxHeight
              })
            }
          }
          // 将当前分页距离顶部距离填充到数组
          this.data.listPageBootomPosition[pageIndex - 1] = Math.min.apply(null, heightArr) / 750 * wx.getSystemInfoSync().windowWidth;;
          this.data.allList = allList;
          this.setData({
            curList: curList,
            reload: true,
            hasMore: hasMore,
            showLoading: false
          })
        })
      });
    },
    loadMore: function loadMore() {
      let {
        reload,
        hasMore,
        pageIndex
      } = this.data;
      if (reload && hasMore) {
        this.setData({
          pageIndex: pageIndex + 1
        }, this.loadList)
      }
    },
    onSrcoll: function onSrcoll(e) {
      // 滚动时判断是否需要从数据中加载最新数据，获取当前需要加载的页面分页
      if (this.data.reload) {
        let {
          pageSize,
          pageIndex,
          pretensionPage
        } = this.data;
        let curPageIndex = this.data.listPageBootomPosition.findIndex(item => e.detail.scrollTop + this.data.wrapperHeight < item) + 1;
        if (curPageIndex != 0 && curPageIndex != pageIndex) {
          this.setData({
            pageIndex: curPageIndex,
            curList: this.data.allList.slice(curPageIndex <= pretensionPage ? 0 : (curPageIndex - pretensionPage - 1) * pageSize, (curPageIndex + pretensionPage) * pageSize),
          })
        }
      }
    }
  }
});