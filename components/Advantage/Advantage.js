// components/Advantage/Advantage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    advantageInfo: [
      {
        icon: '/images/advantages/adv1.png',
        title: '高兼容性',
        content: '100%兼容开源社区产品Nacos、Eureka，业务代码无需任何改造，修改集群地址后，快速使用。'
      },
      {
        icon: '/images/advantages/adv2.png',
        title: '无需关注底层',
        content: '无需关注监控、运维和容灾问题，只需专注于业务开发，无需部署运维，更专业、更弹性、更可靠。'
      },
      {
        icon: '/images/advantages/adv3.png',
        title: '可靠的稳定性',
        content: '微服务引擎提供的实例，具备完善的监控和运维，优化Nacos、Eureka大量可用性痛点，引擎持久稳定运行。'
      },
      {
        icon: '/images/advantages/adv4.png',
        title: '无侵入',
        content: '应用代码、配置、镜像无须修改即可接入服务中心。'
      },
      {
        icon: '/images/advantages/adv5.png',
        title: '兼容Spring ',
        content: '100%兼容Spring 全面拥抱开源生态，支持主流开源框架Spring Cloud。'
      },
      {
        icon: '/images/advantages/adv6.png',
        title: '可视化操作',
        content: '提供可视化的界面，实现服务的可见、可管、可控。'
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
