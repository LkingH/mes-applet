Page({
  data: {
    fileList2: [
    ],
  },

  afterRead(event) {
    const { file, name } = event.detail;
    console.log(JSON.stringify(file, null, 2));
    const fileList = this.data[`fileList${name}`];

    this.setData({ [`fileList${name}`]: fileList.concat(file) });
  },


  delete(event) {
    const { index, name } = event.detail;
    const fileList = this.data[`fileList${name}`];
    fileList.splice(index, 1);
    this.setData({ [`fileList${name}`]: fileList });
  },

  clickPreview() {},
});
